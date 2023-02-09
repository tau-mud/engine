import { Plugin } from "@tau-mud/core";
import * as controllers from "./controllers";
import * as services from "./services";
import { ServiceBroker } from "moleculer";

export class WorldPlugin extends Plugin {
  readonly services = {
    world: {
      ...controllers,
      ...services,
    },
  };

  async started(broker: ServiceBroker) {
    await broker.waitForServices(["component-types"]);

    const components = this.getSetting("world.components", []);

    for (const component of components) {
      await broker.call("component-types.register", component);
    }
  }
}
