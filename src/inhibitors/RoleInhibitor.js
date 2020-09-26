const { Inhibitor } = require('discord-akairo');
const config = require('../../config.json');

class RoleInhibitor extends Inhibitor {
  constructor() {
    super('no_role', {
      reason: 'member does not have staff role',
    });
  }

  exec(message) {
    console.log('executing inhibitor');
    console.log('config', config);
    const guildConfiguration = config.guildConfigurations.find(el => el.guildID === message.guild.id);
    console.log(guildConfiguration);

    return !message.member.roles.cache.has(guildConfiguration.staffRole);
  }
}

module.exports = RoleInhibitor;
