import { BrokerOptions } from "moleculer";
import { Plugin } from "../Plugin";
import { IMudSettings } from "./IMudSettings";
/**
 * Configuration options for the Tau MUD Engine. The configuration is provided in the games `config/<process>.config.ts`
 * files, where `process` is the name of the process being run. This allows for separate configuration for each process.
 */
export interface ITauConfig extends BrokerOptions {
  /**
   * The name of the process that is being run.
   */
  processName?: string;

  /**
   * A list of plugins to load. The plugins will be loaded in the order they are provided.
   */
  plugins: Array<typeof Plugin>;

  settings?: IMudSettings;
}
