import { config } from "@tau-mud/core";
import { IWorldSettings } from "@tau-mud/world";
import { helps as pfHelps, IPFSettings } from "@tau-mud/pf";

import base from "./base.config";

interface ISettings extends IWorldSettings, IPFSettings {}

const world: Partial<config.ITauConfig<IPFSettings>> = {
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
    helps: {
      ...pfHelps,
    },
  },
};

export default config.Configure(world, base);
