import { IHelp, screen } from "@tau-mud/world";

const { Box, HelpLink, H1, H2, Text, Ul, Li, B } = screen;

export const Elf: IHelp = {
  aliases: ["elf", "elves", "elfs"],
  template: () => (
    <Box>
      <H1>Elf</H1>
      <H2>Overview</H2>
      <Text>
        Elves are a magical people of otherworldly grace, living in the world
        but not entirely part of it. They live in places of ethereal beauty, in
        the midst of ancient forests or in silvery spires glittering with faerie
        light, where soft music drifts through the air and gentle fragrances
        waft on the breeze. Elves love nature and magic, art and artistry, music
        and poetry, and the good things of the world.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Elves are humanoids with the elf subtype
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> +2{" "}
          <HelpLink help="dexterity">Dexterity</HelpLink>, +2{" "}
          <HelpLink help="intelligence">Intelligence</HelpLink>, -2{" "}
          <HelpLink help="constitution">Constitution</HelpLink>
        </Li>
        <Li>
          <B>Size:</B> Elves are Medium creatures and thus have no bonuses or
          penalties due to their size
        </Li>
        <Li>
          <B>Speed:</B> Elves have a base speed of 30 feet
        </Li>
        <Li>
          <B>Low-Light Vision:</B> Elves can see twice as far as humans in
          conditions of dim light
        </Li>
        <Li>
          <B>Elven Immunities:</B> Elves are immune to magic sleep effects and
          get a +2 racial saving throw bonus against enchantment spells and
          effects
        </Li>
        <Li>
          <B>Elven Magic:</B> Elves get a +2 racial bonus on caster level checks
          made to overcome spell resistance. In addition, elves receive a +2
          racial bonus on Spellcraft skill checks made to identify the
          properties of magic items.
        </Li>
        <Li>
          <B>Keen Senses:</B> Elves receive a +2 racial bonus on Perception
          skill checks
        </Li>
        <Li>
          <B>Weapon Familiarity:</B> Elves are proficient with longbows
          (including composite longbows), longswords, rapiers, and shortbows
          (including composite shortbows), and treat any weapon with the word
          “elven” in its name as a martial weapon.
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <HelpLink help="wizard">
            <B>Wizard:</B>
          </HelpLink>{" "}
          Add one spell from the wizard spell list to the elf's spellbook. This
          spell must be at least one level below the highest spell level the
          wizard can cast.
        </Li>
        <Li>
          <HelpLink help="rogue">
            <B>Rogue:</B>
          </HelpLink>{" "}
          Add +1/2 to the number of rogue talents the elf possesses
        </Li>
        <Li>
          <HelpLink help="bard">
            <B>Bard:</B>
          </HelpLink>{" "}
          Add +1 to the elf's total number of bardic performances per day
        </Li>
        <Li>
          <HelpLink help="ranger">
            <B>Ranger:</B>
          </HelpLink>
          Add +1 hit point or +1 skill rank to the ranger's animal companion. If
          the ranger ever replaces his animal companion, the new animal
          companion gains these bonus hit points or skill ranks.
        </Li>
      </Ul>
      <H2>Feats</H2>
      <Ul>
        <Li>
          <B>Elven Weapon Proficiencies:</B> Elves are automatically proficient
          with the longsword, rapier, longbow, and shortbow.
        </Li>
        <Li>
          <B>Improved Initiative:</B>Elves receive Improved Initiative as a
          bonus feat.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Elves are slim and stand 4.5 to 5.5 feet tall. They have long, pointed
        ears and thin eyebrows. Their hair is often long, and is usually some
        shade of gold, copper, or pale white. Their eyes are typically green,
        although other colors such as blue or silver are not uncommon.
      </Text>
      <H2>Society</H2>
      <Text>
        Elves are a proud and isolationist race, preferring the company of their
        own kind to that of outsiders. They have their own unique culture, which
        values art, beauty, and magic above all else. They are renowned for
        their skill in archery and swordplay, as well as their ability to create
        enchanting music and poetry. Elves tend to live in hidden enclaves, such
        as deep forests or secluded mountains, where they are protected from the
        dangers of the outside world.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Elves tend to be chaotic in nature, valuing their freedom and
        independence above all else. They are typically good, but not always.
        Some elves have a deep hatred of outsiders, and will go to great lengths
        to protect their own kind. Elves are known to worship a variety of
        deities, often those associated with nature, art, and magic.
      </Text>
    </Box>
  ),
};
