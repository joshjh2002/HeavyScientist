const { SlashCommandBuilder } = require("@discordjs/builders");
const { conan_embed } = require("../jsons/server-embeds");
const { sendLink } = require("../tools");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("conan")
    .setDescription("Sends Conan Embed and Link")
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
      interaction.reply({ embeds: [conan_embed] });
    } else {
      if (choice == "join" || choice == null) {
        sendLink(
          interaction,
          client,
          process.env.CONAN_ADMIN_CHANNEL,
          process.env.CONAN_LINK,
          "join"
        );
      } else if (choice == "vote") {
        sendLink(
          interaction,
          client,
          process.env.CONAN_ADMIN_CHANNEL,
          "https://conan-exiles.com/server/90048/",
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
