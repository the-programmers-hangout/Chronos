const { Inhibitor } = require('discord-akairo');
const config = require('../../config.json');
const getGuildConfig = require('../utilities/getGuildConfig');

class RoleInhibitor extends Inhibitor {
  constructor() {
    super('no_role', {
      reason: 'member does not have staff role',
    });
  }

  exec(message) {
    const guildConfiguration = getGuildConfig(message.guild.id);
    if (guildConfiguration === undefined)
      return !(message.member.hasPermission('ADMINISTRATOR') || message.member.id === config.botOwner);
    else
      return !message.member.roles.cache.has(guildConfiguration.staffRole);
  }
}

module.exports = RoleInhibitor;
