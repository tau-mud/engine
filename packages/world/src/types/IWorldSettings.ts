import { config, types } from "@tau-mud/core";
import { ITheme } from "./ITheme";

/**
 * World specific settings.
 */
export interface IWorldSettings extends types.IMudSettings {
  /**
   * The theme to use for the game output.
   */
  theme?: ITheme;

  /**
   * The URL to the mongo database.
   */
  mongoUrl: string;
}
