import { Service as MoleculerService, ServiceBroker } from "moleculer";

import { ITauServiceSchema, TTauServiceMixins } from "../ITauServiceSchema";
import { TTauServiceConstructor } from "../TTauServiceConstructor";
import { IMudSettings, ITauConfig } from "./Configure";

/**
 * @private
 */
export class ServiceFactory extends MoleculerService {
  constructor(
    broker: ServiceBroker,
    schema?: ITauServiceSchema | TTauServiceConstructor
  ) {
    if (schema) {
      const config = broker.options as ITauConfig;
      schema = compileSchema(config.settings || {}, schema);
    }

    super(broker, schema);
  }
}

function compileSchema(
  settings: Partial<IMudSettings>,
  schema: Partial<ITauServiceSchema> | TTauServiceConstructor
): ITauServiceSchema {
  let compiledSchema: ITauServiceSchema;

  if (typeof schema === "function") {
    compiledSchema = schema(settings);
  } else {
    compiledSchema = schema as ITauServiceSchema;
  }

  if (compiledSchema.mixins) {
    compiledSchema.mixins = compiledSchema.mixins.map((mixin) => {
      return compileSchema(settings, mixin);
    });
  }

  return compiledSchema;
}
