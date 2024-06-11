import Image from "next/image";
import { Button, Input } from "@nextui-org/react";

import HeaderItem from "./HeaderItem";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import { SearchIcon } from "../icons/search/SearchIcon";

const Header = () => {
  return (
    <>
      <div className="flex justify-around items-center">
        <div className="flex justify-center items-center gap-2">
          <Image alt="logo" src={"/png/logo.png"} width={120} height={120} />
          <p className="text-lg font-thin">Your HD Movies Collection</p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <ThemeToggle />
          <Input
            classNames={{
              base: "max-w-full sm:max-w-[10rem] md:max-w-[20rem] h-10",
              mainWrapper: "h-full",
              input: "text-small",
              inputWrapper:
                "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
            }}
            placeholder="Type to search..."
            size="sm"
            startContent={
              <SearchIcon size={18} strokeWidth={1.5} width={14} height={14} />
            }
            type="search"
          />
          <HeaderItem caption="Home" path="/" />
          <div className="flex justify-center items-center gap-2">
            <Button size="sm" className="text-white bg-yellow-500">
              Login
            </Button>
            <div> | </div>
            <button className="text-sm hover:text-red-600">Register</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
