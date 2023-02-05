import mongoose from "mongoose";
import Validator, { ValidationError } from "fastest-validator";
import bcrypt from "bcrypt";

const emailValidator = new Validator().compile({ email: "email" });

const SCHEMA = new mongoose.Schema({
  username: {
    type: String,
    required: "The username is required.",
    unique: "The username should be unique.",
  },
  email: {
    type: String,
    required: "The email address is required.",
    unique: "The email should be unique.",
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
  password: {
    type: String,
    required: "The password is required.",
  },
});

SCHEMA.plugin(require("mongoose-unique-validator"));
SCHEMA.virtual("passwordConfirmation")
  .set(function (password: string) {
    // @ts-ignore
    this._passwordConfirmation = password;
  })
  .get(function () {
    // @ts-ignore
    return this._passwordConfirmation;
  });

SCHEMA.methods.comparePassword = function (
  password: string,
  callback: (err: Error | undefined, isMatch: boolean) => void
) {
  return bcrypt.compare(password, this.password, callback);
};

SCHEMA.pre("validate", function (next) {
  if (this.isModified("password")) {
    // @ts-ignore
    if (!this.passwordConfirmation) {
      this.invalidate(
        "passwordConfirmation",
        "The password confirmation is required."
      );
    }

    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password as string, salt);

    // @ts-ignore
    this.comparePassword(this.passwordConfirmation, (err, isMatch) => {
      if (err) {
        return next(err);
      }

      if (!isMatch) {
        this.invalidate(
          "passwordConfirmation",
          "The password confirmation does not match."
        );
      }

      return next();
    });
  }
});

export const Account = mongoose.model("Account", SCHEMA);
