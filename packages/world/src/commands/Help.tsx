import { Command, CommandContext } from "../Command";
import React from "react";
import { UserError } from "../screen";

export class Help extends Command {
  readonly match = "help (?<subject>.*)";
  readonly aliases = ["h"];

  async run(ctx: CommandContext) {
    const didRender = await ctx.connectionContext.call("helps.render", {
      id: ctx.connectionId,
      subject: ctx.params.subject,
    });

    if (!didRender) {
      await ctx.controller.actions.render({
        id: ctx.connectionId,
        content: (
          <UserError>
            Sorry, a help for the subject {ctx.params.subject} could not be
            found.
          </UserError>
        ),
      });
    }

    return true;
  }
}
