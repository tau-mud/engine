import { RedisOptions } from "ioredis";

/**
 * The ITauRedisOptions interface is a simple interface that extends the RedisOptions interface from the ioredis package.
 * This interface is used to provide the RedisOptions to MUD engine.
 */
export interface ITauRedisOptions extends RedisOptions {
  /**
   * The host name of the Redis server.
   */
  host: string;

  /**
   * The port number of the Redis server.
   */
  port: number;
}
