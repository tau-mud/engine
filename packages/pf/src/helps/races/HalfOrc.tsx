import { Box } from "@tau-mud/world/lib/screen";
import React from "react";
import { screen, Help } from "@tau-mud/world";

const { H1, H2, HelpLink, Text, Ul, Li, B } = screen;

export class HalfOrc extends Help {
  readonly template = () => (
    <Box>
      <H1>Half-Orc</H1>
      <H2>Overview</H2>
      <Text>
        Half-orcs are the offspring of humans and orcs, and inherit the best
        qualities of both races. They are known for their strength, endurance,
        and toughness, and have a natural talent for survival. Half-orcs often
        face prejudice and discrimination from both humans and orcs, and must
        find their own way in the world.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Half-orcs are humanoids with both the human and the orc
          subtypes
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> +2{" "}
          <HelpLink help="strength">Strength</HelpLink>, +2{" "}
          <HelpLink help="constitution">Constitution</HelpLink>, -2{" "}
          <HelpLink help="intelligence">Intelligence</HelpLink>
        </Li>
        <Li>
          <B>Size:</B> Half-orcs are Medium creatures and thus have no bonuses
          or penalties due to their size
        </Li>
        <Li>
          <B>Speed:</B> Half-orcs have a base speed of 30 feet
        </Li>
        <Li>
          <B>Darkvision:</B> Half-orcs can see in the dark up to 60 feet
        </Li>
        <Li>
          <B>Orc Blood:</B> Half-orcs count as both humans and orcs for any
          effect related to race
        </Li>
        <Li>
          <B>Orc Ferocity:</B> Once per day, when a half-orc is brought below 0
          hit points but not killed, he can fight on for one more round as if
          disabled. At the end of his next turn, unless brought to above 0 hit
          points, he immediately falls unconscious and begins dying.
        </Li>
        <Li>
          <B>Weapon Familiarity:</B> Half-orcs are proficient with greataxes and
          falchions, and treat any weapon with the word "orc" in its name as a
          martial weapon.
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <HelpLink help="barbarian">
            <B>Barbarian:</B>
          </HelpLink>{" "}
          Add +1 hit point to the half-orc's total when determining his hit
          points for each barbarian level.
        </Li>
        <Li>
          <HelpLink help="fighter">
            <B>Fighter:</B>
          </HelpLink>{" "}
          Add +1 to the half-orc's total number of fighter bonus feats.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Half-orcs combine the physical characteristics of both humans and orcs,
        and are often considered intimidating by those who meet them. They have
        strong, muscular builds, and are usually taller and heavier than humans.
        Half-orcs have prominent, bony ridges over their eyebrows, and sharp,
        protruding teeth. They have dark, coarse hair and rough, grayish-green
        skin.
      </Text>
      <H2>Society</H2>
      <Text>
        Half-orcs are often outcasts in human society, and may be shunned or
        feared by others. They are more accepted in orcish society, but may
        still face discrimination and prejudice. Half-orcs are often fiercely
        independent, and prefer to rely on their own strength and cunning rather
        than the help of others. They are natural survivors, and are skilled at
        hunting and tracking in the wilderness.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Half-orcs tend to be neutral, valuing self-reliance and strength over
        moral considerations. They can be of any alignment, but are often
        chaotic in nature. Half-orcs may worship the gods of their human or
        orcish parentage, or may follow their own spiritual path.
      </Text>
    </Box>
  );
}
