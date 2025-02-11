import SignIn from "@/components/sing-in";
import styles from "./page.module.css";

export default function Top() {
  return (
    <div className={styles.page}>
      <SignIn/>
    </div>
  );
}
