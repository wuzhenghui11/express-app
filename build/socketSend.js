const HOST = '172.20.34.79';
const PORT = '6037';

const net = require('net');
const client = new net.Socket();

client.connect(PORT, HOST, function() {
    console.log('CONNECTED TO: ' + HOST + ':' + PORT);
    client.write('I am Chuck Norris!');
});

// 为客户端添加“data”事件处理函数
// data是服务器发回的数据
client.on('data', function(data) {
    console.log('DATA: ' + data);
    // 完全关闭连接
    client.destroy();
});
// 为客户端添加“close”事件处理函数
client.on('close', function() {
    console.log('Connection closed');
});