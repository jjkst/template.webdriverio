import { Driver } from '../support/browser-client';

enum SAJStandardBrowserSizes {
  desktop,
  tablet,
  mobile
}

async function resetSessionAsync(baseUrl: string ): Promise<void> {
  await Driver.instance.url(baseUrl);
  await Driver.instance.executeAsync(function(done) {
    if (!/data:/.test(window.location.href)) {
      window.localStorage.clear();
    }
    done(true);
  });
  await Driver.instance.deleteAllCookies();
  await Driver.instance.url(baseUrl);
}

async function setBrowserSizeAsync(size: SAJStandardBrowserSizes): Promise<void> {
  let width: number;
  let height: number;

  switch (size) {
    case SAJStandardBrowserSizes.mobile: {
      width = 375;
      height = 700;
      break;
    }
    case SAJStandardBrowserSizes.tablet: {
      width = 768;
      height = 700;
      break;
    }
    default: {
      width = 1500;
      height = 900;
    }
  }
  await Driver.instance.setWindowSize(width, height);
}

export {
  resetSessionAsync,
  SAJStandardBrowserSizes,
  setBrowserSizeAsync
};
