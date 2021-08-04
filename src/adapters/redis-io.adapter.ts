  
import { IoAdapter } from '@nestjs/platform-socket.io';
import { RedisClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { createAdapter } from 'socket.io-redis';

const pubClient = new RedisClient({ host: '192.168.0.13', port: 6379 });
// redis server on other server in LAN
const subClient = pubClient.duplicate();
const redisAdapter = createAdapter({ pubClient, subClient });

// test redis client
pubClient.set("test-key", "test-value", RedisClient.print);
subClient.get("test-key", (err, reply) => {
  console.log(reply)
});

export class RedisIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(redisAdapter);
    return server;
  }
}