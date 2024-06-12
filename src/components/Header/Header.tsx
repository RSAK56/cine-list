import { Button } from "@nextui-org/react";

import Logo from "../logo/Logo";
import HeaderItem from "./HeaderItem";
import SearchInput from "../search-input/SearchInput";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import AuthButtons from "../auth-buttons/AuthButtons";

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center px-8 h-16">
        <Logo />
        <div className="flex justify-center items-center gap-4">
          <ThemeToggle />
          <SearchInput />
          <HeaderItem caption="Home" path="/" />
          <HeaderItem caption="Trending" path="trending" />
          <HeaderItem caption="Top Rated" path="top-rated" />
          <AuthButtons />
        </div>
      </div>
    </>
  );
};

export default Header;
