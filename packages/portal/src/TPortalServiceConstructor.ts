import { TTauServiceConstructor } from "@tau-mud/core";

import { IPortalSettings } from "./IPortalSettings";
import { IPortalServiceSchema } from "./mixins";

export type TPortalServiceConstructor = TTauServiceConstructor<
  IPortalServiceSchema,
  IPortalSettings
>;
