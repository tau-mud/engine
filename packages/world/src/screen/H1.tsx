import React, { PropsWithChildren, useContext } from "react";

import { Text, ITextProps } from "./Text";
import { ThemeContext } from "./WithTheme";
import { Box } from "./Box";

export const H1 = (props: PropsWithChildren<ITextProps>) => {
  const theme = useContext(ThemeContext);

  const { children, ...rest } = props;

  let style;

  if (theme && theme.h1) {
    style = {
      ...theme.h1,
      ...rest,
    };
  }

  return (
    <Box>
      <Text {...style}>{children}</Text>
    </Box>
  );
};
