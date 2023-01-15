import { BrokerOptions } from "moleculer";

/**
 * Configuration options for the Tau MUD Engine.
 */
export interface IConfig extends BrokerOptions {
  /**
   * The name of the process that is being run.
   */
  processName?: string;
}

/**
 * Configure a Tau MUD Engine process. If `baseConfig` is provided, it is merged with the config using
 * [defaultsDeep](https://lodash.com/docs/#defaultsDeep).
 *
 * @param processName The name of the process to configure.
 * @param config The configuration to use. See [BrokerOptions](https://moleculer.services/docs/0.14/broker.html#BrokerOptions) for more information.
 * @param baseConfig The base configuration to use. See [BrokerOptions](https://moleculer.services/docs/0.14/broker.html#BrokerOptions) for more information.
 * @constructor
 */
export function Configure(
  config: Partial<IConfig>,
  baseConfig: Partial<IConfig>
): BrokerOptions {
  return {
    // the node id is the process name + the process id
    nodeID: `${config.processName}-${process.pid}`,
    ...baseConfig,
    ...config,
  };
}
