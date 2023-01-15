import 'reflect-metadata';
import { Service } from './Service';
import { EventSchema, ServiceSchema } from 'moleculer';

/**
 * Decorator for defining an event. See {@link Service} for more information.
 */
export function Event(
  options:
    | Partial<EventSchema>
    | ((schema: ServiceSchema | Service) => EventSchema) = {}
) {
  return function (target: Service, propertyKey: string) {
    Reflect.defineMetadata('moleculer:event', options, target[propertyKey]);
  };
}
