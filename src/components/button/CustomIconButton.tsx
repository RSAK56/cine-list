import { Button } from "@nextui-org/react";

import { ICustomIconButton } from "@/common/interfaces/button.interface";

const CustomIconButton = ({
  color,
  variant,
  text,
  iconHeight,
  iconWidth,
  iconFillColor,
  buttonClassName,
  StartContentIcon,
  onClickHandler,
}: ICustomIconButton) => {
  return (
    <Button
      color={color}
      variant={variant}
      className={buttonClassName}
      startContent={
        <StartContentIcon
          height={iconHeight}
          width={iconWidth}
          fillColor={iconFillColor}
        />
      }
      onClick={onClickHandler}
    >
      {text}
    </Button>
  );
};

export default CustomIconButton;
