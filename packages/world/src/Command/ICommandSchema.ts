import { CommandContext } from "./CommandContext";

export type TCommandExecutor = (ctx: CommandContext) => Promise<boolean>;

/**
 * Implement this interface to create a command.
 */
export interface ICommandSchema {
  /**
   * The regex to match the command. This should be a string representing a regex with named groups. The groups will be passed with the command context as
   * the `params` property.
   *
   * @example
   * ```typescript
   * const match = "^!echo (?<message>.+)$";
   * ```
   *
   * In the above example, the `message` parameter will be passed with the @see CommandContext.
   */
  match: string;

  /**
   * The aliases for the commmand. These are the alternative names by which the command can be called.
   */
  aliases: Array<string>;

  /**
   * The exec method is called when the command is matched. It should return true if the command was executed successfully, or false if it was not.
   *
   * @param ctx The connection context that the command was called from.
   */
  exec: TCommandExecutor;

  /**
   * The mixins property is an array of mixins to apply to the command. Mixins are used to add functionality to the command.
   * Mixins implement the @see ICommandMixin interface. The mixin will apply the following merge strategy:
   *
   * * The top level match property will replace any mixed in match property.
   * * The top level aliases property will replace any mixed in aliases property.
   * * The `exec` method will be composed with any mixed in `exec` method in the order that the mixines are defined, with the
   *    top level command being the last to be called.
   */
  mixins?: Array<ICommandSchema>;
}
