import { Context, Service } from "moleculer";
import { ITauServiceSchema } from "@tau-mud/core";

import { IControllerActionParams, IControllerContext } from "./Controller";

export interface IConnectionActionMetadata {
  connection: IConnectionMetadata;
}

export interface IConnectionMetadata {
  id?: string;
  portal: string;
  charset: string;
  controller: string;
  store: Record<string, any>;
  flash: Record<string, any>;
}

export const ConnectionMetadataLoader: ITauServiceSchema = {
  name: "connection-metadata",
  hooks: {
    before: {
      async "*"(
        this: Service,
        ctx: IControllerContext<
          IControllerActionParams,
          IConnectionActionMetadata
        >
      ) {
        if (!ctx.params.id) {
          return;
        }

        const connection = await ctx.call<
          IConnectionMetadata,
          IControllerActionParams
        >(`connections.getAllMetadata`, {
          id: ctx.params.id,
        });

        ctx.meta.connection = {
          id: ctx.params.id,
          ...connection,
          store: connection.store || {},
          flash: connection.flash || {},
        };
      },
    },
  },
};
