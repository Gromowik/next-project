CREATE TABLE "quiz_flow_steps" (
	"id" text PRIMARY KEY NOT NULL,
	"flow_id" text NOT NULL,
	"position" integer NOT NULL,
	"question_id" text NOT NULL,
	"answer" text NOT NULL,
	"correct" boolean NOT NULL,
	"comment" text,
	"importance" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quiz_flows" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"sequence" integer NOT NULL,
	"score" integer DEFAULT 0 NOT NULL,
	"total" integer DEFAULT 0 NOT NULL,
	"importance" integer DEFAULT 0 NOT NULL,
	"finished_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "quiz_flow_steps" ADD CONSTRAINT "quiz_flow_steps_flow_id_quiz_flows_id_fk" FOREIGN KEY ("flow_id") REFERENCES "public"."quiz_flows"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quiz_flows" ADD CONSTRAINT "quiz_flows_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");