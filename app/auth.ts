import { env } from "cloudflare:workers";

export const sessionCookieName = "aga_session";

export type UserRole = "PLAYER" | "CLAN_LEADER" | "MODERATOR" | "ADMIN" | "SUPER_ADMIN";

export type AuthUser = {
  id: string;
  email: string;
  username: string;
  displayName: string;
  country: string;
  dateOfBirth: string;
  primaryGame: string;
  avatarUrl: string | null;
  bannerUrl: string | null;
  bio: string | null;
  status: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  lastSeenAt: string | null;
};

const sessionDays = 7;
const authRateLimit = new Map<string, { count: number; resetAt: number }>();

export async function registerUser(input: unknown, request: Request) {
  const payload = parseRegisterPayload(input);
  rateLimit(request, `register:${payload.email.toLowerCase()}`, 8, 60_000);
  const db = await getAuthDb();

  const existing = await db
    .prepare("select id, username, email from users where lower(username) = lower(?) or lower(email) = lower(?) limit 1")
    .bind(payload.username, payload.email)
    .first<{ id: string; username: string; email: string }>();

  if (existing?.username?.toLowerCase() === payload.username.toLowerCase()) {
    throw statusError("Username is already taken.", 409);
  }

  if (existing?.email?.toLowerCase() === payload.email.toLowerCase()) {
    throw statusError("Email is already registered.", 409);
  }

  const now = new Date().toISOString();
  const userId = `usr_${crypto.randomUUID()}`;
  const passwordHash = await hashPassword(payload.password);

  await db
    .prepare(
      `insert into users (
        id, username, email, display_name, password_hash, country, date_of_birth, primary_game,
        avatar_url, banner_url, bio, status, role, region, skill_level, age_verified,
        created_at, updated_at, last_seen_at
      ) values (?, ?, ?, ?, ?, ?, ?, ?, null, null, null, 'active', 'PLAYER', ?, null, ?, ?, ?, ?)`,
    )
    .bind(
      userId,
      payload.username,
      payload.email,
      payload.displayName,
      passwordHash,
      payload.country,
      payload.dateOfBirth,
      payload.primaryGame,
      payload.country,
      isAtLeastThirteen(payload.dateOfBirth) ? 1 : 0,
      now,
      now,
      now,
    )
    .run();

  await db
    .prepare(
      `insert into player_stats (
        id, user_id, game, matches_played, wins, losses, draws, kills, deaths,
        rating, xp, level, win_streak, best_win_streak, updated_at
      ) values (?, ?, ?, 0, 0, 0, 0, 0, 0, 1000, 0, 1, 0, 0, ?)`,
    )
    .bind(`pst_${crypto.randomUUID()}`, userId, payload.primaryGame, now)
    .run();

  await db
    .prepare(
      `insert into wallets (
        id, user_id, currency, available_balance, locked_balance, created_at, updated_at
      ) values (?, ?, 'DEMO', 0, 0, ?, ?)`,
    )
    .bind(`wal_${crypto.randomUUID()}`, userId, now, now)
    .run();

  await writeAudit(db, userId, "account.created", "user", userId, { primaryGame: payload.primaryGame });

  const session = await createSession(db, userId, request);
  const user = await getUserById(db, userId);
  return { user, session };
}

export async function loginUser(input: unknown, request: Request) {
  const payload = parseLoginPayload(input);
  rateLimit(request, `login:${payload.identifier.toLowerCase()}`, 10, 60_000);
  const db = await getAuthDb();
  const row = await db
    .prepare(
      `select id, password_hash from users
       where lower(username) = lower(?) or lower(email) = lower(?)
       limit 1`,
    )
    .bind(payload.identifier, payload.identifier)
    .first<{ id: string; password_hash: string | null }>();

  if (!row?.password_hash || !(await verifyPassword(payload.password, row.password_hash))) {
    throw statusError("Invalid username/email or password.", 401);
  }

  const now = new Date().toISOString();
  await db.prepare("update users set last_seen_at = ?, updated_at = ? where id = ?").bind(now, now, row.id).run();
  await writeAudit(db, row.id, "account.login", "user", row.id, {});
  const session = await createSession(db, row.id, request);
  const user = await getUserById(db, row.id);
  return { user, session };
}

export async function logoutUser(request: Request) {
  const token = readSessionToken(request);
  if (!token) return;
  const db = await getAuthDb();
  await db.prepare("delete from sessions where token_hash = ?").bind(await sha256Hex(token)).run();
}

export async function getCurrentUser(request: Request): Promise<AuthUser | null> {
  const token = readSessionToken(request);
  if (!token) return null;
  const db = await getAuthDb();
  const tokenHash = await sha256Hex(token);
  const now = new Date().toISOString();
  const session = await db
    .prepare("select user_id from sessions where token_hash = ? and expires_at > ? limit 1")
    .bind(tokenHash, now)
    .first<{ user_id: string }>();
  if (!session) return null;
  return getUserById(db, session.user_id);
}

export async function requireUser(request: Request) {
  const user = await getCurrentUser(request);
  if (!user) throw statusError("Authentication required.", 401);
  if (user.status !== "active") throw statusError("Account is not active.", 403);
  return user;
}

export async function requireRole(request: Request, allowedRoles: UserRole[]) {
  const user = await requireUser(request);
  if (!allowedRoles.includes(user.role)) throw statusError("Insufficient permissions.", 403);
  return user;
}

export async function requireAdmin(request: Request) {
  return requireRole(request, ["ADMIN", "SUPER_ADMIN"]);
}

export function authCookie(token: string, request: Request) {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  const maxAge = sessionDays * 24 * 60 * 60;
  return `${sessionCookieName}=${token}; Path=/; Max-Age=${maxAge}; HttpOnly; SameSite=Lax${secure}`;
}

export function clearAuthCookie() {
  return `${sessionCookieName}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`;
}

export function publicUser(user: AuthUser) {
  return user;
}

export function errorResponse(error: unknown) {
  const status = typeof error === "object" && error !== null && "status" in error ? Number(error.status) : 400;
  const message = error instanceof Error ? error.message : "Request failed.";
  return Response.json({ error: message }, { status: Number.isFinite(status) ? status : 400 });
}

async function getAuthDb() {
  if (!env.DB) throw statusError("Cloudflare D1 binding `DB` is required.", 500);
  await ensureAuthTables(env.DB);
  return env.DB;
}

async function ensureAuthTables(db: D1Database) {
  await db
    .prepare(
      `create table if not exists users (
        id text primary key not null,
        username text not null,
        email text not null,
        role text not null default 'PLAYER',
        region text,
        skill_level text,
        age_verified integer not null default 0,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();
  await db.prepare("create unique index if not exists users_username_lower_unique on users (lower(username))").run();
  await db.prepare("create unique index if not exists users_email_lower_unique on users (lower(email))").run();
  await addColumn(db, "users", "display_name text");
  await addColumn(db, "users", "password_hash text");
  await addColumn(db, "users", "country text");
  await addColumn(db, "users", "date_of_birth text");
  await addColumn(db, "users", "primary_game text");
  await addColumn(db, "users", "avatar_url text");
  await addColumn(db, "users", "banner_url text");
  await addColumn(db, "users", "bio text");
  await addColumn(db, "users", "status text not null default 'active'");
  await addColumn(db, "users", "last_seen_at text");

  await db
    .prepare(
      `create table if not exists sessions (
        id text primary key not null,
        user_id text not null references users(id),
        token_hash text not null unique,
        expires_at text not null,
        created_at text not null,
        ip_hash text,
        user_agent text
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists player_stats (
        id text primary key not null,
        user_id text not null references users(id),
        game text not null,
        matches_played integer not null default 0,
        wins integer not null default 0,
        losses integer not null default 0,
        draws integer not null default 0,
        kills integer not null default 0,
        deaths integer not null default 0,
        rating integer not null default 1000,
        xp integer not null default 0,
        level integer not null default 1,
        win_streak integer not null default 0,
        best_win_streak integer not null default 0,
        updated_at text not null
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists wallets (
        id text primary key not null,
        user_id text not null references users(id),
        currency text not null,
        available_balance integer not null default 0,
        locked_balance integer not null default 0,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();

  await db
    .prepare(
      `create table if not exists audit_logs (
        id text primary key not null,
        actor_user_id text references users(id),
        action text not null,
        entity_type text not null,
        entity_id text not null,
        metadata_json text,
        ip_address text,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();
}

async function addColumn(db: D1Database, table: string, columnSql: string) {
  try {
    await db.prepare(`alter table ${table} add column ${columnSql}`).run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.toLowerCase().includes("duplicate column name")) throw error;
  }
}

async function getUserById(db: D1Database, userId: string): Promise<AuthUser> {
  const row = await db
    .prepare(
      `select id, email, username, display_name, country, date_of_birth, primary_game,
        avatar_url, banner_url, bio, status, role, created_at, updated_at, last_seen_at
       from users where id = ? limit 1`,
    )
    .bind(userId)
    .first<Record<string, string | null>>();
  if (!row) throw statusError("User not found.", 404);
  return mapUser(row);
}

function mapUser(row: Record<string, string | null>): AuthUser {
  return {
    id: String(row.id),
    email: String(row.email),
    username: String(row.username),
    displayName: String(row.display_name ?? row.username),
    country: String(row.country ?? ""),
    dateOfBirth: String(row.date_of_birth ?? ""),
    primaryGame: String(row.primary_game ?? "codm"),
    avatarUrl: row.avatar_url,
    bannerUrl: row.banner_url,
    bio: row.bio,
    status: String(row.status ?? "active"),
    role: String(row.role ?? "PLAYER").toUpperCase() as UserRole,
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    lastSeenAt: row.last_seen_at,
  };
}

async function createSession(db: D1Database, userId: string, request: Request) {
  const token = randomHex(32);
  const now = new Date();
  const expires = new Date(now.getTime() + sessionDays * 24 * 60 * 60 * 1000).toISOString();
  await db
    .prepare(
      `insert into sessions (id, user_id, token_hash, expires_at, created_at, ip_hash, user_agent)
       values (?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(
      `ses_${crypto.randomUUID()}`,
      userId,
      await sha256Hex(token),
      expires,
      now.toISOString(),
      await sha256Hex(request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "local"),
      (request.headers.get("user-agent") ?? "").slice(0, 240),
    )
    .run();
  return { token, expiresAt: expires };
}

function parseRegisterPayload(input: unknown) {
  const body = objectInput(input);
  const username = stringField(body.username, "Username").trim();
  const displayName = stringField(body.displayName, "Display name").trim();
  const email = stringField(body.email, "Email").trim().toLowerCase();
  const password = stringField(body.password, "Password");
  const country = stringField(body.country, "Country").trim();
  const dateOfBirth = stringField(body.dateOfBirth, "Date of birth").trim();
  const primaryGame = stringField(body.primaryGame, "Primary game").trim();

  if (!/^[A-Za-z0-9_]{3,20}$/.test(username)) {
    throw statusError("Username must be 3-20 characters and use only letters, numbers and underscore.", 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw statusError("A valid email is required.", 400);
  if (password.length < 8) throw statusError("Password must be at least 8 characters.", 400);
  if (!dateOfBirth || Number.isNaN(Date.parse(dateOfBirth))) throw statusError("A valid date of birth is required.", 400);
  if (body.acceptedTerms !== true) throw statusError("Terms must be accepted.", 400);

  return { username, displayName, email, password, country, dateOfBirth, primaryGame };
}

function parseLoginPayload(input: unknown) {
  const body = objectInput(input);
  const identifier = stringField(body.identifier, "Email or username").trim();
  const password = stringField(body.password, "Password");
  return { identifier, password };
}

function objectInput(input: unknown): Record<string, unknown> {
  if (typeof input !== "object" || input === null) throw statusError("Request body must be an object.", 400);
  return input as Record<string, unknown>;
}

function stringField(value: unknown, label: string) {
  if (typeof value !== "string" || value.trim().length === 0) throw statusError(`${label} is required.`, 400);
  return value;
}

async function hashPassword(password: string) {
  const salt = randomHex(16);
  const bits = await pbkdf2(password, salt);
  return `pbkdf2_sha256$210000$${salt}$${bits}`;
}

async function verifyPassword(password: string, storedHash: string) {
  const [algorithm, iterations, salt, hash] = storedHash.split("$");
  if (algorithm !== "pbkdf2_sha256" || iterations !== "210000" || !salt || !hash) return false;
  return timingSafeEqual(await pbkdf2(password, salt), hash);
}

async function pbkdf2(password: string, saltHex: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: hexToBytes(saltHex), iterations: 210000 },
    key,
    256,
  );
  return bytesToHex(new Uint8Array(bits));
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return bytesToHex(new Uint8Array(digest));
}

function randomHex(length: number) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytesToHex(bytes);
}

function bytesToHex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let index = 0; index < bytes.length; index += 1) {
    bytes[index] = Number.parseInt(hex.slice(index * 2, index * 2 + 2), 16);
  }
  return bytes;
}

function timingSafeEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let index = 0; index < left.length; index += 1) diff |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return diff === 0;
}

function readSessionToken(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|; )${sessionCookieName}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function rateLimit(request: Request, key: string, limit: number, windowMs: number) {
  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for") ?? "local";
  const cacheKey = `${ip}:${key}`;
  const now = Date.now();
  const current = authRateLimit.get(cacheKey);
  if (!current || current.resetAt < now) {
    authRateLimit.set(cacheKey, { count: 1, resetAt: now + windowMs });
    return;
  }
  current.count += 1;
  if (current.count > limit) throw statusError("Too many attempts. Try again shortly.", 429);
}

function isAtLeastThirteen(dateOfBirth: string) {
  const birth = new Date(dateOfBirth);
  const thirteen = new Date();
  thirteen.setFullYear(thirteen.getFullYear() - 13);
  return birth <= thirteen;
}

async function writeAudit(
  db: D1Database,
  actorUserId: string,
  action: string,
  targetType: string,
  targetId: string,
  metadata: Record<string, unknown>,
) {
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into audit_logs (id, actor_user_id, action, entity_type, entity_id, metadata_json, created_at, updated_at)
       values (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .bind(`aud_${crypto.randomUUID()}`, actorUserId, action, targetType, targetId, JSON.stringify(metadata), now, now)
    .run();
}

function statusError(message: string, status: number) {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  return error;
}
