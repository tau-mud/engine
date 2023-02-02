import { RedisOptions } from "ioredis";

/**
 * The MUD settings interface. This is a simple key/value object that can be used to store any settings that are
 * required by the MUD.
 */
export interface IMudSettings {
  redis: RedisOptions;
  [key: string]: any;
}
