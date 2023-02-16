import React, { PropsWithChildren, useContext } from "react";

import { Send } from "./Send";
import { ThemeContext } from "./WithTheme";
import { Props } from "ink/build/components/Text";

export interface IHelpLinkProps extends Props {
  help: string;
}

export const HelpLink = (props: PropsWithChildren<IHelpLinkProps>) => {
  const theme = useContext(ThemeContext);

  const { children, help, ...rest } = props;

  if (theme && theme.helpLink) {
    return <Send {...rest} {...theme.helpLink} href={`help ${help}`} />;
  } else {
    return <Send {...rest} href={`help ${help}`} />;
  }
};
