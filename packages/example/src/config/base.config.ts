import { config, Core } from "@tau-mud/core";
import { Portal } from "@tau-mud/portal";

export default config.Configure({
  plugins: [new Core(), new Portal()],
});
