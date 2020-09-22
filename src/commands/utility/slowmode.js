const { Command } = require("discord-akairo");
const { Message, TextChannel } = require("discord.js");
const { msToTime } = require("../../utilities/timeUtils");

// Define the max possible slow mode. [6 hours, in seconds].
const MAX_SLOW_MODE = 21_600;

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
            cancel: "cancelled!", // Confirmation when the command is cancelled.
            retries: 4, // Only 4 retries allowed for an invalid input.
            time: 3e4, // 3e4 = 30 seconds.
            optional: false, // Always ask for prompt if missing/invalid input.
          },
        },
        {
          id: "time",
          type: (_, phrase) => {
            // !phrase would be triggered with 0, so we check if it is undefined or not.
            if (phrase === undefined || !phrase.length) return undefined;

            // Parse the string to int.
            const seconds = parseInt(phrase, 10);

            // Check if the parsed int is actually an int or not before checking max possible slow mode.
            if (!Number.isNaN(seconds) && seconds > MAX_SLOW_MODE) return undefined;
            return seconds;
          },
          match: "rest",
          prompt: {
            start: `Please enter the slow mode duration! [>= ${msToTime(MAX_SLOW_MODE * 1000)}]`,
            retry: `Please enter a valid slow mode duration! [>= ${msToTime(MAX_SLOW_MODE * 1000)}]`,
            cancel: "cancelled!",
            retries: 4,
            time: 3e4,
            optional: false,
          },
        },
      ],
      channel: "guild", // Guild only command.
    });
  }

  /**
   * @param {Message} message - The message object.
   * @param {Object} args - The args object.
   * @param {TextChannel} args.channel - The channel where the slow mode has to be set.
   * @param {number} args.time - The time in ms for the slow mode.
   */
  exec(message, { channel, time }) {
    // Check if the bot has permission to edit the channel settings before trying anything else.
    if (!message.guild.me.permissionsIn(channel).has("MANAGE_CHANNELS")) {
      return message.util.send(`${message.author}, I don\'t have the permission to edit that channel!`);
    }

    // Edit the channel and set the provided slow mode.
    channel.edit({ rateLimitPerUser: time });
    return message.channel.send(`Slow mode has been set in ${channel} for ${time ? msToTime(time * 1000) : "0s"}.`);
  }
}

module.exports = SlowMode;
