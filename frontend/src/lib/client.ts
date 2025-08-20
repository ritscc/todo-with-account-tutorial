import Cookies from "js-cookie";
import type {
  CreateTodoItemRequest,
  CreateUserRequest,
  DeleteTodoItemRequest,
  FetchTodoItemRequest,
  TodoItem,
  UpdateTodoItemRequest,
  UpdateUserRequest,
  User,
} from "@/types";

export const fetchAllUsers = async (endpoint: string): Promise<User[]> => {
  const data = fetch(`${endpoint}/users`, { method: "GET" }).then((r) =>
    r.json(),
  );
  return data;
};

export const fetchUser = async (endpoint: string): Promise<User> => {
  const userId = Cookies.get("user_id");
  Cookies.get("user_id");

  if (!userId) {
    throw Error("Please login");
  }

  return fetch(`${endpoint}/users/${userId}`, {
    method: "GET",
  }).then((r) => r.json());
};

export const createUser = async (
  endpoint: string,
  { arg }: { arg: CreateUserRequest },
): Promise<User> => {
  return fetch(`${endpoint}/users`, {
    method: "POST",
    body: JSON.stringify({ username: arg.username }),
  }).then((r) => r.json());
};

export const updateUser = async (
  endpoint: string,
  { arg }: { arg: UpdateUserRequest },
): Promise<User> => {
  const userId = Cookies.get("user_id");

  if (!userId) {
    throw Error("Please login");
  }

  return fetch(`${endpoint}/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      username: arg.username,
      description: arg.description,
    }),
  }).then((r) => r.json());
};

export const deleteUser = async (endpoint: string): Promise<void> => {
  const userId = Cookies.get("user_id");

  if (!userId) {
    throw Error("Please login");
  }

  return fetch(`${endpoint}/users/${userId}`, {
    method: "DELETE",
  }).then((r) => r.json());
};

export const fetchTodolist = async (endpoint: string): Promise<TodoItem[]> => {
  const userId = Cookies.get("user_id");
  return fetch(`${endpoint}/todos?userId=${userId}`, {
    method: "GET",
  }).then((r) => r.json());
};

export const createTodoItem = async (
  endpoint: string,
  { arg }: { arg: CreateTodoItemRequest },
): Promise<TodoItem> => {
  const userId = Cookies.get("user_id");

  if (!userId) {
    throw Error("Please login");
  }

  return fetch(`${endpoint}/todos`, {
    method: "POST",
    body: JSON.stringify({
      userId,
      title: arg.title,
    }),
  }).then((r) => r.json());
};

export const fetchTodoItem = async (
  endpoint: string,
  { arg }: { arg: FetchTodoItemRequest },
): Promise<TodoItem> => {
  return fetch(`${endpoint}/todos/${arg.todoId}`, {
    method: "GET",
  }).then((r) => r.json());
};

export const updateTodoItem = async (
  endpoint: string,
  { arg }: { arg: UpdateTodoItemRequest },
): Promise<TodoItem> => {
  return fetch(`${endpoint}/todos/${arg.todoId}`, {
    method: "PUT",
    body: JSON.stringify({ title: arg.title, completed: arg.completed }),
  }).then((r) => r.json());
};

export const deleteTodoItem = async (
  endpoint: string,
  { arg }: { arg: DeleteTodoItemRequest },
): Promise<void> => {
  return fetch(`${endpoint}/todos/${arg.todoId}`, {
    method: "DELETE",
  }).then((r) => r.json());
};
