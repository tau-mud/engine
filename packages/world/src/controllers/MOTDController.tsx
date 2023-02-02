import React from "react";

import { ITauServiceSchema } from "@tau-mud/core";
import {
  ControllerMixin,
  IActionParams,
  IControllerContext,
} from "../mixins/ControllerMixin";
import { Box, Text } from "../screen";
import { GameName } from "../screen/GameName";

export const MOTDController: ITauServiceSchema = {
  name: "controllers.motd",
  mixins: [ControllerMixin],
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
    async start(ctx: IControllerContext<IActionParams>) {
      // wait a second so negotiations can complete
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await this.actions.render({
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
