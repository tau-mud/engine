import { config, CorePlugin, types } from "@tau-mud/core";
import { PortalPlugin } from "@tau-mud/portal";
import { WorldPlugin } from "@tau-mud/world";

const base: Partial<types.ITauConfig> = {
  settings: {
    redis: {
      host: "localhost",
      port: 6379,
    },
  },
  transporter: "redis://127.0.0.1:6379",
  plugins: [CorePlugin, PortalPlugin, WorldPlugin],
};

export default config.Configure(base);
