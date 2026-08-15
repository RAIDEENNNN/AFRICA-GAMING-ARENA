import { env } from "cloudflare:workers";

export async function ensureNotificationsTable() {
  await env.DB
    .prepare(
      `create table if not exists notifications (
        id text primary key not null,
        user_id text not null,
        body text not null,
        read_at text,
        created_at text not null,
        updated_at text not null
      )`,
    )
    .run();
  await addColumn("type text");
  await addColumn("title text");
  await addColumn("message text");
  await addColumn("link text");
}

async function addColumn(columnSql: string) {
  try {
    await env.DB.prepare(`alter table notifications add column ${columnSql}`).run();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.toLowerCase().includes("duplicate column name")) throw error;
  }
}
