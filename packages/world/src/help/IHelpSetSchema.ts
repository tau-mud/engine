import { IHelpSchema } from "./IHelpSchema";

export interface IHelpSetSchema {
  helps: Record<string, IHelpSchema>;
  mixins?: Array<IHelpSetSchema>;
}
