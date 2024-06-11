import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";
import Header from "@/components/Header/Header";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinelist",
  description: "A custom watchlist creator app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
        </Providers>
        {children}
      </body>
    </html>
  );
}
