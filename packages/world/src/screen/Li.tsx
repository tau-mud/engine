import React, { PropsWithChildren } from "react";

import { Box } from "./Box";
import { Text, ITextProps } from "./Text";

export interface ILiProps extends ITextProps {}

export const Li = (props: PropsWithChildren<ILiProps>) => {
  const { children, ...rest } = props;

  return (
    <Box>
      <Text {...rest}>{children}</Text>
    </Box>
  );
};
