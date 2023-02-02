import React, { createContext, ProviderProps } from "react";
import { IControllerConnectionData } from "../types";

const defaultConnection: Partial<IControllerConnectionData> = {};

export const ConnectionContext = createContext(defaultConnection);

export const WithConnection = (
  conn: IControllerConnectionData,
  template: React.ReactElement
) => {
  return (
    <ConnectionContext.Provider value={conn}>
      {template}
    </ConnectionContext.Provider>
  );
};
