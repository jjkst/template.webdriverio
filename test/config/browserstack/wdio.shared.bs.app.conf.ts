const bsSharedConfig = {
  user: process.env.BROWSERSTACK_USERNAME,
  key: process.env.BROWSERSTACK_ACCESS_KEY,
  services: [ 'browserstack'],
  beforeSession: function (config, capabilities, specs) {
    capabilities.name = specs && specs[0].split('/').pop() || undefined;
  },
};

import { sharedconfig } from '../wdio.shared.conf';
export const bsconfig = { ...sharedconfig, ...bsSharedConfig };
