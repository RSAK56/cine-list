"use client";

import { useState, KeyboardEvent, FormEvent } from "react";

import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";

import { SearchIcon } from "../icons/search/SearchIcon";

const SearchInput = () => {
  const router = useRouter();
  const [searchParam, setSearchParam] = useState<string>("");

  const searchInputHandler = (inputValue: string) => {
    setSearchParam(inputValue);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search/${searchParam}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(e as any); // We cast to `any` here because `handleSearch` expects a `FormEvent<HTMLFormElement>`
    }
  };

  return (
    <>
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
        onChange={(e) => searchInputHandler(e.target.value)}
        onKeyDown={handleKeyDown}
        type="search"
      />
    </>
  );
};

export default SearchInput;
