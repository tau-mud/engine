import { PropsWithChildren } from "react";
import { BoxProps as InkBoxProps } from "ink";

/**
 * The Props for the Box component.
 */
export type TScreenBoxProps = PropsWithChildren<InkBoxProps> & {
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
};
