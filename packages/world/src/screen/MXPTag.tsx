import React, { PropsWithChildren } from "react";
import { Text } from "./Text";

interface IMXPTagProps extends MXPAttrs {
  tag: string;
}

interface MXPAttrs {
  [key: string]: string | number | boolean | React.ReactElement;
}

const MXPSecure = "\x1b[1z";
const MXPReset = "\x1b[3z";

export const MXPTag = (props: PropsWithChildren<IMXPTagProps>) => {
  const { children, ...rest } = props;
  const attrs = rest as MXPAttrs;

  const mxpAttrs = Object.keys(rest)
    .reduce((acc: string[], key) => {
      const value = attrs[key];
      acc.push(`${key}="${value}"`);

      return acc;
    }, [])
    .join(" ");
  return (
    <Text>
      {MXPSecure}
      {`<${props.tag} ${mxpAttrs}>`}
      {props.children}
      {`</${props.tag}>`}
      {MXPReset}
    </Text>
  );
};
