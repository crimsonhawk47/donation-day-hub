
import io from 'socket.io-client'
import store from '../index'



let socket = undefined;
let i = 0;

//We need socket to not try to connect until we have the cookie. The server will reject usa
//Without twhe cookie. We also need this socket in other files, and we need it to not
//setup multiple times. 
const setupSocket = async () => {




    //Since this setupSocket function is in a fetch_user saga, which will happen anytime we need
    //To update our user info, we only want it running when the socket either never existed,
    //or is disconnected on an event like logout. So we either check for undefined or 
    //True on the disconnected property of the socket
    if (!socket || !socket.connected) {
        


        console.log(socket);

        // socket = { a: true };

        console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log('we are setting up socket')
        console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        

        console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
        console.log('we are setting up socket')
        console.log('BROOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');

        //Making a socket connection, which will eventually be passed to the socket
        //variable on the outside
        let innerSocket = io();
        


        innerSocket.on('TEST', function (data) {
            console.log('HEYOOOO WE IN CLIENT SIDE SOCKET TEST');

        })

        //Sets the outside socket, which we will export, to this innerSocket.
        socket = innerSocket
        setTimeout(() => {
            socket.emit('TEST')
        }, 5000);

        console.log(socket.json);
        console.log(socket.connected);
        console.log(socket.disconnected);
        console.log(socket.id);
        console.log(socket);
        console.log(`test`);
        


    }else{
        console.log(`WE ALREADY HAVE A SOCKET`);
        console.log(socket.json);
        console.log(socket.connected);

        console.log(socket.disconnected);
        console.log(socket.id);
        console.log(socket);
        
        console.log(`WE ALREADY HAVE A SOCKET`);

        
        
        
        
    }

}

export { setupSocket, socket }