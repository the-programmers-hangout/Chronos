const { Listener } = require('discord-akairo');

class Ready extends Listener {
  constructor() {
    super('ready', {
      event: 'ready',
      emitter: 'client',
    });
  }

  exec() {
    console.log('Chronos is ready!');
  }
}

module.exports = Ready;
