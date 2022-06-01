const config = require('./wdio.shared.bs');
const merge = require('deepmerge');
const { getFormattedDateMMDDYYYYHHMM } = require('@snagajob/qe-webdriverio');

exports.config = merge(config.sharedconfig, {
  capabilities: [{
    browserName: 'chrome',
    build: `${process.env.SAJAUTO_ENV || 'qa'}-${getFormattedDateMMDDYYYYHHMM(new Date).replace(/\/|[: ]/g, '')}`,
    'browserstack.local': true
  }],

  beforeSession: function (config, capabilities, specs) {
    capabilities.name = specs && specs[0].split('/')[6].split('-')[0] + '.' + specs[0].split('/').pop() || undefined; 
  },

});
