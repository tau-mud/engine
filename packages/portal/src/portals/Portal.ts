import {
  Context,
  Service,
  ServiceSchema,
  ServiceSettingSchema,
} from "moleculer";
import { service } from "@tau-mud/core";
/**
 * Represents the basic settings for a Portal service
 */
type TPortalSettingsSchema = ServiceSettingSchema & {
  /**
   * The name of the controller that a new session should start with.
   */
  startController?: string;
};

/**
 * The TSendActionParams is the type for the parameters for the send action.
 */
type TSendActionParams = {
  /**
   * The ID of the session to send data to.
   */
  id: string;

  /**
   * The data to send to the client.
   */
  data: string | Buffer;
};

/**
 * Represents the basic schema for a Portal service.
 */
export type TPortalServiceSchema = ServiceSchema<TPortalSettingsSchema>;

/**
 * This Moleculer Service mixin provides the base portal for a TauMUD game. Mix this into a Moleculer Service to create
 * a valid portal service. To implement a portal, it must call `this.registerSession` when a new connection is
 * established, and `this.remove` when a connection is closed.
 *
 * When a connection receives data, it should call `this.receiveFromConnection`.
 *
 * #### Actions
 * | Name | Params | Returns | Description | Overrideable |
 * | ---- | ------ | ------- | ----------- | ------------ |
 * | send | {@link TSendActionParams} | `Promise<void>` | The send action is called to send data to the client. | Yes |
 **/
export class Portal extends Service {
  name = "portal";

  @service.Action({
    params: {
      id: "string",
      data: "any",
    },
  })
  send(ctx: Context<TSendActionParams>) {
    throw new Error("Not implemented");
  }
  async registerSession(id: string) {
    return this.broker.call("session-manager.register", {
      id,
      portal: this.name,
    });
  }
  async removeSession(id: string) {
    return this.broker.call("session-manager.remove", { id });
  }
  async sendToConnection(id: string, data: string) {}
  async receiveFromConnection(id: string, data: string) {
    return this.broker.call("session-manager.receive", { id, data });
  }
}
