import React from "react";
import { mixins, ITauServiceSchema } from "@tau-mud/core";
import { Context } from "moleculer";

import { ConnectionMetadataLoader } from "../mixins";

interface IHelpService extends mixins.ITauService {
  helps: Record<string, React.FunctionComponent>;
}

interface IHelpsRegisterActionParams {
  help: React.FunctionComponent;
}

export const Helps: ITauServiceSchema = {
  name: "helps",
  created(this: IHelpService) {
    this.helps = this.getMudSetting("helps", {});
  },

  started(this: IHelpService) {
    this.logger.info("Helps started");
  },

  mixins: [ConnectionMetadataLoader, mixins.Service],

  actions: {
    register: {
      params: {
        help: "any",
      },
      protected: true,
      async handler(ctx: Context<IHelpsRegisterActionParams>) {
        const { help } = ctx.params;
        this.helps[help.name] = help;
        this.logger.info(`Registered help: ${help.name}`);
      },
    },
  },
};
