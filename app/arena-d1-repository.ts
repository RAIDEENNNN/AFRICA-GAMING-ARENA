import { env } from "cloudflare:workers";
import { initialArenaState, type ArenaState } from "./arena-store";

const snapshotId = "local-demo-flow";

export async function loadArenaState(): Promise<ArenaState> {
  const db = requireD1();
  await ensureSnapshotTable(db);
  const row = await db
    .prepare("select state_json from arena_state_snapshots where id = ?")
    .bind(snapshotId)
    .first<{ state_json: string }>();

  if (!row) {
    await saveArenaState(structuredClone(initialArenaState));
    return structuredClone(initialArenaState);
  }

  return JSON.parse(row.state_json) as ArenaState;
}

export async function saveArenaState(state: ArenaState): Promise<void> {
  const db = requireD1();
  await ensureSnapshotTable(db);
  const now = new Date().toISOString();
  await db
    .prepare(
      `insert into arena_state_snapshots (id, state_json, created_at, updated_at)
       values (?, ?, ?, ?)
       on conflict(id) do update set state_json = excluded.state_json, updated_at = excluded.updated_at`,
    )
    .bind(snapshotId, JSON.stringify(state), now, now)
    .run();
}

export async function resetArenaStateFile(): Promise<ArenaState> {
  const state = structuredClone(initialArenaState);
  await saveArenaState(state);
  return state;
}

export function persistentStoreInfo() {
  return {
    provider: "cloudflare-d1",
    binding: "DB",
    snapshotTable: "arena_state_snapshots",
    productionReady: false,
  };
}

function requireD1() {
  if (!env.DB) {
    throw new Error("Cloudflare D1 binding `DB` is required. Configure `.openai/hosting.json` and Cloudflare database IDs before running the arena API.");
  }
  return env.DB;
}

async function ensureSnapshotTable(db: D1Database) {
  await db
    .prepare(
      `create table if not exists arena_state_snapshots (
        id text primary key not null,
        state_json text not null,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();
}
