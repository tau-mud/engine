import { Command } from "Command/Command";
import { CommandContext } from "Command/CommandContext";
import { IControllerContext, IControllerReceiveActionParams } from "mixins";

import { ICommandSetSchema } from "./ICommandSetSchema";

export class CommandSet {
  readonly indexedCommands: Record<string, Command> = {};

  /**
   * @param schema the CommandSet schema
   */
  constructor(schema: ICommandSetSchema) {
    const mixedCommands: Array<Command> = [];

    if (schema.mixins) {
      schema.mixins.forEach((mixin) => {
        const set = new CommandSet(mixin);
        Object.keys(set.indexedCommands).forEach((command) => {
          mixedCommands.push(set.indexedCommands[command]);
        });
      });
    }

    schema.commands.forEach((commandSchema) => {
      const command = new Command(commandSchema);
      command.aliases.forEach((alias) => {
        this.indexedCommands[alias] = command;
      });
    });
  }

  /**
   * @param command the command string passed to the game world.
   * @param ctx the Contoller's action call context.
   */
  async exec(
    command: string,
    ctx: IControllerContext<IControllerReceiveActionParams>
  ) {
    const cmd = this.indexedCommands[command];

    if (!cmd) {
      return false;
    }

    const params = cmd.parseCommand(command);

    const connection = ctx.meta.connection;

    const commandContext = new CommandContext(
      command,
      params,
      ctx.broker.getLocalService(`controllers.${connection.controller}`),
      ctx
    );

    return cmd.exec(commandContext);
  }
}
