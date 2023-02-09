import { Plugin } from "./Plugin";

export class CorePlugin extends Plugin {
  readonly name = "core";
  readonly services = {
    all: {},
  };
}
