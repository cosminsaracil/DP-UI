// Layout component. Any changes in structure should be done here without breaking the component.
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Dp UI",
  description: "Interface for DP application",
};

//  ** Theme Import
import { ThemeProvider, createTheme, duration } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
