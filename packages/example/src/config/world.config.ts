import { config, types as coreTypes } from "@tau-mud/core";
import { types as worldTypes } from "@tau-mud/world";

import base from "./base.config";

const world: Partial<coreTypes.ITauConfig<worldTypes.IWorldSettings>> = {
  processName: "world",
  settings: {
    theme: {
      gameName: {
        color: "magenta",
        bold: true,
      },
      borderStyle: "single",
      send: {
        color: "blue",
        bold: true,
      },
    },
    mongoUrl: process.env.TAU_MONGO_URL || "mongodb://localhost:27017",
  },
};

export default config.Configure(world, base);
