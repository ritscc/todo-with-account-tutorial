export type User = {
  id: string;
  username: string;
  description: string;
};

export type TodoItem = {
  id: string;
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
