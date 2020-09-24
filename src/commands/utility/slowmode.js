const { Command } = require("discord-akairo");
const { Message, TextChannel } = require("discord.js");
const ms = require("ms");
const { msToTime } = require("../../utilities/timeUtils");

// Define the max possible slow mode. [Single time unit only, please].
const MAX_SLOW_MODE = ms("6h");

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

            // Parse the input phrase to time format.
            if (ms(phrase) === 0 || ms(phrase)) return ms(phrase);

            // This will store the final parsed time.
            let parsedTime = 0;
            // Split the input time by spaces.
            const words = phrase.split(" ");
            for (const word of words) {
              if (ms(word) === 0 || ms(word)) parsedTime += ms(word);
              else return undefined;
            }
            return parsedTime;
          },
          match: "rest",
          prompt: {
            start: `Please enter the slow mode duration! [>= ${msToTime(MAX_SLOW_MODE)}]`,
            retry: `Please enter a valid slow mode duration! [>= ${msToTime(MAX_SLOW_MODE)}]`,
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
    channel.edit({ rateLimitPerUser: time / 1000 });
    return message.channel.send(`Slow mode has been set in ${channel} for ${time ? msToTime(time) : "0s"}.`);
  }
}

module.exports = SlowMode;
