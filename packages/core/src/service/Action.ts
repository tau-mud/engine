import 'reflect-metadata';

import { ActionSchema } from 'moleculer';
import { Service } from './Service';

/**
 * Decorator for defining an action. See {@link Service} for more information.
 */
export function Action(options: Partial<ActionSchema> = {}) {
  return function (target: Service, propertyKey: string) {
    Reflect.defineMetadata('moleculer:action', options, target[propertyKey]);
  };
}
