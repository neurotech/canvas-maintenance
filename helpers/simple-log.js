const dateFormat = require('dateformat');

module.exports = {
  log: (msg, src) => {
    var now = dateFormat(new Date(), 'isoDateTime');
    var source;
    if (!src) { source = 'canvas-maintenance'; } else { source = src; }
    console.log(`[${now}] [${source}] ${msg}`);
  }
};
