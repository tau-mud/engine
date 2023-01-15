import MoleculerTelnet, {
  IMoleculerTCPHandleDataParams,
} from "moleculer-telnet";
import { Context, Service } from "moleculer";
import { service } from "@tau-mud/core";

import { Portal } from "./Portal";

/**
 * The TelnetPortal is a Portal that uses the Moleculer Telnet service to provide a Telnet interface to the game. The
 * TelnetPortal supports multiple Telnet based protocols including full unicode and [NAWS](https://tools.ietf.org/html/rfc1073).
 * support.
 */
export class TelnetPortal extends Service {
  name = "telnet-portal";
  mixins = [MoleculerTelnet, Portal];

  settings = {
    host: process.env.TAU_TELNET_HOST || "127.0.0.1",
    port: process.env.TAU_TELNET_PORT || 2323,
    ttype: true,
    charset: true,
    async afterConnect(this: Service, id: string): Promise<void> {
      try {
        return this.broker.call("session-manager.register", {
          id,
          portal: this.name,
        });
      } catch (e) {
        this.logger.error(e);
        return this.actions.send({
          id,
          data: "Something went terribly wrong.",
        });
      }
    },
  };
  @service.Action()
  handleData(ctx: Context<IMoleculerTCPHandleDataParams>): Promise<void> {
    return this.receiveFromConnection(ctx.params.id, ctx.params.data);
  }

  @service.Action()
  send(ctx: Context<{ id: string; data: string }>) {
    return this.sendToConnection(ctx.params.id, ctx.params.data);
  }
}
