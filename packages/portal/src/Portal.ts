import { config, Plugin } from "@tau-mud/core";
import { TelnetPortal } from "./portals";

export class Portal extends Plugin {
  readonly name = "portal";
  readonly services: config.TServiceList = {
    portal: [TelnetPortal],
  };
}
