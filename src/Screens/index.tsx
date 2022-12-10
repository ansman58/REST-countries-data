import { FaMoon } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import style from "./Screens.module.scss";

const Screens = () => {
  return (
    <div className={style.app}>
      <div className={style.header}>
        <h1>Where in the world?</h1>
        <div className={style.darkmode}>
          <FaMoon />
          <span>Dark</span>
        </div>
      </div>
      <div className={style.gap}></div>
      <div className={style.container}>
        <Outlet />
      </div>
    </div>
  );
};

export default Screens;
