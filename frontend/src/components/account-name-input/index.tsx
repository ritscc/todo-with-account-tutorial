"use client";

import { useAtom } from "jotai";
import { redirect } from "next/navigation";
import { backendUrlAtom } from "@/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import styles from "./style.module.scss";

export function AccountNameInput() {
  const [_backendUrl] = useAtom(backendUrlAtom);

  const handleSubmit = () => {
    redirect("/todolist");
  };

  return (
    <section className={styles.accountNameInput}>
      <p>Account Name</p>
      <div className={styles.input}>
        <Input placeholder="Account Name" />
        <Button onClick={handleSubmit}>Go</Button>
      </div>
    </section>
  );
}
