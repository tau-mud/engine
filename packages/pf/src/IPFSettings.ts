import { IWorldSettings } from "@tau-mud/world";

export interface IPFSettings extends IWorldSettings {
  helps: Record<string, any>;
}
