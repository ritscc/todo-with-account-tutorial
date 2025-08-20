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

//#region get_from_id
users.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  
  const user = await db.select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .get();

  if (!user) {
    return c.json({ error: "User not found" }, 404);
  }
  
  return c.json(user);
});
//#endregion

users.post("/", async (c) => {
  const { username } = await c.req.json();
  
  // まず既存のユーザーをチェック
  const existingUser = await db.select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .get();
  
  // 既存のユーザーが存在する場合はそれを返す
  if (existingUser) {
    return c.json(existingUser);
  }
  
  // 存在しない場合は新しいユーザーを作成
  const newUser = await db.insert(usersTable)
    .values({ username })
    .returning()
    .get();
  return c.json(newUser);
});

//#region put
users.put("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const { description } = await c.req.json();
  
  // ユーザーが存在するかチェック
  const existingUser = await db.select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .get();
  
  if (!existingUser) {
    return c.json({ error: "User not found" }, 404);
  }
  
  // descriptionを更新
  const updatedUser = await db.update(usersTable)
    .set({ description })
    .where(eq(usersTable.id, id))
    .returning()
    .get();
    
  return c.json(updatedUser);
});
//#endregion

//#region delete
users.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  
  // ユーザーが存在するかチェック
  const existingUser = await db.select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .get();

  if (!existingUser) {
    return c.json({ error: "User not found" }, 404);
  }
  
  // ユーザーを削除
  await db.delete(usersTable).where(eq(usersTable.id, id));
  
  return c.json({ message: "User deleted successfully" });
});
//#endregion

export default users;

