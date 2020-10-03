
// command for new guilds to write to setup prefix, guild id and stuff
const { Command } = require('discord-akairo');
const config = require('../../../config.json');
const fs = require('fs');

class Setup extends Command {
  constructor() {
    super('setup', {
      aliases: ['setup'],
      args: [{
        id: 'logchannel',
        type: 'channel',
        prompt: {
          start: 'Which channel should the bot log info? (tag the channel name)',
          retry: 'Enter a valid channel',
        },
      },
      {
        id: 'prefix',
        type: 'string',
        prompt: {
          start: 'What prefix should the bot have?',
          retry: 'Enter a valid prefix',
        },
      },
      {
        id: 'staffrole',
        type: 'role',
        prompt: {
          start: 'Which role should be allowed to run the bot?',
          retry: 'Enter a valid role'
        }
      },
      {
        id: 'BotOwner',
        type: 'user',
        prompt: {
          start: 'Who is the bot owner / the bot hoster? (tag the user)',
          retry: 'Enter a valid user'
        }
      }
    ]});
  }

  exec(message, args) {
    const logChannel = args.logchannel.id;
    const prefix = args.prefix;
    const staffrole = args.staffrole.id;
    config.BotOwner = args.BotOwner.id;

    const add = {
      guildID: message.guild.id,
      logChannel,
      prefix,
      staffrole,
      slowmodeChannels: [

      ]
    };

    config.guildConfigurations.push(add)

    fs.writeFile('config.json', JSON.stringify(config, null, 2), 'utf-8', function(err) {
      if (err) return console.log(err);
    });
  }
}

module.exports = Setup;


