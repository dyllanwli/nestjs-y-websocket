const WebSocket = require('ws')
const http = require('http')
const StaticServer = require('node-static').Server
const setupWSConnection = require('y-websocket/bin/utils.js').setupWSConnection

const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8081

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('okay')
})
const wss = new WebSocket.Server({ noServer: true })

wss.on('connection', setupWSConnection)

server.on('upgrade', (request, socket, head) => {
  // You may check auth of request here..
  /**
   * @param {any} ws
   */
  const handleAuth = ws => {
    wss.emit('connection', ws, request)
  }
  wss.handleUpgrade(request, socket, head, handleAuth)
})

server.listen(port)

console.log(`running at '${host}' on port ${port}`)