"use client"; // 👈 Mark this as a Client Component
import styles from "./page.module.css";
import Button from "@mui/material/Button";

// ** Theme
import ThemeRegistry from "@/components/theme/ThemeProvider";

// Home page

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeRegistry>
          <h1>Hello NEXT!</h1>
          <Button variant="contained">Click me</Button>
        </ThemeRegistry>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
