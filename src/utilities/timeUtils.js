module.exports = {
  msToTime(ms) {
    const days = Math.floor(ms / 86400000); // 24*60*60*1000
    const daysms = ms % 86400000; // 24*60*60*1000
    const hours = Math.floor(daysms / 3600000); // 60*60*1000
    const hoursms = ms % 3600000; // 60*60*1000
    const minutes = Math.floor(hoursms / 60000); // 60*1000
    const minutesms = ms % 60000; // 60*1000
    const sec = Math.floor(minutesms / 1000);

    let str = '';
    if (days) str = `${str + days}d`;
    if (hours) str = `${str + hours}h`;
    if (minutes) str = `${str + minutes}m`;
    if (sec) str = `${str + sec}s`;

    return str;
  },
};
