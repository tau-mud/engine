import { Plugin } from "@tau-mud/core";
import { controllers } from "./controllers";

export class WorldPlugin extends Plugin {
  services = {
    world: [...controllers],
  };
}
