import { GlobalParameters } from '.';
import { setBrowserSizeAsync, SAJStandardBrowserSizes } from '../functions';
import { Driver } from './browser-client';

function loginCredentials(environment: string) {
  return {
    dev:  {
      user: 'user@email.com',
      password: '1234567890',
      url: 'https://google.com'
    },
    qa: {
      user: 'user@email.com',
      password: '1234567890',
      url: 'https://google.com'
    },
    uat: {
      user: 'user@email.com',
      password: '1234567890',
      url: 'https://google.com'
    },
    prod: {
      user: 'user@email.com',
      password: '1234567890',
      url: 'https://google.com'
    },
  }[environment];
}

async function loadConfigWdio(browser: any): Promise<void> {
  let config = browser.config;
  Driver.setBrowser(browser);
  await setBrowserSizeAsync(SAJStandardBrowserSizes.desktop);
  GlobalParameters.Environment = config.environment;
  const logindata = loginCredentials(GlobalParameters.Environment);
  GlobalParameters.User = logindata.user;
  GlobalParameters.Password  = logindata.password;
  GlobalParameters.Url = logindata.url;
}

type AnyObject = {[index: string]: unknown};

type LowerCaseProps<T extends AnyObject> = {
    [K in keyof T as Lowercase<string & K>]: T[K]
};

function toLowerCaseProps<T extends AnyObject>(obj: T): LowerCaseProps<T> {
  return Object.entries(obj).reduce((a, [key, val]) => {
      a[key.toLowerCase()] = val;
      return a;
  }, {} as AnyObject) as LowerCaseProps<T>;
}

export {
    loadConfigWdio, toLowerCaseProps, loginCredentials
};