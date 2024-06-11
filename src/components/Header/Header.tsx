import Image from "next/image";
import HeaderItem from "./HeaderItem";

const Header = () => {
  return (
    <>
      <div className="flex justify-around items-center">
        <div className="flex justify-center items-center gap-2">
          <Image alt="logo" src={"/images/logo.png"} width={120} height={120} />
          <p className="text-md">Your HD Movies Collection</p>
        </div>
        <div className="flex">
          <HeaderItem caption="Home" path="/" />
        </div>
      </div>
    </>
  );
};

export default Header;
