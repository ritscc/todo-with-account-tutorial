"use client";

import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import useSWRMutation from "swr/mutation";
import { createUser } from "@/lib/client";
import { backendUrlAtom, userAtom } from "@/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import styles from "./style.module.scss";

export function AccountNameInput() {
  const [backendUrl] = useAtom(backendUrlAtom);
  const [, setUser] = useAtom(userAtom);
  const router = useRouter();
  const { trigger: createUserTrigger } = useSWRMutation(backendUrl, createUser);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async () => {
    if (!inputRef.current) {
      return;
    }

    try {
      const user = await createUserTrigger({
        username: inputRef.current.value,
      });
      setUser(user);
      router.push("/todolist");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className={styles.accountNameInput}>
      <p>Account Name</p>
      <div className={styles.input}>
        <Input placeholder="Account Name" ref={inputRef} />
        <Button onClick={handleSubmit}>Go</Button>
      </div>
    </section>
  );
}
