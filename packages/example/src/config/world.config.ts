import { config } from "@tau-mud/core";
import { IWorldSettings } from "@tau-mud/world";

import base from "./base.config";

const world: Partial<config.ITauConfig<IWorldSettings>> = {
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
