import mongoose, { Schema } from "mongoose";

export interface IComponentAttributes {
  entityId: mongoose.Types.ObjectId;
  name: string;
  value: any;
  componentType: string;
}

interface IComponent extends IComponentAttributes {
  entityId: mongoose.Types.ObjectId;
}

const SCHEMA = new mongoose.Schema({
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  componentType: {
    type: String,
    required: true,
  },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
});

export const Component = mongoose.model("Component", SCHEMA);
