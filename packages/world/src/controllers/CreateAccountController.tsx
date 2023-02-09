import { ITauServiceSchema } from "@tau-mud/core";
import React from "react";
import { Context, Service } from "moleculer";

import {
  Controller,
  IControllerActionParams,
  IControllerContext,
  IControllerReceiveActionParams,
} from "../mixins";

import { Box, CTA, Table, Text, UserError } from "../screen";

interface IAccountDetails {
  account: {
    username: string;
    email: string;
  };
}

export const CreateAccountController: ITauServiceSchema = {
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
    confirmationPrompt(props: IAccountDetails) {
      const data = [
        ["Username:", props.account.username],
        ["Email:", props.account.email],
      ];

      return (
        <Box padding={1} flexDirection={"column"}>
          <Box>
            <Text>Review your account details:</Text>
          </Box>
          <Table data={data} />
          <Box paddingTop={1}>
            <Text>
              Is this correct? (<CTA>Y</CTA>/<CTA>N</CTA>)
            </Text>
          </Box>
        </Box>
      );
    },
    accountCreated() {
      return (
        <Box>
          <Text>Your account was created!</Text>
        </Box>
      );
    },
  },
  actions: {
    async start(
      this: Service,
      ctx: IControllerContext<IControllerActionParams>
    ) {
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

    async receive(
      this: Service,
      ctx: IControllerContext<IControllerReceiveActionParams>
    ) {
      const flash: Record<string, any> = await ctx.call(
        "connections.getAllFlash",
        {
          id: ctx.params.id,
        }
      );

      if (flash.step === "confirmation") {
        if (
          ctx.params.data.toLowerCase() === "y" ||
          ctx.params.data.toLowerCase() === "yes"
        ) {
          await ctx.call("accounts.create", flash.account);
          await this.actions.renderTemplate({
            id: ctx.params.id,
            template: "accountCreated",
          });

          return ctx.call("connections.setController", {
            id: ctx.params.id,
            controller: "login",
          });
        } else if (
          ctx.params.data.toLowerCase() === "n" ||
          ctx.params.data.toLowerCase() === "no"
        ) {
          await ctx.call("connections.replaceFlash", {
            id: ctx.params.id,
            data: {
              step: "username",
            },
          });

          return this.renderNextStep(ctx.params.id);
        } else {
          await this.actions.render({
            id: ctx.params.id,
            content: () => <UserError>That is not a valid option.</UserError>,
          });

          return this.renderNextStep(ctx.params.id);
        }
      }

      const step: string = flash.step;
      let account: Record<string, any> = flash.account || {};

      account = {
        ...account,
        [step]: ctx.params.data,
      };

      const validation: string = await ctx.call("accounts.validate", {
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
          flash.step = "confirmation";
          break;
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
