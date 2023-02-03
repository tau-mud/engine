import { defaultsDeep } from "lodash";
import React, { PropsWithChildren, useContext } from "react";

import { IScreenSendProps } from "../types";
import { MXPTag } from "./MXPTag";
import { Text } from "./Text";
import { ThemeContext } from "./WithTheme";

export const Send = (props: PropsWithChildren<IScreenSendProps>) => {
  const { children, href, hint, expire, ...rest } = props;

  const theme = useContext(ThemeContext);

  const tagProps: IScreenSendProps = { href };

  if (hint) {
    tagProps.hint = hint;
  }

  if (expire) {
    tagProps.expire = expire;
  }

  const textProps = defaultsDeep(rest, theme.send || {});

  return (
    <MXPTag tag={"SEND"} {...tagProps}>
      <Text {...textProps}>{children}</Text>
    </MXPTag>
  );
};
