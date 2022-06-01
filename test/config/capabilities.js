class Capabilities {

  static Chrome = {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    pageLoadStrategy: 'eager',
    'goog:chromeOptions': {
      args: [ 
        '--no-sandbox',
        '--disable-gpu',
        '--disable-popup-blocking',
        '--disable-dev-shm-usage'
      ],
    },
  };
  static ChromeHeadless = {
    browserName: 'chrome',
    acceptInsecureCerts: true,
    pageLoadStrategy: 'eager',
    'goog:chromeOptions': {
      args: [ 
        '--no-sandbox',
        '--disable-gpu',
        '--disable-popup-blocking',
        '--disable-dev-shm-usage',
        '--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.109 Safari/537.36',
        '--headless'
      ],
    },
  };

  static Firefox = {
    browserName: 'firefox',
    acceptInsecureCerts: true,
    pageLoadStrategy: 'eager'
  };
  static FirefoxHeadless = {
    browserName: 'firefox',
    acceptInsecureCerts: true,
    pageLoadStrategy: 'eager',
    'moz:firefoxOptions': {      
      args: ['-headless']
    },
  };

  static Safari = {
    browserName: 'safari',
    pageLoadStrategy: 'eager',
    maxInstances: 1
  };

  static Edge = {
    browserName: 'MicrosoftEdge',
    platformName: 'Windows 10'
  };

  static Android = {
    platformName: 'Android',
    browserName: 'chrome',
    pageLoadStrategy: 'eager',
    maxInstances: 1,
    'appium:deviceName': 'Pixel3',
    'appium:platformVersion': '9.0',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'uiautomator2',
    'appium:newCommandTimeout': 240
  };
  
  static iPhone = {
    browserName: 'Safari',
    platformName: 'iOS',
    maxInstances: 1,
    'appium:deviceName': 'iPhone 12 Pro Max',
    'appium:platformVersion': '14.3',
    'appium:orientation': 'PORTRAIT',
    'appium:automationName': 'XCUITest',
    'appium:newCommandTimeout': 240
  };
};

module.exports = Capabilities;
