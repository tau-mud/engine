import React, { createContext, ProviderProps } from "react";
import { IControllerConnectionContext } from "../mixins/ControllerMixin";

const defaultConnection: Partial<IControllerConnectionContext> = {};

export const ConnectionContext = createContext(defaultConnection);

export const WithConnection = (
  conn: IControllerConnectionContext,
  template: React.ReactElement
) => {
  return (
    <ConnectionContext.Provider value={conn}>
      {template}
    </ConnectionContext.Provider>
  );
};
