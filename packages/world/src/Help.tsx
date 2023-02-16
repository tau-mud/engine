import React, { FunctionComponent } from "react";
import { Box } from "screen";

export class Help {
  readonly template: FunctionComponent = () => <Box></Box>;
  aliases: string[] = [];

  constructor() {
    this.aliases = [...this.aliases, this.constructor.name.toLowerCase()];
  }
}
