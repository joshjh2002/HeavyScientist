const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  checkDispute: async function (interaction, numberOfWarnings, userId) {
    if (numberOfWarnings + 1 >= 3) {
      const modal = new ModalBuilder()
        .setCustomId("dispute-" + userId)
        .setTitle("Ban/Kick User");

      // Add components to modal

      // Create the text input components
      const favoriteColorInput = new TextInputBuilder()
        .setCustomId("bankick")
        // The label is the prompt the user sees for this input
        .setLabel("Should we ban (b) or kick (k) user")
        // Short means only a single line of text
        .setStyle(TextInputStyle.Short);

      const hobbiesInput = new TextInputBuilder()
        .setCustomId("reason")
        .setLabel("Please give ban or kick reason!")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Paragraph);

      // An action row only holds one text input,
      // so you need one action row per text input.
      const firstActionRow = new ActionRowBuilder().addComponents(
        favoriteColorInput
      );
      const secondActionRow = new ActionRowBuilder().addComponents(
        hobbiesInput
      );

      // Add inputs to the modal
      modal.addComponents(firstActionRow, secondActionRow);

      // Show the modal to the user
      await interaction.showModal(modal);

      interaction.followUp({
        ephemeral: true,
        content:
          "Member has successfully been warned! Check <#" +
          process.env.DC_BOT_LOG +
          "> for more details.",
      });
    } else {
      interaction.reply({
        ephemeral: true,
        content:
          "Member has successfully been warned! Check <#" +
          process.env.DC_BOT_LOG +
          "> for more details.",
      });
    }
  },
};
