import { TTauServiceConstructor, ITauServiceSchema } from "@tau-mud/core";

import { IWorldSettings } from "./IWorldSettings";

export type TWorldServiceConstructor = TTauServiceConstructor<
  ITauServiceSchema,
  IWorldSettings
>;
