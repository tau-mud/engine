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
