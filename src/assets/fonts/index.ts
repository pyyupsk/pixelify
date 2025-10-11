import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

export const sans = localFont({
  src: [
    {
      path: "./departure-mono/regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sans",
  display: "swap",
});

export const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});
