import { IMudSettings } from "./config";
import { ITauServiceSchema } from "./ITauServiceSchema";

/**
 * The TTauServiceConstructor type is a function that returns a [Moleculer ServiceSchema](https://moleculer.services/docs/0.14/services.html#Service-schema).
 * This is used by a custom ServiceFactory to create a service by passing in the MUD settings. This allows services to
 * be configured using the MUD settings.
 */
export type TTauServiceConstructor<S = ITauServiceSchema, M = IMudSettings> = (
  mudSettings: Partial<M>
) => S;
