import { types } from "@tau-mud/core";
import { Context } from "moleculer";
import {
  IConnectionsRegisterConnectionActionParams,
  IPortalDeleteMetadataActionParams,
  IPortalGetMetadataActionParams,
  IPortalMergeMetadataActionParams,
  IPortalSetControllerActionParams,
  IPortalSetMetadataActionParams,
  IPortalWriteActionParams,
} from "types";

/**
 * The ConnectionRegistry service is responsible for simply tracking connections across all portals, providing a common
 * service to access connection metadata so that the portal for each connection does not need to be known by the world.
 */
export const Connections: types.ITauServiceSchema = {
  actions: {
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

    getAllMetadata: {
      params: {
        id: "string",
      },
      handler(ctx: Context<IPortalGetMetadataActionParams>) {
        const { id } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.getAllMetadata`, { id });
      },
    },

    setMetadata: {
      params: {
        id: "string",
      },
      handler(ctx: Context<IPortalSetMetadataActionParams>) {
        const { id } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.setMetadata`, { id });
      },
    },

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

    setController: {
      params: {
        id: "string",
        controller: "string",
      },
      handler(ctx: Context<IPortalSetControllerActionParams>) {
        const { id, controller } = ctx.params;

        const portal = this.connections[id];

        return ctx.call(`${portal}.setController`, { id, controller });
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
