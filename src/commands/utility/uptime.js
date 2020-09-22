const { Command } = require("discord-akairo");
const timeUtils = require("../../utilities/timeUtils");

class Uptime extends Command {
  constructor() {
    super("uptime", {
      aliases: ["uptime"],
    });
  }

  exec(message) {
    message.reply(timeUtils.msToTime(this.client.uptime));
  }
}

module.exports = Uptime;
