const { SlashCommandBuilder } = require("discord.js");
const { rust_embed } = require("../jsons/server-embeds");
const { sendLink } = require("../tools");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rust")
    .setDescription("Sends Rust Embed and Link")
    .addStringOption((option) =>
      option
        .setName("link")
        .setDescription("Which link do you want?")
        .setRequired(false)
        .setChoices(
          { name: "Join Link", value: "join" },
          { name: "Vote Link", value: "vote" }
        )
    ),
  async execute(interaction, client) {
    let choice = interaction.options.getString("link");
    if (
      (interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
        interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)) &&
      choice == null
    ) {
      interaction.reply({ embeds: [rust_embed] });
    } else {
      if (choice == "join" || choice == null) {
        sendLink(
          interaction,
          client,
          process.env.RUST_ADMIN_CHANNEL,
          process.env.RUST_LINK,
          "join"
        );
      } else if (choice == "vote") {
        sendLink(
          interaction,
          client,
          process.env.RUST_ADMIN_CHANNEL,
          "https://rust-servers.net/server/167442/",
          "vote"
        );
      } else {
        interaction.reply({
          content: "You do not have permission to use this command.",
          ephemeral: true,
        });
      }
    }
  },
};
