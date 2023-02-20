import { Box } from "../screen";
import { Help } from "./Help";
import { HelpSet } from "./HelpSet";
import { IHelpSchema } from "./IHelpSchema";
import { IHelpSetSchema } from "./IHelpSetSchema";

const testHelp: IHelpSchema = {
  template: () => <Box></Box>,
  aliases: ["test", "t"],
}

const testMixinHelp: IHelpSchema = {
  template: () => <Box></Box>,
  aliases: ["testMixin", "tm"],
}

const helpSetMixin: IHelpSetSchema = {
  helps: {testMixinHelp}
}

const helpSetBase: IHelpSetSchema = {
  helps: {testHelp},
  mixins: [helpSetMixin]
}

describe('HelpSet', () => {
  let helpSet: HelpSet;

  beforeEach(() => {
    helpSet = new HelpSet(helpSetBase);
  })

  describe("helps", () => {
    it("should included the basee help and the mixed in help", () => {
      Object.values(helpSet.helps).forEach((help) => {
        expect(help).toBeInstanceOf(Help);
      })
    })
  })
})