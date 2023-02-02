import { MoleculerRedis } from "moleculer-redis";
import { ITauServiceSchema } from "../types/ITauServiceSchema";
import { TTauServiceConstructor } from "../types";

export const Redis: TTauServiceConstructor = (mudSettings) => ({
  name: "redis",
  settings: {
    redis: mudSettings.redis,
  },
  mixins: [MoleculerRedis],
});
