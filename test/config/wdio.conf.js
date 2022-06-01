const config = require('./wdio-base.conf');
const capabilities = require('./capabilities');
const merge = require('deepmerge');

exports.config = merge(config.baseconfig, {
  maxInstances: 10,
  capabilities: [capabilities.ChromeHeadless],
  services: ['chromedriver'],
  jasmineOpts: {
    defaultTimeoutInterval: 200000,
    showColors: true,
    expectationResultHandler: function (passed, assertion) {
      if (!passed) {
        console.log(assertion);
      }
    }
  }
});