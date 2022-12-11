import { FaMoon } from "react-icons/fa";
import { DarkmodeContext } from "../contexts";
import style from "./Screens.module.scss";
import React from "react";
import clsx from "clsx";

interface IScreens {
  children: React.ReactNode;
}

const Screens: React.FC<IScreens> = ({ children }) => {
  const [darkmodeEnabled, setDarkmodeEnabled] = React.useState(false);

  const onToggleDarkMode = () => {
    setDarkmodeEnabled((prev) => !prev);
  };

  return (
    <DarkmodeContext.Provider value={{ darkmodeEnabled, setDarkmodeEnabled }}>
      <div
        className={clsx(style.app, {
          [style.darkmode]: darkmodeEnabled,
          [style.lightmode]: !darkmodeEnabled,
        })}
      >
        <div className={style.header}>
          <h1>Where in the world?</h1>
          <div className={style.darkmodeToggle} onClick={onToggleDarkMode}>
            <FaMoon
              color={
                darkmodeEnabled ? "hsl(0, 0%, 100%)" : "hsl(209, 23%, 22%)"
              }
            />
            <span>Dark</span>
          </div>
        </div>
        <div className={style.gap}></div>
        <div className={style.container}>{children}</div>
      </div>
    </DarkmodeContext.Provider>
  );
};

export default Screens;
