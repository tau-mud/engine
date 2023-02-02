import { config, types } from "@tau-mud/core";

import base from "./base.config";

const world: Partial<types.ITauConfig> = {
  processName: "world",
  settings: {
    theme: {
      gameName: {
        color: "magenta",
        bold: true,
      },
      borderStyle: "single",
    },
  },
};

export default config.Configure(world, base);
