import type {
  CreateTodoItemRequest,
  CreateUserRequest,
  DeleteTodoItemRequest,
  FetchTodoItemRequest,
  FetchTodolistRequest,
  FetchUserRequest,
  TodoItem,
  UpdateTodoItemRequest,
  UpdateUserRequest,
  User,
} from "@/types";

export const fetchAllUser = async (endpoint: string): Promise<User[]> => {
  const data = fetch(`${endpoint}/users`, { method: "GET" }).then((r) =>
    r.json(),
  );
  return data;
};

export const fetchUser = async (
  endpoint: string,
  { arg }: { arg: FetchUserRequest },
): Promise<User> => {
  const data = fetch(`${endpoint}/users/${arg.userId}`, { method: "GET" }).then(
    (r) => r.json(),
  );
  return data;
};

export const createUser = async (
  endpoint: string,
  { arg }: { arg: CreateUserRequest },
): Promise<User> => {
  const data = fetch(`${endpoint}/users`, {
    method: "POST",
    body: JSON.stringify({ username: arg.username }),
  }).then((r) => r.json());
  return data;
};

export const updateUser = async (
  endpoint: string,
  { arg }: { arg: UpdateUserRequest },
): Promise<User> => {
  const data = fetch(`${endpoint}/users`, {
    method: "PUT",
    body: JSON.stringify({
      username: arg.username,
      description: arg.description,
    }),
  }).then((r) => r.json());
  return data;
};

export const fetchTodolist = async (
  endpoint: string,
  { arg }: { arg: FetchTodolistRequest },
): Promise<TodoItem[]> => {
  const data = fetch(`${endpoint}/todos?userId=${arg.userId}`, {
    method: "GET",
  }).then((r) => r.json());
  return data;
};

export const createTodoItem = async (
  endpoint: string,
  { arg }: { arg: CreateTodoItemRequest },
): Promise<TodoItem> => {
  const data = fetch(`${endpoint}/todos`, {
    method: "POST",
    body: JSON.stringify({
      userId: arg.userId,
      title: arg.title,
    }),
  }).then((r) => r.json());
  return data;
};

export const fetchTodoItem = async (
  endpoint: string,
  { arg }: { arg: FetchTodoItemRequest },
): Promise<TodoItem> => {
  const data = fetch(`${endpoint}/todos/${arg.todoId}`, {
    method: "GET",
  }).then((r) => r.json());
  return data;
};

export const updateTodoItem = async (
  endpoint: string,
  { arg }: { arg: UpdateTodoItemRequest },
): Promise<TodoItem> => {
  const data = fetch(`${endpoint}/todos/${arg.todoId}`, {
    method: "PUT",
    body: JSON.stringify({ title: arg.title, isCompleted: arg.isCompleted }),
  }).then((r) => r.json());
  return data;
};

export const deleteTodoItem = async (
  endpoint: string,
  { arg }: { arg: DeleteTodoItemRequest },
): Promise<void> => {
  const data = fetch(`${endpoint}/todos/${arg.todoId}`, {
    method: "DELETE",
  }).then((r) => r.json());
  return data;
};
