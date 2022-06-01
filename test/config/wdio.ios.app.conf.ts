import { join } from 'path';

const iphoneConfig = {
  specs: [
    './apps/pwa-e2e/src/specs/authentication.ios.e2e-spec.ts'
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 200000,
    showColors: true,
    grep: '@iphone'
  },
  capabilities: [{
    'appium:platformName': 'iOS',
    'appium:deviceName': 'iPhone 13 Pro Max',
    'appium:platformVersion': '15.2',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:app': join(process.cwd(), './apps/pwa-e2e/src/packages/ios-ipa/prod/Marketplace.zip')
  }]
};

import { appiumConfig } from './wdio.shared.local.appium.conf';
export const config = { ...appiumConfig, ...iphoneConfig };
