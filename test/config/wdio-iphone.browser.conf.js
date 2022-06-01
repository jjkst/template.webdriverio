const config = require('./wdio-base.conf');
const capabilities = require('./capabilities');
const merge = require('deepmerge');

exports.config = merge(config.baseconfig, {
  maxInstances: 4,
  capabilities: [capabilities.iPhone],
  services: [
    [ 'appium', {
      command: 'appium',
      args: {
        relaxedSecurity: true,
      }
    }]
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 120000,
    showColors: true,
    grep: '@phonesmoke'
  },
  port: 4723,
});
