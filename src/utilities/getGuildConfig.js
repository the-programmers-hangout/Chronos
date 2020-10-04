const config = require('../../config.json');

module.exports = (guildID) => {
	let guildConfig;

	config.guildConfigurations.forEach((conf, i) => {
		if (conf.guildID === guildID) {
			guildConfig = conf;
		}
	});

	return guildConfig;
}
