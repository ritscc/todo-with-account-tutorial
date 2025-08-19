"use client";

import { useAtom } from "jotai";
import { backendUrlAtom } from "@/store";
import { Input } from "../ui/input";
import styles from "./style.module.scss";

export function BackendUrlInput() {
  const [backendUrl, setBackendUrl] = useAtom(backendUrlAtom);

  return (
    <Input
      className={styles.backendUrlInput}
      placeholder="Backend URL"
      onChange={(e) => setBackendUrl(e.currentTarget.value)}
      value={backendUrl}
    />
  );
}
