import { FunctionComponent } from "react";
import { IHelpSchema } from "./IHelpSchema";

export class Help {
  readonly aliases: Array<string>;
  private readonly _template: FunctionComponent;

  constructor(schema: IHelpSchema) {
    this.aliases = schema.aliases;
    this._template = schema.template;
  }

  /**
   * Renders the template
   */
  render() {
    return this._template({});
  }
}
