import style from "./App.module.scss";
import AllCountries from "./Components/AllCountries";
import { FaMoon } from "react-icons/fa";

function App() {
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
        {/* <Country /> */}
        <AllCountries />
      </div>
    </div>
  );
}

export default App;
