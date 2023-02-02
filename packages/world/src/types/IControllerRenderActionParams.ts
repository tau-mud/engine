import { IControllerActionParams } from "./IControllerActionParams";

export interface IControllerRenderActionParams extends IControllerActionParams {
  template: string;
  props: any;
}
