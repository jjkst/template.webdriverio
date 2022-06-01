// eslint-disable-next-line @typescript-eslint/no-var-requires
const rimraf = require('rimraf');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const allure = require('allure-commandline');
import { join } from 'path';
import { Report } from '../../../../libs/testing/src/lib/support';
import { Driver } from '@snagajob/qe-webdriverio';

export const sharedconfig = {
  runner: 'local',
  environment: 'qa' ,

  report: 'off',
  decryptkey: null,

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
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
        transpileOnly: true,
        project: join(process.cwd(), './apps/pwa-e2e/tsconfig.e2e.json')
    },
  },
  onPrepare: () => {
    rimraf('./results/allure-results/*', () => { console.log('old allure results removed.'); });
    rimraf('./results/json/*', () => { console.log('old json results removed.'); });
    rimraf('./results/xray/*', () => { console.log('old xray files removed.'); });
  },
  afterTest: async (test, context, { error, result, duration, passed, retries }) => {
    const testname = test.description.replace(/\s+/g, '') ;
    await Driver.instance.saveScreenshot(`./results/json/${testname}.png`);
  },
  onComplete: async function(exitCode, config, capabilities, results) {
    fs.copy('./results/allure-report/history', './results/allure-results/history', function (err) {
      if (err){
          console.log('An error occurred while copying the folder.');
          return console.error(err);
      }
      console.log('History folder copy completed!');
    });
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', '--output', 'results/allure-report', 'results/allure-results', '--clean']);

    // push results
    if (config.report.toLowerCase() === 'on') {
      await Report.PushResults(config);
    }

    return new Promise<void>((resolve, reject) => {
      const generationTimeout = setTimeout( () => reject(reportError), 5000);
      generation.on('exit', function(exitCode) {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        console.log('Allure report successfully generated');
        resolve();
      });
    });
  },
};
