const { SlashCommandBuilder } = require("@discordjs/builders");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong"),
  async execute(interaction, client) {
    interaction.reply("Pong!");
  },
};
