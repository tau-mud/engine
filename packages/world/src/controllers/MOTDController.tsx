import React from "react";

import {
  Controller,
  IControllerActionParams,
  IControllerContext,
} from "../mixins";
import { Box, Text, GameName } from "../screen";
import { ITauServiceSchema } from "@tau-mud/core";

export const MOTDController: ITauServiceSchema = {
  name: "controllers.motd",
  mixins: [Controller],
  templates: {
    motd() {
      return (
        <Box padding={1} full height={20}>
          <Box border full center>
            <Text>
              Tau <GameName>MUD</GameName> Engine
            </Text>
          </Box>
        </Box>
      );
    },
  },
  actions: {
    async start(ctx: IControllerContext<IControllerActionParams>) {
      // wait a second so negotiations can complete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await this.actions.renderTemplate({
        id: ctx.params.id,
        template: "motd",
      });

      return ctx.call("connections.setController", {
        id: ctx.params.id,
        controller: "login",
      });
    },
    stop() {},
  },
};
