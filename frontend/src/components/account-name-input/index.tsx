"use client";

import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { createUser } from "@/lib/client";
import { backendUrlAtom } from "@/store";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import styles from "./style.module.scss";

export function AccountNameInput() {
  const [backendUrl] = useAtom(backendUrlAtom);
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

      Cookies.set("user_id", user.id);

      toast(`Logged in with user: ${user.username}`);

      router.push("/todolist");
    } catch (err) {
      toast.error(`${err}`);
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
