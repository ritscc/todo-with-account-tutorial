"use client";

import { useAtom } from "jotai";
import Cookies from "js-cookie";
import type { ChangeEvent } from "react";
import { backendUrlAtom } from "@/store";
import { Input } from "../ui/input";
import styles from "./style.module.scss";

export function BackendUrlInput() {
  const [backendUrl, setBackendUrl] = useAtom(backendUrlAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newBackendUrl = e.currentTarget.value;
    setBackendUrl(newBackendUrl);
    Cookies.set("backend_url", newBackendUrl);
  };

  return (
    <Input
      className={styles.backendUrlInput}
      placeholder="Backend URL"
      onChange={handleChange}
      value={backendUrl}
    />
  );
}
