import { config, types } from "@tau-mud/core";
import { ITheme } from "./ITheme";

/**
 * World specific settings.
 */
export interface IWorldSettings extends types.IMudSettings {
  theme?: ITheme;
}
