import React from "react";

interface IinitialDarkModeState {
  darkmodeEnabled: boolean;
  setDarkmodeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialDarkModeState: IinitialDarkModeState = {
  darkmodeEnabled: false,
  setDarkmodeEnabled: () => {},
};

export const DarkmodeContext = React.createContext(initialDarkModeState);
