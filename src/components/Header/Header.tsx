import Logo from "../logo/Logo";
import HeaderItem from "./HeaderItem";
import SearchInput from "../search-input/SearchInput";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import AuthButtons from "../auth-buttons/AuthButtons";
import { headerItems } from "@/utils/constants";

const Header = () => {
  return (
    <>
      <div className="flex justify-between items-center px-8 h-16">
        <Logo />
        <div className="flex justify-center items-center gap-4">
          <ThemeToggle />
          <SearchInput />
          {headerItems.map((item, index) => (
            <HeaderItem key={index} caption={item.caption} path={item.path} />
          ))}
          <AuthButtons />
        </div>
      </div>
    </>
  );
};

export default Header;
