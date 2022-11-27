const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
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
      let row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("discord-ticket")
          .setStyle("SECONDARY")
          .setEmoji(process.env.DISCORD_EMOJI),
        /*
        new MessageButton()
          .setCustomId("conan-ticket")
          .setStyle("SECONDARY")
          .setEmoji(process.env.CONAN_EMOJI),
          */
        new MessageButton()
          .setCustomId("rust-ticket")
          .setStyle("SECONDARY")
          .setEmoji(process.env.RUST_EMOJI),
        /*
        new MessageButton()
          .setCustomId("farming-ticket")
          .setStyle("SECONDARY")
          .setEmoji(process.env.FARMING_EMOJI),
          */
        new MessageButton()
          .setCustomId("other-ticket")
          .setStyle("SECONDARY")
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
