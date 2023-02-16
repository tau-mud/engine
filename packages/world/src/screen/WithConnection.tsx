import React, { createContext, ProviderProps } from "react";
import { IConnectionMetadata } from "../mixins";

const defaultConnection: Partial<IConnectionMetadata> = {};

export const ConnectionContext = createContext(defaultConnection);

export const WithConnection = (
  conn: IConnectionMetadata,
  template: React.ReactElement
) => {
  return (
    <ConnectionContext.Provider value={conn}>
      {template}
    </ConnectionContext.Provider>
  );
};
