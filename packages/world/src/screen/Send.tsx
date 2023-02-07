import { defaultsDeep } from "lodash";
import React, { PropsWithChildren, useContext } from "react";
import { Props } from "ink/build/components/Text";

import { MXPTag } from "./MXPTag";
import { Text } from "./Text";
import { ThemeContext } from "./WithTheme";

export interface ISendProps extends Props {
  href: string;
  hint?: string;
  expire?: string;
}

export const Send = (props: PropsWithChildren<ISendProps>) => {
  const { children, href, hint, expire, ...rest } = props;

  const theme = useContext(ThemeContext);

  const tagProps: ISendProps = { href };

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
