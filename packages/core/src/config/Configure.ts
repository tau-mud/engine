import { BrokerOptions, ServiceBroker, ServiceSchema } from "moleculer";
import { defaultsDeep } from "lodash";
import { RedisOptions } from "ioredis";

import { Plugin, TTauPluginServiceListEntries } from "../Plugin";
import { ServiceFactory } from "./ServiceFactory";

/**
 * The MUD settings interface. This is a simple key/value object that can be used to store any settings that are
 * required by the MUD.
 */
export interface IMudSettings {
  redis: RedisOptions;
  [key: string]: any;
}

/**
 * Configuration options for the Tau MUD Engine. The configuration is provided in the games `config/<process>.config.ts`
 * files, where `process` is the name of the process being run. This allows for separate configuration for each process.
 */
export interface ITauConfig<S = IMudSettings> extends BrokerOptions {
  /**
   * The name of the process that is being run.
   */
  processName?: string;

  /**
   * A list of plugins to load. The plugins will be loaded in the order they are provided.
   */
  plugins: Array<typeof Plugin>;

  settings?: Partial<S>;
}

/**
 * The ITauRedisOptions interface is a simple interface that extends the RedisOptions interface from the ioredis package.
 * This interface is used to provide the RedisOptions to MUD engine.
 */
export interface ITauRedisOptions extends RedisOptions {
  /**
   * The host name of the Redis server.
   */
  host: string;

  /**
   * The port number of the Redis server.
   */
  port: number;
}

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
            plug.created(broker).catch((err: Error) => {
              broker.logger.fatal(
                `Error creating plugin '${plugin.name}'`,
                err
              );
              process.exit(1);
            });
          }
        });
      },

      async started(broker: ServiceBroker) {
        const options: ITauConfig = <ITauConfig>broker.options;

        const plugins = options.plugins || [];
        let servicesToCreate: TTauPluginServiceListEntries = {};

        broker.logger.info(`calling 'started' for ${plugins.length} plugins`);

        plugins.forEach((plugin: typeof Plugin) => {
          broker.logger.info(`Calling 'started' for plugin '${plugin.name}'`);
          const plug = new plugin(broker);

          if (plug.started) {
            plug.started(broker).catch((err: Error) => {
              broker.logger.fatal(
                `Error starting plugin '${plugin.name}'`,
                err
              );
              process.exit(1);
            });
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
            plug.stopped(broker).catch((err: Error) => {
              broker.logger.fatal(
                `Error stopping plugin '${plugin.name}'`,
                err
              );
              process.exit(1);
            });
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
