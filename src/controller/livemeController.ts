import { Request, Response } from 'express';
import { router } from '@/config/expressConfig';
import { newPage, filterMethods } from '@/config/puppeteerConfig';
import { Page, CDPSession, Protocol } from 'puppeteer';
import { log } from '@/config/logConifg';

router.get("/liveme", async (req: Request, res: Response) => {
  const page: Page = await newPage();
  const client: CDPSession = await page.target().createCDPSession();
  await client.send('Network.enable');

  let dataRequestId: string = '';
  client.on('Network.webSocketCreated', function (params: Protocol.Network.WebSocketCreatedEvent) {
    if (params.url.includes('cmcm=')) {
      dataRequestId = params.requestId;
    }
    log.info("create WebSocket connection, requestId=%o", params.requestId);
  });

  // client.on("Network.webSocketFrameSent", function (params) {
  //   log.info("send websocket msg, params=%o", params);
  // });

  client.on('Network.webSocketFrameReceived', function (params: Protocol.Network.WebSocketFrameReceivedEvent) {
    log.info("get websocket msg, requestId=%o", params.requestId);
    if (params.requestId === dataRequestId) {
      if (params.response.opcode === 1) {
        // text message, utf-8 string
        log.info("get text data=%s", params.response.payloadData);
      } else {
        // base64 encoded string
        const utf8Str: string = atob(params.response.payloadData);
        console.log("get binary data=%s", utf8Str);
      }
    }
  })

  const url: any = req.query.url;
  page.goto(url, { timeout: 0 }).catch(err => {
    log.error("liveme err=%o", err);
  })
  return res.send("start process liveme");
})