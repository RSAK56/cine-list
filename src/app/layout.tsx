import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Providers from "./providers";
import Header from "@/components/header/Header";

import "./globals.css";
import { getSession } from "@/app/lib/session";

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
          {children}
        </Providers>
      </body>
    </html>
  );
}
