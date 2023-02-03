import { IWorldSettings } from "./IWorldSettings";
import { types } from "@tau-mud/core";

export type TWorldServiceConstructor = types.TTauServiceConstructor<
  types.ITauServiceSchema,
  IWorldSettings
>;
