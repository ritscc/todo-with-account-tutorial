import { AccountNameInput } from "@/components/account-name-input";
import styles from "./style.module.scss";

export default function Home() {
  return (
    <main className={styles.homePage}>
      <AccountNameInput />
    </main>
  );
}
