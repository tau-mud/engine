import { Box } from "../screen";
import { Help } from "./Help";
import { IHelpSchema } from "./IHelpSchema";

const helpSchema: IHelpSchema = {
  aliases: ["test", "t"],
  template: () => <Box></Box>,
};

describe("Help", () => {
  let help: Help;

  beforeEach(() => { 
    help = new Help(helpSchema);
  });


  describe("aliases", () => {
  it("should return the aliases", () => {
    expect(help.aliases).toEqual(["test", "t"]);
  })

  })

  describe("render", () => {
    it("should return the template", () => {
      expect(help.render()).toEqual(<Box></Box>);
    })
  })
});
