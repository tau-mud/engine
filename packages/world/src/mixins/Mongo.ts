import { TWorldServiceConstructor } from "../types";
import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";

export const Mongo: TWorldServiceConstructor = (mudSettings) => {
  if (!mudSettings.mongoUrl) throw new Error("Mongo URL not set");

  return {
    name: "mongo",
    mixins: [DbService],
    adapter: new MongooseAdapter(mudSettings.mongoUrl),
  };
};
