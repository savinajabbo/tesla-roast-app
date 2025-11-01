import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Tesla Roast AI",
  description: "A beautifully minimal, Tesla-styled roasting dashboard.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-tesla-bg text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}