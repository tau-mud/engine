import mongoose from "mongoose";
import Validator from "fastest-validator";
import bcrypt from "bcrypt";
import { Schema, HydratedDocument } from "mongoose";

const emailValidator = new Validator().compile({ email: "email" });

interface IAccount {
  username: string;
  usernameStub: string;
  email: string;
  passwordHash: string;
  _password: string;
  _passwordConfirmation: string;
  password: string;
  passwordConfirmation: string;
  comparePassword: (password: string) => boolean;
}

const SCHEMA = new mongoose.Schema<IAccount>({
  // @ts-ignore
  username: {
    type: String,
    required: [true, "The username is required."],
    // Typescript definition is not compatible with the unique validator plugin.
    unique: [true, "That username has already been taken."],
    min: [4, "The username must be at least 4 characters long."],
    max: [24, "The username must be at most 24 characters long."],
    pattern: [
      "^[a-z0-9]+[a-z0-9_\\-]*[a-z0-9]+$",
      "The username is invalid. It may only be alphanumeric or have dashes or underscores. It may not start or end with a dash or underscore.",
    ],
  },
  // @ts-ignore
  usernameStub: {
    type: String,
    unique: "That username has already been taken.",
  },
  // @ts-ignore
  email: {
    type: String,
    required: [true, "The email address is required."],
    // Typescript definition is not compatible with the unique validator plugin.
    unique: [true, "The email should be unique."],
    validate: [
      (email: string) => {
        const validation = emailValidator({ email });

        if (validation === true) {
          return;
        }

        return validation;
      },
      "The email address is invalid.",
    ],
  },
  passwordHash: {
    type: String,
    required: true,
  },
});

SCHEMA.plugin(require("mongoose-unique-validator"));

SCHEMA.virtual("password")
  .set(function (this: HydratedDocument<IAccount>, password: string) {
    // @ts-ignore
    this._password = password;
    const salt = bcrypt.genSaltSync(10);
    this.passwordHash = bcrypt.hashSync(this._password as string, salt);
  })
  .get(function (this: HydratedDocument<IAccount>) {
    return this._password;
  });

SCHEMA.virtual("passwordConfirmation")
  .set(function (this: HydratedDocument<IAccount>, password: string) {
    this._passwordConfirmation = password;
  })
  .get(function (this: HydratedDocument<IAccount>) {
    return this._passwordConfirmation;
  });

SCHEMA.path("passwordHash").validate(function (this: any, v: string) {
  if (!this.password) {
    this.invalidate("password", "The password is required.");
  } else if (this.password.length < 8) {
    this.invalidate(
      "password",
      "The password must be at least 8 characters long."
    );
  } else if (
    !new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    ).test(this.password)
  ) {
    this.invalidate(
      "password",
      "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
  } else if (!this.comparePassword(this.passwordConfirmation)) {
    this.invalidate(
      "passwordConfirmation",
      "The password confirmation does not match the password."
    );
  }
});

SCHEMA.methods.comparePassword = function (password: string) {
  return bcrypt.compareSync(password, this.passwordHash);
};

export const Account = mongoose.model("Account", SCHEMA);
