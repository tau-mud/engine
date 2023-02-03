import React, { PropsWithChildren, useContext } from "react";
import { Box as InkBox, BoxProps as InkBoxProps, DOMElement } from "ink";
import { ConnectionContext } from "./WithConnection";
import { ThemeContext } from "./WithTheme";
import { TScreenBoxProps } from "../types/TScreenBoxProps";

export const Box = (props: TScreenBoxProps) => {
  const connection = useContext(ConnectionContext);
  const theme = useContext(ThemeContext);
  const { children, full, vCenter, hCenter, center, border, ...rest } = props;

  if (theme) {
    if (border) {
      if (!rest.borderStyle) {
        rest.borderStyle = theme.borderStyle || "classic";
      }
    }
  }

  if (rest.borderStyle && rest.borderStyle !== "classic") {
    if (connection.charset !== "UTF-8") {
      rest.borderStyle = "classic";
    }
  }

  if (full) {
    rest.width = "100%";
    if (!rest.height) {
      rest.height = "100%";
    }
  }

  if (vCenter || center) {
    rest.alignItems = "center";
  }

  if (hCenter || center) {
    rest.justifyContent = "center";
  }

  return <InkBox {...rest}>{children}</InkBox>;
};
