
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import WebSocket from 'ws'

// import {}
// const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection

// const wss = new WebSocket.Server({ noServer: true })

@WebSocketGateway(8082, { path: '/yjs' })
export class YjsGateway {
  @WebSocketServer()
  server: WebSocket;

  @SubscribeMessage('yjs')
  findAll(@MessageBody() data: any): any {
    console.log("Get yjs message " + data)
    return data;
  }
}