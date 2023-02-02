import { config } from "@tau-mud/core";

import base from "./base.config";

export default config.Configure(
  {
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
  },
  base
);
