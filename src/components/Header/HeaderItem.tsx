"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { IHeaderItemProps } from "@/common/interfaces/Header.interface";

const HeaderItem = (props: IHeaderItemProps) => {
  const { caption, path } = props;

  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <>
      <Link
        className={`${
          category === path ? "text-red-600" : " "
        } hover:text-red-600`}
        href={path === "/" ? path : `/?category=${path}` || " "}
      >
        <p className="text-sm font-semibold text-nowrap">{caption}</p>
      </Link>
    </>
  );
};

export default HeaderItem;
