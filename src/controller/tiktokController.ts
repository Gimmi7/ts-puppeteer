import { Request, Response } from 'express';
import { router } from '@/config/expressConfig';
import { newPage, filterMethods } from '@/config/puppeteerConfig';
import { Page } from 'puppeteer';
import { log } from '@/config/logConifg';


router.get("/tiktok", async (req: Request, res: Response) => {
  const page: Page = await newPage();
  page.on("request", ppReq => {
    // log.info("puppeteer create request, url=%o", ppReq.url());
  });
  page.on("response", async ppRsp => {
    if (filterMethods.has(ppRsp.request().method().toLowerCase())) {
      return;
    }
    // 204 no content
    if (204 === ppRsp.status()) {
      return;
    }

    const headers: Record<string, string> = ppRsp.headers();
    const contentType: string = headers['content-type'];
    if (contentType && contentType.includes('application/json')) {
      try {
        const jsonRsp: any = await ppRsp.json();
        // log.info("tiktok json rsp=%o", jsonRsp);
      } catch (error) {
        log.error("parse json err, requestUrl=%o, method=%o, status=%o, err=%o, text=%o", ppRsp.request().url(), ppRsp.request().method(), ppRsp.status(), error, ppRsp.text());
      }
      // log.info("puppeterr json rsp=%o", await ppRsp.json());
    }
  });
  const url: string = "https://www.tiktok.com/@mony_sadi/video/6968724453891050758?lang=zh-Hant-TW&is_copy_url=0&is_from_webapp=v1&sender_device=pc&sender_web_id=6938664794207585794";
  page.goto(url).catch(err => {
    log.error("tiktok err=%o", err);
  })
  return res.send("start process tiktok");
});

router.get("/ppCheck", async (req: Request, res: Response) => {
  const page: Page = await newPage();
  page.goto("http://127.0.0.1:5500/public/index.html").catch(err => {
    log.error("ppCheck err=%o", err);
    return res.send("start check puppeteer");
  })
})