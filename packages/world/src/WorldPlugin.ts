import { Plugin } from "@tau-mud/core";
import * as controllers from "./controllers";
import * as services from "./services";

export class WorldPlugin extends Plugin {
  readonly services = {
    world: {
      ...controllers,
      ...services,
    },
  };
}
