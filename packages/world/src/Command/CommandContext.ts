import { IControllerContext, IControllerReceiveActionParams } from "mixins";
import { Service, ServiceBroker } from "moleculer";

/**
 * The CommandContext is passed to a command.
 */
export class CommandContext {
  /**
   * The string that matched the command.
   */
  readonly match: string;

  /**
   * The parameters that were extracted from the command string.
   */
  readonly params: Record<string, string>;

  /**
   * The controller that the command was called from.
   */
  readonly controller: Service;

  /**
   * The [Moleculer Service Broker](https://moleculer.services/docs/0.14/broker.html) instance.
   */
  readonly broker: ServiceBroker;

  /**
   * The connection context that the command was called from.
   */
  readonly connectionContext: IControllerContext<IControllerReceiveActionParams>;

  /**
   * The connection ID that the command was called from.
   */
  readonly connectionId: string;

  /**
   * @param match The string that matched the command.
   * @param params The parameters that were extracted from the command string.
   * @param controller The controller that the command was called from.
   * @param connectionContext The connection context that the command was called from.
   */
  constructor(
    match: string,
    params: Record<string, string>,
    controller: Service,
    connectionContext: IControllerContext<IControllerReceiveActionParams>
  ) {
    this.match = match;
    this.params = params;
    this.controller = controller;
    this.broker = controller.broker;
    this.connectionContext = connectionContext;
    this.connectionId = connectionContext.params.id;
  }

  /**
   * Call an action. This call uses the existing connection context.
   *
   * @param action The action to call.
   * @param params The parameters to pass to the action.
   */
  call(action: string, params: Record<string, any>) {
    return this.connectionContext.call(action, params);
  }
}
