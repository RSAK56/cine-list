import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Image alt="logo" src="/png/logo.png" width={120} height={120} />
      <p className="text-lg font-thin">Your HD Movies Collection</p>
    </div>
  );
};

export default Logo;
