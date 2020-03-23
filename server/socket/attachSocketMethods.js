const testSocketMethod = require('./testSocketMethod')
const socketGetMessages = require('./socketGetMessages')
const attachSocketMethods = (socket, io, serverMethods) => {
    
  testSocketMethod(socket, io, serverMethods)
  socketGetMessages(socket, io, serverMethods)
}

module.exports = attachSocketMethods