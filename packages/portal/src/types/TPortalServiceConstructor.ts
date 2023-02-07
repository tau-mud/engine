import { types } from "@tau-mud/core";
import { IPortalSettings } from "./IPortalSettings";
import { IPortalServiceSchema } from "../mixins";

export type TPortalServiceConstructor = types.TTauServiceConstructor<
  IPortalServiceSchema,
  IPortalSettings
>;
