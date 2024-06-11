import Link from "next/link";

import { IHeaderItemProps } from "@/common/interfaces/Header.interface";

const HeaderItem = (props: IHeaderItemProps) => {
  const { caption, path } = props;
  return (
    <>
      <Link className="hover:text-red-800" href={path || " "}>
        <p className="text-md">{caption}</p>
      </Link>
    </>
  );
};

export default HeaderItem;
