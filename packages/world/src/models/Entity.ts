import mongoose from "mongoose";

const SCHEMA = new mongoose.Schema({
  stub: {
    type: String,
    required: true,
    unique: true,
  },
  autoLoad: {
    type: Boolean,
    required: true,
    default: false,
  },
  hash: {
    type: String,
  },
  loadedFrom: {
    type: String,
  },
  autoSave: {
    type: Boolean,
    required: true,
    default: false,
  },
  components: [{ type: mongoose.Schema.Types.ObjectId, ref: "Component" }],
});

export const Entity = mongoose.model("Entity", SCHEMA);
