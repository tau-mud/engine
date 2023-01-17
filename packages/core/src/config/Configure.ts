import {
  BrokerOptions,
  ServiceBroker,
  ServiceSchema,
  Service as MoleculerService,
} from "moleculer";
import { defaultsDeep } from "lodash";

import { ServiceFactory, Service } from "../service";
import { IPluginConstructor, Plugin } from "../Plugin";
import { compose } from "underscore";

/**
 * A list of services to load when the game starts, keyed by the process name. The key `all` is used to denote services
 * that should be loaded on all processes.
 */
export type TServiceList = {
  [index: string]: Array<ServiceSchema | typeof Service>;
};

/**
 * Configuration options for the Tau MUD Engine. The configuration is provided in the games `config/<process>.config.ts`
 * files, where `process` is the name of the process being run. This allows for separate configuration for each process.
 */
export interface IConfig extends BrokerOptions {
  /**
   * The name of the process that is being run.
   */
  processName?: string;

  /**
   * A list of plugins to load. The plugins will be loaded in the order they are provided.
   */
  plugins: Array<Plugin>;

  /**
   * A list of services to load indexed by process name. The key `all` will ensure a service is loaded for all
   * processes.
   */
  services?: TServiceList;
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
  config: Partial<IConfig>,
  baseConfig: Partial<IConfig> = {}
): IConfig {
  return defaultsDeep(
    {
      created(broker: ServiceBroker) {
        const options: IConfig = <IConfig>broker.options;

        const plugins = options.plugins || [];
        broker.logger.info(`Loading ${plugins.length} plugins`);

        plugins.forEach((plugin: Plugin) => {
          broker.logger.info(`Loading plugin '${plugin.name}'`);

          if (plugin.created) {
            this.logger.info(`Calling 'created' for plugin '${plugin.name}'`);
            plugin.created(broker);
          }

          if (plugin.services && options.processName) {
            let services = plugin.services.all || [];
            services = services.concat(
              plugin.services[options.processName] || []
            );

            broker.logger.info(
              `Loading ${services.length} services for plugin '${plugin.name}'`
            );
            services.forEach((service: ServiceSchema | typeof Service) => {
              broker.createService(service);
            });
          } else if (!options.processName) {
            broker.logger.fatal(`No process name provided.`);

            process.exit(1);
          }
        });
      },

      started(broker: ServiceBroker) {
        const options: IConfig = <IConfig>broker.options;

        const plugins = options.plugins || [];
        broker.logger.info(`calling 'started' for ${plugins.length} plugins`);

        plugins.forEach((plugin: Plugin) => {
          broker.logger.info(`Calling 'started' for plugin '${plugin.name}'`);
          if (plugin.started) {
            plugin.started(broker);
          }
        });
      },

      stopped(broker: ServiceBroker) {
        const options: IConfig = <IConfig>broker.options;

        const plugins = options.plugins || [];
        broker.logger.info(`calling 'stopped' for ${plugins.length} plugins`);

        plugins.forEach((plugin: Plugin) => {
          broker.logger.info(`Calling 'stopped' for plugin '${plugin.name}'`);
          if (plugin.stopped) {
            plugin.stopped(broker);
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
      transporter: process.env.TAU_TRANSPORTER || "tcp",
      plugins: [],
    }
  );
}
