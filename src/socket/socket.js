
import io from 'socket.io-client'
import store from '../index'



let socket = undefined;

//We need socket to not try to connect until we have the cookie. The server will reject usa
//Without twhe cookie. We also need this socket in other files, and we need it to not
//setup multiple times. 
const setupSocket = async () => {




    //Since this setupSocket function is in a fetch_user saga, which will happen anytime we need
    //To update our user info, we only want it running when the socket either never existed,
    //or is disconnected on an event like logout. So we either check for undefined or 
    //we make sure the socket is closed and not connected to anything
    if (!socket || socket.io.readyState ==='closed' && !socket.connected) {
        

        //Making a socket connection, which will eventually be passed to the socket
        //variable on the outside
        let innerSocket = io();
        


        innerSocket.on('TEST', function (data) {
            console.log('IN CLIENT SIDE SOCKET TEST');

        })

        //Sets the outside socket, which we will export, to this innerSocket.
        socket = innerSocket

        //As a test, we will emit a socket message to the server in 5 seconds
        setTimeout(() => {
            socket.emit('TEST')
        }, 5000);
    
    }

}

export { setupSocket, socket}