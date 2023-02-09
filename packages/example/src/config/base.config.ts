import { config, CorePlugin } from "@tau-mud/core";
import { PortalPlugin } from "@tau-mud/portal";
import { WorldPlugin } from "@tau-mud/world";
import { PFPlugin } from "@tau-mud/pf";

const base: Partial<config.ITauConfig> = {
  settings: {
    redis: {
      host: "localhost",
      port: 6379,
    },
  },
  transporter: "tcp",
  plugins: [CorePlugin, PortalPlugin, WorldPlugin, PFPlugin],
};

export default config.Configure(base);
