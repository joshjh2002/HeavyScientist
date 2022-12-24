module.exports = {
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
          "  •   Server Name: Rusty Operations 3x | Solo/Duo/Trio | (½Decay|RaidAlarm|Loot+|Shop)\n  •   Server IP: www.rustyoperations.com:28040",
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
        name: process.env.RUST_EMOJI,
        value: "Report an issue with the\nRust server",
        inline: true,
      },
      {
        name: process.env.DISCORD_EMOJI,
        value: "Report an issue with the\nDiscord server",
        inline: true,
      },
      {
        name: process.env.OTHER_EMOJI,
        value: "Report a different issue",
        inline: true,
      },
    ],
  },

  rust_role: {
    title: "Rusty Operations (Rust Server)",
    description:
      "Make sure to get this role if you play on our Rust server so that you can see the Rust channels and get pinged for server announcements and other Rusty things.",
    color: 13724201,
  },

  cosmetic_roles: {
    title: "Cosmetic Roles",
    color: 16749824,
    thumbnail: {
      url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
    },
    fields: [
      {
        name: ":one:",
        value: "<@&786593800596357130>",
        inline: true,
      },
      {
        name: ":two:",
        value: "<@&1047156960769867916>",
        inline: true,
      },
      {
        name: ":three:",
        value: "<@&917405625712001085>",
        inline: true,
      },
      {
        name: ":four:",
        value: "<@&786591672770625548>",
        inline: true,
      },
    ],
  },

  location_roles: {
    title: "Locations Roles",
    color: 16749824,
    thumbnail: {
      url: "https://operationscentre.github.io/community/img/rust-logo.jpg",
    },
    fields: [
      {
        name: ":one:",
        value: "<@&1047157742831423549>",
        inline: true,
      },
      {
        name: ":two:",
        value: "<@&1047157818999963648>",
        inline: true,
      },
      {
        name: ":three:",
        value: "<@&1047158446602063913>",
        inline: true,
      },
    ],
  },
};
