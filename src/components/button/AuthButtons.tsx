"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { Button } from "@nextui-org/react";

import { IUser } from "@/common/interfaces/User.interface";

import ProfileDropdown from "../drop-down/ProfileDropdown";

const AuthButtons = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const redirectTo = (path: string) => {
    router.push(path);
  };

  const handleSignOut = () => {
    signOut();
  };

  const LoginButton = () => (
    <Button
      size="sm"
      className="text-white bg-yellow-500"
      onClick={() => redirectTo("/api/auth/signin")}
    >
      Login
    </Button>
  );

  const AuthenticatedButtons = ({ user }: { user: IUser | undefined }) => (
    <ProfileDropdown
      user={user}
      handleSignOut={handleSignOut}
      redirectToWatchList={() => redirectTo("/watchlist")}
    />
  );

  return (
    <div className="flex justify-center items-center gap-2">
      {session ? <AuthenticatedButtons user={session.user} /> : <LoginButton />}
    </div>
  );
};

export default AuthButtons;
