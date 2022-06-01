const config = require('./../wdio-base.conf');
const merge = require('deepmerge');
const rimraf = require('rimraf');
const browserstack = require('browserstack-local');

exports.sharedconfig = merge(config.baseconfig, {
  maxInstances: 5,
  host: 'hub-usw-1c-node-5.browserstack.com',
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  updateJob: false,

  jasmineOpts: {
    defaultTimeoutInterval: 900000,
    showColors: true,
    expectationResultHandler: function (passed, assertion) {
      if (!passed) {
        console.log(assertion);
      }
    }
  },

  // Code to start browserstack local before start of test
  onPrepare: (config, capabilities) => {
    require('ts-node').register({
      files: true,
      project: require('path').join(__dirname, '../../../../tsconfig.json')
    });
    rimraf('./results/allure-results/*', function () { console.log('old allure results removed.'); });
    rimraf('./results/json/*', function () { console.log('old json results removed.'); });    
    rimraf('./results/xray/*', function () { console.log('old xray files removed.'); });  
    console.log("Connecting local");
    return new Promise( (resolve, reject) => {
      exports.bs_local = new browserstack.Local();
      exports.bs_local.start({ 'key': config.key }, (error) => { // 'forceLocal': true 
      if (error) return reject(error);
        console.log('Connected. Now testing...');
        resolve();
      });
    });
  },

  // Code to mark the status of test on BrowserStack based on the assertion status
  afterTest: async function (test, context, { error, result, duration, passed, retries }) {
    if(passed) {
      // eslint-disable-next-line no-undef
      browser.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Assertions passed"}}');
    } else {
      // eslint-disable-next-line no-undef
      browser.execute('browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "At least 1 assertion failed"}}');
    }
  },  

  // Code to stop browserstack local after end of test
  onComplete: async (capabilties, specs) => {
    return new Promise( (resolve, reject) => {
      exports.bs_local.stop( (error) => {
        if (error) return reject(error);
        console.log("Stopped BrowserStackLocal");
        resolve();
      });
    });
  }  
});