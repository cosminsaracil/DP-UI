import styles from "./page.module.css";
import Button from "@mui/material/Button";

// Home page

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Hello NEXT!</h1>
        <Button variant="contained">Click me</Button>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
