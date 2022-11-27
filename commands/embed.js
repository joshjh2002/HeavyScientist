const { SlashCommandBuilder } = require("@discordjs/builders");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Sends Custom Embed")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("What do you want the title to be?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription(
          "What is the image link? Say 'null' if you don't want an image."
        )
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("colour")
        .setDescription("What do you want the colour to be?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("What do you want the message to be?")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const title = interaction.options.getString("title");
      const img = interaction.options.getString("image");
      let col = interaction.options.getInteger("colour");

      let description = interaction.options.getString("message");

      if (col > 16777215) {
        col = 16777215;
      }

      let url = "";
      if (img != "null") {
        url = img;
      }
      const embed = {
        title: title,
        description: description,
        color: col,
        image: {
          url: url,
        },
      };
      interaction.reply({ embeds: [embed] });
    } else {
      interaction.reply({
        content: "You do not have the right permissions to use this command.",
        ephemeral: true,
      });
    }
  },
};
