CREATE TABLE `tournament_organisations` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`parent_organisation_id` text,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `partner_tournaments` (
	`id` text PRIMARY KEY NOT NULL,
	`organisation_id` text NOT NULL,
	`partner_slug` text NOT NULL,
	`game_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`tournament_type` text NOT NULL,
	`game_mode` text NOT NULL,
	`team_size` text NOT NULL,
	`map_pool` text NOT NULL,
	`region` text NOT NULL,
	`server` text NOT NULL,
	`entry_type` text NOT NULL,
	`entry_fee` real DEFAULT 0 NOT NULL,
	`currency` text DEFAULT 'DEMO' NOT NULL,
	`prize_pool` text NOT NULL,
	`maximum_teams` integer NOT NULL,
	`registered_teams` integer DEFAULT 0 NOT NULL,
	`registration_open_at` text NOT NULL,
	`registration_close_at` text NOT NULL,
	`starts_at` text NOT NULL,
	`ends_at` text NOT NULL,
	`status` text NOT NULL,
	`rules` text NOT NULL,
	`banner_url` text,
	`thumbnail_url` text,
	`featured` integer DEFAULT false NOT NULL,
	`created_by` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`organisation_id`) REFERENCES `tournament_organisations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `tournament_registrations` (
	`id` text PRIMARY KEY NOT NULL,
	`tournament_id` text NOT NULL,
	`user_id` text NOT NULL,
	`clan_id` text,
	`registration_type` text NOT NULL,
	`roster_json` text NOT NULL,
	`game_uid` text NOT NULL,
	`status` text DEFAULT 'submitted' NOT NULL,
	`reviewed_by` text,
	`reviewed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`tournament_id`) REFERENCES `partner_tournaments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`clan_id`) REFERENCES `clans`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reviewed_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `organiser_permissions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`organisation_id` text NOT NULL,
	`role` text DEFAULT 'cma_organiser' NOT NULL,
	`permissions_json` text NOT NULL,
	`revoked_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`organisation_id`) REFERENCES `tournament_organisations`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `weekly_awards` (
	`id` text PRIMARY KEY NOT NULL,
	`organisation_id` text NOT NULL,
	`tournament_id` text,
	`award_type` text NOT NULL,
	`winner_user_id` text,
	`winner_clan_id` text,
	`metric_label` text NOT NULL,
	`metric_value` text NOT NULL,
	`selected_by` text NOT NULL,
	`published_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`organisation_id`) REFERENCES `tournament_organisations`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`tournament_id`) REFERENCES `partner_tournaments`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`winner_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`winner_clan_id`) REFERENCES `clans`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`selected_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
