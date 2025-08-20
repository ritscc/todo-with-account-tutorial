import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { Hono } from "hono";
import { usersTable } from "./schema.js";

const db = drizzle(process.env.DB_FILE_NAME!);

const users = new Hono();

users.get("/", async (c) => {
  const users = await db.select().from(usersTable);
  return c.json(users);
});

users.post("/", async (c) => {
  const { username } = await c.req.json();
  const user = await db.select().from(usersTable).where(eq(usersTable.username, username));

  if (user.length === 0) {
    const newUser = await db.insert(usersTable).values({ username }).returning();
    return c.json(newUser[0]);
  }

  return c.json(user[0]);
});

users.get("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await db.select().from(usersTable).where(eq(usersTable.id, Number(id)));

  if (user.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json(user[0]);
});

users.put("/:id", async (c) => {
  const { id } = c.req.param();
  const { username, description } = await c.req.json();
  const user = await db.update(usersTable).set({ username, description }).where(eq(usersTable.id, Number(id)))
    .returning();

  if (user.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json(user[0]);
});

users.delete("/:id", async (c) => {
  const { id } = c.req.param();
  const user = await db.delete(usersTable).where(eq(usersTable.id, Number(id))).returning();

  if (user.length === 0) {
    return c.json({ error: "User not found" }, 404);
  }

  return c.json({ message: "User deleted successfully" });
});

export default users;
