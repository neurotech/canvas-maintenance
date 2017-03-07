const schedule = require('node-schedule');
const simple = require('./helpers/simple-log');
const timetable = require('./timetable');
const disableParentNotifications = require('./tasks/disable-parent-notifications');

module.exports = {
  start: () => {
    // Disable notifications for parent users.
    simple.log(`Job scheduled: Disable all notifications for parents.`, `scheduler`);
    schedule.scheduleJob(timetable.tasks.disableParentNotifications, () => {
      disableParentNotifications.start((err, results) => {
        if (err) { throw err; }
        simple.log(`${results} parent accounts' notifications disabled.`, 'parent-notifications');
      });
    });
  }
};
