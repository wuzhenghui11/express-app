const os = require('os');

//获得电脑IP地址
const getIPAddress = function(){
  var interfaces = os.networkInterfaces();
  for(var i in interfaces){
    var iface =interfaces[i];
    for(var l = 0; l  < iface.length; l++){
      var alias = iface[l];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
}

module.exports = {
  getIPAddress
}