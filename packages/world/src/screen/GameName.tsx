import React, { PropsWithChildren, useContext } from "react";
import { Text } from "ink";

import { ThemeContext } from "./WithTheme";

export const GameName = (props: PropsWithChildren) => {
  const theme = useContext(ThemeContext);
  const { children } = props;
  const { gameName } = theme;

  return <Text {...gameName}>{children}</Text>;
};
