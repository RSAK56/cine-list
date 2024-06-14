"use client";

import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

import { IUser } from "@/common/interfaces/server-user.interface";

import ProfileDropdown from "../drop-down/ProfileDropdown";
import CustomBasicFilledButton from "./CustomBasicFilledButton";

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
    <CustomBasicFilledButton
      size="sm"
      buttonClassName="text-white bg-amber-500"
      onClickHandler={() => redirectTo("/api/auth/signin")}
      text="Login"
    />
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
      {session ? (
        <AuthenticatedButtons user={session?.user} />
      ) : (
        <LoginButton />
      )}
    </div>
  );
};

export default AuthButtons;
