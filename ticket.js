require("dotenv").config();
const debug = require("./debug");
const fs = require("fs");
const pgDatabase = require("pg");
const { ChannelType, PermissionsBitField } = require("discord.js");

const pgconnection = new pgDatabase.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: "ticketsystem",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

pgconnection.connect();

/*
const query = `SELECT * FROM staff;`;
pgconnection.query(query, (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  let output = "";
  let i = 0;
  while (res.rows[i] != null) {
    output += res.rows[i].staff_id + "\n";
    i++;
  }
  debug.log(output);
  //pgconnection.end();
});
*/
module.exports = {
  CreateChannel: async function (
    reaction,
    user,
    admin_role,
    admin_id,
    client,
    interaction
  ) {
    //creates channel in the same location as the reaction message
    const channel = await client.guilds.cache
      .get(process.env.DC_GUILD_ID)
      .channels.create({
        name: "ticket-",
        type: ChannelType.GuildText, //This create a text channel, you can make a voice one too, by changing "text" to "voice"
        parent: process.env.DC_TICKETS_CATEGORY, //This is the category it is in
        permissionOverwrites: [
          {
            id: process.env.DC_ADMIN_ROLE, //To make it be seen by a certain role, user an ID instead
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ], //Allow permissions
          },
          {
            id: process.env.DC_MOD_ROLE, //To make it be seen by a certain role, user an ID instead
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ], //Allow permissions
          },
          {
            id: user.id, //To make it be seen by a certain role, user an ID instead
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ], //Allow permissions
          },
          {
            // same as before
            id: client.guilds.cache.get(process.env.DC_GUILD_ID).roles.everyone,
            deny: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ],
      });

    interaction.reply({
      content: "You can view your ticket here: <#" + channel.id + ">",
      ephemeral: true,
    });

    //Sends message to channel
    client.channels.cache
      .get(channel.id)
      .send(
        "Hello " +
          user.toString() +
          ", thank you for creating a support ticket! The " +
          admin_role +
          " will be with you shortly. Please can you describe your issue below?"
      );

    this.GenerateName(user, admin_id, channel);
  },

  GenerateName: async function (user, staff, channel) {
    let created_date = new Date().toLocaleString();
    let ticket_record;
    created_date = created_date.replace(",", "");
    debug.log("New ticket created: ");
    let query = "SELECT * FROM users WHERE user_id = " + user.id + ";";
    let founduser = false;

    await pgconnection.query(query, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      if (res.rows[0]) founduser = true;
      query =
        "INSERT INTO channels(channel_id, log_file) VALUES (" +
        channel.id +
        ", " +
        channel.id +
        ");";

      if (founduser == false) {
        query +=
          "INSERT INTO users(user_id, user_name) VALUES (" +
          user.id +
          ", " +
          "'" +
          user.toString() +
          "'" +
          ", 0" +
          ");";
      }

      query +=
        "INSERT INTO TICKETS(ticket_id, user_id, staff_id, channel_id, time_created) VALUES(nextval('tickets_ticket_id_seq')," +
        user.id +
        ", " +
        staff +
        ", " +
        channel.id +
        ", '" +
        created_date +
        "');";

      pgconnection.query(query, (err, res) => {
        if (err) {
          console.error(err);
          return;
        }
        query =
          "SELECT * FROM tickets WHERE time_created = '" + created_date + "';";

        pgconnection.query(query, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          ticket_record = res;

          channel.setName(
            "ticket-" + ("000000" + ticket_record.rows[0].ticket_id).slice(-6)
          );
        });
      });
    });
  },

  CreateTicket: async function (reaction, user, client) {
    let admin_role = "";
    if (reaction.emoji.name === "ConanExiles") {
      admin_role = "<@&" + process.env.DC_CONAN_ROLE + ">";
      this.CreateChannel(
        reaction,
        user,
        admin_role,
        process.env.DC_CONAN_ROLE,
        client
      );
    } else if (reaction.emoji.name === "discord_logo") {
      admin_role = "<@&" + process.env.DC_DISCORD_ROLE + ">";
      this.CreateChannel(
        reaction,
        user,
        admin_role,
        process.env.DC_DISCORD_ROLE,
        client
      );
    } else if (reaction.emoji.name === "Rust") {
      admin_role = "<@&" + process.env.DC_RUST_ROLE + ">";
      this.CreateChannel(
        reaction,
        user,
        admin_role,
        process.env.DC_RUST_ROLE,
        client
      );
    } else if (reaction.emoji.name === "farming") {
      admin_role = "<@&" + process.env.DC_FARMING_ROLE + ">";
      this.CreateChannel(
        reaction,
        user,
        admin_role,
        process.env.DC_FARMING_ROLE,
        client
      );
    } else if (reaction.emoji.name === "☑") {
      admin_role =
        "<@&" +
        process.env.DC_ADMIN_ROLE +
        ">" +
        " <@&" +
        process.env.DC_MOD_ROLE +
        ">";
      this.CreateChannel(
        reaction,
        user,
        admin_role,
        process.env.DC_ADMIN_ROLE,
        client
      );
    }
  },

  logMessage: function (message, client) {
    //debug.log(message.channel.id);

    let query =
      "SELECT * FROM tickets WHERE channel_id = " + message.channel.id + ";";

    pgconnection.query(query, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }
      let ret = res.rows[0];

      if (!ret) return;

      let channel_id = ret.channel_id;

      if (!channel_id) return;

      var fileName = "ticket_logs/" + channel_id + ".txt";

      fs.appendFile(
        fileName,
        message.member.displayName + ": " + message.toString() + "\n",
        function (err) {
          if (err)
            console.error("There was an error writing the the file\n" + err);
        }
      );
    });
  },
};
