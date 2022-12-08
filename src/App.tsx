import style from "./App.module.scss";
import AllCountries from "./Components/AllCountries";
import Country from "./Components/Country";
import MoonIcon from "./assets/moon.svg";

function App() {
  return (
    <div className={style.app}>
      <div className={style.header}>
        <h1>Where in the world?</h1>
        <div className={style.darkmode}>
          <img src={MoonIcon} alt="" />
          <span>Dark</span>
        </div>
      </div>
      <div className={style.gap}></div>
      <div className={style.container}>
        {/* <Country /> */}
        <AllCountries />
      </div>
    </div>
  );
}

export default App;
