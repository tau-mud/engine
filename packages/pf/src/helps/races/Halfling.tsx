import { screen, IHelp } from "@tau-mud/world";

const { Box, H1, H2, HelpLink, Text, Ul, Li, B } = screen;

export const Halfing: IHelp = {
  aliases: ["halflings", "hafling"],
  template: () => (
    <Box>
      <H1>Halfling</H1>
      <H2>Overview</H2>
      <Text>
        Halflings are a small and nimble race, known for their wit and
        resourcefulness. They are natural survivors, and are often found in
        positions of leadership in their communities. Halflings are typically
        peaceful and industrious, but can be fierce fighters when their homes
        and families are threatened.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Halflings are humanoids with the halfling subtype
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> +2{" "}
          <HelpLink help="dexterity">Dexterity</HelpLink>, +2{" "}
          <HelpLink help="charisma">Charisma</HelpLink>, -2{" "}
          <HelpLink help="strength">Strength</HelpLink>
        </Li>
        <Li>
          <B>Size:</B> Halflings are Small creatures and gain a +1 size bonus to
          their AC, a +1 size bonus on attack rolls, a -1 penalty to their
          Combat Maneuver Bonus and Combat Maneuver Defense, and a +4 size bonus
          on Stealth checks
        </Li>
        <Li>
          <B>Speed:</B> Halflings have a base speed of 20 feet
        </Li>
        <Li>
          <B>Lucky:</B> Halflings receive a +1 racial bonus on all saving throws
        </Li>
        <Li>
          <B>Brave:</B> Halflings receive a +2 racial bonus on saving throws
          against fear
        </Li>
        <Li>
          <B>Halfling Luck:</B> Halflings receive a +1 racial bonus on all
          saving throws. This bonus stacks with the Lucky racial trait
        </Li>
        <Li>
          <B>Keen Senses:</B> Halflings receive a +2 racial bonus on Perception
          checks
        </Li>
        <Li>
          <B>Sure-Footed:</B> Halflings receive a +2 racial bonus on Acrobatics
          and Climb checks
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <HelpLink help="rogue">
            <B>Rogue:</B>
          </HelpLink>{" "}
          Add +1 to the halfling's total number of sneak attack damage dice.
          This bonus only applies to sneak attacks made against targets with a
          discernible anatomy.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Halflings are small and slight, standing only 3 to 4 feet tall, and
        weighing around 30 to 35 pounds. They have curly hair and bright,
        expressive eyes, and are known for their rosy cheeks and wide, cheerful
        smiles. Halflings have an unassuming appearance, and are often
        overlooked by others. They have a natural grace and agility, and are
        capable of moving quickly and quietly.
      </Text>
      <H2>Society</H2>
      <Text>
        Halflings are social creatures, and enjoy the company of others. They
        are often found in close-knit communities, and have a reputation for
        being welcoming and friendly. Halflings are skilled traders and
        merchants, and have a thriving trade network that spans the entire
        world. They are also known for their love of good food, and have a rich
        culinary tradition.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Halflings tend to be good-natured and optimistic, valuing peace and
        harmony. They are often neutral in their outlook, preferring to avoid
        conflict whenever possible. Halflings may worship a wide variety of
        gods, but are often drawn to deities of nature, community, and family.
      </Text>
    </Box>
  ),
};
