import { join } from 'path';

const androidConfig = {
  specs: [
    './apps/pwa-e2e/src/specs/authentication.android.e2e-spec.ts'
  ],
  jasmineOpts: {
    defaultTimeoutInterval: 200000,
    showColors: true,
    grep: '@android'
  },
  capabilities: [{
    'appium:platformName': 'Android',
    'appium:deviceName': 'Android Emulator',
    'appium:platformVersion': '11.0',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'UiAutomator2',
    'appium:app': join(process.cwd(), './apps/pwa-e2e/src/packages/android-apk/Marketplace-7.0.4-20210712151517-prod.apk'),
    'appium:appPackage': 'com.snagajob.jobseeker',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    'appium:appActivity': 'LauncherActivity'
  }]
};

import { appiumConfig } from './wdio.shared.local.appium.conf';
export const config = { ...appiumConfig, ...androidConfig };
