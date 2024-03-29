const ticket = require("./ticket");
const debug = require("./debug");
require("dotenv").config();
module.exports = {
  LoadCommands: function (fs, client) {
    const commandFiles = fs
      .readdirSync("./commands/")
      .filter((file) => file.endsWith(".js"));

    let commands = [];
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      commands.push(command.data.toJSON());
      client.commands.set(command.data.name, command);
    }
    return commands;
  },

  ready: function (client) {
    //Caches message for the ticketing system
    //client.channels.cache
    //.get(process.env.DC_TICKETS_CHANNEL)
    //.messages.fetch(process.env.DC_TICKETS_MESSAGE);
  },

  messageCommand: function (prefix, message, Discord, client) {
    //if this crashes, then the command does not exist
    try {
      //if message is from the bot and doesn't start wit the prefix, then ignore it
      if (!message.content.startsWith(prefix) || message.author.bot) return;

      //get command and arguments
      const args = message.content.slice(prefix.length).split(" ");
      const command = args.shift().toLowerCase();

      //execute command and pass in needed information
      client.commands.get(command).execute(message, args, Discord, client);
    } catch (error) {
      message.channel.send(
        "This command was not recognised. Please try again!"
      );
    }
  },

  messageReaction: function (reaction, user, client) {
    //ignore reactions from the bot
    if (user.bot) return;

    //checks if the reaction is on the ticket message
    /*
    if (reaction.message.id == process.env.DC_TICKETS_MESSAGE) {
      reaction.users.remove(user.id);
      ticket.CreateTicket(reaction, user, client);
    }
    */
  },

  buttonHandler: function (interaction, client) {
    try {
      let admin_role = "";
      if (interaction.customId == "rust-button") {
        this.rust_button(interaction, client);
      } else if (interaction.customId == "rules-button") {
        try {
          interaction.member.roles.add("672053262261813248");
          interaction.reply({
            content:
              "Thank you for agreeing to the rules! You now have access to the rest of the server!\n\n" +
              "You can go to the <#721368768093356094> channel to gain access to the role-specific channels!",
            ephemeral: true,
          });
        } catch (err) {
          debug.log(
            "Something went wrong giving the user the members role\n\n" + err
          );
        }
      } else if (interaction.customId === "discord-ticket") {
        admin_role = "<@&" + process.env.DC_DISCORD_ROLE + ">";
        ticket.CreateChannel(
          null,
          interaction.member.user,
          admin_role,
          process.env.DC_DISCORD_ROLE,
          client,
          interaction
        );
      } else if (interaction.customId === "rust-ticket") {
        admin_role = "<@&" + process.env.DC_RUST_ROLE + ">";
        ticket.CreateChannel(
          null,
          interaction.member.user,
          admin_role,
          process.env.DC_RUST_ROLE,
          client,
          interaction
        );
      } else if (interaction.customId === "other-ticket") {
        admin_role =
          "<@&" +
          process.env.DC_ADMIN_ROLE +
          ">" +
          " <@&" +
          process.env.DC_MOD_ROLE +
          ">";
        ticket.CreateChannel(
          null,
          interaction.member.user,
          admin_role,
          process.env.DC_ADMIN_ROLE,
          client,
          interaction
        );
      } else if (interaction.customId === "medjay-button") {
        this.add_role(interaction, "786593800596357130");
      } else if (interaction.customId === "spartan-button") {
        this.add_role(interaction, "1047156960769867916");
      } else if (interaction.customId === "immortals-button") {
        this.add_role(interaction, "917405625712001085");
      } else if (interaction.customId === "centurion-button") {
        this.add_role(interaction, "786591672770625548");
      } else if (interaction.customId === "na-button") {
        this.add_role(interaction, "1047157742831423549");
      } else if (interaction.customId === "eu-button") {
        this.add_role(interaction, "1047157818999963648");
      } else if (interaction.customId === "row-button") {
        this.add_role(interaction, "1047158446602063913");
      }
    } catch (err) {
      debug.log("Something went when handling the buttons\n\n" + err);
    }
  },

  add_role: function (interaction, roleId) {
    try {
      if (interaction.member.roles.cache.has(roleId)) {
        interaction.reply({
          content: "You no longer have the <@&" + roleId + "> role.",
          ephemeral: true,
        });
        interaction.member.roles.remove(roleId);
      } else {
        interaction.reply({
          content: "You have been given the <@&" + roleId + "> role.",
          ephemeral: true,
        });
        interaction.member.roles.add(roleId);
      }
    } catch (err) {
      debug.log("Something went wrong sending the interaction\n\n" + err);
    }
  },

  rust_button: function (interaction, client) {
    try {
      if (interaction.member.roles.cache.has(process.env.DC_MEMBER_RUST_ROLE)) {
        interaction.reply({
          content:
            "You no longer have the Rust role. We're sorry to see you go.",
          ephemeral: true,
        });
        interaction.member.roles.remove(process.env.DC_MEMBER_RUST_ROLE);
        client.channels.cache
          .get(process.env.RUST_CHANNEL)
          .send(
            "<@" + interaction.member.user.id + "> has removed the Rust role."
          );
      } else {
        interaction.reply({
          content: "You have been given the Rust role.",
          ephemeral: true,
        });
        interaction.member.roles.add(process.env.DC_MEMBER_RUST_ROLE);
        client.channels.cache
          .get(process.env.RUST_CHANNEL)
          .send("<@" + interaction.member.user.id + "> has got the Rust role.");

        let messages = [
          "Welcome to Rusty Operations! We hope you enjoy your stay!",
          "Hello! It's great to have you here!",
        ];
        let rnd = Math.floor(Math.random() * messages.length);

        const embed = {
          description:
            messages[rnd] +
            "\nYou can use `/rust` to get a link that will automatically connect you to the server.",
          color: process.env.EMBED_COLOUR,
          thumbnail: {
            url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
          },
          author: {
            name: "Ambitious_Gear",
            icon_url:
              "https://cdn.discordapp.com/avatars/697595109415583756/4b25cbfceac2dcf22632f24d14b325cb.webp",
          },
        };

        client.channels.cache.get("947813530407682068").send({
          content: "<@" + interaction.member.user.id + ">",
          embeds: [embed],
        });
      }
    } catch (err) {
      debug.log("Something went wrong sending the interaction\n\n" + err);
    }
  },

  sendLink: async function (interaction, client, channel, link, type) {
    try {
      const user = await client.users.cache.get(
        interaction.member.user.id.toString()
      );
      user.send({
        content: link,
      });

      interaction.reply({
        content: "The link has been sent you. Check your DMs!",
        ephemeral: true,
      });

      client.channels.cache
        .get(channel)
        .send(
          "<@" +
            interaction.member.user.id +
            "> has requested the server " +
            type +
            " link."
        );
    } catch (err) {
      debug.log("Something went wrong sending the link\n\n" + err);
    }
  },

  modalHandler: async function (interaction, client) {
    let modalName = interaction.customId.split("-");

    if (modalName[0] == "dispute") {
      let userId = modalName[1];

      let guild = client.guilds.cache.get(process.env.DC_GUILD_ID);
      let user = await guild.members.fetch(userId);

      if (
        user._roles.includes(process.env.DC_ADMIN_ROLE) ||
        user._roles.includes(process.env.DC_MOD_ROLE)
      ) {
        interaction.reply({
          ephemeral: true,
          content:
            "You cannot ban or kick this user. They are a member of staff.",
        });
        return;
      }

      const bankick = interaction.fields.getTextInputValue("bankick");
      const reason = interaction.fields.getTextInputValue("reason");

      if (bankick == "b") {
        await user.send(
          "You were banned from Rusty Operations. Reason:\n```" + reason + "```"
        );
        user.ban({ reason });
      } else if (bankick == "k") {
        await user.send(
          "You were kicked from Rusty Operations. Reason:\n```" + reason + "```"
        );
        user.kick({ reason });
      } else {
        interaction.reply({
          ephemeral: true,
          content: "Type 'b' for ban and 'k' for kick",
        });
      }
    }
  },
};
