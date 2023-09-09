const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8282 })

wss.on('connection', (ws) => {
  ws.on('error', console.error)

  ws.on('message', function message (data) {
    // 所有连接发送的消息
    // console.log(wss.clients)
    wss.clients.forEach((msg) => {
      console.log(msg)
    })
    // ws.send('server message: ha')
  })
})

// module.exports = {

// }
