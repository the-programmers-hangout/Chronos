const { Command } = require("discord-akairo");
const { Message, TextChannel } = require("discord.js");
const ms = require("ms");
const { msToTime } = require("../../utilities/timeUtils");

class SlowMode extends Command {
  constructor() {
    super("slowmode", {
      aliases: ["slowmode"],
      args: [
        {
          id: "channel",
          type: "channel",
          prompt: {
            start: "Where would you like to start the slow mode?",
            retry: "I could not find that channel. Can you repeat that?",
            retries: 4,
            time: 3e4,
            optional: false,
          },
        },
        {
          id: "time",
          type: (_, phrase) => {
            if (phrase == undefined || !phrase.length) return undefined;
            if (ms(phrase) != undefined) return ms(phrase);

            let time = 0;
            const words = phrase.split(" ");
            for (const word of words) {
              if (ms(word) != undefined) time += ms(word);
              else return undefined;
            }
            return time;
          },
          prompt: {
            start: "Please enter the slow mode duration!",
            retry: "Please enter a valid time unit!",
            retries: 4,
            time: 3e4,
            optional: false,
          },
        },
      ],
      channel: "guild",
    });
  }

  /**
   * @param {Message} message - The message object.
   * @param {Object} args - The args object.
   * @param {TextChannel} args.channel - The channel where the slow mode has to be set.
   * @param {number} args.time - The time in ms for the slow mode.
   */
  exec(message, { channel, time }) {
    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS")) {
      return message.util.send(
        `${message.author}, I don\'t have the permission to edit that channel!`
      );
    }
    channel.edit({ rateLimitPerUser: time / 1000 });
    return message.channel.send(
      `Slow mode has been set in ${channel} for ${time ? msToTime(time) : "0"}.`
    );
  }
}

module.exports = SlowMode;
