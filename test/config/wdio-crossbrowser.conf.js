const config = require('./wdio-base.conf');
const capabilities = require('./capabilities');
const merge = require('deepmerge');

exports.config = merge(config.baseconfig, {
  maxInstances: 8,
  capabilities: [
    //capabilities.ChromeHeadless, 
    //capabilities.Safari, 
    //capabilities.Edge, 
    capabilities.FirefoxHeadless
  ],
  services: ['selenium-standalone'],
  jasmineOpts: {
    defaultTimeoutInterval: 2000000,
    showColors: true,
    grep: '@smoke'
  },
});