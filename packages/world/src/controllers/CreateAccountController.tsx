import { types } from "@tau-mud/core";
import { Controller } from "../mixins";
import React from "react";
import { Box, Text, UserError } from "../screen";
import { Context, Service, Errors, GenericObject } from "moleculer";

import {
  IControllerActionParams,
  IControllerReceiveActionParams,
} from "../types";
import { hash } from "bcrypt";

export const CreateAccountController: types.ITauServiceSchema = {
  name: "controllers.createAccount",
  mixins: [Controller],
  templates: {
    usernamePrompt() {
      return (
        <Box>
          <Text>What is your preferred username?</Text>
        </Box>
      );
    },
    emailPrompt() {
      return (
        <Box>
          <Text>What is your email address?</Text>
        </Box>
      );
    },
    passwordPrompt() {
      return (
        <Box>
          <Text>What is your password?</Text>
        </Box>
      );
    },
    passwordConfirmationPrompt() {
      return (
        <Box>
          <Text>Confirm your password:</Text>
        </Box>
      );
    },
  },
  actions: {
    async start(this: Service, ctx: Context<IControllerActionParams>) {
      await ctx.call("connections.setFlash", {
        id: ctx.params.id,
        key: "step",
        value: "username",
      });

      return this.actions.renderTemplate({
        id: ctx.params.id,
        template: "usernamePrompt",
      });
    },

    async receive(this: Service, ctx: Context<IControllerReceiveActionParams>) {
      const flash: Record<string, any> = await ctx.call(
        "connections.getAllFlash",
        {
          id: ctx.params.id,
        }
      );

      const step: string = flash.step;
      let account: Record<string, any> = flash.account || {};

      account = {
        ...account,
        [step]: ctx.params.data,
      };

      const validation: string = await ctx.call("data.accounts.validate", {
        field: step,
        account: account,
      });

      if (validation) {
        await this.actions.render({
          id: ctx.params.id,
          content: () => <UserError>{validation}</UserError>,
        });

        if (step === "passwordConfirmation") {
          flash.step = "password";
          delete flash.account.password;

          await ctx.call("connections.replaceFlash", {
            id: ctx.params.id,
            data: flash,
          });
        }

        return this.renderNextStep(ctx.params.id);
      }

      flash.account = account;

      switch (step) {
        case "username":
          flash.step = "email";
          break;
        case "email":
          flash.step = "password";
          break;
        case "password":
          flash.step = "passwordConfirmation";
          break;
        case "passwordConfirmation":
          return this.actions.send({
            id: ctx.params.id,
            data: "Account valid",
          });
      }

      await ctx.call("connections.replaceFlash", {
        id: ctx.params.id,
        data: flash,
      });

      return this.renderNextStep(ctx.params.id);
    },
  },
  methods: {
    async renderNextStep(id: string) {
      const flash: Record<string, any> = await this.broker.call(
        "connections.getAllFlash",
        {
          id,
        }
      );

      return this.actions.renderTemplate({
        id,
        template: `${flash.step}Prompt`,
        props: flash,
      });
    },
  },
};
