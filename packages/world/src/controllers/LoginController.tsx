import React from "react";

import {
  ControllerMixin,
  IActionParams,
  IControllerContext,
} from "../mixins/ControllerMixin";
import { Box, Text } from "../screen";
import { Service } from "moleculer";

export const LoginController = {
  name: "controllers.login",
  mixins: [ControllerMixin],
  templates: {
    loginPrompt() {
      return (
        <Box>
          <Text>
            Enter your username or type create to create a new account:
          </Text>
        </Box>
      );
    },
  },
  actions: {
    start(this: Service, ctx: IControllerContext<IActionParams>) {
      this.actions.render({
        id: ctx.params.id,
        template: "loginPrompt",
      });
    },
    receive(this: Service, ctx: IControllerContext<IActionParams>) {
      this.logger.info("Received input: ", ctx.params);
    },
  },
};
