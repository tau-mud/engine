import { ICommandSchema } from "Command/ICommandSchema";

export interface ICommandSetSchema {
  commands: Array<ICommandSchema>;
  mixins: Array<ICommandSetSchema>;
}
