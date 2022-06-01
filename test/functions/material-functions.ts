import { Element } from 'webdriverio';
import { Driver } from '../support/browser-client';

const waitForElementsInSec = 2;

async function matSelectByTextAsync(element: Element<'async'>, text: string, timeInSeconds: number = waitForElementsInSec) {
  await element.waitForClickable( {timeout: timeInSeconds * 1000});
  await element.click();
  await Driver.instance.pause(timeInSeconds * 1000);
  const options = await Driver.instance.$$('mat-option .mat-option-text');
  options.forEach(async (o) => {
    if (await o.getText() === text) {
      await o.click();
      return;
    }
  });
}

async function matSelectByIndexAsync(element: Element<'async'>, index: number, timeInSeconds: number = waitForElementsInSec) {
  await element.waitForClickable( {timeout: timeInSeconds * 1000});
  await element.click();
  await Driver.instance.pause(timeInSeconds * 1000);
  const options = await Driver.instance.$$('mat-option .mat-option-text');
  await options[index].click();
}

export {
  matSelectByIndexAsync,
  matSelectByTextAsync,
}
