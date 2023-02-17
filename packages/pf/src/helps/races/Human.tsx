import { Box } from "@tau-mud/world/lib/screen";
import { screen, IHelp } from "@tau-mud/world";

const { H1, H2, HelpLink, Text, Ul, Li, B } = screen;

export const Human: IHelp = {
  aliases: ["human", "humans"],
  template: () => (
    <Box>
      <H1>Human</H1>
      <H2>Overview</H2>
      <Text>
        Humans are the most versatile and adaptable of all the races, with an
        innate ability to succeed in any endeavor. They are a widespread race,
        found in every corner of the world and in every profession. Humans are
        ambitious and driven, seeking to make a name for themselves and leave
        their mark on the world.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Humans are humanoids with the human subtype
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> Humans gain a +2 racial bonus to one
          ability score of their choice
        </Li>
        <Li>
          <B>Size:</B> Humans are Medium creatures and thus have no bonuses or
          penalties due to their size
        </Li>
        <Li>
          <B>Speed:</B> Humans have a base speed of 30 feet
        </Li>
        <Li>
          <B>Bonus Feat:</B> Humans gain an additional bonus feat at 1st level.
        </Li>
        <Li>
          <B>Favored Class Bonus:</B> Humans receive an extra skill rank or hit
          point whenever they take a level in their favored class.
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <HelpLink help="any class">
            <B>Any Class:</B>
          </HelpLink>{" "}
          Humans have no favored class. When they gain a level in any class,
          they may choose to gain +1 hit point or +1 skill rank.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Humans come in a variety of shapes and sizes, with a wide range of
        physical features. They have a wide variety of skin, hair, and eye
        colors, and their facial features and body types can vary greatly.
        Humans have no innate physical abilities or resistances, but their
        adaptability and versatility make them a formidable force.
      </Text>
      <H2>Society</H2>
      <Text>
        Humans are found in all walks of life, from the lowliest beggar to the
        mightiest king. They are driven by ambition and a desire for power and
        wealth, and will do whatever it takes to achieve their goals. Humans are
        known for their creativity and innovation, and they have made many
        advancements in fields such as science, art, and magic.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Humans can be of any alignment, and their religious beliefs vary widely.
        They are known for their adaptability and flexibility, and can adjust to
        the beliefs and customs of any culture. Some humans are devoutly
        religious, while others are atheists or agnostics.It all depends on the
        individual human and the society in which they were raised.
      </Text>
    </Box>
  ),
};
