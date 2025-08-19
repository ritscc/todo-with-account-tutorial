import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import todos from "./todos.js";
import users from "./users.js";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/users", users);
app.route("/todos", todos);

serve({
  fetch: app.fetch,
  port: 3000,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
