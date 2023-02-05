import React from "react";
import { IControllerActionParams } from "./IControllerActionParams";

export interface IControllerRenderActionParams extends IControllerActionParams {
  props: any;
  content: React.FunctionComponent;
}
