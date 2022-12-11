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

// interface IDarkmodeContextProvider {
//   children: React.ReactNode;
// }

// export const DarkmodeContextProvider: React.FC<IDarkmodeContextProvider> = ({
//   children,
// }) => {
//   const [darkmodeEnabled, setDarkmodeEnabled] = React.useState(false);
  
//   return (
//     <DarkmodeContext.Provider value={{ darkmodeEnabled, setDarkmodeEnabled }}>
//       {children}
//     </DarkmodeContext.Provider>
//   );
// };
