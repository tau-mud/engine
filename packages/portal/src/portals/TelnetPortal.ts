import { MoleculerTelnet } from "moleculer-telnet";

import {
  PortalMixin,
  IPortalServiceSchema,
  IConnectionActionParams,
  IWriteActionParams,
  IOnDataActionParams,
} from "../PortalMixin";
import { ISettings } from "@tau-mud/core/lib/config";
import { get } from "lodash";
import { Context } from "moleculer";

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
export const TelnetPortal: IPortalServiceSchema = {
  name: "telnet-portal",
  mixins: [MoleculerTelnet, PortalMixin],

  settings(mudSettings: ISettings): ISettings {
    return {
      host: get(mudSettings, "telnet.host", "127.0.0.1"),
      port: get(mudSettings, "telnet.port", 2323),
      ttype: get(mudSettings, "telnet.ttype", true),
      charset: get(mudSettings, "telnet.charset", "UTF-8"),
    };
  },

  actions: {
    write: {
      handler(ctx: Context<IWriteActionParams>) {
        const { id, data } = ctx.params;

        return this.actions.socketWrite({ id, data: ctx.params.data });
      },
    },

    onSocketData: {
      hooks: {
        after(ctx: Context<IOnDataActionParams>) {
          return this.actions.onData({
            id: ctx.params.id,
            data: ctx.params.data,
          });
        },
      },
    },
    //
    // onServerConnection: {
    //   hooks: {
    //     async after(ctx: Context<IConnectionActionParams>) {
    //       return this.actions.onConnect({ id: ctx.params.id });
    //     },
    //   },
    // },

    onSocketClose: {
      hooks: {
        async after(ctx: Context<IConnectionActionParams>) {
          return this.actions.onDisconnect({ id: ctx.params.id });
        },
      },
    },

    onSocketTelnetNegotiationsComplete: {
      hooks: {
        async after(ctx: Context<IConnectionActionParams>) {
          return this.actions.onConnect({ id: ctx.params.id });
        },
      },
    },

    onSocketTimeout: {
      hooks: {
        async after(ctx: Context<IConnectionActionParams>) {
          return this.actions.onTimeout({ id: ctx.params.id });
        },
      },
    },
  },
};
