"use client";

import { useEffect, useState, useCallback } from "react";

import { useTheme } from "next-themes";

import { THEME } from "@/utils/constants";

import { DarkIcon } from "../icons/theme-icons/DarkIcon";
import { LightIcon } from "../icons/theme-icons/LightIcon";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? THEME.LIGHT : THEME.DARK);
  }, [theme, setTheme]);

  if (!mounted) return null;

  const Icon = theme === "dark" ? LightIcon : DarkIcon;

  return (
    <div className="flex justify-center items-center gap-2">
      <button onClick={toggleTheme}>
        <Icon
          fillColor={theme === "dark" ? "white" : "none"}
          width={24}
          height={24}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
