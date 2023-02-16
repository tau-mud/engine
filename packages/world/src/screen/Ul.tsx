import React, { PropsWithChildren } from "react";
import { Box, IBoxProps } from "./Box";

export interface IUlProps extends IBoxProps {}

export const Ul = (props: PropsWithChildren<IUlProps>) => {
  const { children, ...rest } = props;

  return (
    <Box {...rest} flexDirection={"column"}>
      {children}
    </Box>
  );
};
