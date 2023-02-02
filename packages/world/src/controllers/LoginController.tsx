import React from "react";

import { ControllerMixin } from "../mixins";
import { Box, Text } from "../screen";
import { Service } from "moleculer";
import { IControllerActionParams, IControllerContext } from "../types";

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
    start(this: Service, ctx: IControllerContext<IControllerActionParams>) {
      this.actions.render({
        id: ctx.params.id,
        template: "loginPrompt",
      });
    },
    receive(this: Service, ctx: IControllerContext<IControllerActionParams>) {
      this.logger.info("Received input: ", ctx.params);
    },
  },
};
