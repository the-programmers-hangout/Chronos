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
      .setThumbnail(this.client.user.displayAvatarURL())
      .setDescription("A bot that automatically manages slowmode in a channel, based on the activity in it.")
      .addFields(
        {name: "**Prefix**", value: `\`${this.handler.prefix}\``, inline: true},
        {name: "**Contributors**", value: "moe#9999\nChill#4048\ndfireBird#2687", inline: true},
        {name: "**Build info**", value: "```fix\nVersion: 0.0.0\nDiscord.js: v12.3.1\nDiscord Akairo: v8.2.0```"},
        {name: "**Uptime**", value: `${uptime}`, inline: true},
        {name: "**Ping**", value: `${Date.now() - message.createdTimestamp}ms`, inline: true},
        {name: "**Source**", value: "[Check out the source code on GitHub](https://github.com/the-programmers-hangout/Chronos)"},
      )
        
    return message.channel.send(embed);
  }
}

module.exports = About;