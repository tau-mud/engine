import {
  ActionSchema,
  EventSchema,
  GenericObject,
  Service as MoleculerService,
  ServiceBroker,
  ServiceMethods,
  ServiceSchema,
} from "moleculer";

const blacklist = [
  "_init",
  "_start",
  "_stop",
  "created",
  "started",
  "actions",
  "events",
  "methods",
  "metadata",
  "broker",
  "Promise",
  "constructor",
  "logger",
  "schema",
  "fullName",
  "_serviceSpecification",
  "version",
  "originalSchema",
  "_getPublicSettings",
  "_createAction",
  "_createMethod",
  "_createEvent",
  "applyMixins",
  "mergeSchemas",
  "mergeSchemaSettings",
  "mergeSchemaMetadata",
  "parseServiceSchema",
  "mergeSchemaUniqArray",
  `mergeSchemaDependencies`,
  "mergeSchemaHooks",
  "mergeSchemaMethods",
  "mergeSchemaEvents",
  "mergeSchemaActions",
  "mergeSchemaLifecycleHandlers",
  "mergeSchemaUnknown",
  "emitLocalEventHandler",
  "waitForServices",
];

/**
 * The Service class is Tau MUDs base class for its Moleculer services. It's designed to be used with the engine's
 * service decorators.
 *
 * To define a new service extend this class. You can add actions by using the {@link Action} decorator. You can add
 * events by using the {@link Event} decorator. Methods that are not defined as `events` or `actions` will be added as
 * service methods.
 *
 * Properties that are defined on the class will be added to the service when it is created.
 *
 */
export class Service extends MoleculerService {
  mixins?: Partial<ServiceSchema>[] = [];
}

/**
 * @private
 */
export class ServiceFactory extends MoleculerService {
  constructor(
    broker: ServiceBroker,
    service: MoleculerService | typeof Service | ServiceSchema
  ) {
    if (
      Object.prototype.isPrototypeOf.call(Service, service) ||
      service instanceof MoleculerService
    ) {
      let svc: Service;

      if (Object.prototype.isPrototypeOf.call(Service, service)) {
        const constructor = <typeof Service>service;
        svc = new constructor(broker);
      } else {
        svc = <Service>service;
      }

      // add all the properties from the Service class to the service when the service starts
      const propertyMixin: Partial<ServiceSchema> = {
        created() {
          Object.keys(svc)
            .filter((key) => !blacklist.includes(key))
            .forEach((key) => {
              if (typeof svc[key] !== "function") {
                this[key] = svc[key];
              }
            });
        },
      };

      // construct mixins
      let mixins = svc.mixins || [];

      if (mixins && mixins.length > 0) {
        const parsedMixins = mixins.map((mixin) => {
          if (typeof mixin === typeof Service) {
            return new ServiceFactory(broker, <typeof Service>mixin);
          }

          return mixin;
        });

        parsedMixins.push(<ServiceSchema>propertyMixin);

        mixins = parsedMixins;
      }

      // create the new service schema
      const schema: ServiceSchema = {
        name: svc.name,
        mixins: mixins,
        started: svc["started"],
        created: svc["created"],
        actions: actionsFor(svc),
        events: eventsFor(svc),
        methods: methodsFor(svc),
      };

      // create the service
      super(broker, schema);
    } else {
      super(broker, service);
    }
  }
}

interface FunctionDescriptor {
  name: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fun: Function;
}

function* iterMethods(
  // eslint-disable-next-line @typescript-eslint/ban-types
  o: GenericObject
): Generator<FunctionDescriptor> {
  if (!o || o === Object.prototype) return;
  for (const name of Object.getOwnPropertyNames(o)) {
    try {
      if (name !== "constructor" && typeof o[name] === "function") {
        yield {
          name,
          fun: o[name],
        };
      }
    } catch {
      // ignore
    }
  }
  yield* iterMethods(Object.getPrototypeOf(o));
}

function actionsFor(service: Service) {
  const actions: ActionSchema = {};

  Array.from(iterMethods(Object.getPrototypeOf(service)))
    .filter((desc: FunctionDescriptor) => !blacklist.includes(desc.name))
    .forEach((desc: FunctionDescriptor) => {
      const action = Reflect.getMetadata("moleculer:action", desc.fun);

      if (action) {
        actions[action.name || desc.name] = {
          ...action,
          handler: desc.fun,
        };
      }
    });

  return actions;
}

function eventsFor(service: Service) {
  const events: EventSchema = {};

  Array.from(iterMethods(Object.getPrototypeOf(service)))
    .filter((desc: FunctionDescriptor) => !blacklist.includes(desc.name))
    .forEach((desc: FunctionDescriptor) => {
      let event = Reflect.getMetadata("moleculer:event", desc.fun);

      if (event) {
        if (typeof event === "function") {
          event = event(service);

          if (typeof event === "string") {
            event = {
              name: event,
            };
          }
        }

        events[event.name || desc.name] = {
          ...event,
          handler: desc.fun,
        };
      }
    });

  return events;
}
function methodsFor(service: Service) {
  const methods: ServiceMethods = {};

  Array.from(iterMethods(Object.getPrototypeOf(service)))
    .filter((desc: FunctionDescriptor) => !blacklist.includes(desc.name))
    .forEach((desc: FunctionDescriptor) => {
      const notMethod =
        Reflect.getMetadata("moleculer:action", desc.fun) ||
        Reflect.getMetadata("moleculer:event", desc.fun);

      if (notMethod) {
        return;
      }

      methods[desc.name] = <(...args: unknown[]) => unknown>desc.fun;
    });

  return methods;
}
