import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/libsql";
import { Hono } from "hono";
import { todosTable } from "./schema.js";

const db = drizzle(process.env.DB_FILE_NAME!);

const todos = new Hono();

export default todos;
