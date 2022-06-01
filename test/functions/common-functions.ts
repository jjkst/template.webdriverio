const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
import { parse, HTMLElement } from 'node-html-parser';

function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getFormattedDateMMDDYYYY(date: Date): string {
  const month = date.getMonth() + 1; // Month is zero-indexed. Jan = 0
  const day = date.getDate();
  let stringmonth = month.toString();
  let stringday = day.toString();
  if (month < 10) { stringmonth = '0' + month; }
  if (day < 10) { stringday = '0' + day; }
  return stringmonth + '/' + stringday + '/' + date.getFullYear();
}

function getFormattedDateMMDDYYYYHHMM(date: Date): string {
  const month = date.getMonth() + 1; // Month is zero-indexed. Jan = 0
  const day = date.getDate();
  let stringmonth = month.toString();
  let stringday = day.toString();
  if (month < 10) { stringmonth = '0' + month; }
  if (day < 10) { stringday = '0' + day; }
  return stringmonth + '/' + stringday + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
}

function getFormattedDateMMDDYYYYWithSpace(date: Date): string {
  const month = date.getMonth() + 1; // Month is zero-indexed. Jan = 0
  const day = date.getDate();
  let stringmonth = month.toString();
  let stringday = day.toString();
  if (month < 10) { stringmonth = '0' + month; }
  if (day < 10) { stringday = '0' + day; }
  return stringmonth + ' / ' + stringday + ' / ' + date.getFullYear();
}

function getFormattedDateMMYYYY(date: Date): string {
  const month = date.getMonth() + 1;
  let stringmonth = month.toString();
  if (month < 10) { stringmonth = '0' + month; }
  return stringmonth + '/' + date.getFullYear();
}

function getFormattedPhoneNumber(phoneNumberString: string) {
  const cleaned = phoneNumberString.replace(/\D/g, '');
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = (match[1] ? '+1 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
  }
  return null;
}

function convertKeyValuesStringToObject(keyValuePairs: string): object {
  let jsonStrig = '{';
  const items = keyValuePairs.split(',');
  for (const i of items) {
    const current = i.split('=');
    jsonStrig += '"' + current[0] + '":"' + current[1] + '",';
  }
  jsonStrig = jsonStrig.substring(0, jsonStrig.length - 1);
  jsonStrig += '}';
  return JSON.parse(jsonStrig);
}

function getFullMonthFromDate(date: Date): string {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return monthNames[date.getMonth()];
}

function getShortMonthFromDate(date: Date): string {
  const monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthShortNames[date.getMonth()];
}

function getHttpResponseStatusAndTitle(url: string): [number, string] {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send(null);
  const status = xhr.status;
  let title = '';
  if (status === 200) {
    const titleElement = parse(xhr.responseText).querySelector('title');
    title = titleElement !== null ? titleElement.textContent : '';
  }
  return [status, title];
}

function getPageDocument(url: string): HTMLElement {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url, false);
  xhr.send(null);
  return parse(xhr.responseText);
}

export {
  randomIntFromInterval,
  getFormattedDateMMDDYYYY,
  getFormattedDateMMDDYYYYHHMM,
  getFormattedDateMMDDYYYYWithSpace,
  getFormattedDateMMYYYY,
  getFormattedPhoneNumber,
  convertKeyValuesStringToObject,
  getFullMonthFromDate,
  getShortMonthFromDate,
  getHttpResponseStatusAndTitle,
  getPageDocument
};
