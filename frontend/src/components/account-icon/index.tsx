"use client";

import { redirect } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from "./style.module.scss";

export function AccountIcon() {
  const handleLogout = () => {
    redirect("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={styles.accountIcon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles.dropdownContent}>
        <DropdownMenuItem>
          <button
            className={styles.logoutLabel}
            type="button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
