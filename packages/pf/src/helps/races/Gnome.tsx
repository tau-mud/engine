import { Box } from "@tau-mud/world/lib/screen";
import React from "react";
import { screen, Help } from "@tau-mud/world";

const { H1, H2, HelpLink, Text, Ul, Li, B } = screen;

export class Gnome extends Help {
  readonly template = () => (
    <Box>
      <H1>Gnome</H1>
      <H2>Overview</H2>
      <Text>
        Gnomes are a small and mischievous race, known for their quick wit and
        their love of practical jokes. They are also skilled craftsmen and
        tinkerers, and have a natural affinity for magic. Gnomes are curious by
        nature, and are always eager to explore and learn new things.
      </Text>
      <H2>Racial Traits</H2>
      <Ul>
        <Li>
          <B>Type:</B> Gnomes are humanoids with the gnome subtype
        </Li>
        <Li>
          <B>Ability Score Modifiers:</B> +2{" "}
          <HelpLink help="constitution">Constitution</HelpLink>, +2{" "}
          <HelpLink help="charisma">Charisma</HelpLink>, -2{" "}
          <HelpLink help="strength">Strength</HelpLink>
        </Li>
        <Li>
          <B>Size:</B> Gnomes are Small creatures and thus gain a +1 size bonus
          to their AC, a +1 size bonus on attack rolls, a –1 penalty to their
          Combat Maneuver Bonus and Combat Maneuver Defense, and a +4 size bonus
          on Stealth checks.
        </Li>
        <Li>
          <B>Speed:</B> Gnomes have a base speed of 20 feet
        </Li>
        <Li>
          <B>Low-Light Vision:</B> Gnomes can see twice as far as humans in
          conditions of dim light.
        </Li>
        <Li>
          <B>Defensive Training:</B> Gnomes get a +4 dodge bonus to AC against
          monsters of the giant subtype.
        </Li>
        <Li>
          <B>Gnome Magic:</B> Gnomes add +1 to the DC of any saving throws
          against illusion spells that they cast. Gnomes with a Charisma of 11
          or higher also gain the following spell-like abilities: 1/day—dancing
          lights, ghost sound, prestidigitation, and speak with animals. The
          caster level for these effects is equal to the gnome's level.
        </Li>
        <Li>
          <B>Gnome Magic:</B> Gnomes gain a +2 racial bonus on saving throws
          against illusions, a +1 racial bonus on attack rolls against kobolds
          and goblinoids, and a +4 dodge bonus to AC against monsters of the
          giant subtype.
        </Li>
      </Ul>
      <H2>Favored Classes</H2>
      <Ul>
        <Li>
          <HelpLink help="bard">
            <B>Bard:</B>
          </HelpLink>{" "}
          Add +1 to the gnome's total number of bardic performance rounds per
          day.
        </Li>
        <Li>
          <HelpLink help="illusionist wizard">
            <B>Illusionist Wizard:</B>
          </HelpLink>{" "}
          Add +1/2 to the gnome's caster level when casting illusion spells.
        </Li>
        <Li>
          <HelpLink help="alchemist">
            <B>Alchemist:</B>
          </HelpLink>{" "}
          Add +1/2 to the number of bombs per day the alchemist can create.
        </Li>
      </Ul>
      <H2>Feats</H2>
      <Ul>
        <Li>
          <B>Illusion Resistance:</B> Gnomes receive a +2 racial saving throw
          bonus against illusion spells and effects.
        </Li>
        <Li>
          <B>Nimble Fingers:</B> Gnomes gain a +2 racial bonus on Disable Device
          and Sleight of Hand checks.
        </Li>
        <Li>
          <B>Weapon Familiarity:</B> Gnomes are proficient with all firearms.
        </Li>
      </Ul>
      <H2>Physical Description</H2>
      <Text>
        Gnomes are small, standing about 3 to 3 1/2 feet tall, and weighing
        around 40 to 45 pounds. They have a distinct appearance, with large
        heads, big noses, and bushy eyebrows. They are known for their wild and
        unruly hair, which can come in a variety of colors, including red,
        brown, black, and blonde. Gnomes have a childlike demeanor, but are also
        known for their fierce determination and bravery.
      </Text>
      <H2>Society</H2>
      <Text>
        Gnomes are a social and outgoing people, and they enjoy the company of
        others. They are skilled traders and merchants, and have a thriving
        trade network that spans the entire world. Gnomes are also known for
        their love of music and dance, and they are accomplished performers.
        They have a particular affinity for nature, and often live in close-knit
        communities in natural settings, such as forests and hills.
      </Text>
      <H2>Alignment & Religion</H2>
      <Text>
        Gnomes tend to be chaotic in nature, valuing freedom and individuality.
        They are typically good, but not always. Gnomes worship a variety of
        deities, often those associated with nature and magic. The gnome
        goddess, Garl Glittergold, is the most widely worshiped deity among
        gnomes.
      </Text>
    </Box>
  );
}
