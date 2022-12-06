import style from "./App.module.scss";
import Country from "./Components/Country";

function App() {
  return (
    <div className={style.app}>
      <div className={style.header}>
        <h1>Where in the world?</h1>
        <div>Dark</div>
      </div>
      <Country />
    </div>
  );
}

export default App;
