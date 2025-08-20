"use client";

import { useAtom } from "jotai";
import { useRef } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  createTodoItem,
  deleteTodoItem,
  fetchTodolist,
  updateTodoItem,
} from "@/lib/client";
import { backendUrlAtom } from "@/store";
import type { TodoItem } from "@/types";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import styles from "./style.module.scss";
import { Trash } from "lucide-react";

export function Todolist() {
  const [backendUrl] = useAtom(backendUrlAtom);

  const { data: todolist, error: fetchTodolistError } = useSWR(
    backendUrl,
    fetchTodolist,
  );

  const { trigger: updateTodoItemTrigger } = useSWRMutation(
    backendUrl,
    updateTodoItem,
  );

  const { trigger: createTodoItemTrigger } = useSWRMutation(
    backendUrl,
    createTodoItem,
  );

  const { trigger: deleteTodoItemTrigger } = useSWRMutation(
    backendUrl,
    deleteTodoItem,
  );

  const createTodoItemRef = useRef<HTMLInputElement>(null);
  const displayTodolist = todolist ? [...todolist].reverse() : [];

  if (fetchTodolistError) {
    toast.error(fetchTodolistError);
    return null;
  }

  const handleCreateTodoItem = async () => {
    if (!createTodoItemRef.current || createTodoItemRef.current.value === "") {
      return;
    }

    try {
      await createTodoItemTrigger({
        title: createTodoItemRef.current.value,
      });
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
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleDelete = (id: string) => {
    deleteTodoItemTrigger({ todoId: id });
  };

  return (
    <div className={styles.todoContainer}>
      <section className={styles.createTodoItemContainer}>
        <Input
          className={styles.input}
          ref={createTodoItemRef}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreateTodoItem();
            }
          }}
        />
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
            <Button
              className={styles.deleteButton}
              variant="ghost"
              onClick={() => handleDelete(todoItem.id)}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}
