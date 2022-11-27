const { SlashCommandBuilder } = require("discord.js");
const debug = require("../debug");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kf2")
    .setDescription("Killing Floor Random Perks")
    .addSubcommand((subcommand) =>
      subcommand.setName("start").setDescription("Start the KF2 Game")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("show").setDescription("Show everyone in the KF2 game")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("join").setDescription("Join the KF2 Game")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("leave").setDescription("Leave the KF2 Game")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("clear").setDescription("Clear the KF2 Game")
    ),

  async execute(interaction, client) {
    let subcommand = interaction.options.getSubcommand();

    if (subcommand == "join") {
      if (players.length >= 6) {
        interaction.reply(
          "There is so space left in the session. Only 6 people can play at any given time."
        );
        return;
      }

      if (!players.includes(interaction.member.user.toString())) {
        players.push(interaction.member.user.toString());

        interaction.reply(
          interaction.member.user.toString() + " has been added to the session!"
        );
      } else {
        interaction.reply(
          interaction.member.user.toString() + " is already in the session"
        );
      }
    } else if (subcommand == "leave") {
      if (players.includes(interaction.member.user.toString())) {
        players.splice(players.indexOf(interaction.member.user.toString(), 1));

        interaction.reply(
          interaction.member.user.toString() +
            " has been removed from the session!"
        );
      } else {
        interaction.reply(
          interaction.member.user.toString() + " is not in the session"
        );
      }
    } else if (subcommand == "show") {
      let show = "";

      for (let i = 0; i < players.length; i++) show += players[i] + "\n";

      if (show == "") show = "No one is in the session";
      else show = "The current players are:\n" + show;
      interaction.reply(show);
    } else if (subcommand == "clear") {
      players = [];
    } else if (subcommand == "start") {
      let output = "The parks are:\n";

      let rnd = Math.floor(Math.random() * players.length);
      let medic = players[rnd];

      output += medic + " - Field Medic\n";

      let roles = [
        "Berserker",
        "Commando",
        "Support",
        "Demolitionist",
        "Firebug",
        "Gunslinger",
        "Sharpshooter",
        "Swat",
        "Survivalist",
      ];

      for (let i = 0; i < players.length; i++) {
        if (players[i] == medic) continue;

        rnd = Math.floor(Math.random() * roles.length);
        output += players[i] + " - " + roles[rnd] + "\n";
        roles.splice(rnd, 1);
      }

      interaction.reply(output);
    }
  },
};

let players = [];
