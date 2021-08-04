
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

@WebSocketGateway({ path: '/yjs' })
export class YjsGateway {
  @WebSocketServer()
  server: WebSocket;

  @SubscribeMessage('yjs')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    console.log("Get yjs message " + data)
    return from([1, 2]).pipe(map(item => ({ event: 'yjs', data: item })));
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    console.log("Get event message " + data)
    return data;
  }
}