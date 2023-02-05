import React, { PropsWithChildren, useContext } from "react";

import { TextProps } from "ink";
import { ThemeContext } from "./WithTheme";
import { Box } from "./Box";
import { Text } from "./Text";
import { defaultsDeep } from "lodash";

export const UserError = (props: PropsWithChildren<TextProps>) => {
  const theme = useContext(ThemeContext);
  const { children, ...rest } = props;

  const textProps = defaultsDeep(theme.userError || {}, rest);

  return (
    <Box>
      <Text {...textProps}>{props.children}</Text>
    </Box>
  );
};
