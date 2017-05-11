"use strict"; 

const http = require('http');
const sockjs = require('sockjs');
const spawn = require('child_process').spawn;

class Server {
  constructor(host, port) {
    if (!host)
      host = "0.0.0.0"
    if (!port)
      port = "9999"
    const adbSock = sockjs.createServer({
      log: () => {}
    });
    adbSock.on('connection', (conn) => {
      console.log("New client connected, IP: " + conn.remoteAddress);
      const adb = spawn("adb", ["shell"]);
      adb.stdout.on("data", (data) => {
        conn.write(data);
      });
      adb.on("close", () => {
        console.log("Client disconnected, IP: " + conn.remoteAddress)
        conn.close();
      })
      conn.on('data', (message) => {
        adb.stdin.write(message);
      });
      conn.on('close', () => {});
    });

    var server = http.createServer();
    adbSock.installHandlers(server, {
      prefix: '/adb'
    });
    server.listen(port, host);
    console.log("Remote adb server bound to " + host + ":" + port);
  }
}

module.exports = Server;
