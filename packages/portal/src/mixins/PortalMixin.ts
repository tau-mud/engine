import Moleculer, { Context, Errors, Service, ServiceBroker } from "moleculer";
import { types } from "@tau-mud/core";

import { get } from "lodash";
import { ServiceMixin } from "@tau-mud/core/lib/ServiceMixin";
import {
  IPortalActionParams,
  IPortalGetMetadataActionParams,
  IPortalMergeMetadataActionParams,
  IPortalSetControllerActionParams,
  IPortalWriteActionParams,
} from "types";

const packageJson = require("../../package.json");

interface IErrorMeta {
  error: boolean;
}

/**
 * The PortalMixin is a mixin that can be used to create a portal service. A portal service is a service that provides
 * the ability for a client to connect to the MUD. The portal service is responsible for maintaining the connection to
 * the client and providing the ability for the client to send and receive data from the game world. It also is
 * responsible for maintaining the state of the client via the `metadata` property. The `PortalMixin` already mixes in
 * the Tau `ServiceMixin` so it is not necessary to mix in both. The Portal settings can be set within the game
 * configuration under the `portal` key. Example:
 *
 * ```typescript
 * import { config } from "@tau-mud/core";
 *
 * import base from "./base.config";
 *
 * export default config.Configure(
 *   {
 *     processName: "portal",
 *     settings: {
 *       portal: {
 *          defaultController: "motd",
 *       }
 *     },
 *   },
 *   base
 * );
 * ```
 *
 * #### Settings
 * | Setting | Type | Default | Description |
 * | ------- | ---- | ------- | ----------- |
 * | `defaultController` | string | `motd` | The name of the controller to use when a client connects. |
 *
 *
 * #### Actions
 * | Action | Parameters | Description |
 * | ------ | ---------- | ----------- |
 * | `write` | {@link types.IWriteActionParams} | Writes data to the client. Does not append a newline. This action must be overridden by the service that mixes the PortalMixin. |
 * | `writeLine` | {@link types.IWriteActionParams} | Writes data to the client and appends a newline. |
 * | `writeLines` | {@link types.IWriteActionParams} | Accepts a message and breaks it up by line, writing each line to the client. |
 * | `onData` | {@link types.IConnectionActionParams} | Called when a client sends data to the portal. This action should be called by service that mixes the PortalMixin when a client sends data. |
 * | `onConnect` | {@link types.IConnectionActionParams} | Called when a client connects to the portal. This action should be called by service that mixes the PortalMixin when a client connects. |
 * | `onDisconnect` | {@link types.IConnectionActionParams} | Called when a client disconnects from the portal. This action should be called by service that mixes the PortalMixin when a client disconnects.  |
 * | `onTimeout` | {@link types.IConnectionActionParams} | Called when a client times out from the portal. This action should be called by service that mixes the PortalMixin when a client timeout occurs. |
 * | `getMetadata` | {@link types.IGetMetadataActionParams} | Gets the metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `getAllMetadata` | {@link types.IConnectionActionParams} | Gets all metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `setMetadata` | {@link types.ISetMetadataActionParams} | Sets the metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `deleteMetadata` | {@link types.IDeleteMetadataActionParams} | Deletes the metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `setController` | {@link types.ISetMetadataActionParams} | Sets the controller for the connection. This will emit the `portal.controller.set` event. |
 *
 * #### Events
 * | Event | Parameters | Description |
 * | ----- | ---------- | ----------- |
 * | `portal.connected` | {@link types.IConnectionActionParams} | Emitted when a client connects to the portal. |
 * | `portal.disconnected` | {@link types.IConnectionActionParams} | Emitted when a client disconnects from the portal. |
 * | `portal.timeout` | {@link types.IConnectionActionParams} | Emitted when a client times out from the portal. |
 * | `portal.metadata.set` | {@link types.IGetMetadataActionParams} | Emitted when a client's metadata is set. |
 * | `portal.metadata.deleted` | {@link types.IDeleteMetadataActionParams} | Emitted when a client's metadata is deleted. |
 * | `portal.controller.set` | {@link types.ISetMetadataActionParams} | Emitted when a client's controller is set. |
 *
 *
 */
export const PortalMixin: types.TTauServiceConstructor = (mudSettings) => ({
  mixins: [ServiceMixin],
  settings: {
    defaultController: get(mudSettings, "portal.defaultController", "motd"),
  },

  hooks: {
    error: {
      async "*"(
        this: Service,
        ctx: Context<IPortalActionParams, IErrorMeta>,
        err
      ) {
        if (!ctx.meta.error) {
          await this.actions.write(
            {
              id: ctx.params.id,
              data: "Something went terribly wrong, please reconnect and try again later.",
            },
            { meta: { error: true } }
          );
        }
        this.logger.error(err, { connectionId: ctx.params.id });
      },
    },
  },

  actions: {
    deleteMetadata: {
      params: {
        id: "string",
      },
      hooks: {
        async after(this: Service, ctx: Context<{ id: string }>) {
          await this.broker.emit("portal.metadata.deleted", {
            id: ctx.params.id,
          });
        },
      },
    },

    getAllMetadata: {
      params: {
        id: "string",
      },
      async handler(
        this: Service,
        ctx: Context<IPortalGetMetadataActionParams>
      ) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
    },

    getMetadata: {
      params: {
        id: "string",
        key: "string",
      },
      async handler(this: Service, ctx: Context<{ id: string; key: string }>) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
    },

    mergeMetadata: {
      params: {
        id: "string",
        data: "object",
      },
      hooks: {
        async after(
          this: Service,
          ctx: Context<IPortalMergeMetadataActionParams>
        ) {
          for (const key of Object.keys(ctx.params.data)) {
            await this.broker.emit("portal.metadata.set", {
              id: ctx.params.id,
              key,
            });
          }
        },
      },
      async handler(
        this: ServiceBroker,
        ctx: Context<IPortalMergeMetadataActionParams>
      ) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
    },

    onConnect: {
      params: {
        id: "string",
      },
      visibility: "private",
      async handler(this: Service, ctx: Context<IPortalActionParams>) {
        return this.broker.emit("portal.connected", { id: ctx.params.id });
      },
      hooks: {
        async before(this: Service, ctx: Context<IPortalActionParams>) {
          return this.actions.setMetadata({
            id: ctx.params.id,
            key: "portal",
            value: this.name,
          });
        },
        async after(this: Service, ctx: Context<IPortalActionParams>) {
          await this.actions.writeLine({
            id: ctx.params.id,
            data: `Tau MUD Engine v${packageJson.version}`,
          });

          await ctx.call("connections.register", {
            id: ctx.params.id,
            portal: this.name,
          });

          return this.actions.setController({
            id: ctx.params.id,
            controller: this.settings.defaultController,
          });
        },
      },
    },

    onData: {
      params: {
        id: "string",
        data: "any",
      },
      visibility: "private",
      async handler(this: Service, ctx: Context<IPortalWriteActionParams>) {
        const metadata = await this.actions.getAllMetadata({
          id: ctx.params.id,
        });

        const controller = `controllers.${metadata.controller}`;

        const data = ctx.params.data.toString().split(/\r?\n/);

        for (const line of data) {
          if (line.length > 0) {
            await ctx.broker.call(`${controller}.receive`, {
              id: ctx.params.id,
              metadata,
              line,
            });
          }
        }
      },
    },

    onDisconnect: {
      params: {
        id: "string",
      },
      visibility: "private",
      async handler(this: Service, ctx: Context<IPortalActionParams>) {
        return this.broker.emit("portal.disconnected", { id: ctx.params.id });
      },
    },

    onTimeout: {
      params: {
        id: "string",
      },
      visibility: "private",
      async handler(this: Service, ctx: Context<IPortalActionParams>) {
        return this.broker.emit("portal.timeout", { id: ctx.params.id });
      },
    },

    setController: {
      params: {
        id: "string",
        controller: "string",
      },
      hooks: {
        async after(
          this: Service,
          ctx: Context<IPortalSetControllerActionParams>
        ) {
          return this.broker.emit("portal.controller.set", {
            id: ctx.params.id,
            controller: ctx.params.controller,
          });
        },
      },
      async handler(
        this: Service,
        ctx: Context<IPortalSetControllerActionParams>
      ) {
        const metadata = await this.actions.getAllMetadata({
          id: ctx.params.id,
        });

        let connection = {
          id: ctx.params.id,
          ...metadata,
        };

        if (metadata.controller) {
          await ctx.call(`controllers.${metadata.controller}.stop`, {
            id: ctx.params.id,
            connection,
          });
        }

        await this.actions.mergeMetadata({
          id: ctx.params.id,
          data: {
            controller: ctx.params.controller,
          },
        });

        connection.controller = ctx.params.controller;

        return ctx.call(`controllers.${ctx.params.controller}.start`, {
          id: ctx.params.id,
          connection,
        });
      },
    },

    setMetadata: {
      params: {
        id: "string",
        key: "string",
        value: "any",
      },
      hooks: {
        after(
          this: ServiceBroker,
          ctx: Context<{ id: string; key: string; value: any }>
        ) {
          this.broker.emit("portal.metadata.set", {
            id: ctx.params.id,
            key: ctx.params.key,
          });
        },
      },
      async handler(
        this: ServiceBroker,
        ctx: Context<{ id: string; key: string; value: any }>
      ) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
    },

    write: {
      params: {
        id: "string",
        data: "any",
      },
      async handler(
        this: ServiceBroker,
        ctx: Context<IPortalWriteActionParams>
      ) {
        throw new Errors.MoleculerError(
          "Not implemented",
          501,
          "NOT_IMPLEMENTED"
        );
      },
    },

    writeLine: {
      params: {
        id: "string",
        data: "any",
      },
      async handler(
        this: ServiceBroker,
        ctx: Context<IPortalWriteActionParams>
      ) {
        if (typeof ctx.params.data === "string") {
          ctx.params.data = Buffer.from(ctx.params.data + "\r\n");
        } else {
          ctx.params.data = Buffer.concat([
            ctx.params.data,
            Buffer.from("\r\n"),
          ]);
        }

        return this.actions.write({
          id: ctx.params.id,
          data: ctx.params.data,
        });
      },
    },

    writeLines: {
      params: {
        id: "string",
        data: "any",
      },
      async handler(
        this: ServiceBroker,
        ctx: Context<IPortalWriteActionParams>
      ) {
        const lines = ctx.params.data.toString().trim().split(/\r?\n/);

        for (const line of lines) {
          await this.actions.writeLine({
            id: ctx.params.id,
            data: line,
          });
        }
      },
    },
  },
  name: "portal",
});
