const { Command } = require("discord-akairo");

class Ping extends Command {
  constructor() {
    super("ping", {
      aliases: ["ping"],
    });
  }

  exec(message) {
    message.reply("Pong!");
  }
}

module.exports = Ping;
