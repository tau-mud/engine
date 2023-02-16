import { Context, Errors, Service } from "moleculer";
import { ITauServiceSchema } from "@tau-mud/core";

import { Component as ComponentModel } from "../models";
import { Component, IComponentConstructor } from "../Component";
import { IComponentAttributes } from "../models";
import { Mongo } from "../mixins";

interface IComponentService extends Service {
  componentTypes: Record<string, typeof Component>;
}

export interface IComponentsRegisterActionParams {
  component: IComponentConstructor;
}

export interface IComponentsBuildActionParams {
  component: IComponentAttributes;
}

export interface IComponentsValidateActionParams {
  component: IComponentAttributes;
}

export interface IComponentsValidateFieldActionParams {
  component: IComponentAttributes;
  field: string;
}

const COMPONENT_PROPS = {
  type: "object",
  props: {
    value: "any",
    entityId: {
      type: "string",
      optional: true,
    },
  },
};

export const ComponentTypes: ITauServiceSchema = {
  name: "components",
  created(this: IComponentService) {
    this.componentTypes = {};
  },

  mixins: [Mongo],
  model: ComponentModel,

  actions: {
    validate: {
      params: {
        component: COMPONENT_PROPS,
      },
      protected: true,
      async handler(ctx: Context<IComponentsValidateActionParams>) {
        const { component } = ctx.params;

        const builtComponent = await this.actions.build(ctx.params);

        return builtComponent.validate();
      },
    },

    validateField: {
      params: {
        component: COMPONENT_PROPS,
      },
      protected: true,
      async handler(ctx: Context<IComponentsValidateFieldActionParams>) {
        const { component, field } = ctx.params;

        const validations = await this.actions.validate({ component });

        return validations[field];
      },
    },

    register: {
      params: {
        component: "any",
      },
      protected: true,
      async handler(
        this: IComponentService,
        ctx: Context<IComponentsRegisterActionParams>
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
            componentType: "string",
          },
        },
      },
      protected: true,
      handler(
        this: IComponentService,
        ctx: Context<IComponentsBuildActionParams>
      ) {
        const { component } = ctx.params;

        const componentTypeConstructor =
          this.componentTypes[component.componentType];

        if (!componentTypeConstructor) {
          throw new Errors.MoleculerError(
            `Component type not found: ${component.componentType}`,
            400,
            "BAD_REQUEST"
          );
        }

        return new componentTypeConstructor({
          ...component,
          componentType: componentTypeConstructor.name,
        });
      },
    },
  },
};
