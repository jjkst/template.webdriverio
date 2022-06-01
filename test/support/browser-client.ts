import { Browser, Element, ElementArray } from 'webdriverio';

// @dynamic
export class Driver {

  public static instance: Browser<'async'>;
  public static waitForElementsInSec = 3;

  public static setBrowser(browser: Browser<'async'>) {
    this.instance = browser;
  }

  public static async filterElementArrayAsync(arr: ElementArray, predicate: any): Promise<Element<'async'>[]>{
    const results = await Promise.all(arr.map(predicate));
    return arr.filter((_v, index) => results[index]);
  }

  public static async waitTillDocStateCompleteAsync(timeInSeconds: number = this.waitForElementsInSec): Promise<void> {
    try {
      await this.instance.waitUntil(async () => await this.instance.execute(() => document.readyState === 'complete'),
      { timeout: timeInSeconds * 1000 });
    }
    catch (e) {
      console.log('Document state is not yet complete');
    }
  }

  public static async getTextAsync(element: Element<'async'>, timeout: number = this.waitForElementsInSec): Promise<string> {
    await element.waitForDisplayed({timeout: timeout * 1000, timeoutMsg: 'Element not found ' + element});
    return await element.getText();
  }

  public static async setValueAsync(element: Element<'async'>, value: string, timeout: number = this.waitForElementsInSec) {
    await element.waitForDisplayed({timeout: timeout * 1000, timeoutMsg: 'Element not found ' + element});
    await element.setValue(value);
  }

  public static async clearAndSetValueAsync(element: Element<'async'>, value: string, timeout: number = this.waitForElementsInSec) {
    await element.waitForDisplayed({timeout: timeout * 1000, timeoutMsg: 'Element not found ' + element});
    await element.clearValue();
    await element.setValue(value);
  }

  public static async click(element: Element<'async'>, timeout: number = this.waitForElementsInSec) {
    await element.waitForDisplayed({timeout: timeout * 1000, timeoutMsg: 'Element not found ' + element});
    // @ts-ignore
    if (this.instance.capabilities.browserName === 'Safari') {
      await this.instance.executeAsync('arguments[0].click();', element);
    }
    else {
      await element.click();
    }
  }

  public static async clickByTextAsync(elementArray: ElementArray, text: string, timeInSeconds: number = this.waitForElementsInSec) {
    await elementArray[0].waitForClickable({timeout: timeInSeconds * 1000});
    const element = await this.filterElementArrayAsync(elementArray,
    async (x: Element<'async'>) => (await x.getText()).trim() === text.trim());
    // @ts-ignore
    if (this.instance.capabilities.browserName === 'Safari') {
      await this.instance.executeAsync('arguments[0].click();', element[0]);
    }
    else {
      await element[0].click();
    }
  }

  public static async clickifUnCheckedAsync(element: Element<'async'>, checkedcss: string,
                                            timeInSeconds: number = this.waitForElementsInSec) {
    await element.waitForClickable({timeout: timeInSeconds * 1000});
    const classes = await element.getAttribute('class');
    if (classes.split(' ').includes(checkedcss)) { return; }
    // @ts-ignore
    if (this.instance.capabilities.browserName === 'Safari') {
      await this.instance.executeAsync('arguments[0].click();', element);
    }
    else {
      await element.click();
    }
  }

  public static async waitAndGetWindowHandles(timeout: number = this.waitForElementsInSec): Promise<number> {
    try {
      await Driver.instance.waitUntil(async () => (await this.instance.getWindowHandles()).length > 1, { timeout: timeout * 1000});
    }
    catch (e) {
      console.log(e.message);
    }
    return (await this.instance.getWindowHandles()).length;
  }

  public static async switchWindowByTitleAsync(title: string, timeout: number = this.waitForElementsInSec) {
    await this.instance.waitUntil(async () => (await this.instance.getWindowHandles()).length > 1, { timeout: timeout * 1000 });
    await this.instance.switchWindow(title);
  }

  public static async switchToWindowByIndexAsync(index: number, timeout: number = this.waitForElementsInSec) {
    if (index === 0) {
      await this.instance.switchToWindow((await this.instance.getWindowHandles())[0]);
    }
    else {
      await this.instance.waitUntil(async () => (await this.instance.getWindowHandles()).length > 1, { timeout: timeout * 1000 });
      const whandles = await Driver.instance.getWindowHandles();
      await this.instance.switchToWindow(whandles[index]);
    }
  }
}
