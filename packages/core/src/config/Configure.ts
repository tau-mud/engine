import { BrokerOptions } from "moleculer";
import { defaultsDeep } from "lodash";

import { ServiceFactory } from "@/service";

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
 * The Tau MUD engine supports the following environment variables:
 * | Variable | Default Value | Description |
 * |----------|---------------|-------------|
 * | `TAU_LOG_LEVEL` | `trace` | The log level to use. |
 * | `TAU_TRANSPORTER` | `tcp` | The [Moleculer transporter](https://moleculer.services/docs/0.14/networking.html) to use. |
 * | `TAU_ENV` | `development` | The environment to run in. |
 *
 * @param processName The name of the process to configure.
 * @param config The configuration to use. See [BrokerOptions](https://moleculer.services/docs/0.14/broker.html#BrokerOptions) for more information.
 * @param baseConfig The base configuration to use. See [BrokerOptions](https://moleculer.services/docs/0.14/broker.html#BrokerOptions) for more information.
 * @constructor
 */
export function Configure(
  config: Partial<IConfig>,
  baseConfig: Partial<IConfig> = {}
): IConfig {
  return defaultsDeep(
    {
      ...config,
      nodeID: `${config.processName}-${process.pid}`,
    },
    baseConfig,
    {
      namespace: process.env.TAU_ENV || process.env.NODE_ENV || "development",
      ServiceFactory: ServiceFactory,
      logger: {
        type: "Console",
        options: {
          level: process.env.TAU_LOG_LEVEL || "trace",
          colors: true,
          moduleColors: true,
          formatter: "full",
          objectPrinter: null,
          autoPadding: false,
        },
      },
      transporter: process.env.TAU_TRANSPORTER || "tcp",
    }
  );
}
