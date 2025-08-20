"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import styles from "./style.module.scss";

export function AccountIcon() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove("user_id");
    setIsOpen(false);
    redirect("/");
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <div className={styles.accountIcon} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={styles.dropdownContent}>
        <DropdownMenuItem asChild>
          <Link href="/profile-settings">Profile</Link>
        </DropdownMenuItem>

        <DropdownMenuItem className={styles.logoutLabel} onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
