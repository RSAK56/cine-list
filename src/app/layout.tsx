import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "react-hot-toast";

import { getSession } from "@/app/lib/session";

import Header from "@/components/header/Header";

import Providers from "./providers";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinelist",
  description: "A custom watchlist creator app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers session={session}>
          <Header />
          <Toaster position="bottom-right" />
          {children}
        </Providers>
      </body>
    </html>
  );
}
