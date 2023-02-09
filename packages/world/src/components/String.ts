import { Component } from "../Component";

export class String extends Component {
  readonly validator = {
    type: "string",
  };

  hasChanged(previousValue: any): boolean {
    return previousValue !== this.value;
  }

  defaultValue(): any {
    return null;
  }
}
