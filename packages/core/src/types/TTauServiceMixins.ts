import { ServiceSchema } from "moleculer";
import { TTauServiceConstructor } from "./TTauServiceConstructor";
import { ITauServiceSchema } from "./ITauServiceSchema";

export type TTauServiceMixins = Array<
  Partial<ITauServiceSchema> | TTauServiceConstructor
>;
