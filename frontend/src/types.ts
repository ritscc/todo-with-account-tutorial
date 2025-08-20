export type User = {
  id: number;
  username: string;
  description: string;
};

export type TodoItem = {
  id: number;
  title: string;
  isCompleted: boolean;
};

export type CreateUserRequest = {
  username: string;
};

export type UpdateUserRequest = {
  username: string;
  description: string;
};

export type CreateTodoItemRequest = {
  title: string;
};

export type FetchTodoItemRequest = {
  todoId: number;
};

export type UpdateTodoItemRequest = {
  todoId: number;
  title: string;
  isCompleted: boolean;
};

export type DeleteTodoItemRequest = {
  todoId: number;
};
