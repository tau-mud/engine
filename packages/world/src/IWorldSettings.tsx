import { config } from "@tau-mud/core";
import { TextProps } from "ink";
import { Boxes } from "cli-boxes";

export interface ITheme {
  /**
   * How to display the `<GameName>` screen component.
   */
  gameName?: TextProps;

  /**
   * The style of border to use for bordered components
   */
  borderStyle?: keyof Boxes;
}

/**
 * World specific settings.
 */
export interface IWorldSettings extends config.ISettings {
  theme?: ITheme;
}
