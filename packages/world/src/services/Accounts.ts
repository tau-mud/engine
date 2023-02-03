import { TWorldServiceConstructor } from "../types";
import { Mongo } from "../mixins";
import * as mongoose from "mongoose";

export const Accounts: TWorldServiceConstructor = (mudSettings) => ({
  name: "data.accounts",
  mixins: [Mongo],
  model: mongoose.model(
    "Account",
    new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      hashedPassword: {
        type: String,
      },
    })
  ),
});
