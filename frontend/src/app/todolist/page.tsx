import { Todolist } from "@/components/todolist";
import { Card, CardContent } from "@/components/ui/card";
import styles from "./style.module.scss";

export default function TodoPage() {
  return (
    <main className={styles.todoPage}>
      <Card className={styles.card}>
        <CardContent>
          <Todolist />
        </CardContent>
      </Card>
    </main>
  );
}
