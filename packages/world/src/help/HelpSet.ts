import { Help } from "./Help";
import { IHelpSchema } from "./IHelpSchema";
import { IHelpSetSchema } from "./IHelpSetSchema";

export class HelpSet {
  readonly aliases: Array<string> = [];
  readonly helps: Record<string, IHelpSchema> = {};

  constructor(schema: IHelpSetSchema) {
    schema.mixins.forEach((mixin) => {
      const hs = new HelpSet(mixin);
      Object.values(hs.helps).forEach((help) => {
        Object.values(help.aliases).forEach((alias) => {
          this.aliases.push(alias);
        });
      });
    });
  }
}
