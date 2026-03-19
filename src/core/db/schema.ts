import { boolean, integer, pgTable, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    passwordHash: text("password_hash").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    usersEmailIdx: uniqueIndex("users_email_idx").on(table.email),
  }),
);

export const quizFlows = pgTable("quiz_flows", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  sequence: integer("sequence").notNull(),
  score: integer("score").notNull().default(0),
  total: integer("total").notNull().default(0),
  importance: integer("importance").notNull().default(0),
  finishedAt: timestamp("finished_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const quizFlowSteps = pgTable("quiz_flow_steps", {
  id: text("id").primaryKey(),
  flowId: text("flow_id")
    .notNull()
    .references(() => quizFlows.id, { onDelete: "cascade" }),
  position: integer("position").notNull(),
  questionId: text("question_id").notNull(),
  answer: text("answer").notNull(),
  correct: boolean("correct").notNull(),
  comment: text("comment"),
  importance: integer("importance").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
