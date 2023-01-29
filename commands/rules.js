const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  AttachmentBuilder,
} = require("discord.js");

const debug = require("../debug");
const { rules_embed } = require("../jsons/server-embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Sends Rules Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("rules-button")
          .setLabel("Agree to rules")
          .setStyle(ButtonStyle.Primary)
      );

      const attachment1 = new AttachmentBuilder("img/RulesTop.png");
      const attachment2 = new AttachmentBuilder("img/RulesBottom.gif");

      await interaction.reply({
        files: [attachment1],
        embeds: [rules_embed],
        components: [row],
      });
      interaction.followUp({ files: [attachment2] });
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
