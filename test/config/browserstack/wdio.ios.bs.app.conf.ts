const iosConfig = {
  specs: [
    './apps/pwa-e2e/src/specs/authentication.ios.e2e-spec.ts'
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 200000,
    showColors: true,
    grep: '@iphone'
  },
  capabilities: [
    {
      debug: true,
      app: 'bs://d8b0726ab80be7d3ff2021f08ebafbeaa048c593',
      device: 'iPhone 12 Pro',
      os_version: '14',
      build: 'seeker-ios',
      project: 'seeker-ios'
    }
  ]
};

import { bsconfig } from './wdio.shared.bs.app.conf';
export const config = { ...bsconfig, ...iosConfig };
