import { IComponentAttributes } from "./models";
import mongoose from "mongoose";
import { ServiceBroker } from "moleculer";
import Validator, { ValidationRule } from "fastest-validator";

const VALIDATION_SCHEMA = {
  entityId: {
    type: "any",
    optional: true,
  },
  componentType: {
    type: "string",
  },
};

export interface IComponentConstructor {
  new (component: IComponentAttributes): Component;
}

export class Component {
  readonly validator?: ValidationRule;

  private readonly entityId: mongoose.Types.ObjectId;
  private readonly componentType: string;

  readonly value: any;

  constructor(component: IComponentAttributes) {
    this.entityId = component.entityId;

    if (
      component.componentType &&
      component.componentType !== this.constructor.name
    ) {
      throw new Error(
        `Component type mismatch: ${component.componentType} !== ${this.constructor.name}`
      );
    }

    this.componentType = component.componentType || this.constructor.name;
    this.value = component.value || this.defaultValue();
  }

  async create(broker: ServiceBroker) {
    let exists: boolean;

    return broker.call("components.create", this.entityAsRecord());
  }

  async update(broker: ServiceBroker) {
    return broker.call("components.update", this.entityAsRecord(true));
  }

  async delete(broker: ServiceBroker) {
    return broker.call("components.delete", this.entityAsRecord(true));
  }

  private validate() {
    const validator = new Validator().compile({
      ...VALIDATION_SCHEMA,
      value: this.validator,
    });
  }

  private entityAsRecord(update?: boolean): IComponentAttributes {
    const record = {
      componentType: this.componentType || this.constructor.name,
      value: this.value,
    } as IComponentAttributes;

    if (update) {
      record.entityId = this.entityId;
    }

    return record;
  }

  defaultValue(): any {
    return null;
  }

  hasChanged(previousValue: any): boolean {
    throw new Error("Not implemented");
  }
}
