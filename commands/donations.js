const { SlashCommandBuilder } = require("discord.js");
const { donations_embed } = require("../jsons/server-embeds");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("donations")
    .setDescription("Sends Donations Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      interaction.reply({ embeds: [donations_embed] });
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
