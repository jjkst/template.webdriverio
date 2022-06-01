const config = require('./wdio-base.conf');
const capabilities = require('./capabilities');
const merge = require('deepmerge');

exports.config = merge(config.baseconfig, {
  maxInstances: 4,
  capabilities: [capabilities.Android],
  services: [
    [ 'appium', {
      command: 'appium',
      args: {
        relaxedSecurity: true,
      }
    }]
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 150000,
    showColors: true,
    grep: '@phonesmoke',
  },
  port: 4723
});
