const {
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
} = require("discord.js");
const debug = require("../debug");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("commongames")
    .setDescription("Finds Common Games")
    .addStringOption((option) =>
      option
        .setName("names")
        .setDescription("Give names of everyone")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const pgDatabase = require("pg");

    const pgconnection = new pgDatabase.Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: "commongames",
      password: process.env.DB_PASSWORD,
      port: 5432,
    });

    pgconnection.connect();
    let args = interaction.options.getString("names").split(" ");
    let query = `
    -- FILTER USING NAME --
    SELECT g.name
    FROM games g
    LEFT JOIN linker gu USING (game_id)
    LEFT JOIN users u USING (user_id)
    WHERE u.name = '`;

    for (let i = 0; i < args.length; i++) {
      query += args[i] + `' OR u.name = '`;
    }
    query +=
      args[1] +
      `'
     GROUP BY g.name
    HAVING COUNT(*) >= ` +
      args.length +
      `
    ORDER BY g.name ASC`;

    pgconnection.query(query, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      let output = "";
      let i = 0;
      while (res.rows[i]) {
        output += res.rows[i].name + "\n";
        i++;
      }
      if (output != "") interaction.reply(output);
      else
        interaction.reply(
          "Something went wrong getting the information from the database. Try a different search query"
        );
      pgconnection.end();
    });
  },
};
