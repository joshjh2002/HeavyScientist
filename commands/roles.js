const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  AttachmentBuilder,
} = require("discord.js");

const debug = require("../debug");

const {
  rust_role,
  cosmetic_roles,
  location_roles,
} = require("../jsons/server-embeds");

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

      const attachment1 = new AttachmentBuilder("img/RolesTop.png");
      const attachment2 = new AttachmentBuilder("img/RolesBottom1.png");
      const attachment3 = new AttachmentBuilder("img/RolesBottom2.gif");

      let message = await interaction.reply({
        files: [attachment1],
        fetchReply: true,
      });

      //cosmetic roles here:
      let cosmeticButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("medjay-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("1️⃣"),
        new ButtonBuilder()
          .setCustomId("spartan-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("2️⃣"),
        new ButtonBuilder()
          .setCustomId("immortals-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("3️⃣"),
        new ButtonBuilder()
          .setCustomId("centurion-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("4️⃣")
      );

      message = await message.reply({
        embeds: [cosmetic_roles],
        components: [cosmeticButtons],
        fetchReply: true,
      });

      //location roles here:

      let locationButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("na-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("1️⃣"),
        new ButtonBuilder()
          .setCustomId("eu-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("2️⃣"),
        new ButtonBuilder()
          .setCustomId("row-button")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji("3️⃣")
      );
      message = await message.reply({
        embeds: [location_roles],
        components: [locationButtons],
        fetchReply: true,
      });

      //Rust Role
      let rustButtons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("rust-button")
          .setLabel("Rusty Operations")
          .setStyle(ButtonStyle.Secondary)
          .setEmoji(process.env.RUST_EMOJI)
      );

      message = await message.reply({
        embeds: [rust_role],
        components: [rustButtons],
        fetchReply: true,
      });

      //sends bottom 2 images
      message.reply({ files: [attachment2, attachment3] });

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
