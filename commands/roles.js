const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");

const debug = require("../debug");

const { rust_role } = require("../jsons/server-embeds");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Displays All Role Embeds and Buttons"),
  async execute(interaction, client) {
    if (
      (interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
        interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)) &&
      interaction.options.getBoolean("link") != true
    ) {
      let row;
      /*
      row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("conan-button")
          .setLabel("Operation Exiles")
          .setStyle("PRIMARY")
          .setEmoji(process.env.CONAN_EMOJI)
      );

      let message = await interaction.reply({
        embeds: [conan_role],
        components: [row],
        fetchReply: true,
      });
      */

      row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("rust-button")
          .setLabel("Rusty Operations")
          .setStyle(ButtonStyle.Primary)
          .setEmoji(process.env.RUST_EMOJI)
      );

      let message = await interaction.reply({
        embeds: [rust_role],
        components: [row],
        fetchReply: true,
      });

      /*
      row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("farming-button")
          .setLabel("Farming Operations")
          .setStyle("PRIMARY")
          .setEmoji(process.env.FARMING_EMOJI)
      );

      await message.reply({ embeds: [farming_role], components: [row] });
      */
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
