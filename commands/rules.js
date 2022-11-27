const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  AttachmentBuilder,
} = require("discord.js");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("Sends Rules Embed"),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const embed = {
        title: "RULES",
        description: "*Please read the rules below:*",
        color: 16034331,
        image: {
          url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
        },
        fields: [
          {
            name: ":one:",
            value:
              "Your account must comply with the Discord Terms of Service (Must be 13-years-old or older)!",
          },
          {
            name: ":two:",
            value: "No inappropriate names, profile pictures, or status'!",
          },
          {
            name: ":three:",
            value: "Use the correct channels for what you are posting!",
          },
          {
            name: ":four:",
            value:
              "No offensive or inappropriate content, remarks, or song requests!",
          },
          {
            name: ":five:",
            value:
              "No NSFW content (NSFW memes are allowed in the meme channel but nothing too obscene)!",
          },
          {
            name: ":six:",
            value: "No spamming channels!",
          },
          {
            name: ":seven:",
            value:
              "No advertising or selling of products, services or other communities!",
          },
          {
            name: ":eight:",
            value:
              "No political or religious arguments (Try to keep political and/or religious conversations to a minimum)!",
          },
          {
            name: ":nine:",
            value: "No loud noises or music played through your microphone!",
          },
          {
            name: ":one::zero:",
            value:
              "No abusive talk to admins or moderators (They are here to help)!",
          },
          {
            name: ":one::one:",
            value:
              "If you are streaming publicly (Twitch, YouTube, etc.) while in chat you must add a hash symbol (#) to your nickname!",
          },
          {
            name: ":one::two:",
            value:
              "Do not use the ticketing system for anything other than a legitimate reason!",
          },
          {
            name: ":one::three:",
            value:
              "Treat everyone with respect. Absolutely no harassment, witch hunting, sexism, racism or hate speech will be tolerated.",
          },
        ],
      };

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("rules-button")
          .setLabel("Agree to rules")
          .setStyle(ButtonStyle.Primary)
      );

      const attachment1 = new AttachmentBuilder("img/RulesTop.png");
      const attachment2 = new AttachmentBuilder("img/RulesBottom1.png");
      const attachment3 = new AttachmentBuilder("img/RulesBottom2.gif");

      await interaction.reply({
        files: [attachment1],
        embeds: [embed],
        components: [row],
      });
      interaction.followUp({ files: [attachment2, attachment3] });
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
