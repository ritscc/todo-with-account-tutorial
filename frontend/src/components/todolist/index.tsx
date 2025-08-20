"use client";

import { useAtom } from "jotai";
import { useRef } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { createTodoItem, fetchTodolist, updateTodoItem } from "@/lib/client";
import { backendUrlAtom } from "@/store";
import type { TodoItem } from "@/types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import styles from "./style.module.scss";
import { toast } from "sonner";

export function Todolist() {
  const [backendUrl] = useAtom(backendUrlAtom);

  const {
    data: todolist,
    error: fetchTodolistError,
    mutate,
  } = useSWR(backendUrl, fetchTodolist);

  if (fetchTodolistError) {
    throw Error(fetchTodolistError);
  }

  const { trigger: updateTodoItemTrigger } = useSWRMutation(
    backendUrl,
    updateTodoItem,
  );

  const { trigger: createTodoItemTrigger } = useSWRMutation(
    backendUrl,
    createTodoItem,
  );

  const createTodoItemRef = useRef<HTMLInputElement>(null);
  const displayTodolist = todolist ? [...todolist].reverse() : [];

  const handleCreateTodoItem = async () => {
    if (!createTodoItemRef.current || createTodoItemRef.current.value === "") {
      return;
    }

    try {
      await createTodoItemTrigger({
        title: createTodoItemRef.current.value,
      });
      mutate();
      createTodoItemRef.current.value = "";
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleToggleCheck = async (todoItem: TodoItem) => {
    try {
      await updateTodoItemTrigger({
        todoId: todoItem.id,
        title: todoItem.title,
        isCompleted: !todoItem.isCompleted,
      });
      mutate();
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  return (
    <div className={styles.todoContainer}>
      <section className={styles.createTodoItemContainer}>
        <Input className={styles.input} ref={createTodoItemRef} />
        <Button onClick={handleCreateTodoItem}>Create</Button>
      </section>

      <section className={styles.todoListContainer}>
        {displayTodolist.map((todoItem) => (
          <div className={styles.todoItem} key={todoItem.id}>
            <Checkbox
              checked={todoItem.isCompleted}
              onClick={() => handleToggleCheck(todoItem)}
            />
            <p data-done={todoItem.isCompleted}>{todoItem.title}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
