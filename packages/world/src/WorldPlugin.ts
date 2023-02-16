import { config, Plugin } from "@tau-mud/core";

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
    const options = broker.options as config.ITauConfig;
    const processName = options.processName;

  if (processName !== "world") {
    return;
  }

    await broker.waitForServices(["components"]);

    const components = this.getSetting("world.components", []);

    for (const component of components) {
      await broker.call("components.register", component);
    }
  }
}
