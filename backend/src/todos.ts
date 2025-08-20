import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { Hono } from "hono";
import { todosTable } from "./schema.js";

const db = drizzle(process.env.DB_FILE_NAME!);

const todos = new Hono();

//#region get
todos.get("/", async (c) => {
  const userId = c.req.query("userId");
  
  if (userId) {
    // userIdが指定されている場合、そのユーザーのtodosのみ返却
    const userTodos = await db.select()
      .from(todosTable)
      .where(eq(todosTable.userId, parseInt(userId)));

    return c.json(userTodos);
  } else {
    // userIdが指定されていない場合、すべてのtodosを返却
    const allTodos = await db.select().from(todosTable);
    return c.json(allTodos);
  }
});

todos.get("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  
  const todo = await db.select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get();
  
  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  
  return c.json(todo);
});
//#endregion

//#region post
todos.post("/", async (c) => {
  const { userId, title } = await c.req.json();
  
  const newTodo = await db.insert(todosTable)
    .values({ 
      userId: parseInt(userId), 
      title
    })
    .returning()
    .get();

  return c.json(newTodo);
});
//#endregion

//#region put
todos.put("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const { title, completed } = await c.req.json();
  
  // todoが存在するかチェック
  const existingTodo = await db.select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get();
  
  if (!existingTodo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  
  // todoを更新
  const updatedTodo = await db.update(todosTable)
    .set({ title, completed})
    .where(eq(todosTable.id, id))
    .returning()
    .get();
    
  return c.json(updatedTodo);
});
//#endregion

//#region delete
todos.delete("/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  
  // todoが存在するかチェック
  const existingTodo = await db.select()
    .from(todosTable)
    .where(eq(todosTable.id, id))
    .get();

  if (!existingTodo) {
    return c.json({ error: "Todo not found" }, 404);
  }
  
  // todoを削除
  await db.delete(todosTable).where(eq(todosTable.id, id));
  
  return c.json({ message: "Todo deleted successfully" });
});
//#endregion

export default todos;