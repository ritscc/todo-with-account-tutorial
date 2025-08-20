export type User = {
  id: string;
  name: string;
  description: string;
};

export type TodoItem = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type FetchUserRequest = {
  userId: string;
};

export type CreateUserRequest = {
  username: string;
};

export type UpdateUserRequest = {
  username: string;
  description: string;
};

export type FetchTodolistRequest = {
  userId: string | undefined;
};

export type CreateTodoItemRequest = {
  userId: string;
  title: string;
};

export type FetchTodoItemRequest = {
  todoId: string;
};

export type UpdateTodoItemRequest = {
  todoId: string;
  title: string;
  isCompleted: boolean;
};

export type DeleteTodoItemRequest = {
  todoId: string;
};
