import { Plugin } from "@tau-mud/core";
import * as controllers from "./controllers";

export class WorldPlugin extends Plugin {
  readonly services = {
    world: {
      ...controllers,
    },
  };
}
