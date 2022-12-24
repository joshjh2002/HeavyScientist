const {
  ContextMenuCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  ApplicationCommandType,
  TextInputStyle,
} = require("discord.js");

require("dotenv").config();

const debug = require("../debug");
const pgDatabase = require("pg");

const pgconnection = new pgDatabase.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "ticketsystem",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pgconnection.connect();

const tools = require("../tools");

module.exports = {
  data: new ContextMenuCommandBuilder()
    .setName("warn")
    .setType(ApplicationCommandType.Message),
  async execute(interaction, client) {
    if (
      interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
      interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
    ) {
      const selectedUser = interaction.targetMessage.author.id;

      let guild = client.guilds.cache.get(process.env.DC_GUILD_ID);
      let user = await guild.members.fetch(selectedUser);

      if (
        user._roles.includes(process.env.DC_ADMIN_ROLE) ||
        user._roles.includes(process.env.DC_MOD_ROLE)
      ) {
        interaction.reply({
          ephemeral: true,
          content: "You cannot warn this user. They are a member of staff.",
        });
        return;
      }

      let query = "SELECT * FROM users WHERE user_id = " + selectedUser + ";";
      await pgconnection.query(query, async (err, res) => {
        if (err) {
          console.error(err);
          return;
        }

        let founduser = false;
        let numberOfWarnings = 0;

        if (res.rows[0]) founduser = true;

        if (founduser == false) {
          query +=
            "INSERT INTO users(user_id, user_name, warnings) VALUES (" +
            selectedUser +
            ", " +
            "'" +
            interaction.targetMessage.author.toString() +
            "'" +
            ", 0" +
            ");";

          await pgconnection.query(query, (err, res) => {
            if (err) {
              console.log(err);
              return;
            }
          });
        }

        query = "SELECT warnings FROM users WHERE user_id = " + selectedUser;

        await pgconnection.query(query, async (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          numberOfWarnings = res.rows[0].warnings;

          query =
            "UPDATE users set warnings = " +
            (numberOfWarnings + 1) +
            " where user_id = " +
            selectedUser;

          await pgconnection.query(query, async (err, res) => {
            if (err) {
              console.error(err);
              return;
            }

            const userWarned = {
              title: "Member has been warned",
              description:
                interaction.targetMessage.author.username +
                "#" +
                interaction.targetMessage.author.discriminator +
                " has been warned.\nThey now have " +
                (numberOfWarnings + 1) +
                " warning(s).\n\nThey were warned for the following message in <#" +
                interaction.targetMessage.channelId +
                "> where they said:\n```" +
                interaction.targetMessage.content +
                "```\nThe message was automatically deleted.",
              color: 3847248,
              author: {
                name:
                  interaction.user.username +
                  "#" +
                  interaction.user.discriminator,
                url: interaction.user.displayAvatarURL(),
                icon_url: interaction.user.displayAvatarURL(),
              },
            };

            client.channels.cache
              .get(process.env.DC_BOT_LOG)
              .send({ embeds: [userWarned] });

            interaction.targetMessage.author.send(
              "You have been waned for the following message which you sent in <#" +
                interaction.targetMessage.channelId +
                ">:\n```" +
                interaction.targetMessage.content +
                "```\nYou have " +
                (numberOfWarnings + 1) +
                " warnings. 3 warnings will result in a ban or a kick, depending on the offence."
            );

            if (numberOfWarnings + 1 >= 3) {
              const modal = new ModalBuilder()
                .setCustomId("dispute-" + interaction.targetMessage.author.id)
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

            interaction.targetMessage.delete();
          });
        });
      });
    } else {
      interaction.reply({
        content: "You do not have permission to use this command.",
        ephemeral: true,
      });
    }
  },
};
