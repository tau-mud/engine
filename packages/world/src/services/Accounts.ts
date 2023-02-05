import {
  IAccountsValidateActionParams,
  TValidationErrors,
  TWorldServiceConstructor,
} from "../types";
import { Mongo } from "../mixins";
import { Account } from "../models";
import { Context } from "moleculer";
import { Error } from "mongoose";

export const Accounts: TWorldServiceConstructor = (mudSettings) => ({
  name: "data.accounts",
  mixins: [Mongo],
  model: Account,
  actions: {
    validate: {
      async handler(ctx: Context<IAccountsValidateActionParams>) {
        const account = new Account(ctx.params.account);

        const errors: Record<string, string> = await new Promise((resolve) => {
          return account
            .validate()
            .then(() => resolve({}))
            .catch((err: Error.ValidationError) => {
              const errors: Record<string, string> = {};

              Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
              });

              resolve(errors);
            });
        });

        return errors[ctx.params.field];
      },
    },
  },
});
