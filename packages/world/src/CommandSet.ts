import { Command } from "./Command";
import { IControllerContext, IControllerReceiveActionParams } from "./mixins";

export class CommandSet {
  readonly commands: Record<string, typeof Command> = {};

  private readonly indexedCommands: Record<string, Command> = {};

  mixins: CommandSet[] = [];

  constructor() {
    // Add commands from all mixins
    this.mixins.forEach((mixin) => {
      Object.values(mixin.commands).forEach((command) => {
        if (!(command.name in this.commands)) {
          this.commands[command.name] = command;
        }
      });
    });

    // Add commands from the top-level CommandSet
    Object.values(this.commands).forEach((command) => {
      const cmd = new command();
      cmd.aliases.forEach((alias) => {
        this.indexedCommands[alias] = cmd;
      });
    });
  }

  async exec(
    command: string,
    ctx: IControllerContext<IControllerReceiveActionParams>
  ) {
    const cmd = this.indexedCommands[command];

    if (!cmd) {
      return false;
    }

    return cmd.exec(command, ctx);
  }
}
