import React from "react";
import clsx from "clsx";
import { useTheme } from "../context/ThemeContext";

const Home: React.FC = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={clsx("app-container", {
        "dark-theme": isDarkMode,
        "light-theme": !isDarkMode,
      })}
    >
      <div>HI</div>
    </div>
  );
};

export default Home;
