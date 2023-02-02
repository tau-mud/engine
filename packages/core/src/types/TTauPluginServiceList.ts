import { ITauServiceSchema } from "./ITauServiceSchema";
import { TTauServiceConstructor } from "./TTauServiceConstructor";

export type TTauPluginServiceList = Record<
  string,
  ITauServiceSchema | TTauServiceConstructor
>;
