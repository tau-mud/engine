import { types } from "@tau-mud/core";
import { IPortalServiceSchema } from "./IPortalServiceSchema";
import { IPortalSettings } from "./IPortalSettings";

export type TPortalServiceConstructor = types.TTauServiceConstructor<
  IPortalServiceSchema,
  IPortalSettings
>;
