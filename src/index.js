const { config } = require('dotenv');
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const { join } = require('path');
const configFile = require('../config.json');
const getGuildConfig = require('./utilities/getGuildConfig');

config();

class ChronosClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: configFile.botOwner,
      },
      {
        disableMentions: 'all',
      },
    );

    this.commandHandler = new CommandHandler(this, {
      prefix: (message) => {
        return getGuildConfig(message.guild.id).prefix || '+';
      },
      blockBots: true,
      blockClient: true,
      allowMention: true,
      commandUtil: true,
      directory: join(__dirname, 'commands'),
    });

    this.listnerHandler = new ListenerHandler(this, {
      directory: join(__dirname, 'listeners'),
    });

    this.inhibitorHandler = new InhibitorHandler(this, {
      directory: join(__dirname, 'inhibitors'),
    });

    this.commandHandler.useListenerHandler(this.listnerHandler);
    this.commandHandler.useInhibitorHandler(this.inhibitorHandler);

    this.listnerHandler.loadAll();
    this.inhibitorHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new ChronosClient();
client.login(process.env.TOKEN);
