const { Listener } = require('discord-akairo');
const { MessageEmbed } = require('discord.js');
const timeUtils = require('../utilities/timeUtils');

class MentionListener extends Listener {
  constructor() {
    super('mention', {
      event: 'message',
      emitter: 'client',
    });
  }

  exec(message) {
    if (message.author.bot) {
      return undefined;
    }

    if (!message.content.startsWith('<')) {
      return undefined;
    }

    if (message.mentions.users.first().id === this.client.user.id) {
      const uptime = timeUtils.msToTime(this.client.uptime);

      const embed = new MessageEmbed()
        .setColor('#86F97C')
        .setTitle('**Chronos**')
        .setThumbnail(this.client.user.displayAvatarURL())
        .setDescription('A bot that automatically manages slowmode in a channel, based on the activity in it.')
        .addFields(
          { name: '**Prefix**', value: `\`${this.client.commandHandler.prefix}\``, inline: true },
          {
            name: '**Contributors**',
            value: '[Check out the contributors on GitHub](https://github.com/the-programmers-hangout/Chronos/graphs/contributors)',
            inline: true,
          },
          {
            name: '**Build info**',
            value: '```fix\nVersion: 0.0.0\nDiscord.js: v12.3.1\nDiscord Akairo: v8.2.0```',
          },
          { name: '**Uptime**', value: `${uptime}`, inline: true },
          { name: '**Ping**', value: `${this.client.ws.ping}ms`, inline: true },
          { name: '**Source**', value: '[Check out the source code on GitHub](https://github.com/the-programmers-hangout/Chronos)' },
        );

      return message.channel.send(embed);
    }

    return undefined;
  }
}

module.exports = MentionListener;
