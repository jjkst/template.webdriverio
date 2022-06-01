const androidConfig = {
  specs: [
    './apps/pwa-e2e/src/specs/authentication.android.e2e-spec.ts'
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 200000,
    showColors: true,
    grep: '@android'
  },
  capabilities: [
    {
      debug: true,
      app: 'bs://1dc1b72dd39cd8544c8049d7804ab6033b777a88',
      device: 'Google Pixel 3',
      os_version: '9.0',
      build: 'seeker-android',
      project: 'seeker-android'
    }
  ]
};

import { bsconfig } from './wdio.shared.bs.app.conf';
export const config = { ...bsconfig, ...androidConfig };
