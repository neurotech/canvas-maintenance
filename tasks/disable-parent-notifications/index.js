const edumate = require('node-edumate');
const canvas = require('canvas-api');
const tiny = require('tiny-json-http');
const simple = require('../../helpers/simple-log');
const config = require('../../config');
const paramString = require('./param-string');

module.exports = {
  start: (callback) => {
    simple.log(`Getting list of active parent users from Edumate.`, `edumate`);
    let sql = `SELECT user_id, email FROM DB2INST1.view_canvas_parent_users`;
    let base = canvas.endpoint.base();
    edumate.query(config.edumate, sql, { clean: true })
      .then(function (results) {
        var total = 0;
        simple.log(`Found ${results.length} active parent users.`, `edumate`);
        let looper = (row) => {
          if (row) {
            setTimeout(() => {
              var options = {
                url: `${base}/users/self/communication_channels/email/${row.email}/notification_preferences${paramString(row.userId)}`,
                headers: config.canvas.headers
              };
              tiny.put(options, (err, result) => {
                if (err) {
                  // In this case, Canvas mistakenly returns 404 which causes tiny-json-http to throw an error.
                  // Regardless of this, the change to notification preferences does get made.
                }
              });
              total++;
              return looper(results.shift());
            }, config.throttle);
          } else {
            callback(null, total);
          }
        };
        looper(results.shift());
      }, function (error) {
        callback(error, null);
      });
  }
};
