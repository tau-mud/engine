import { config } from "@tau-mud/core";

import base from "./base.config";

const portal: Partial<config.ITauConfig> = {
  processName: "portal",
  settings: {
    telnet: {
      host: process.env.TAU_MUD_TELNET_HOST || "127.0.0.1",
      port: process.env.TAU_MUD_TELNET_PORT || 2323,
      ttype: process.env.TAU_MUD_TELNET_TTYPE || true,
      charset: process.env.TAU_MUD_TELNET_CHARSET || "UTF-8",
    },
    defaultController: "motd",
  },
};

export default config.Configure(portal, base);
