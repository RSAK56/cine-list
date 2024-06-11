import Link from "next/link";

import { IHeaderItemProps } from "@/common/interfaces/Header.interface";

const HeaderItem = (props: IHeaderItemProps) => {
  const { caption, path } = props;
  return (
    <>
      <Link className="hover:text-red-600" href={path || " "}>
        <p className="text-sm font-semibold">{caption}</p>
      </Link>
    </>
  );
};

export default HeaderItem;
