"use client";

import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { User } from "lucide-react";
import useSWR from "swr";
import { fetchAllUsers } from "@/lib/client";
import { backendUrlAtom } from "@/store";
import { Card, CardContent, CardTitle } from "../ui/card";
import styles from "./style.module.scss";

export function AccountList() {
  const [backendUrl] = useAtom(backendUrlAtom);

  const { data: users } = useSWR(backendUrl, fetchAllUsers);
  const currentUserId = Cookies.get("user_id");

  return (
    <Card className={styles.accountList}>
      <CardContent>
        <CardTitle className={styles.titleContainer}>Available Users</CardTitle>
        <div className={styles.list}>
          {users?.map((user) => {
            const isMe = String(user.id) === currentUserId;
            return (
              <div key={user.id} className={styles.item} data-me={isMe}>
                <User className={styles.icon} />
                <div>
                  {user.username} {isMe && "(logined)"}
                </div>
              </div>
            );
          })}
        </div>
        {users?.length === 0 && (
          <p className={styles.noUserMessage}> No users</p>
        )}
      </CardContent>
    </Card>
  );
}
