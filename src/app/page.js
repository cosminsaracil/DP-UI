// "use client"; 

// export default function Home() {
  //   return (
    //     <div className={styles.page}>
    //       <ThemeRegistry>
    //         <main className={styles.main}>
    //           <h1>Hello NEXT!</h1>
    //           <Button variant="contained">Click me</Button>
    //         </main>
    //         <footer className={styles.footer}></footer>
    
    //       </ThemeRegistry>
    //     </div>
    //   );
    // }
    
    // src/app/page.js
'use client'
import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import styles from "./page.module.css";
// ** Theme
import ThemeRegistry from "@/components/theme/ThemeProvider";
    
export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/hello'); // ✅ This now works!
        console.log(response)
        const data = await response.json();
        setMessage(data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.page}>
           <ThemeRegistry>
             <main className={styles.main}>
      <h2>Welcome to the Home Page!</h2>
      <p>{message}</p>
      </main>
        <footer className={styles.footer}></footer>
    
     </ThemeRegistry>
     </div>
  );
}
