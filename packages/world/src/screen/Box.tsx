import React, { PropsWithChildren, useContext } from "react";
import { Box as InkBox, BoxProps as InkBoxProps } from "ink";

import { ConnectionContext } from "./WithConnection";
import { ThemeContext } from "./WithTheme";

/**
 * The Props for the Box component.
 */
export interface IBoxProps extends InkBoxProps {
  /**
   * If true, the box will fill the entire width of the screen.
   */
  full?: boolean;

  /**
   * If true the content will be vertically centered.
   */
  vCenter?: boolean;

  /**
   * If true the content will be horizontally centered.
   */
  hCenter?: boolean;

  /**
   * If true the content will be centered both vertically and horizontally.
   */
  center?: boolean;

  /**
   * If true, the box will have a border, which will default to the theme border style.
   */
  border?: boolean;
}

export const Box = (props: PropsWithChildren<IBoxProps>) => {
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
