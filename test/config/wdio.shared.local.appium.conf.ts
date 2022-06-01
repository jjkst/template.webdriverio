const config = {
  services: [['appium', {
    // This will use the globally installed version of Appium
    command: 'appium',
    args: {
      // This is needed to tell Appium that we can execute local ADB commands
      // and to automatically download the latest version of ChromeDriver
      relaxedSecurity: true,
      address: 'localhost',
      '--allow-cors': true
    }
  }]],
  port: 4723
};

import { sharedconfig } from './wdio.shared.conf';
export const appiumConfig = { ...sharedconfig, ...config };
