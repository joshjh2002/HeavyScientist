const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { report_embed } = require("../jsons/server-embeds");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ticket")
    .setDescription("Sends Ticket Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      let row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("rust-ticket")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(process.env.RUST_EMOJI),

        new ButtonBuilder()
          .setCustomId("discord-ticket")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(process.env.DISCORD_EMOJI),

        new ButtonBuilder()
          .setCustomId("other-ticket")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(process.env.OTHER_EMOJI)
      );

      await interaction.reply({
        embeds: [report_embed],
        components: [row],
      });
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
