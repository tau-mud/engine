import { ServiceSchema } from "moleculer";
import { TTauServiceConstructor } from "./TTauServiceConstructor";

export interface ITauServiceSchema extends ServiceSchema {
  mixins?: Array<Partial<ServiceSchema> | TTauServiceConstructor>;
}
