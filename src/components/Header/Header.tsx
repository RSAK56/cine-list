import Logo from "../logo/Logo";
import HeaderItem from "./HeaderItem";
import SearchInput from "../search-input/SearchInput";
import ThemeToggle from "../theme-toggle/ThemeToggle";
import AuthButtons from "../auth-buttons/AuthButtons";
import { headerItems } from "@/utils/constants";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-cente border-b-2 border-b-red-800 px-4 md:px-8 h-16 md:h-16">
      <div className="flex justify-between w-full md:w-auto items-center sm:mb-4 md:mb-0">
        <Logo />
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full md:w-auto">
        <ThemeToggle />
        <SearchInput />
        <div className="flex flex-col md:flex-row gap-4">
          {headerItems.map((item, index) => (
            <HeaderItem key={index} caption={item.caption} path={item.path} />
          ))}
        </div>

        <AuthButtons />
      </div>
    </div>
  );
};

export default Header;
