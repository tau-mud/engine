import Moleculer, {
  ActionSchema,
  Context,
  Errors,
  Service,
  ServiceActionsSchema,
  ServiceBroker,
  ServiceSchema,
} from "moleculer";
import { ITauServiceSchema, ServiceMixin } from "@tau-mud/core";
import {
  ISocketActionParams as IMoleculerTelnetSocketActionParams,
  IWriteActionParams as IMoleculerTelnetWriteActionParams,
  IGetMetadataActionParams as IMoleculerTelnetGetMetadataActionParams,
  ISetMetadataActionParams as IMoleculerTelnetSetMetadataActionParams,
  IGetAllMetadataActionParams as IMoleculerTelnetGetAllMetadataActionParams,
  IMergeMetadataActionParams as IMoleculerTelnetMergeMetadataActionParams,
  IDeleteMetadataActionParams as IMoleculerTelnetDeleteMetadataActionParams,
  IOnSocketDataActionParams as IMoleculerTelnetOnSocketDataActionParams,
} from "moleculer-telnet";
import { get } from "lodash";

const packageJson = require("../package.json");

interface IPortalActionSchema extends ServiceActionsSchema {
  write: ActionSchema;
  getMetadata: ActionSchema;
  setMetadata: ActionSchema;
}

interface IBasePortalServiceSchema extends ITauServiceSchema {
  actions: IPortalActionSchema;
}

/**
 * Implement this schema to create a portal service.
 */
export interface IPortalServiceSchema extends ITauServiceSchema {
  mixins: Array<ServiceSchema | ITauServiceSchema | Service>;
}

/**
 * The parameters for the {@link PortalMixin} `write` action.
 */
export interface IWriteActionParams {
  /**
   * The connection ID. This should be a UUID.
   */
  id: string;

  /**
   * Message to write to the connection.
   */
  data: string | Buffer;
}

/**
 * The parameters for the {@link PortalMixin} connection callbacks.
 */

/**
 * The parameters for the {@link PortalMixin} `getMetadata` action.
 */
export interface IGetMetadataActionParams {
  /**
   * The connection ID. This should be a UUID.
   */
  id: string;

  /**
   * The key to the metadata.
   */
  key: string;
}

/**
 * The parameters for the {@link PortalMixin} `setMetadata` action.
 */
export interface ISetMetadataActionParams {
  /**
   * The connection ID. This should be a UUID.
   */
  id: string;

  /**
   * The key to the metadata.
   */
  key: string;

  /**
   * The value to set the metadata to.
   */
  value: any;
}

/**
 * The parameters for the {@link PortalMixin} connection callbacks.
 */
export interface IConnectionActionParams
  extends IMoleculerTelnetSocketActionParams {}

/**
 * The parameters for the {@link PortalMixin} `write` actions.
 */
export interface IWriteActionParams extends IMoleculerTelnetWriteActionParams {}

/**
 * The parameters for the {@link PortalMixin} `getMetadata` action.
 */
export interface IGetMetadataActionParams
  extends IMoleculerTelnetGetMetadataActionParams {}

/**
 * The parameters for the {@link PortalMixin} `setMetadata` action.
 */
export interface ISetMetadataActionParams
  extends IMoleculerTelnetSetMetadataActionParams {}

/**
 * The parameters for the {@link PortalMixin} `getAllMetadata` action.
 */
export interface IGetAllMetadataActionParams
  extends IMoleculerTelnetGetAllMetadataActionParams {}

/**
 * The parameters for the {@link PortalMixin} `mergeMetadata` action.
 */
export interface IMergeMetadataActionParams
  extends IMoleculerTelnetMergeMetadataActionParams {}

/**
 * The `deleteMetadata` action parameters.
 */
export interface IDeleteMetadataActionParams
  extends IMoleculerTelnetDeleteMetadataActionParams {}

/**
 * The `onData` action parameters.
 */
export interface IOnDataActionParams
  extends IMoleculerTelnetOnSocketDataActionParams {}

/**
 * The parameters for the {@link PortalMixin} `setController` action.
 */
export interface ISetControllerActionParams extends IConnectionActionParams {
  /**
   * The name of the controller to set.
   */
  controller: string;
}

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
 * | `write` | {@link IWriteActionParams} | Writes data to the client. Does not append a newline. This action must be overridden by the service that mixes the PortalMixin. |
 * | `writeLine` | {@link IWriteActionParams} | Writes data to the client and appends a newline. |
 * | `writeLines` | {@link IWriteActionParams} | Accepts a message and breaks it up by line, writing each line to the client. |
 * | `onData` | {@link IConnectionActionParams} | Called when a client sends data to the portal. This action should be called by service that mixes the PortalMixin when a client sends data. |
 * | `onConnect` | {@link IConnectionActionParams} | Called when a client connects to the portal. This action should be called by service that mixes the PortalMixin when a client connects. |
 * | `onDisconnect` | {@link IConnectionActionParams} | Called when a client disconnects from the portal. This action should be called by service that mixes the PortalMixin when a client disconnects.  |
 * | `onTimeout` | {@link IConnectionActionParams} | Called when a client times out from the portal. This action should be called by service that mixes the PortalMixin when a client timeout occurs. |
 * | `getMetadata` | {@link IGetMetadataActionParams} | Gets the metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `getAllMetadata` | {@link IConnectionActionParams} | Gets all metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `setMetadata` | {@link ISetMetadataActionParams} | Sets the metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `deleteMetadata` | {@link IDeleteMetadataActionParams} | Deletes the metadata for the connection. The developer is responsible for implementing the method by which a connections metadata is stored and retrieved. |
 * | `setController` | {@link ISetMetadataActionParams} | Sets the controller for the connection. This will emit the `portal.controller.set` event. |
 *
 * #### Events
 * | Event | Parameters | Description |
 * | ----- | ---------- | ----------- |
 * | `portal.connected` | {@link IConnectionActionParams} | Emitted when a client connects to the portal. |
 * | `portal.disconnected` | {@link IConnectionActionParams} | Emitted when a client disconnects from the portal. |
 * | `portal.timeout` | {@link IConnectionActionParams} | Emitted when a client times out from the portal. |
 * | `portal.metadata.set` | {@link IGetMetadataActionParams} | Emitted when a client's metadata is set. |
 * | `portal.metadata.deleted` | {@link IDeleteMetadataActionParams} | Emitted when a client's metadata is deleted. |
 * | `portal.controller.set` | {@link ISetMetadataActionParams} | Emitted when a client's controller is set. |
 *
 *
 */
export const PortalMixin: IBasePortalServiceSchema = {
  mixins: [ServiceMixin],

  settings(mudSettings) {
    return {
      defaultController: get(mudSettings, "portal.defaultController", "motd"),
    };
  },

  hooks: {
    error: {
      async "*"(
        this: Service,
        ctx: Context<IConnectionActionParams, IErrorMeta>,
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
      async handler(this: Service, ctx: Context<IGetMetadataActionParams>) {
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
        async after(this: Service, ctx: Context<IMergeMetadataActionParams>) {
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
        ctx: Context<IMergeMetadataActionParams>
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
      async handler(this: Service, ctx: Context<IConnectionActionParams>) {
        return this.broker.emit("portal.connected", { id: ctx.params.id });
      },
      hooks: {
        async before(this: Service, ctx: Context<IConnectionActionParams>) {
          return this.actions.setMetadata({
            id: ctx.params.id,
            key: "portal",
            value: this.name,
          });
        },
        async after(this: Service, ctx: Context<IConnectionActionParams>) {
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
      async handler(this: Service, ctx: Context<IWriteActionParams>) {
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
      async handler(this: Service, ctx: Context<IConnectionActionParams>) {
        return this.broker.emit("portal.disconnected", { id: ctx.params.id });
      },
    },

    onTimeout: {
      params: {
        id: "string",
      },
      visibility: "private",
      async handler(this: Service, ctx: Context<IConnectionActionParams>) {
        return this.broker.emit("portal.timeout", { id: ctx.params.id });
      },
    },

    setController: {
      params: {
        id: "string",
        controller: "string",
      },
      hooks: {
        async after(this: Service, ctx: Context<ISetControllerActionParams>) {
          return this.broker.emit("portal.controller.set", {
            id: ctx.params.id,
            controller: ctx.params.controller,
          });
        },
      },
      async handler(this: Service, ctx: Context<ISetControllerActionParams>) {
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
      async handler(this: ServiceBroker, ctx: Context<IWriteActionParams>) {
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
      async handler(this: ServiceBroker, ctx: Context<IWriteActionParams>) {
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
      async handler(this: ServiceBroker, ctx: Context<IWriteActionParams>) {
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
};
