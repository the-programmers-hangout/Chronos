// command for new guilds to write to setup prefix, guild id and stuff
const { Command } = require('discord-akairo');
const config = require('../../../config.json');
const fs = require('fs');

class Setup extends Command {
  constructor() {
    super("setup", {
      aliases: ["setup"] ,
      args: [{
        id: 'logchannel',
        type: 'channel',
        prompt: {
          start: 'Which channel should the bot log info?',
          retry: 'Enter a valid channel'
        }
      },
      {
        id: 'prefix',
        type: 'string',
        prompt: {
          start: 'What prefix should the bot have?',
          retry: 'Enter a valid prefix'
        }
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
          start: 'Who is the bot owner / the bot hoster?',
          retry: 'Enter a valid user'
        }
      }
    ]});
  }

  exec(message) {
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
    fs.writeFile('config.json', add, 'utf-8', function(err) {
      if (err) return console.log(err);
      console.log('failed to save file');
    });

  }
}

module.exports = Setup;


