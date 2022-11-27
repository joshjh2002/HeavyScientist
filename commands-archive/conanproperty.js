const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton } = require("discord.js");
const { conan_property } = require("../jsons/server-embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("property")
    .setDescription("Sends Conan Property Application"),
  async execute(interaction, client) {
    let choice = interaction.options.getString("link");
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("property-apply")
          .setLabel("Apply for a Property")
          .setStyle("SECONDARY")
          .setEmoji(process.env.CONAN_EMOJI)
      );
      await interaction.reply({
        embeds: [conan_property],
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
