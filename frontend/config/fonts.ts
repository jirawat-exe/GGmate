import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import { Noto_Sans_Thai } from "next/font/google";


export const noto = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto"
});

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});
