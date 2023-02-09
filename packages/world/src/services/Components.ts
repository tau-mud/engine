import { TWorldServiceConstructor } from "../TWorldServiceConstructor";
import { Mongo } from "../mixins";
import { Component } from "../models";

export const Components: TWorldServiceConstructor = () => {
  return {
    name: "components",
    mixins: [Mongo],
    model: Component,
    actions: {},
  };
};
