import React from "react";
import { IWorldSettings } from "../types/IWorldSettings";

export const ThemeContext = React.createContext<IWorldSettings>({} as any);

export const WithTheme = (
  settings: IWorldSettings,
  template: React.ReactElement
) => {
  return (
    <ThemeContext.Provider value={settings}>{template}</ThemeContext.Provider>
  );
};
