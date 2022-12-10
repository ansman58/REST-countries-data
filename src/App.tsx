import React from "react";
import style from "./App.module.scss";
import Country from "./Components/Country";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Screens from "./Screens";
import { routes } from "./navigation";
import { CountryContext } from "./contexts";
import AllCountries from "./Components/AllCountries";

function App() {
  const [name, setName] = React.useState("");

  return (
    <div className={style.app}>
      <CountryContext.Provider value={{ name, setName }}>
        <BrowserRouter>
          <Routes>
            <Route path={routes.AllCountriesRoute} element={<Screens />}>
              <Route path="/all" element={<AllCountries />} />
              <Route
                path={routes.CountryRoute + "/:name"}
                element={<Country />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </CountryContext.Provider>
    </div>
  );
}

export default App;
