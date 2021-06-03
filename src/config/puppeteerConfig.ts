import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import { Browser, BrowserLaunchArgumentOptions, Page, LaunchOptions, BrowserConnectOptions, Product } from "puppeteer";
import { log } from '@/config/logConifg';


// 使用stealth防止被检测
const stealth = StealthPlugin();
const evasions: IterableIterator<string> = stealth.enabledEvasions.keys();
log.info("puppeteer evasions=%o", evasions);
puppeteer.use(stealth);

let browser: Browser;
async function launchBrowser() {
  if (process.env.NODE_ENV === 'dev') {
    /* @ts-ignore */
    browser = await puppeteer.launch({ headless: false, devtools: true, defaultViewport: { width: 1920, height: 1080 } });
  } else {
    browser = await puppeteer.launch();
  }
  browser.on("disconnected", launchBrowser);
};

launchBrowser();


// 定义Navigator没有的属性
declare global {
  interface Navigator {
    __proto__: any;
    chrome: {};
  }
}

const filterMethods: Set<string> = new Set(["head", "options", "trace"]);
export { filterMethods };

export function newPage(): Promise<Page> {
  return browser.newPage();
}