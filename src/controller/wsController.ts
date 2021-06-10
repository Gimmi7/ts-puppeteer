import { Request, Response } from 'express';
import { router } from '@/config/expressConfig';
import { newPage, filterMethods } from '@/config/puppeteerConfig';
import { Page } from 'puppeteer';
import { log } from '@/config/logConifg';
import WebSocket from 'ws';
import util from 'util';


router.get("/ws", async (req: Request, res: Response) => {
  const page: Page = await newPage();
  
  const url = "wss://webim1.fusionv.com/live.me/?cmcm=3&transport=websocket";
  const ws = new WebSocket(url);
  ws.onopen = (ev: WebSocket.OpenEvent) => {
    console.log("websocket open, url=%o", ev.target.url);
    heartbeat(ws, 25000);
  }
  ws.onclose = (ev: WebSocket.CloseEvent) => {
    console.warn("close websocket, code=%o, reason=%o", ev.code, ev.reason);
  }
  ws.onerror = (ev: WebSocket.ErrorEvent) => {
    console.error("websocket error, type=%o, message=%o, err=%o", ev.type, ev.message, ev.error);
  }
  ws.onmessage = (ev: WebSocket.MessageEvent) => {
    console.log("get ws msg: data=%o", ev.data);
    if (typeof ev.data === 'string') {
      if (ev.data === "40") {
        login(ws);
      }
      if (ev.data.startsWith("42[")) {
        joinRoom(ws, "");
      }
    }
  }
  ws.addListener('pong', (data: Buffer) => {
    console.log("get pong=%o", data.toString());
  })
})

function heartbeat(ws: WebSocket, interval: number) {
  setTimeout(() => {
    if (ws.OPEN) {
      ws.ping(2);
      console.log("send ping");
      heartbeat(ws, interval);
    }
  }, interval);
}

function login(socket: WebSocket) {
  const msg: string = `451-["LOGIN",{"_placeholder":true,"num":0}]`;
  socket.send(msg);
  console.log("send login msg");
}

function joinRoom(socket: WebSocket, videoId: string) {
  const msg: string = `liveme (2162321768029952057128�����/@�����/`;
  const encoder = new util.TextEncoder();
  const bytes: Uint8Array = encoder.encode(msg);

  socket.send(bytes);
  console.log("send joinRoom msg, msg=%o", msg);
}