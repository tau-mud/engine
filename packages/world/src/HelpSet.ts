import { Help } from "./Help";

export class HelpSet {
  readonly helps: Record<string, typeof Help> = {};
  readonly helpIndex: Record<string, Help> = {};

  constructor() {
    Object.values(this.helps).forEach((help) => {
      const h = new help();
      h.aliases.forEach((alias) => {
        this.helpIndex[alias] = h;
      });
    });
  }
}
