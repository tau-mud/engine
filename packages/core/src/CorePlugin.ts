import { Plugin } from "./Plugin";
import { Redis } from "./services";

export class CorePlugin extends Plugin {
  readonly name = "core";
  readonly services = {
    all: {
      Redis,
    },
  };
}
