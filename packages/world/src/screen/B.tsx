import React, { PropsWithChildren } from "react";

import { ITextProps, Text } from "./Text";

export interface IBProps extends ITextProps {}

export const B = (props: PropsWithChildren<IBProps>) => {
  const { children, ...rest } = props;

  return (
    <Text {...rest} bold>
      {children}
    </Text>
  );
};
