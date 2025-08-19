import { AccountIcon } from "../account-icon";
import { BackendUrlInput } from "../backend-url-input";
import styles from "./style.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <a href="/">
        <p className={styles.logo}>TODOLIST</p>
      </a>
      <BackendUrlInput />
      <AccountIcon />
    </header>
  );
}
