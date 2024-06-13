"use client";
import { useRouter } from "next/navigation";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { signOut, useSession } from "next-auth/react";

const LoginButton = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const redirectToLoginHandler = () => {
    router.push("/api/auth/signin");
  };

  if (session) {
    return (
      <>
        <div className="w-10 h-10 hover:cursor-pointer">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar isBordered color="danger" src="/png/auth-avatar.png" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{session?.user?.name}</p>
                <p className="font-semibold text-amber-400">
                  {session?.user?.email}
                </p>
              </DropdownItem>
              <DropdownItem key="analytics">WatchList</DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={() => signOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </>
    );
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

export default LoginButton;
