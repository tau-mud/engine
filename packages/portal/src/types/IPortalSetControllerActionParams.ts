import { IPortalActionParams } from "./IPortalActionParams";

/**
 * The parameters for the {@link PortalMixin} `setController` action.
 */
export interface IPortalSetControllerActionParams extends IPortalActionParams {
  /**
   * The name of the controller to set.
   */
  controller: string;
}
