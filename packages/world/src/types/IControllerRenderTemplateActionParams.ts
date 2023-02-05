import { IControllerActionParams } from "./IControllerActionParams";

export interface IControllerRenderTemplateActionParams
  extends IControllerActionParams {
  template: string;
  props: any;
}
