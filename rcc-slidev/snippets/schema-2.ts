import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const usersTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  description: text().notNull().default(""),
});

export const todosTable = sqliteTable("todos", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull().references(() => usersTable.id, { onDelete: "cascade" }),
  title: text().notNull(),
  completed: int({ "mode": "boolean" }).default(false).notNull(),
});
