import DbService from "moleculer-db";
import MongooseAdapter from "moleculer-db-adapter-mongoose";

export const Accounts = {
  name: "data.accounts",
  mixins: [DbService],
  adapter: new MongooseAdapter("accounts"),
};
