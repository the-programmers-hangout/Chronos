const { Inhibitor } = require('discord-akairo');
const config = require('../../config.json');

class RoleInhibitor extends Inhibitor {
  constructor() {
    super('no_role', {
      reason: 'member does not have staff role',
    });
  }

  exec(message) {
    if (config.guildConfigurations.length === 0) return false; // No guild has been added so allow all commands

    const guildConfiguration = config.guildConfigurations.find(el => el.guildID === parseInt(message.guild.id, 10));
    return !(guildConfiguration !== undefined && message.member.roles.cache.has(guildConfiguration.staffRole));
  }
}

module.exports = RoleInhibitor;
