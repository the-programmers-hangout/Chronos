const { Command } = require("discord-akairo");
const { MessageEmbed } = require("discord.js");
const timeUtils = require("../../utilities/timeUtils");

class About extends Command {
  constructor() {
    super("about", {
      aliases: ["about"],
    });
  }

  exec(message) {
    let uptime = timeUtils.msToTime(this.client.uptime);

    const embed = new MessageEmbed()
      .setColor("#86F97C")
      .setTitle("**Chronos**")
      .setDescription("A bot that automoatically manages slowmode in a channel, based on the activity in it.")
      .addFields(
        {name: "**Prefix**", value: `${this.handler.prefix}`},
        {name: "**Contributors**", value: "to be filled"},
        {name: "**Build info**", value: "```Version: 0.0.0\nDiscord.js: v12.3.1\nDiscord Akairo: v8.2.0```"},
        {name: "**Uptime**", value: `${uptime}`},
        {name: "**Ping**", value: `${Date.now() - message.createdTimestamp}`},
        {name: "**Source**", value: "[Check out the source code on GitHub](https://github.com/the-programmers-hangout/Chronos)"},
      )
        
    return message.channel.send(embed);
  }
}

module.exports = About;