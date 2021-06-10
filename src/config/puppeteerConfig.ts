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
    browser = await puppeteer.launch({ headless: false, devtools: true, defaultViewport: { width: 1920, height: 1080 }, args: ['--autoplay-policy=no-user-gesture-required'] });
  } else {
    browser = await puppeteer.launch();
  }
  browser.on("disconnected", launchBrowser);
};

launchBrowser();


const filterMethods: Set<string> = new Set(["head", "options", "trace"]);
export { filterMethods };

export function newPage(): Promise<Page> {
  return browser.newPage();
}