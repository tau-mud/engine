import { screen, IHelp } from "@tau-mud/world";

const { Box, H1, H2, Text, Ul, Li, B } = screen;

export const HalfElf: IHelp = {
  aliases: ["half elf", "half elfs", "half elves"],
  template: () => (
    <Box>
      <H1>Half-Elf</H1>
      <H2>Overview</H2>
      <Text>
        Half-elves are the offspring of humans and elves, and inherit the best
        qualities of both races. They are known for their grace, beauty, and
        adaptability, and have a natural talent for diplomacy and mediation.
        Half-elves are often caught between two worlds, and must find their own
        place in the world.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Half-elves are humanoids with both the human and the elf
          subtypes
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> +2 to one ability score of the
          player's choice
        </Li>
        <Li>
          <B>Size:</B> Half-elves are Medium creatures and thus have no bonuses
          or penalties due to their size
        </Li>
        <Li>
          <B>Speed:</B> Half-elves have a base speed of 30 feet
        </Li>
        <Li>
          <B>Adaptability:</B> Half-elves receive Skill Focus as a bonus feat at
          1st level
        </Li>
        <Li>
          <B>Elf Blood:</B> Half-elves count as both humans and elves for any
          effect related to race
        </Li>
        <Li>
          <B>Keen Senses:</B> Half-elves receive a +2 racial bonus on Perception
          checks
        </Li>
        <Li>
          <B>Low-Light Vision:</B> Half-elves can see twice as far as humans in
          conditions of dim light
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <B>Any Class:</B>
          Half-elves have no favored class. When they gain a level in any class,
          they may choose to gain +1 hit point or +1 skill rank.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Half-elves combine the physical characteristics of both humans and
        elves, and can have a wide range of appearances. They typically have
        pointed ears and slightly angular features, but are not as slender as
        elves. Half-elves have a natural grace and beauty, and are often
        considered attractive by both humans and elves.
      </Text>
      <H2>Society</H2>
      <Text>
        Half-elves often find themselves caught between two worlds, and may
        struggle to find their place in society. They have a natural talent for
        diplomacy and mediation, and are often called upon to resolve disputes
        between humans and elves. Half-elves tend to be social creatures, and
        enjoy the company of others. They are often found in positions of
        leadership, using their charisma and charm to influence others.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Half-elves can be of any alignment, and their religious beliefs vary
        widely. They are known for their adaptability and flexibility, and can
        adjust to the beliefs and customs of any culture. Half-elves may worship
        the gods of their human or elven parentage, or may forge their own
        spiritual path.
      </Text>
    </Box>
  ),
};
