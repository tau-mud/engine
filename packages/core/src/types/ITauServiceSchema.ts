import { ServiceSchema } from "moleculer";
import { TTauServiceConstructor } from "./TTauServiceConstructor";
import { TTauServiceMixins } from "./TTauServiceMixins";

export interface ITauServiceSchema extends ServiceSchema {
  mixins?: TTauServiceMixins;
}
