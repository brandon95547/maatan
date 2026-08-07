CREATE TABLE `entities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`kind` text NOT NULL,
	`topic` text NOT NULL,
	`title` text NOT NULL,
	`summary` text DEFAULT '' NOT NULL,
	`body` text DEFAULT '' NOT NULL,
	`start_year` integer,
	`end_year` integer,
	`date_note` text,
	`meta` text,
	`featured` integer DEFAULT false NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `entities_topic_idx` ON `entities` (`topic`);--> statement-breakpoint
CREATE INDEX `entities_kind_idx` ON `entities` (`kind`);--> statement-breakpoint
CREATE INDEX `entities_start_year_idx` ON `entities` (`start_year`);--> statement-breakpoint
CREATE UNIQUE INDEX `entities_slug_unique` ON `entities` (`slug`);--> statement-breakpoint
CREATE TABLE `relationships` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`from_id` integer NOT NULL,
	`to_id` integer NOT NULL,
	`type` text NOT NULL,
	`note` text,
	`weight` integer DEFAULT 0 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`from_id`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`to_id`) REFERENCES `entities`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `relationships_from_idx` ON `relationships` (`from_id`);--> statement-breakpoint
CREATE INDEX `relationships_to_idx` ON `relationships` (`to_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `relationships_unique` ON `relationships` (`from_id`,`to_id`,`type`);