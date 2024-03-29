import { ITauServiceSchema } from "@tau-mud/core";

import {
  Controller,
  IControllerContext,
  IControllerReceiveActionParams,
} from "./Controller";
import { Errors } from "moleculer";

export const CommandController: ITauServiceSchema = {
  name: "command",
  mixins: [Controller],

  actions: {
    receive: {
      async handler(ctx: IControllerContext<IControllerReceiveActionParams>) {
        const { data } = ctx.params;

        const command = data.trim();

        const success = await ctx.call("command-sets.execute", {
          id: ctx.params.id,
          command,
        });

        if (!success) {
          return this.actions.fallback(ctx.params);
        }

        return true;
      },
    },
    fallback: {
      params: {
        id: "string",
        data: "string",
      },
      async handler(ctx: IControllerContext<IControllerReceiveActionParams>) {
        throw new Errors.MoleculerError("No command found.", 404, "NOT_FOUND");
      },
    },
  },
};
