const {
  ContextMenuCommandBuilder,
  ApplicationCommandType,
} = require("discord.js");

const warn = require("../warn");

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
    .setName("warn-message")
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
              "You have been warned for the following message which you sent in <#" +
                interaction.targetMessage.channelId +
                ">:\n```" +
                interaction.targetMessage.content +
                "```\nYou have " +
                (numberOfWarnings + 1) +
                " warnings. 3 warnings will result in a ban or a kick, depending on the offence."
            );
          });

          warn.checkDispute(
            interaction,
            numberOfWarnings,
            interaction.targetMessage.author.id
          );

          interaction.targetMessage.delete();
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
