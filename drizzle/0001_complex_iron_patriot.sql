CREATE TABLE `audit_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`actor_user_id` text,
	`action` text NOT NULL,
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`metadata_json` text,
	`ip_address` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`actor_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `user_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`in_game_id` text,
	`favorite_game_id` text,
	`favorite_weapon` text,
	`favorite_map` text,
	`looking_for` text,
	`profile_image_url` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`favorite_game_id`) REFERENCES `games`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `wager_confirmations` (
	`id` text PRIMARY KEY NOT NULL,
	`agreement_version_id` text NOT NULL,
	`user_id` text NOT NULL,
	`stake_per_side` real NOT NULL,
	`total_prize_pool` real NOT NULL,
	`fee_percent` real NOT NULL,
	`fee_amount` real NOT NULL,
	`winner_payout` real NOT NULL,
	`currency` text NOT NULL,
	`confirmed_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`agreement_version_id`) REFERENCES `agreement_versions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
