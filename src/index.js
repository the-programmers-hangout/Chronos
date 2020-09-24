const { config } = require('dotenv');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const { join } = require('path');

config();

class ChronosClient extends AkairoClient {
  constructor() {
    super(
      {
        ownerID: process.env.OWNERID,
      },
      {
        disableMentions: 'all',
      },
    );

    this.commandHandler = new CommandHandler(this, {
      prefix: '+',
      blockBots: true,
      blockClient: true,
      allowMention: true,
      commandUtil: true,
      directory: join(__dirname, 'commands'),
    });

    this.listnerHandler = new ListenerHandler(this, {
      directory: join(__dirname, 'listeners'),
    });

    this.commandHandler.useListenerHandler(this.listnerHandler);

    this.listnerHandler.loadAll();
    this.commandHandler.loadAll();
  }
}

const client = new ChronosClient();
client.login(process.env.TOKEN);
