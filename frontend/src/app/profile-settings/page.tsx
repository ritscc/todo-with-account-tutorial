"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import Cookies from "js-cookie";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { deleteUser, fetchUser, updateUser } from "@/lib/client";
import { backendUrlAtom } from "@/store";
import styles from "./style.module.scss";

const formSchema = z.object({
  username: z.string(),
  description: z.string(),
});

export default function ProfileSettingsPage() {
  const router = useRouter();
  const [backendUrl] = useAtom(backendUrlAtom);

  const { trigger: fetchUserTrigger } = useSWRMutation(backendUrl, fetchUser);
  const { trigger: deleteUserTrigger } = useSWRMutation(backendUrl, deleteUser);
  const { trigger: updateUserTrigger, isMutating } = useSWRMutation(
    backendUrl,
    updateUser,
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      description: "",
    },
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await fetchUserTrigger();
        form.reset({
          username: user.username,
          description: user.description,
        });
      } catch (err) {
        toast.error(`${err}`);
      }
    };
    loadUser();
  }, [fetchUserTrigger, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    updateUserTrigger({
      username: values.username,
      description: values.description,
    });

    try {
      const user = await fetchUserTrigger();
      form.reset({
        username: user.username,
        description: user.description,
      });

      toast("Updated user information successfly");

      router.push("/todolist");
    } catch (err) {
      toast.error(`${err}`);
    }
  };

  const handleDeleteUser = () => {
    deleteUserTrigger();
    Cookies.remove("user_id");
    toast("Deleted user successfly");
    redirect("/");
  };

  return (
    <main className={styles.profileSettingsPage}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="hello" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isMutating}>
            Submit
          </Button>
        </form>
      </Form>
      <Button variant="destructive" onClick={handleDeleteUser}>
        Delete User
      </Button>
    </main>
  );
}
