import { ServiceSchema } from "moleculer";

import { TTauServiceConstructor } from "./TTauServiceConstructor";
import { IMudSettings } from "./config";

export type TTauServiceMixins = Array<
  ITauServiceSchema | TTauServiceConstructor<ITauServiceSchema, IMudSettings>
>;

export interface ITauServiceSchema extends ServiceSchema {
  mixins?: TTauServiceMixins;
}
