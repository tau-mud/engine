import { get } from "lodash";
import { Service as MoleculerService, ServiceSchema } from "moleculer";
import { ITauConfig } from "../types/ITauConfig";

/**
 * The ServiceMixin is a Moleculer mixin that provides a few utility functions for services.
 *
 * #### Methods
 * | Name | Parameters | Description |
 * | ---- | ---------- | ----------- |
 * | `getMudSetting` | `key: string, `defaultValue: any` | Returns the MUD setting identified by the provided key. |
 * | `getMudSettings` | | Returns the MUD settings. |
 */
export const Service: ServiceSchema = {
  name: "service",

  methods: {
    getMudSetting(this: MoleculerService, key: string, defaultValue?: any) {
      const opts = <ITauConfig>this.broker.options;

      return get(opts.settings, key, defaultValue);
    },

    getMudSettings(this: MoleculerService) {
      const opts = <ITauConfig>this.broker.options;

      return opts.settings;
    },
  },
};
