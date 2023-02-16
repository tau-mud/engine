import { Box } from "@tau-mud/world/lib/screen";
import React from "react";
import { screen, Help } from "@tau-mud/world";

const { H1, H2, HelpLink, Text, Ul, Li, B } = screen;

export class Dwarf extends Help {
  readonly template = () => (
    <Box>
      <H1>Dwarf</H1>
      <H2>Overview</H2>
      <Text>
        Dwarves are short and stocky, standing about 4 feet tall and weighing
        around 150 pounds. They are a hardy and resilient race, known for their
        love of ale, stonework, and the earth itself. Dwarves are excellent
        craftsmen, and their weapons and armor are highly prized. They have a
        natural resistance to magic and are skilled fighters, able to stand
        toe-to-toe with the most fearsome of foes.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Dwarves are humanoids with the dwarf subtype
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> +2{" "}
          <HelpLink help="constitution">Constitution</HelpLink>, +2{" "}
          <HelpLink help="wisdom">Wisdom</HelpLink>, -2{" "}
          <HelpLink help="charisma">Charisma</HelpLink>
        </Li>
        <Li>
          <B>Size:</B> Dwarves are Medium creatures and thus have no bonuses or
          penalties due to their size
        </Li>
        <Li>
          <B>Speed:</B> Dwarves have a base speed of 20 feet, but their speed is
          never modified by armor or encumbrance
        </Li>
        <Li>
          <B>Darkvision:</B> Dwarves can see in the dark up to 60 feet
        </Li>
        <Li>
          <B>Dwarven Resilience:</B> Dwarves get a +2 racial bonus on saving
          throws against poison, spells, and spell-like abilities
        </Li>
        <Li>
          <B>Dwarven Weapon Familiarity:</B> Dwarves are proficient with
          battleaxes, heavy picks, and warhammers, and treat any weapon with the
          word “dwarven” in its name as a martial weapon.
        </Li>
        <Li>
          <B>Greed:</B> Dwarves receive a +2 racial bonus on Appraise checks
          made to determine the price of nonmagical goods that contain precious
          metals or gemstones.
        </Li>
        <Li>
          <B>Hardy:</B> Dwarves gain a +2 racial bonus on saving throws against
          poison, spells, and spell-like abilities.
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <HelpLink help="fighter">
            <B>Fighter:</B>
          </HelpLink>{" "}
          Add +1 to the dwarf's CMD when resisting a bull rush or trip attempt.
        </Li>
        <Li>
          <HelpLink help="cleric">
            <B>Cleric:</B>
          </HelpLink>{" "}
          Add +1 to the dwarf's caster level when casting spells with the earth
          or protection domains.
        </Li>
        <Li>
          <HelpLink help="rogue">
            <B>Rogue:</B>
          </HelpLink>{" "}
          Add +1/2 to the dwarf's trap sense bonus.
        </Li>
      </Ul>
      <H2>Feats</H2>
      <Ul>
        <Li>
          <B>Dwarven Toughness:</B> Dwarves receive Toughness as a bonus feat.
        </Li>
        <Li>
          <B>Endurance:</B> Dwarves receive Endurance as a bonus feat.
        </Li>
        <Li>
          <B>Improved Initiative:</B> Dwarves receive Improved Initiative as a
          bonus feat.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Dwarves are short and stocky, with muscular builds and thick, bushy
        beards. They have a natural toughness and a keen sense of smell,
        allowing them to navigate the twisting tunnels and caverns they call
        home. Dwarves have a variety of hair and eye colors, including black,
        brown, gray, and blue. They are typically bearded, and their beards are
        often a source of great pride and adornment. Dwarven women are rare and
        are indistinguishable from men in terms of appearance and dress.
      </Text>

      <H2>Society</H2>
      <Text>
        Dwarves are a proud and industrious people, and they have a rich and
        ancient culture. They value loyalty, honor, and hard work above all
        else, and they have a deep reverence for their ancestors. Dwarves are
        known for their skill in mining and metalworking, and they are renowned
        for their craftsmanship. They are also fierce warriors, and have a long
        history of defending their mountain strongholds from all manner of
        threats.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Dwarves tend to be lawful in nature, valuing tradition and order. They
        are typically good, but not always. Dwarves worship a variety of
        deities, often those associated with the earth and the forge. Moradin,
        the Dwarven god of creation, is the most widely worshiped deity among
        dwarves.
      </Text>
    </Box>
  );
}
