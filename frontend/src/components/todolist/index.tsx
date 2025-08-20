"use client";

import { useAtom } from "jotai";
import { useRef } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { createTodoItem, fetchTodolist, updateTodoItem } from "@/lib/client";
import { backendUrlAtom, userAtom } from "@/store";
import type { TodoItem } from "@/types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import styles from "./style.module.scss";

export function Todolist() {
  const [backendUrl] = useAtom(backendUrlAtom);
  const [user] = useAtom(userAtom);

  const { data: todolist, mutate } = useSWR(
    user?.id ? [backendUrl, user.id] : null,
    ([endpoint, userId]) => fetchTodolist(endpoint, { arg: { userId } }),
  );

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
    if (!user) {
      throw Error("Please login");
    }

    if (!createTodoItemRef.current || createTodoItemRef.current.value === "") {
      return;
    }

    try {
      await createTodoItemTrigger({
        userId: user.id,
        title: createTodoItemRef.current.value,
      });
      mutate();
      createTodoItemRef.current.value = "";
    } catch (err) {
      console.error(err);
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
      console.error(err);
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
