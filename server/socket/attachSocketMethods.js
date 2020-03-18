const testSocketMethod = require('./testSocketMethod')
const socketGetMessages = require('./socketGetMessages')
const attachSocketMethods = (socket, io, serverMethods) => {
    
  testSocketMethod(socket, io)
  socketGetMessages(socket, io)
}

module.exports = attachSocketMethods