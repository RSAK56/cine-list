"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

import { signOut, useSession } from "next-auth/react";

import ProfileDropdown from "../drop-downs/ProfileDropdown";

const AuthButtons = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const redirectToLoginHandler = () => {
    router.push("/api/auth/signin");
  };

  const handleSignOut = () => {
    signOut();
  };

  if (session) {
    const { user } = session;
    return <ProfileDropdown user={user} handleSignOut={handleSignOut} />;
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        size="sm"
        className="text-white bg-yellow-500"
        onClick={redirectToLoginHandler}
      >
        Login
      </Button>
    </div>
  );
};

export default AuthButtons;
