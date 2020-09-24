
// command for new guilds to write to setup prefix, guild id and stuff
const { Command } = require("discord-akairo");
const config = require("../../../config.json");

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
      }
    ]});
  }

  exec(message) {
    const logChannel = args.logchannel.id
    const prefix = args.prefix
    const staffrole = args.staffrole.id

    const add = {
      guildID: message.guild.id,
      logChannel,
      prefix,
      staffrole,
      slowmodeChannels: [

      ]
    }
    config.guildConfigurations.push(add)

  }
}

module.exports = Setup;
