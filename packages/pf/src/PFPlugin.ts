import { Plugin, config } from "@tau-mud/core";

import { ServiceBroker } from "moleculer";
import * as components from "./components";

export class PFPlugin extends Plugin {
  async started(broker: ServiceBroker) {
    const options = broker.options as config.ITauConfig;
    const processName = options.processName;

    if (processName !== "world") {
      return;
    }

    await broker.waitForServices(["components"]);

    for (const component of Object.values(components)) {
      await broker.call("components.register", { component });
    }
  }
}
