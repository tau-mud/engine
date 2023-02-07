import { TWorldServiceConstructor } from "../types";

export const Component = (
  component: string,
  defaultValue: Record<string, any>
): TWorldServiceConstructor => {
  return function (mudSettings) {
    return {
      name: component,
      start() {
        this.setDefaultComponentValue(component, defaultValue);
      },
    };
  };
};
