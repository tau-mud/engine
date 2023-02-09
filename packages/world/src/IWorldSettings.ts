import { config } from "@tau-mud/core";
import { Boxes } from "cli-boxes";

import { ITextProps } from "./screen";
import { IComponentConstructor } from "./Component";

export interface ITheme {
  /**
   * How to display the `<GameName>` screen component.
   */
  gameName?: ITextProps;

  /**
   * The style of border to use for bordered components
   */
  borderStyle?: keyof Boxes;

  send?: ITextProps;

  userError?: ITextProps;

  cta?: ITextProps;
}

/**
 * World specific settings.
 */
export interface IWorldSettings extends config.IMudSettings {
  /**
   * The theme to use for the game output.
   */
  theme?: ITheme;

  /**
   * The URL to the mongo database.
   */
  mongoUrl: string;

  components?: Array<IComponentConstructor>;
}
