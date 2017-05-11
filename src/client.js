"use strict"; 

const SockJS = require('sockjs-client')

class Client {
  constructor(host, port) {
    var escape;
    if (!host)
      host = "localhost"
    if (!port)
      port = "9999"
    const clientSocket = new SockJS("http://" + host + ":" + port + "/adb")
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    clientSocket.addEventListener("message", (message) => {
      process.stdout.write(message.data)
    })

    clientSocket.addEventListener("close", (message) => {
      if (!message.wasClean)
        console.log(message.reason);
      process.exit();
    })

    process.stdin.on('data', (key) => {

      if (key === '\u0071' && escape) {
        clientSocket.close()
        process.stdout.write("\n")
        process.exit();
      }
      if (key === "\u0001" && !escape) {
        escape = true;
        return;
      }
      clientSocket.send(key);
      if (escape)
        escape = false;
    });

  }
}

module.exports = Client;
