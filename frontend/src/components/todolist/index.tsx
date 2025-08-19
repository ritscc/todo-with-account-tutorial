"use client";

import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import styles from "./style.module.scss";

interface TodoItem {
  id: number;
  title: string;
  isDone: boolean;
}

export function Todolist() {
  const [todolist, setTodolist] = useState<TodoItem[]>([
    { id: 0, title: "sample 1", isDone: false },
    { id: 1, title: "sample 222", isDone: false },
    { id: 2, title: "sample 33333", isDone: true },
  ]);

  const handleClickCheck = (id: number) => {
    const newTodolist = [...todolist];
    const target = newTodolist.find((i) => i.id === id);
    if (target) {
      target.isDone = !target.isDone;
      setTodolist(newTodolist);
    }
  };

  return (
    <div className={styles.todoList}>
      {todolist.map((todoItem) => (
        <div className={styles.todoItem} key={todoItem.id}>
          <Checkbox
            checked={todoItem.isDone}
            onClick={() => handleClickCheck(todoItem.id)}
          />
          <p data-done={todoItem.isDone}>{todoItem.title}</p>
        </div>
      ))}
    </div>
  );
}
