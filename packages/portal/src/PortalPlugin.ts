import { config, Plugin } from "@tau-mud/core";
import { TelnetPortal } from "./portals";
import { Connections } from "./services";

/**
 * The PortalPlugin is a plugin that provides a method by which players can connect to the MUD. It provides a base mixin
 * that can be used to create new portal types, as well as a few portal types that can be used out of the box.
 */
export class PortalPlugin extends Plugin {
  readonly name = "portal";
  readonly services = {
    portal: {
      TelnetPortal,
      Connections,
    },
  };
}
