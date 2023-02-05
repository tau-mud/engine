import React from "react";

import { Controller } from "../mixins";
import { Box, Send, Text } from "../screen";
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
            Enter your username or type{" "}
            <Send href={"create"} hint={"Create a new character"}>
              create
            </Send>{" "}
            to create a new account:
          </Text>
        </Box>
      );
    },
  },
  actions: {
    async start(
      this: Service,
      ctx: IControllerContext<IControllerActionParams>
    ) {
      return this.actions.renderTemplate({
        id: ctx.params.id,
        template: "loginPrompt",
      });
    },
    async receive(
      this: Service,
      ctx: IControllerContext<IControllerReceiveActionParams>
    ) {
      if (ctx.params.data === "create") {
        return ctx.call("connections.setController", {
          id: ctx.params.id,
          controller: "createAccount",
        });
      }
    },
  },
};
