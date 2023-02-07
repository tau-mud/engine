import mongoose from "mongoose";

const SCHEMA = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
