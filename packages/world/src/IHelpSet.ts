import { IHelp } from "./IHelp";

export interface IHelpSet {
  helps: Record<string, IHelp>;
  helpIndex: Record<string, IHelp>;
}
