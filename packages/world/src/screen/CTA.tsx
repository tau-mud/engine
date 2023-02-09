import React, { useContext, PropsWithChildren } from "react";
import { defaultsDeep } from "lodash";

import { ITextProps, Text } from "./Text";
import { ThemeContext } from "./WithTheme";

export const CTA = (props: PropsWithChildren<ITextProps>) => {
  const { children, ...rest } = props;

  const theme = useContext(ThemeContext);

  let style = rest;
  if (theme && theme.cta) {
    style = defaultsDeep(style, theme.cta);
  }

  return <Text {...style}>{children}</Text>;
};
