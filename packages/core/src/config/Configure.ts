import {
  BrokerOptions,
  Service,
  ServiceBroker,
  ServiceSchema,
} from "moleculer";
import { defaultsDeep } from "lodash";
import { RedisClientOptions } from "redis";

import { Plugin } from "../Plugin";
import { ServiceFactory } from "./ServiceFactory";
import { ITauConfig } from "../types/ITauConfig";
import { TTauPluginServiceList } from "../types/TTauPluginServiceList";

/**
 * Configure a Tau MUD Engine process. If `baseConfig` is provided, it is merged with the config using
 * [defaultsDeep](https://lodash.com/docs/#defaultsDeep). The `created`, `started, and `stopped` functions of the
 * `baseConfig` is composed together with the functions provided to the `config` parameter. If either the `baseConfig`
 * or `config` parameter does not have a `created` function, an empty function is used instead.
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
  config: Partial<ITauConfig>,
  baseConfig: Partial<ITauConfig> = {}
): ITauConfig {
  return defaultsDeep(
    {
      created(broker: ServiceBroker) {
        const options: ITauConfig = <ITauConfig>broker.options;

        const plugins = options.plugins || [];
        broker.logger.info(`Loading ${plugins.length} plugins`);

        plugins.forEach((plugin: typeof Plugin) => {
          broker.logger.info(`Loading plugin '${plugin.name}'`);

          const plug = new plugin(broker);

          if (plug.created) {
            broker.logger.info(`Calling 'created' for plugin '${plugin.name}'`);
            plug.created();
          }
        });
      },

      started(broker: ServiceBroker) {
        const options: ITauConfig = <ITauConfig>broker.options;

        const plugins = options.plugins || [];
        let servicesToCreate: TTauPluginServiceList = {};

        broker.logger.info(`calling 'started' for ${plugins.length} plugins`);

        plugins.forEach((plugin: typeof Plugin) => {
          broker.logger.info(`Calling 'started' for plugin '${plugin.name}'`);
          const plug = new plugin(broker);

          if (plug.started) {
            plug.started();
          }

          if (plug.services && options.processName) {
            servicesToCreate = defaultsDeep(
              plug.services.all || {},
              servicesToCreate
            );

            servicesToCreate = defaultsDeep(
              plug.services[options.processName] || {},
              servicesToCreate
            );
          } else if (!options.processName) {
            broker.logger.fatal(`No process name provided.`);

            process.exit(1);
          }
        });

        broker.logger.info(
          `Creating ${Object.keys(servicesToCreate).length} services`
        );

        Object.values(servicesToCreate).forEach((service: ServiceSchema) => {
          broker.createService(service);
        });
      },

      stopped(broker: ServiceBroker) {
        const options: ITauConfig = <ITauConfig>broker.options;

        const plugins = options.plugins || [];
        broker.logger.info(`calling 'stopped' for ${plugins.length} plugins`);

        plugins.forEach((plugin: typeof Plugin) => {
          broker.logger.info(`Calling 'stopped' for plugin '${plugin.name}'`);
          const plug = new plugin(broker);

          if (plug.stopped) {
            plug.stopped();
          }
        });
      },
    },
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
      circuitBreaker: {
        enabled: true,
      },
      transporter: process.env.TAU_TRANSPORTER || "tcp",
      plugins: [],
    }
  );
}
