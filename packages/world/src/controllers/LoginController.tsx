import React from "react";

import { Controller } from "../mixins";
import { Box, Text } from "../screen";
import { Service } from "moleculer";
import {
  IControllerActionParams,
  IControllerContext,
  IControllerReceiveActionParams,
} from "../types";

export const LoginController = {
  name: "controllers.login",
  mixins: [Controller],
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
    async receive(
      this: Service,
      ctx: IControllerContext<IControllerReceiveActionParams>
    ) {
      const accounts = await ctx.call("data.accounts.find", {
        limit: 1,
        query: {
          username: ctx.params.data.trim(),
        },
      });
    },
  },
};
