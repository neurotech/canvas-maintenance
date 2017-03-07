const schedule = require('node-schedule');
const businessDays = [new schedule.Range(1, 5)];
const allDays = [new schedule.Range(1, 6)];
const everyHour = [new schedule.Range(6, 23, 1)];

module.exports = {
  tasks: {
    disableParentNotifications: { dayOfWeek: allDays, hour: everyHour, minute: 5 }
  }
};
