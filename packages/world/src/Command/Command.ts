import { IControllerContext, IControllerReceiveActionParams } from "mixins";
import { compose } from "underscore";
import { CommandContext } from "./CommandContext";

import { ICommandSchema, TCommandExecutor } from "./ICommandSchema";

/**
 * @private
 */
export class Command {
  readonly schema: ICommandSchema;
  readonly regex: RegExp;
  readonly match: string;
  readonly exec: TCommandExecutor;
  readonly name: string;
  readonly aliases: Array<string>;

  constructor(command: ICommandSchema) {
    this.schema = command;
    this.match = command.match.replace(/^\^/, "").replace(/\$$/, "");

    this.name = command.match.split(" ")[0];

    this.regex = new RegExp(`^${command.match}$`, "i");

    let execFunc = command.exec;

    if (command.mixins && command.mixins.length > 0) {
      command.mixins.forEach((mixin) => {
        execFunc = <TCommandExecutor>compose(execFunc, mixin.exec);
      });
    }

    this.exec = execFunc;
    this.aliases = command.aliases;
  }

  async run(
    match: string,
    ctx: IControllerContext<IControllerReceiveActionParams>
  ): Promise<boolean> {
    const params = this.parseCommand(match);

    if (Object.keys(params).length === 0) {
      return false;
    }

    const commandContext = new CommandContext(
      match,
      params,
      ctx.broker.getLocalService(
        `controllers.${ctx.meta.connection.controller}`
      ),
      ctx
    );

    return this.exec(commandContext);
  }

  parseCommand(command: string): Record<string, string> {
    const match = command.match(this.regex);

    const params: Record<string, string> = {};

    if (match && match.groups) {
      const groups = match.groups;

      Object.keys(groups).forEach((key) => {
        params[key] = groups[key];
      });

      return params;
    }

    return {};
  }
}
