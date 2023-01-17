import { ServiceBroker } from "moleculer";

import { TServiceList } from "./config";

/**
 * This interface is used to define a Plugin for the Tau MUD Engine. Plugins are the primary way to extend the engine
 * with new functionality. Plugins are loaded when the game starts and their `created`, `started` and `stopped` methods
 * are called at by the broker using at the related points within the [Moleculer broker's lifecycle](https://moleculer.services/docs/0.14/broker.html#Broker-lifecycle).
 */
export abstract class Plugin {
  /**
   * The name of the plugin.
   */
  abstract readonly name: string;

  readonly services: TServiceList = {};

  /**
   * The created callback is called when the broker is created. It is called before the broker starts.
   * @param broker the broker that is being created.
   */
  created?: (broker: ServiceBroker) => void;

  /**
   * The started callback is called when the broker is started. It is called after the broker has started.
   * @param broker the broker that is being started.
   */
  started?: (broker: ServiceBroker) => void;

  /**
   * The stopped callback is called when the broker is stopped. It is called after the broker has stopped.
   * @param broker the broker that is being stopped.
   */
  stopped?: (broker: ServiceBroker) => void;
}

/**
 * @private
 */
export interface IPluginConstructor {
  new (): Plugin;
}
