"use client";

import Image from "next/image";

import { IErrorProps } from "@/common/interfaces/error.interface";

const ErrorComponent = ({ error, reset }: IErrorProps) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center flex-grow gap-4">
        <Image
          alt="something-went-wrong"
          src="/png/popcorn-slip.png"
          width={120}
          height={120}
        />
        <h1 className="text-4xl font-bold">Oops!</h1>
        <h2 className="text-2xl font-bold">Something went wrong!</h2>
        <p className="text-center w-40 text-lg">{error.message}</p>
        <div className="my-2">
          <button
            onClick={() => reset()}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
