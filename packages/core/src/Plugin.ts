import { ServiceBroker } from "moleculer";
import { get } from "lodash";
import { TTauPluginProcessServiceList } from "./types/TTauPluginProcessServiceList";

/**
 * This class is used to define a Plugin for the Tau MUD Engine. Plugins are the primary way to extend the engine
 * with new functionality. Plugins are loaded when the game starts and their `created`, `started` and `stopped` methods
 * are called at by the broker using at the related points within the [Moleculer broker's lifecycle](https://moleculer.services/docs/0.14/broker.html#Broker-lifecycle).
 */
export class Plugin {
  readonly name: string = "plugin";
  /**
   * The Moleculer Service Broker.
   */
  readonly broker: ServiceBroker;

  constructor(broker: ServiceBroker) {
    this.broker = broker;
  }

  /**
   * The list of services to load when the plugin is loaded. This is a key value pair list where the key is the name of
   * the process the service should be loaded on, and the value is an array of services to load. The key `all` is used
   * to denote services that should be loaded on all processes.
   *
   * @example
   * ```typescript
   * import { Plugin } from "@tau-mud/core";
   * import { MyService } from "./MyService";
   * import { MyOtherService } from "./MyOtherService";
   *
   * export class MyPlugin extends Plugin {
   *   readonly services = {
   *       all:    [MyOtherService],
   *       portal: [MyService],
   *   }
   * ```
   */
  readonly services: TTauPluginProcessServiceList = {};

  /**
   * The created callback is called when the broker is created. It is called before the broker starts.
   */
  created?: () => void;

  /**
   * The started callback is called when the broker is started. It is called after the broker has started.
   */
  started?: () => void;

  /**
   * The stopped callback is called when the broker is stopped. It is called after the broker has stopped.
   */
  stopped?: () => void;

  /**
   * getSetting is a helper function to get a setting from the MUD's settings.
   *
   * @param key The dot separated key to the setting.
   * @param defaultValue The default value to return if the setting is not found.
   */
  getSetting(key: string, defaultValue?: any): any {
    return get(this.broker.settings, key, defaultValue);
  }
}
