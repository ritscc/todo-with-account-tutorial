import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { Hono } from "hono";
import { todosTable } from "./schema.js";

const db = drizzle(process.env.DB_FILE_NAME!);

const todos = new Hono();

todos.get("/", async (c) => {
  const userId = c.req.query("userId");
  if (!userId) {
    const todos = await db.select().from(todosTable);
    return c.json(todos);
  }

  const todos = await db.select().from(todosTable).where(eq(todosTable.userId, Number(userId)));
  return c.json(todos);
});

todos.post("/", async (c) => {
  const { userId, title } = await c.req.json();
  const todo = await db.insert(todosTable).values({ userId, title }).returning();
  return c.json(todo[0]);
});

todos.get("/:id", async (c) => {
  const { id } = c.req.param();
  const todo = await db.select().from(todosTable).where(eq(todosTable.id, Number(id)));

  if (todo.length === 0) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo[0]);
});

todos.put("/:id", async (c) => {
  const { id } = c.req.param();
  const { title, isCompleted } = await c.req.json();
  const todo = await db.update(todosTable).set({ title, isCompleted }).where(eq(todosTable.id, Number(id)))
    .returning();

  if (todo.length === 0) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo[0]);
});

todos.delete("/:id", async (c) => {
  const { id } = c.req.param();
  await db.delete(todosTable).where(eq(todosTable.id, Number(id)));

  return c.json({ message: "Todo deleted" });
});

export default todos;
