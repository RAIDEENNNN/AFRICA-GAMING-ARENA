CREATE TABLE `arena_state_snapshots` (
	`id` text PRIMARY KEY NOT NULL,
	`state_json` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
