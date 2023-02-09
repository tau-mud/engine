import { Component } from "@tau-mud/world";
import { models } from "@tau-mud/world";

export interface ICharacterNameValueAttributes {
  prefix?: string;
  firstName?: string;
  lastName?: string;
  suffix?: string;
}

export interface ICharacterNameComponentAttributes
  extends models.IComponentAttributes {
  value: ICharacterNameValueAttributes;
}

export class CharacterName extends Component {
  constructor(component: ICharacterNameComponentAttributes) {
    super(component);
  }

  readonly validator = {
    type: "object",
    props: {
      prefix: {
        type: "string",
        optional: true,
      },
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
        optional: true,
      },
      suffix: {
        type: "string",
        optional: true,
      },
    },
  };

  hasChanged(previousValue: ICharacterNameValueAttributes) {
    return previousValue !== this.value;
  }

  defaultValue(): any {
    return null;
  }
}
