import { config } from "@tau-mud/core";

/**
 * The TelnetClient options.
 */
export interface ITelnetClientOptions {
  /**
   * Whether to enable the Telnet TTYPE option.
   */
  ttype?: boolean;

  /**
   * The charset to use for the Telnet connection. If null, the server will default to `ascii`.
   */
  charset?: string;
}

/**
 * Portal specific settings
 */
export interface IPortalSettings extends config.IMudSettings {
  telnet?: ITelnetClientOptions;
}
