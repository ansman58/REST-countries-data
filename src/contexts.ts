import React from "react";

interface ICountryContext {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
}

const initialState: ICountryContext = {
  name: "",
  setName: () => {},
};

export const CountryContext = React.createContext(initialState);
