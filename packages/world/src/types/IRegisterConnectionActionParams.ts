interface IConnectionActionParams {}

/**
 * The params for the `registerConnection` action.
 */
export interface IRegisterConnectionActionParams
  extends IConnectionActionParams {
  portal: string;
}
