import { config, Core } from "@tau-mud/core";
import { Portal } from "@tau-mud/portal";

import base from "./base.config";

export default config.Configure(
  {
    processName: "portal",
  },
  base
);
