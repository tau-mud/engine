import { ITauServiceSchema } from "@tau-mud/core";
import { Context } from "moleculer";

import { defaultsDeep } from "lodash";
import {
  IPortalActionParams,
  IPortalDeleteMetadataActionParams,
  IPortalGetAllMetadataActionParams,
  IPortalGetMetadataActionParams,
  IPortalMergeMetadataActionParams,
  IPortalSetControllerActionParams,
  IPortalSetMetadataActionParams,
  IPortalWriteActionParams,
} from "../mixins";

export interface IConnectionsRegisterConnectionActionParams
  extends IPortalActionParams {
  portal: string;
}

/**
 * The ConnectionRegistry service is responsible for simply tracking connections across all portals, providing a common
 * service to access connection metadata so that the portal for each connection does not need to be known by the world.
 */
export const Connections: ITauServiceSchema = {
  actions: {
    deleteMetadata: {
      params: {
        id: "string",
        key: "string",
      },
      handler(ctx: Context<IPortalDeleteMetadataActionParams>) {
        const { id, key } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.deleteMetadata`, { id, key });
      },
    },

    getAllFlash: {
      params: {
        id: "string",
      },
      async handler(ctx: Context<IPortalGetAllMetadataActionParams>) {
        const { id } = ctx.params;

        return this.actions.getMetadata({ id, key: "flash" });
      },
    },

    getAllMetadata: {
      params: {
        id: "string",
      },
      handler(ctx: Context<IPortalGetAllMetadataActionParams>) {
        const { id } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.getAllMetadata`, { id });
      },
    },

    getFlash: {
      params: {
        id: "string",
        key: "string",
      },
      async handler(ctx: Context<IPortalGetMetadataActionParams>) {
        const { id, key } = ctx.params;

        const flash = (await this.actions.getAllFlash({ id })) || {};

        return flash[key];
      },
    },

    replaceFlash: {
      params: {
        id: "string",
        data: "object",
      },
      async handler(ctx: Context<IPortalMergeMetadataActionParams>) {
        const { id, data } = ctx.params;

        return this.actions.setMetadata({ id, key: "flash", value: data });
      },
    },

    getMetadata: {
      params: {
        id: "string",
        key: "string",
      },
      handler(ctx: Context<IPortalGetMetadataActionParams>) {
        const { id, key } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.getMetadata`, { id, key });
      },
    },

    mergeMetadata: {
      params: {
        id: "string",
        data: "object",
      },
      handler(ctx: Context<IPortalMergeMetadataActionParams>) {
        const { id, data } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.mergeMetadata`, { id, data });
      },
    },

    register: {
      params: {
        id: "string",
        portal: "string",
      },
      privacy: "protected",
      handler(ctx: Context<IConnectionsRegisterConnectionActionParams>) {
        this.logger.debug("registering connection", ctx.params);
        const { id, portal } = ctx.params;

        this.connections[id] = portal;
      },
    },

    resetFlash: {
      params: {
        id: "string",
      },
      async handler(ctx: Context<IPortalActionParams>) {
        const { id } = ctx.params;

        return this.actions.setMetadata({ id, key: "flash", value: {} });
      },
    },

    setController: {
      params: {
        id: "string",
        controller: "string",
      },
      async handler(ctx: Context<IPortalSetControllerActionParams>) {
        const { id, controller } = ctx.params;

        const portal = this.connections[id];

        await this.actions.resetFlash({ id });
        return ctx.call(`${portal}.setController`, { id, controller });
      },
    },

    echoOff: {
      params: {
        id: "string",
      },
      async handler(ctx: Context<IPortalWriteActionParams>) {
        const { id } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.echoOff`, { id });
      },
    },

    echoOn: {
      params: {
        id: "string",
      },
      async handler(ctx: Context<IPortalWriteActionParams>) {
        const { id } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.echoOn`, { id });
      },
    },

    setFlash: {
      params: {
        id: "string",
        key: "string",
        value: "any",
      },
      async handler(ctx: Context<IPortalSetMetadataActionParams>) {
        const { id, key, value } = ctx.params;

        const current =
          (await this.actions.getMetadata({ id, key: "flash" })) || {};

        let newFlash: Record<string, any> = {};
        newFlash[key] = value;

        newFlash = defaultsDeep(newFlash, current);

        return this.actions.setMetadata({ id, key: "flash", value: newFlash });
      },
    },

    setMetadata: {
      params: {
        id: "string",
        key: "string",
        value: "any",
      },
      handler(ctx: Context<IPortalSetMetadataActionParams>) {
        const { id, key, value } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.setMetadata`, { id, key, value });
      },
    },

    write: {
      params: {
        id: "string",
        data: "string",
      },
      handler(ctx: Context<IPortalWriteActionParams>) {
        const { id, data } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.write`, { id, data });
      },
    },

    writeLine: {
      params: {
        id: "string",
        data: "string",
      },
      handler(ctx: Context<IPortalWriteActionParams>) {
        const { id, data } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.writeLine`, { id, data });
      },
    },

    writeLines: {
      params: {
        id: "string",
        data: "array",
      },
      handler(ctx: Context<IPortalWriteActionParams>) {
        const { id, data } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.writeLines`, { id, data });
      },
    },
  },
  created() {
    this.connections = {};
  },

  name: "connections",
};
