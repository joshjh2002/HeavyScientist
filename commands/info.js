const { SlashCommandBuilder } = require("discord.js");
const pgDatabase = require("pg");

const moment = require("moment");

const pgconnection = new pgDatabase.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "ticketsystem",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pgconnection.connect();

const debug = require("../debug");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Sends User Info")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Which user do you want to query?")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    let user = interaction.options.getUser("user");
    if (
      !(
        interaction.member.roles.cache.has(process.env.DC_ADMIN_ROLE) ||
        interaction.member.roles.cache.has(process.env.DC_MOD_ROLE)
      )
    ) {
      interaction.reply({
        content: "You do not have permission to use this command",
        ephemeral: true,
      });
    } else {
      let query = "SELECT warnings FROM users WHERE user_id = " + user.id + ";";

      await pgconnection.query(query, async (err, res) => {
        let guild = client.guilds.cache.get(process.env.DC_GUILD_ID);
        let member = await guild.members.fetch(user.id);

        let warnings = 0;

        if (res.rows[0] != undefined) warnings = res.rows[0].warnings;

        let roles = "";

        member._roles.forEach((element) => {
          roles += "<@&" + element + ">";
        });

        if (roles == "") roles == "None";

        const embed = {
          author: {
            name: member.user.username,
            url: member.user.displayAvatarURL(),
            icon_url: member.user.displayAvatarURL(),
          },
          fields: [
            {
              name: "Date Created:",
              value: moment(member.user.createdAt).format("DD/MM/YYYY") + "",
              inline: true,
            },
            {
              name: "Date Joined:",
              value: moment.utc(member.joinedAt).format("DD/MM/YYYY") + "",
              inline: true,
            },
            {
              name: "Roles:",
              value: "" + roles,
            },
            {
              name: "Warnings:",
              value: "" + warnings,
            },
          ],
        };

        interaction.reply({ embeds: [embed] });
      });
    }
  },
};
