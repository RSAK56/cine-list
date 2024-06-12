import { Button } from "@nextui-org/react";
import React from "react";

const AuthButtons = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <Button size="sm" className="text-white bg-yellow-500">
        Login
      </Button>
      <div> | </div>
      <button className="text-sm hover:text-red-600">Register</button>
    </div>
  );
};

export default AuthButtons;
