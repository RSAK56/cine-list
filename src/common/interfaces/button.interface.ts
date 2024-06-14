import { TButtonIconProps } from "../types/button.types";
// Custom basic filled button interface
export interface ICustomButtonFilled {
  text: string;
  size: "sm" | "md" | "lg" | undefined;
  buttonClassName: string;
  onClickHandler: () => void;
}

// Custom icon button interface
export interface ICustomIconButton {
  color:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined;
  variant:
    | "solid"
    | "bordered"
    | "light"
    | "flat"
    | "faded"
    | "shadow"
    | "ghost"
    | undefined;
  text: string;
  iconHeight: number;
  iconWidth: number;
  iconFillColor: string;
  buttonClassName: string;
  StartContentIcon: React.ComponentType<TButtonIconProps>;
  onClickHandler: () => void;
}
