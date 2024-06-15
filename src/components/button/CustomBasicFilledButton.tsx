import { Button } from "@nextui-org/react";

import { ICustomButtonFilled } from "@/common/interfaces/button.interface";

const CustomBasicFilledButton = ({
  text,
  size,
  buttonClassName,
  onClickHandler,
}: ICustomButtonFilled) => {
  return (
    <Button
      size={size}
      className={`${buttonClassName}`}
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
};

export default CustomBasicFilledButton;
