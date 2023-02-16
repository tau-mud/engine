import { Service, ServiceBroker } from "moleculer";
import { IControllerContext, IControllerReceiveActionParams } from "./mixins";

export class CommandContext {
  readonly commandString: string;
  readonly params: Record<string, string>;
  readonly controller: Service;
  readonly broker: ServiceBroker;
  readonly connectionContext: IControllerContext<IControllerReceiveActionParams>;
  readonly connectionId: string;

  constructor(
    commandString: string,
    params: Record<string, string>,
    controller: Service,
    connectionContext: IControllerContext<IControllerReceiveActionParams>
  ) {
    this.commandString = commandString;
    this.params = params;
    this.controller = controller;
    this.broker = controller.broker;
    this.connectionContext = connectionContext;
    this.connectionId = connectionContext.params.id;
  }

  call(action: string, params: Record<string, any>) {
    return this.connectionContext.call(action, params);
  }
}

export class Command {
  readonly match: string = "";
  readonly aliases: string[] = [];

  private readonly regex: RegExp;

  constructor() {
    if (this.match === "") {
      throw new Error("Command match is required");
    }

    // remove ^ and $, add them programmatically later
    const strippedMatch = this.match.replace(/^\^/, "").replace(/\$$/, "");

    this.aliases.push(strippedMatch.split(" ")[0]);

    this.regex = new RegExp(`^${strippedMatch}$`, "i");
  }

  async exec(
    command: string,
    ctx: IControllerContext<IControllerReceiveActionParams>
  ) {
    const params = this.isMatch(command);

    if (Object.keys(params).length === 0) {
      return false;
    }

    const commandContext = new CommandContext(
      command,
      params,
      await ctx.broker.getLocalService(
        `controllers.${ctx.meta.connection.controller}`
      ),
      ctx
    );

    return this.run(commandContext);
  }

  async run(context: CommandContext): Promise<boolean> {
    throw new Error("Not implemented");
  }

  private isMatch(command: string): Record<string, string> {
    const match = this.regex.exec(command);

    if (match === null || match.groups === undefined) {
      return {};
    }

    return match.groups;
  }
}
