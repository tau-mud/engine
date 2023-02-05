import React from "react";

import { Controller } from "../mixins";
import { Box, Text, GameName } from "../screen";
import { types } from "@tau-mud/core";
import { IControllerActionParams, IControllerContext } from "../types";

export const MOTDController: types.ITauServiceSchema = {
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
