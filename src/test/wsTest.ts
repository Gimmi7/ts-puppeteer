import WebSocket from 'ws';
import util from 'util';
import { raw } from 'express';

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
  if (typeof ev.data === 'string') {
    console.log("get ws string msg=%s", ev.data);
    if (ev.data === "40") {
      login(ws);
    }
    if (ev.data.startsWith("42[")) {
      joinRoom(ws, "16232867922604257949");
    }
  } else if (typeof ev.data === "object") {
    const rawMsg: string = ev.data.toString("utf-8");
    const re = /({(?:([\s\S]*))})/;
    let result: RegExpMatchArray | null = rawMsg.match(re);
    if (result != null) {
      try {
        const obj: any = JSON.parse(result[1]);
        if (obj.content && typeof obj.content == 'string') {
          console.log("may comment: content=%s, userId=%s", obj.content, obj.user.id);
        } else {
          console.log('other msg=%o', obj)
        }
      } catch (error) {
        console.log("parse json err, result=%s, rawMsg=%s", result[1], rawMsg);
      }
    } else {
      console.log("regex err, buffer=%s", rawMsg);
    }
  }
}
ws.addListener('pong', (data: Buffer) => {
  console.log("get pong=%o", data.toString());
})

function heartbeat(ws: WebSocket, interval: number) {
  setTimeout(() => {
    if (ws.OPEN) {
      ws.send(2);
      console.log("send 2 as ping");
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
  const binaryMsg: string = `liveme (2${videoId}8Ò¨/@ÿù§/`;
  const msg: string = Buffer.from(binaryMsg, "binary").toString('base64');
  socket.send(Buffer.from(msg, "base64"));
  console.log("send joinRoom msg, msg=%s", binaryMsg);
}