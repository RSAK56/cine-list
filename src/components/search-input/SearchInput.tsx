import { Input } from "@nextui-org/react";

import { SearchIcon } from "../icons/search/SearchIcon";

const SearchInput = () => {
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
        type="search"
      />
    </>
  );
};

export default SearchInput;
