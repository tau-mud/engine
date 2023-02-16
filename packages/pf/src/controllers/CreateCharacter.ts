import { ITauServiceSchema } from "@tau-mud/core";
import { mixins } from "@tau-mud/world";

export const CreateCharacter: ITauServiceSchema = {
  name: "controllers.create-character",
  mixins: [mixins.Controller, mixins.CommandController],

  templates: {},

  actions: {},
};
