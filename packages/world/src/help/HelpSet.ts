import { Help } from "./Help";
import { IHelpSchema } from "./IHelpSchema";
import { IHelpSetSchema } from "./IHelpSetSchema";

export class HelpSet {
  readonly helps: Record<string, Help> = {};

  constructor(schema: IHelpSetSchema) {
    const mixins = schema.mixins || [];
    mixins.forEach((mixin) => {
      const hs = new HelpSet(mixin);
      Object.values(hs.helps).forEach((help) => {
        help.aliases.forEach((alias) => {
          this.helps[alias] = help
        })
      })
    });

    Object.values(schema.helps).forEach((help) => {
      help.aliases.forEach((alias) => {
        this.helps[alias] = new Help(help);
      })
    })
  }
}
