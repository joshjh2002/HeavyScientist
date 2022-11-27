const { SlashCommandBuilder } = require("@discordjs/builders");
const { farming_embed } = require("../jsons/server-embeds");
const { sendLink } = require("../tools");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("farming")
    .setDescription("Sends Farming Simulator Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      interaction.reply({ embeds: [farming_embed] });
    }
  },
};
