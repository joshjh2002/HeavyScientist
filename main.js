require("dotenv").config();
const debug = require("./debug");
const tools = require("./tools");

const Canvas = require("@napi-rs/canvas");

const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  REST,
  Routes,
  Events,
  AttachmentBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: [Partials.Channel],
});

const fs = require("fs");
const ticket = require("./ticket");

const prefix = "-";
client.commands = new Collection();
let commands = tools.LoadCommands(fs, client);

/*
const DELETE = false;
if (DELETE) {
  const rest = new REST({ version: "9" }).setToken(process.env.DC_TOKEN);
  rest
    .get(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.DC_GUILD_ID
      )
    )
    .then((data) => {
      const promises = [];
      for (const command of data) {
        const deleteUrl = `${Routes.applicationGuildCommands(
          process.env.CLIENT_ID,
          process.env.DC_GUILD_ID
        )}/${command.id}`;
        promises.push(rest.delete(deleteUrl));
      }
      return Promise.all(promises);
    });
}
*/

//Once the bot is online
client.once(Events.ClientReady, async () => {
  debug.log("Operations Centre AI: Online!");
  tools.ready(client);

  const CLIENT_ID = client.user.id;

  const rest = new REST({
    version: "9",
  }).setToken(process.env.DC_TOKEN);

  (async () => {
    try {
      if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands,
        });
        debug.log("Commands Registered Globally");
      } else {
        await rest.put(
          Routes.applicationGuildCommands(CLIENT_ID, process.env.DC_GUILD_ID),
          {
            body: commands,
          }
        );
        debug.log("Commands Registered Locally");
      }
    } catch (err) {
      console.error(err);
    }
  })();

  status();
});

let statusList = [
  "Welcome to the Rusty Operations",
  "Can't see something? Go to the roles channel!",
  "Why not join our Rust server?",
  "All systems online!",
];

async function status() {
  let currentStatus = Math.floor(Math.random() * statusList.length);

  client.user.setPresence({
    activities: [{ name: statusList[currentStatus] }],
  });

  setTimeout(status, 60000);
}

client.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (interaction.isButton()) {
      try {
        tools.buttonHandler(interaction, client);
      } catch (err) {
        debug.log(err);
      }
    }

    if (interaction.isSelectMenu()) {
      tools.menuHandler(interaction, client);
    }

    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      try {
        await command.execute(interaction, client);
      } catch (err) {
        interaction.reply({
          content: "An error occurred using this command",
          ephemeral: true,
        });
        console.error(err);
      }
    }
  } catch (err) {}
});

//When someone sends a message, this will execute
client.on(Events.MessageCreate, (message) => {
  ticket.logMessage(message, client);
});

//when a user reacts to a message
client.on("messageReactionAdd", (reaction, user) => {
  //tools.messageReaction(reaction, user, client);
});

client.on(Events.GuildMemberAdd, async (member) => {
  await sleep(500);
  debug.log(member.user.username + " joined\n");

  const userjoined = {
    title:
      member.user.username +
      "#" +
      member.user.discriminator +
      " has joined the server",
    color: 3847248,
    thumbnail: {
      url: member.user.displayAvatarURL(),
    },
    author: {
      name: member.user.username + "#" + member.user.discriminator,
      url: member.user.displayAvatarURL(),
      icon_url: member.user.displayAvatarURL(),
    },
  };

  client.channels.cache
    .get(process.env.DC_BOT_LOG)
    .send({ embeds: [userjoined] });

  const canvas = Canvas.createCanvas(500, 250);

  const context = canvas.getContext("2d");

  const profilePicture = await Canvas.loadImage(member.user.displayAvatarURL());

  const background = await Canvas.loadImage(
    "https://operationscentre.github.io/community/img/Rusty-Operations-Banner.png"
  );

  // This uses the canvas dimensions to stretch the image onto the entire canvas
  context.drawImage(background, 0, 0, canvas.width, canvas.height);

  /*context.drawImage(
      profilePicture,
      canvas.width / 2 - profilePicture.width / 2,
      canvas.height / 2 - profilePicture.height / 2 - 50,
      profilePicture.width,
      profilePicture.height
    );
    */

  context.lineWidth = 5;
  context.strokeRect(0, 0, canvas.width, canvas.height);

  context.textAlign = "center";
  context.fillStyle = "#F4AA1B";
  context.font = "32px Bauhaus 93";
  context.fillText(
    "WELCOME TO RUSTY OPERATIONS",
    canvas.width / 2,
    canvas.height / 2 + 90
  );
  context.font = "24px Bauhaus 93";
  context.fillText(
    member.user.username + "#" + member.user.discriminator,
    canvas.width / 2,
    canvas.height / 2 + 40
  );

  //draw picture
  context.lineWidth = 1;
  context.save();
  context.beginPath();
  context.arc(
    canvas.width / 2,
    canvas.height / 2 - 50,
    profilePicture.width / 2,
    0,
    Math.PI * 2,
    false
  );
  context.strokeStyle = "#F4AA1B";
  context.stroke();
  context.clip();
  context.drawImage(
    profilePicture,
    canvas.width / 2 - profilePicture.width / 2,
    canvas.height / 2 - profilePicture.height / 2 - 50,
    profilePicture.width,
    profilePicture.width
  );
  context.restore();

  // Use the helpful Attachment class structure to process the file for you
  const attachment = new AttachmentBuilder(await canvas.encode("png"));

  client.channels.cache
    .get(process.env.DC_WELCOME_CHANNEL)
    .send({ files: [attachment] });
});

client.on(Events.GuildMemberRemove, async (member) => {
  debug.log(member.user.username + " left\n");

  const userleft = {
    title:
      member.user.username +
      "#" +
      member.user.discriminator +
      " has left the server",
    color: 3847248,
    thumbnail: {
      url: member.user.displayAvatarURL(),
    },
    author: {
      name: member.user.username + "#" + member.user.discriminator,
      url: member.user.displayAvatarURL(),
      icon_url: member.user.displayAvatarURL(),
    },
  };

  client.channels.cache
    .get(process.env.DC_BOT_LOG)
    .send({ embeds: [userleft] });
});

client.login(process.env.DC_TOKEN);

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
