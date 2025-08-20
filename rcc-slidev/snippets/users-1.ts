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

export default users;

