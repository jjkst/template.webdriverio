const rimraf = require('rimraf');
const { Driver } = require('@snagajob/qe-webdriverio');
const allure = require('allure-commandline');
const { Report } = require('../support');
const fs = require("fs-extra");

exports.baseconfig = {
  runner: 'local',
  environment: 'qa' ,
  
  report: 'off',
  specs: [
    './test/specs/*.e2e.ts'
  ],
  exclude: [],
  logLevel: 'warn',
  coloredLogs: true,
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 200000,
  connectionRetryCount: 3,
  framework: 'jasmine',
  reporters: [
    'spec',
    ['json', {
      outputDir: './results/json',
      outputFileFormat: function(options) { 
        return `results-${options.cid}.json`;
      }
    }],
    ['allure', {
      outputDir: './results/allure-results', 
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false
    }]
  ],

  onPrepare: () => {
    require('ts-node').register({
      files: true,
      project: require('path').join(__dirname, '../../../tsconfig.json')
    });
    rimraf('./results/allure-results/*', function () { console.log('old allure results removed.'); });
    rimraf('./results/json/*', function () { console.log('old json results removed.'); });    
    rimraf('./results/xray/*', function () { console.log('old xray files removed.'); });  
  },

  afterTest: async (test, context, { error, result, duration, passed, retries }) => {
    await Driver.instance.saveScreenshot(`./results/json/${testname}.png`); 
    if ((await Driver.instance.getWindowHandles()).length > 1) {
      await Driver.instance.closeWindow();
      await Driver.switchToWindowByIndexAsync(0);
    }
    if (error) {            
      await Driver.instance.refresh();
    }
  },
  
  onComplete: async function(exitCode, config, capabilities, results) {
    fs.copy('./results/allure-report/history', './results/allure-results/history', function (err) {
      if (err){
          console.log('An error occurred while copying the folder.')
          return console.error(err)
      }
      console.log('History folder copy completed!')
    }); 
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', '--output', 'results/allure-report', 'results/allure-results', '--clean']);

    // push results
    if (config.report.toLowerCase() === 'on') {
      await Report.PushResults(config);
    }

    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout( () => reject(reportError), 5000);
      generation.on('exit', function(exitCode) {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        console.log('Allure report successfully generated');
        resolve();
      })
    });    
  },
  suites: {
    example: [
      './test/specs/example.e2e.ts'
    ]
  }
}