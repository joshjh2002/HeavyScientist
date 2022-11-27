module.exports = {
  conan_embed: {
    title: "Operation Exiles",
    description:
      "Our server offers an immersive RP experience crafted with precision by our admins who have taken a lot of time to help shape this server to be as fun and balanced as possible. With the help of many modifications, our server is packed full of new features, systems and tons of new items which have found their way into our economic system via vendors, but we wish to have players run their own stores and businesses. We have a strict set of rules which prevent things such as RDM, force RP and random raiding, our active and friendly staff members are there to ensure everyone has a fun and enjoyable time while still enforcing these rules.",
    color: 16731689,
    image: {
      url: "https://cdn.discordapp.com/attachments/742790672813391873/973320175082430575/815765.jpg",
    },
    fields: [
      {
        name: "Connection Info:",
        value:
          "  •   Server Name: Operation Exiles RP \n  •   Server IP: 176.57.165.12:29100",
      },
      {
        name: "Admins:",
        value:
          "Our __admins are available on the Discord__ to help with any important issues, however, we trust the community to be as __mature and patient as possible__ when the admins are not available in-game. __Please respect this__. Do not call admins for silly issues and respect that they may be busy, so please do not demand things or complain if they cannot be there right away.",
      },
      {
        name: "Rules:",
        value:
          "  •   No inappropriate or discriminatory language, content, or behaviour!\n  •   No exploitation, cheating or hacking!\n  •   No blocking passages or entrances to important areas or spawns!\n  •   No blocking or leaving items around other players buildings!\n  •   2 separate builds maximum for a single player and 3 for a guild of 2+!\n  •   6000 building blocks maximum for a single player and 8000 for a clan of 2+!\n  •   Do not leave thrall's or items in NPC towns or other random areas!\n  •   No stealing other players things (unless their base has decayed)!\n  •   Admin town/city and guild laws must be followed!\n  •   No RDM (Killing someone without a reason)!\n  •   No force RP (If someone doesn't want to RP you can't force them)!\n  •   No random raiding (Battles & raids must be agreed upon by both parties)!\n  •   Your player name must be a character name, not a username!\n  •   You must value your life in any RP situation!",
      },
      {
        name: "Server Mods:",
        value:
          "Find the Steam collection [here!](https://steamcommunity.com/sharedfiles/filedetails/?id=2616177527)",
      },
      {
        name: "Vote For Our Server:",
        value:
          "Every 24-hours you can vote for our server [here](https://conan-exiles.com/server/90048/)! You can also use `/conan vote` to have the link sent to your DMs.",
      },
      {
        name: "Shortcut:",
        value:
          "You can get a join link to the server by typing `/conan` into any chat. <@813799178689708104> will DM you the link!",
      },
    ],
  },

  rust_embed: {
    title: "Rusty Operations",
    description:
      "Our server brings a premium experience, offering a mixture of rebalanced gameplay, premium plugins and new maps. For US and UK/EU players!",
    color: 16749824,
    image: {
      url: "https://media.discordapp.net/attachments/742826117395775589/918252341587742730/RusticOperationsThemedHD.png",
    },
    fields: [
      {
        name: "Connection Info:",
        value:
          "  •   Server Name: Rusty Operations 3x | Solo/Duo/Trio | (½Decay|RaidAlarm|Loot+|Shop)\n  •   Server IP: www.rustyoprtations.com:28255",
      },
      {
        name: "Wipe Info:",
        value:
          "Our server does a __map and blueprint__ wipe __ every other Thursday (biweekly)__ so as to stay on schedule with the Rust monthly updates.",
      },
      {
        name: "Features:",
        value:
          "  •   3x Gather, 2x Sulfur, 3x Comps, Less Junk\n  •   Decay ½, All Transport Entities Decay Reduced (TC NEEDED)\n  •   Resources 3x, Components 2x, Charcoal 3x Stacksize\n  •   Wood 4x, Stone 4x, Metal 4x TC Stacksize\n  •   Medsyringe & Medkit 3, Bandage 5\n  •   2x Recycling Speed\n  •   55 Min Day, 5 Min Night\n  •   2x Smelting Speed\n  •   10min Hackable Crate",
      },
      {
        name: "Addon Events:",
        value:
          "  •   Raidable bases, with easy, medium, hard levels of difficulty can purchase expert and nightmare.\n  •   PilotEject for patrol heli, scientist eject upon shooting it down.\n  •   PlaneCrash, shoot plane down with lock on rocket/velocity rocket or has a 15% chance to malfunction.\n  •   HijackableCH47, can take control of chinook to fly.\n  •   Power Grid, to tap into and steal power from the power lines, has great detail as you can be electricuted, also adds street lights.",
      },
      {
        name: "VIP Plugins:",
        value:
          "SkinBox, SignArtist, AutoCode, AutoDoor, EnhancedHammer, NameChanger, ColouredChat and QueueSkip.\nUse, /INFO - for patreon details click 'view webpage' at bottom",
      },
      {
        name: "Admins:",
        value:
          "Our admins are there to help with __important issues__ on the server and are __as active as they can be__, please respect this. __Do not call admins for silly issues__ and respect that they __may be busy__, so please __do not demand things or complain__ if they cannot be there right away.",
      },
      {
        name: "Vote For Our Server:",
        value:
          "Every 24-hours you can vote for our server here to claim rewards in-game. Click [here](https://rust-servers.net/server/166243/). You can also use `/rust vote` to have the link sent to your DMs.",
      },
      {
        name: "Shortcut:",
        value:
          "You can get a join link to the server by typing `/rust` into any chat. <@813799178689708104> will DM you the link!",
      },
    ],
  },

  report_embed: {
    title: "Create a Support Ticket",
    description:
      "Click relevant button to create a ticket and get in contact with the appropriate team!",
    color: 12743972,
    fields: [
      {
        name: process.env.DISCORD_EMOJI,
        value: "Report an issue with the\nDiscord server",
        inline: true,
      },
      /*
      {
        name: process.env.CONAN_EMOJI,
        value: "Report an issue with the\nConan server",
        inline: true,
      },
      */
      {
        name: process.env.RUST_EMOJI,
        value: "Report an issue with the\nRust server",
        inline: true,
      },
      /*
      {
        name: process.env.FARMING_EMOJI,
        value: "Report an issue with the\nFarming Simulator server",
        inline: true,
      },
      */
      {
        name: process.env.OTHER_EMOJI,
        value: "Report a different issue",
        inline: true,
      },
    ],
  },

  conan_role: {
    title: "Operation Exiles (Conan Exiles Server)",
    description:
      "Grab this role if you play on our Conan Exiles server in order to see it's related channels and show you are part of this server.",
    color: 14766914,
  },

  rust_role: {
    title: "Rusty Operations (Rust Server)",
    description:
      "Make sure to get this role if you play on our Rust server so that you can see the Rust channels and get pinged for server announcements and other Rusty things.",
    color: 13724201,
  },

  farming_role: {
    title: "Farming Operations (Farming Simulator 22 Server)",
    description:
      "Grab this role to join our amazing Farming server and to see it's related channels.",
    color: 16731689,
  },

  donations_embed: {
    title: "Donations!",
    description:
      "All donations are greatly appreciated and will go towards the upkeep, upgrade and expansion of our community servers. There are 2 ways in which you can donate:",
    color: 228607,
    image: {
      url: "https://media.discordapp.net/attachments/651470578741542936/813790022657638420/Operations_Logo.png",
    },
    fields: [
      {
        name: "Patreon:",
        value:
          "If you're feeling generous and would like to help us grow our community and be part of it along our journey then you can become a Patreon subscriber, starting at £3 per month. This helps us a lot with the server costs and in returns rewards you with additional benefits.\n\nBenefits include: Discord roles, server titles, additional in-game features and even custom features.\n\nYou can subscribe [here](https://www.patreon.com/opcentre)",
      },
      {
        name: "Donate:",
        value:
          "If you would like to make a one-time donation towards our community you can do so through PayPal. This will help us with the community server costs and would be really appreciated.\n\nDonations and server boosts will gain you the <@&810882948709613639> Discord role and VIP Minecraft title.\n\nYou can make a donation [here](https://paypal.me/pools/c/8quGTqBY1J)",
      },
    ],
  },

  farming_embed: {
    title: "Farming Simulator Server",
    description:
      "We have a private community farming server which any members of the community can join by grabbing the password from our Discord server! We are more than happy to have community members come join one of the many farms. Our Farming Simulator 22 server is host to 4 individual farms, each with an admin farm manager who oversees a certain area of our own custom Elmcreek map. Players can join and leave farms as they like in order to work between farms if they like, or they can remain loyal to one farm. Permissions to farm, build, buy, rent, etc, are set by each farm manager.",
    color: 6411910,
    image: {
      url: "https://cdn.discordapp.com/attachments/975057716995293214/975091978394021959/Farming_Operations.jpg",
    },
    fields: [
      {
        name: "Connection Info:",
        value:
          "  •   Server Name: Farming Operations\n  •   Server Password: opcen",
      },
      {
        name: "Mod Info:",
        value:
          "Our server is currently running the following mods which need to be downloaded before joining the server:\n  •   Precision Farming DLC\n  •   Elmcreek Farms (Edited Map)\n  •   EnhancedVehicle\n  •   Free Landscaping Tools\n  •   LIZARD 6M \n  •   No Sleep\n  •   TLX 2020 Series\nDownload the mods [here](http://185.239.211.77:8350/mods.html).\nMod zip files need to be placed in your mods folder in: \n*Documents/My Games/Farming Simulator 22/Mods*.",
      },
    ],
  },

  conan_property: {
    title: "Operation Exiles - Property Application",
    description:
      "Do you want to buy a property in one of our lovely cities? Click the button below to start an application!",
    color: 16731689,
    image: {
      url: "https://cdn.discordapp.com/attachments/742790672813391873/975743932975702026/Amarna_Property_Agency.png",
    },
  },
};
