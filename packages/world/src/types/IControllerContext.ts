import { Context } from "moleculer";
import { IControllerConnectionData } from "./IControllerConnectionData";

export interface IControllerContext<P> extends Context<P> {
  connection?: IControllerConnectionData;
}
