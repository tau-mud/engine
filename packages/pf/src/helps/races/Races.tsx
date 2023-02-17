import { Box } from "@tau-mud/world/lib/screen";
import { screen, IHelp } from "@tau-mud/world";

const { H1, H2, HelpLink, Text, Ul, Li, B } = screen;

export const Races: IHelp = {
  aliases: ["help", "h"],
  template: () => (
    <Box>
      <H1>Races</H1>
      <H2>Overview</H2>
      <Text>
        The game world is home to a wide variety of races, each with its own
        unique traits and abilities. Choosing the right race for your character
        can be an important decision, and can have a significant impact on your
        gameplay experience.
      </Text>
      <H2>Choosing the Right Race For Your Character</H2>
      <Text>
        When choosing a race for your character, it's important to consider what
        sort of role you want to play in your party, as well as what sort of
        abilities and traits you want your character to have. Some races, such
        as dwarves and half-orcs, are well-suited to the role of front-line
        fighters, while others, such as elves and gnomes, are better suited to
        spellcasting and support roles. Still others, such as halflings and
        humans, are well-rounded and adaptable, and can fit into a variety of
        different roles.
      </Text>
      <H2>Available Races</H2>
      <Text>The following races are available to choose from in game:</Text>
      <Ul>
        <Li>
          <HelpLink help="dwarf">
            <B>Dwarf:</B>
          </HelpLink>{" "}
          Short, stocky, and tough, dwarves are known for their resilience and
          their love of the earth.
        </Li>
        <Li>
          <HelpLink help="elf">
            <B>Elf:</B>
          </HelpLink>{" "}
          Graceful and long-lived, elves are known for their wisdom and their
          mastery of magic.
        </Li>
        <Li>
          <HelpLink help="gnome">
            <B>Gnome:</B>
          </HelpLink>{" "}
          Small and quirky, gnomes are known for their curiosity and their love
          of tinkering.
        </Li>
        <Li>
          <HelpLink help="half-elf">
            <B>Half-Elf:</B>
          </HelpLink>{" "}
          Born of human and elven parents, half-elves are known for their
          adaptability and their charm.
        </Li>
        <Li>
          <HelpLink help="half-orc">
            <B>Half-Orc:</B>
          </HelpLink>{" "}
          Born of human and orc parents, half-orcs are known for their strength
          and their resilience.
        </Li>
        <Li>
          <HelpLink help="halfling">
            <B>Halfling:</B>
          </HelpLink>{" "}
          Small and nimble, halflings are known for their wit and their
          resourcefulness.
        </Li>
        <Li>
          <HelpLink help="human">
            <B>Human:</B>
          </HelpLink>{" "}
          The most versatile of all the races, humans are known for their
          adaptability and their drive.
        </Li>
      </Ul>
    </Box>
  ),
};
