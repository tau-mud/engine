import {
  ActionSchema,
  Service,
  ServiceActionsSchema,
  ServiceSchema,
} from "moleculer";
import { types } from "@tau-mud/core";

interface IPortalActionSchema extends ServiceActionsSchema {
  write: ActionSchema;
  getMetadata: ActionSchema;
  setMetadata: ActionSchema;
}

/**
 * Implement this schema to create a portal service.
 */
export interface IPortalServiceSchema extends types.ITauServiceSchema {
  actions: IPortalActionSchema;
  mixins: types.TTauServiceMixins;
}
