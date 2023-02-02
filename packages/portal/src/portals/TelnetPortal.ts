import { MoleculerTelnet } from "moleculer-telnet";

import {
  IPortalServiceSchema,
  IPortalActionParams,
  IPortalWriteActionParams,
  IPortalOnDataActionParams,
  TPortalServiceConstructor,
  IPortalSettings,
} from "../types";

import { PortalMixin } from "../mixins";
import { get } from "lodash";
import { Context, Service } from "moleculer";
import { types } from "@tau-mud/core";

// @ts-ignore
/**
 * The TelnetPortal is a portal that allows players to connect to the MUD via telnet. The TelnetPortal utilizes the
 * [moleculer-telnet](https://github.com/fugufish/moleculer-telnet) mixin to provide the telnet functionality.
 *
 * #### Settings
 * | Key | Default | MUD Setting | Description |
 * | --- | ------- | ----------- | ----------- |
 * | `port` | `2323` | `telnet.port` | The port to listen on. |
 * | `host` | `127.0.0.1` | `telnet.host` | The host to listen on. |
 * | `ttype` | `true` | `telnet.ttype` | Whether to send the telnet terminal type. |
 * | `charset` | `UTF-8` | `telnet.charset` | The charset to send to the client. |
 */
export const TelnetPortal: TPortalServiceConstructor = (
  mudSettings: Partial<IPortalSettings>
): IPortalServiceSchema => ({
  name: "telnet-portal",
  mixins: [MoleculerTelnet, PortalMixin],

  settings: {
    host: get(mudSettings, "telnet.host", "127.0.0.1"),
    port: get(mudSettings, "telnet.port", 2323),
    ttype: get(mudSettings, "telnet.ttype", true),
    charset: get(mudSettings, "telnet.charset", "UTF-8"),
  },

  // we can ignore this because the metadata actions are mixed in from teh MoleculerTelnet mixin
  // @ts-ignore
  actions: {
    write: {
      handler(this: Service, ctx: Context<IPortalWriteActionParams>) {
        const { id, data } = ctx.params;

        return this.actions.socketWrite({ id, data: ctx.params.data });
      },
    },

    onSocketData: {
      hooks: {
        after(this: Service, ctx: Context<IPortalOnDataActionParams>) {
          return this.actions.onData({
            id: ctx.params.id,
            data: ctx.params.data,
          });
        },
      },
    },

    onSocketClose: {
      hooks: {
        async after(this: Service, ctx: Context<IPortalActionParams>) {
          return this.actions.onDisconnect({ id: ctx.params.id });
        },
      },
    },

    onSocketTelnetNegotiationsComplete: {
      hooks: {
        async after(this: Service, ctx: Context<IPortalActionParams>) {
          return this.actions.onConnect({ id: ctx.params.id });
        },
      },
    },

    onSocketTimeout: {
      hooks: {
        async after(this: Service, ctx: Context<IPortalActionParams>) {
          return this.actions.onTimeout({ id: ctx.params.id });
        },
      },
    },
  },
});
