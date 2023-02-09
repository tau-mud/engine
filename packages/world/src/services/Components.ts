import { Context, Errors, Service } from "moleculer";
import { ITauServiceSchema } from "@tau-mud/core";

import { Component, IComponentConstructor } from "../Component";
import { IComponentAttributes } from "../models";
import { Mongo } from "../mixins";

interface IComponentService extends Service {
  componentTypes: Record<string, typeof Component>;
}

export interface IComponentTypesRegisterActionParams {
  component: IComponentConstructor;
}

export interface IComponentTypesBuildActionParams {
  type: string;
  component: IComponentAttributes;
}

export const ComponentTypes: ITauServiceSchema = {
  name: "components",
  created(this: IComponentService) {
    this.componentTypes = {};
  },

  mixins: [Mongo],

  actions: {
    register: {
      params: {
        component: "any",
      },
      protected: true,
      async handler(
        this: IComponentService,
        ctx: Context<IComponentTypesRegisterActionParams>
      ) {
        const { component } = ctx.params;

        if (this.componentTypes[component.name]) {
          this.logger.warn(
            "Component type already registered, it will be replaced",
            component.name
          );
        }

        this.logger.info("Registering component type", component.name);

        this.componentTypes[component.name] = component;
      },
    },

    build: {
      params: {
        type: "string",
        component: {
          type: "object",
          props: {
            value: "any",
            entityId: {
              type: "string",
              optional: true,
            },
          },
        },
      },
      protected: true,
      handler(
        this: IComponentService,
        ctx: Context<IComponentTypesBuildActionParams>
      ) {
        const { type, component } = ctx.params;

        const componentType = this.componentTypes[type];

        if (!componentType) {
          throw new Errors.MoleculerError(
            `Component type not found: ${type}`,
            400,
            "BAD_REQUEST"
          );
        }

        return new componentType({
          ...component,
          componentType: componentType.name,
        });
      },
    },
  },
};
