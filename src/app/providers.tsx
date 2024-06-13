"use client";

import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";

import { Session as NextAuthSession } from "next-auth";

import { ThemeProvider as NextThemesProvider } from "next-themes";

interface IProvidersProps {
  children: React.ReactNode;
  session: NextAuthSession | null;
}

export default async function Providers({
  children,
  session,
}: IProvidersProps) {
  return (
    <SessionProvider session={session}>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="light"
          themes={["light", "dark", "modern"]}
        >
          {children}
        </NextThemesProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
