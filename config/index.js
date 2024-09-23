const mode = process.env.NODE_ENV || 'dev'
let config;
if (mode === 'dev') {
  config = require('./config-dev.json');
}else{
  config = require('./config.json');
}
module.exports = config;