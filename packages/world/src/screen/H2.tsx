import React, { PropsWithChildren, useContext } from "react";

import { ITextProps, Text } from "./Text";
import { ThemeContext } from "./WithTheme";
import { Box } from "./Box";

export const H2 = (props: PropsWithChildren<ITextProps>) => {
  const theme = useContext(ThemeContext);

  const { children, ...rest } = props;

  let style;

  if (theme && theme.h2) {
    style = {
      ...theme.h2,
      ...rest,
    };
  }

  return (
    <Box>
      <Text {...style}>{children}</Text>
    </Box>
  );
};
