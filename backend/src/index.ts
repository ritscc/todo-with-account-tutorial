import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { cors } from "hono/cors";
import todos from "./todos.js";
import users from "./users.js";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*",
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/ping", (c) => {
  return c.text("pong!");
});

app.route("/users", users);
app.route("/todos", todos);

serve({
  fetch: app.fetch,
  port: 1234,
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`);
});
