import { config } from "@tau-mud/core";

import base from "./base.config";

const portal: Partial<config.ITauConfig> = {
  processName: "repl",
};

export default config.Configure(portal, base);
