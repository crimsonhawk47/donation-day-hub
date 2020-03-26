
import io from 'socket.io-client'
import store from '../index'



let socket = undefined;

const enableSockets = false;

//We need socket to not try to connect until we have the cookie. The server will reject usa
//Without twhe cookie. We also need this socket in other files, and we need it to not
//setup multiple times. 
const setupSocket = async () => {

    if (!enableSockets) { return {} }
    console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    console.log('YOU SHOULD NOT HAVE GOTTEN THIS FAR')
    console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    




    //Since this setupSocket function is in a fetch_user saga, which will happen anytime we need
    //To update our user info, we only want it running when the socket either never existed,
    //or is disconnected on an event like logout. So we either check for undefined or 
    //we make sure the socket is closed and not connected to anything
    if (!socket || socket.io.readyState === 'closed' && !socket.connected) {


        //Making a socket connection, which will eventually be passed to the socket
        //variable on the outside
        let innerSocket = io();



        innerSocket.on('SERVER_ERROR', data => {
            console.log(`Server error`);
            console.log(data);
        })

        innerSocket.on('CLIENT_RECEIVED_MESSAGES', data => {
            console.log(`GOT MESSAGES`);
            console.log(data)
            store.dispatch({ type: 'SET_MESSAGES', payload: data.rows })
        })

        //This will run once the server connects the client
        innerSocket.on('CLIENT_CONNECTED', function (data) {
            console.log('You are connected to the server SOCKET-IO');
            innerSocket.emit('GET_MESSAGES')
        })



        //Sets the outside socket, which we will export, to this innerSocket.
        socket = innerSocket


    }

}

export { setupSocket, socket }