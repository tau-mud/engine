import { ITauServiceSchema } from "@tau-mud/core";
import { Context, Errors } from "moleculer";

import { CommandSet } from "../CommandSet";
import { ConnectionMetadataLoader } from "../mixins";
import { IControllerActionParams, IControllerContext } from "../mixins";

interface ICommandSetServiceSchema extends ITauServiceSchema {
  commandSets?: Record<string, CommandSet>;
}

interface ICommandSetsRegisterActionParams {
  commandSet: typeof CommandSet;
}

interface ICommandSetsExecuteActionParams extends IControllerActionParams {
  command: string;
}

export const Commands: ITauServiceSchema = {
  name: "commands",
  created(this: ICommandSetServiceSchema) {
    this.commandSets = {};
  },
  mixins: [ConnectionMetadataLoader],

  actions: {
    registerCommandSet: {
      params: {
        commandSet: "any",
      },
      privacy: "protected",
      async handler(ctx: Context<ICommandSetsRegisterActionParams>) {
        const { commandSet } = ctx.params;

        if (this.commandSets[commandSet.name]) {
          this.logger.warn(
            "Command set already registered, it will be replaced",
            commandSet.name
          );
        }

        this.commandSets[commandSet.name] = new commandSet();
      },
    },
    execute: {
      params: {
        id: "string",
        command: "string",
      },
      privacy: "protected",
      async handler(ctx: IControllerContext<ICommandSetsExecuteActionParams>) {
        const { command } = ctx.params;

        if (!ctx.meta.connection) {
          throw new Errors.MoleculerError(
            "No connection context provided.",
            500,
            "NO_CONNECTION_CONTEXT"
          );
        }

        const commandSet = ctx.meta.connection.commandSet;

        if (!commandSet) {
          throw new Errors.MoleculerError(
            "No command set provided.",
            500,
            "NO_COMMAND_SET"
          );
        }

        const commandSetInstance = this.commandSets[commandSet];

        if (!commandSetInstance) {
          return false;
        }

        return commandSetInstance.exec(command, ctx);
      },
    },
  },
};
