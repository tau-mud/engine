import { config, CorePlugin } from "@tau-mud/core";
import { PortalPlugin } from "@tau-mud/portal";
import { WorldPlugin } from "@tau-mud/world";

export default config.Configure({
  settings: {
    redis: {
      socket: {
        host: "localhost",
        port: 6379,
      },
    },
  },
  transporter: "redis://127.0.0.1:6379",
  plugins: [CorePlugin, PortalPlugin, WorldPlugin],
});
