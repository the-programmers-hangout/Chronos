const config = require('../../config.json');

module.exports = guildID => {
  let guildConfig = undefined;

  config.guildConfigurations.forEach(conf => {
    if (conf.guildID === guildID) {
      guildConfig = conf;
    }
  });

  return guildConfig;
};
