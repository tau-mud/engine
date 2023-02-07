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
      cta: {
        color: "white",
        bold: true,
        underline: true,
      },
      send: {
        color: "blue",
        bold: true,
      },
      userError: {
        color: "red",
      },
    },
    mongoUrl: process.env.TAU_MONGO_URL || "mongodb://localhost:27017",
  },
};

export default config.Configure(world, base);
