import React from "react";
import style from "./App.module.scss";
import Country from "./Components/Country";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Screens from "./Screens";
import { routes } from "./navigation";
import AllCountries from "./Components/AllCountries";

function App() {
  return (
    <div className={style.app}>
      <BrowserRouter>
        <Routes>
          <Route
            path={routes.AllCountriesRoute}
            element={
              <Screens>
                <AllCountries />
              </Screens>
            }
          />
          <Route
            path={routes.CountryRoute + "/:name"}
            element={
              <Screens>
                <Country />
              </Screens>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
