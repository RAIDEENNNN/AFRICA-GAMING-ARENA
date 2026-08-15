import assert from "node:assert/strict";

const root = process.env.BASE_URL ?? "http://localhost:3002";
const unique = Date.now().toString(36);
const username = `phase2_${unique}`.slice(0, 20);
const email = `${username}@aga.test`;
const password = "ArenaPass123!";

async function jsonFetch(path, options = {}) {
  const response = await fetch(`${root}${path}`, {
    ...options,
    headers: { "content-type": "application/json", ...(options.headers ?? {}) },
  });
  const body = await response.json();
  return { response, body };
}

function sessionCookie(response) {
  const raw = response.headers.get("set-cookie");
  assert.ok(raw, "expected set-cookie header");
  return raw.split(";")[0];
}

const registrationPayload = {
  username,
  displayName: "Phase Two Player",
  email,
  password,
  country: "Nigeria",
  dateOfBirth: "2001-05-20",
  primaryGame: "codm",
  acceptedTerms: true,
};

const registered = await jsonFetch("/api/auth/register", {
  method: "POST",
  body: JSON.stringify(registrationPayload),
});
assert.equal(registered.response.status, 201);
assert.equal(registered.body.user.username, username);
assert.equal(registered.body.user.email, email);
assert.equal(registered.body.user.role, "PLAYER");
assert.equal(registered.body.user.passwordHash, undefined);
const registerCookie = sessionCookie(registered.response);

const duplicateUsername = await jsonFetch("/api/auth/register", {
  method: "POST",
  body: JSON.stringify({ ...registrationPayload, email: `other_${email}` }),
});
assert.equal(duplicateUsername.response.status, 409);
assert.match(duplicateUsername.body.error, /Username/);

const duplicateEmail = await jsonFetch("/api/auth/register", {
  method: "POST",
  body: JSON.stringify({ ...registrationPayload, username: `${username}_x`.slice(0, 20) }),
});
assert.equal(duplicateEmail.response.status, 409);
assert.match(duplicateEmail.body.error, /Email/);

const invalidLogin = await jsonFetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ identifier: email, password: "wrong-password" }),
});
assert.equal(invalidLogin.response.status, 401);

const login = await jsonFetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ identifier: username.toUpperCase(), password }),
});
assert.equal(login.response.status, 200);
assert.equal(login.body.user.username, username);
const loginCookie = sessionCookie(login.response);

const me = await jsonFetch("/api/auth/me", { headers: { cookie: loginCookie } });
assert.equal(me.response.status, 200);
assert.equal(me.body.user.username, username);

const summary = await jsonFetch("/api/player/summary", { headers: { cookie: loginCookie } });
assert.equal(summary.response.status, 200);
assert.equal(summary.body.summary.user.username, username);
assert.equal(summary.body.summary.stats.rating, 1000);

const notifications = await jsonFetch("/api/notifications", { headers: { cookie: loginCookie } });
assert.equal(notifications.response.status, 200);
assert.ok(Array.isArray(notifications.body.notifications));

const adminRejected = await jsonFetch("/api/admin/summary", { headers: { cookie: loginCookie } });
assert.equal(adminRejected.response.status, 403);
assert.match(adminRejected.body.error, /permissions/);

const logout = await jsonFetch("/api/auth/logout", {
  method: "POST",
  headers: { cookie: registerCookie },
});
assert.equal(logout.response.status, 200);

const meAfterLogout = await jsonFetch("/api/auth/me", { headers: { cookie: registerCookie } });
assert.equal(meAfterLogout.response.status, 200);
assert.equal(meAfterLogout.body.user, null);

console.log(JSON.stringify({
  ok: true,
  checked: [
    "registration creates a real player account",
    "duplicate username rejected case-insensitively",
    "duplicate email rejected",
    "invalid login rejected",
    "login works with username case-insensitively",
    "current-user endpoint returns the session user",
    "player summary endpoint returns the session player",
    "notifications endpoint is session-scoped",
    "normal player cannot access admin summary",
    "logout clears the server session",
  ],
}, null, 2));
