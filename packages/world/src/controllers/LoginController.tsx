import React from "react";

import {
  Controller,
  IControllerActionParams,
  IControllerContext,
  IControllerReceiveActionParams,
} from "../mixins";
import { Box, CTA, Send, Text } from "../screen";
import { Service } from "moleculer";
import { Account } from "../models";

export const LoginController = {
  name: "controllers.login",
  mixins: [Controller],
  templates: {
    usernamePrompt() {
      return (
        <Box>
          <Text>
            Enter your username or type <CTA>create</CTA> to create a new
            account:
          </Text>
        </Box>
      );
    },
    passwordPrompt() {
      return (
        <Box>
          <Text>Enter your password:</Text>
        </Box>
      );
    },
    loginFailed() {
      return (
        <Box>
          <Text>Invalid username or password.</Text>
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
        template: "usernamePrompt",
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

      let flash: Record<string, any> = await ctx.call(
        "connections.getAllFlash",
        {
          id: ctx.params.id,
        }
      );

      if (!flash.step) {
        flash.step = "username";
      }

      if (flash.step === "password") {
        const accountRecords = (await ctx.call("accounts.find", {
          query: {
            usernameStub: flash.account.usernameStub,
          },
          limit: 1,
        })) as Array<Record<string, any>>;

        const accountObject = accountRecords[0];

        if (!accountObject) {
          await this.actions.renderTemplate({
            id: ctx.params.id,
            template: "loginFailed",
          });

          flash.step = "username";
        } else {
          const accountRecord = new Account(accountObject);

          const isMatch = accountRecord.comparePassword(ctx.params.data);

          if (isMatch) {
            return ctx.call("connections.setController", {
              id: ctx.params.id,
              controller: "create-character",
            });
          } else {
            await this.actions.renderTemplate({
              id: ctx.params.id,
              template: "loginFailed",
            });

            flash.step = "username";
          }
        }
      } else {
        const account: Record<string, any> = flash.account || {};

        account[flash.step] = ctx.params.data;

        flash.account = account;

        switch (flash.step) {
          case "username":
            flash.step = "password";
        }
      }

      await ctx.call("connections.replaceFlash", {
        id: ctx.params.id,
        data: flash,
      });

      return this.renderStep(ctx, flash);
    },
  },
  methods: {
    async renderStep(
      this: Service,
      ctx: IControllerContext<IControllerActionParams>,
      flash: Record<string, any>
    ) {
      return this.actions.renderTemplate({
        id: ctx.params.id,
        template: `${flash.step}Prompt`,
      });
    },
  },
};
