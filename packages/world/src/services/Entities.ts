import { Context } from "moleculer";

import { TWorldServiceConstructor } from "../TWorldServiceConstructor";
import { Mongo } from "../mixins";
import { Entity, IComponentAttributes } from "../models";

export interface IEntitiesCreateActionParams {
  components?: Array<IComponentAttributes>;
}

export const Entities: TWorldServiceConstructor = () => {
  return {
    name: "entities",
    mixins: [Mongo],
    model: Entity,
  };
};
