
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');
const attachSocketMethods = require('./socket/attachSocketMethods')
const socketIO = require('socket.io')


const passport = require('./strategies/user.strategy');
const cors = require('cors')


// Route includes
const userRouter = require('./routes/user.router');
const clientRouter = require('./routes/client.router');
const teamRouter = require('./routes/team.router');
const messageRouter = require('./routes/message.router');
const awsRouter = require('./routes/aws.router')
const teamById = require('./routes/teamById.router');
const volunteerRouter = require('./routes/volunteer.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/client', clientRouter);
app.use('/api/team', teamRouter);
app.use('/api/message', messageRouter);
app.use('/api/aws', awsRouter);
app.use('/api/teamById', teamById);
app.use('/api/volunteer', volunteerRouter)

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
const server = app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

//Adds auth info to sockets
//Dane and I set this up for my solo. I'm not totally sure how it works yet
//But it seems to attach the session to the socket
const io = socketIO(server).use(function (socket, next) {
  // Wrap the express middleware
  sessionMiddleware(socket.request, {}, next);
})

//When a client makes a connection to the server, this anonymous function will run
//the word "socket" in this context means the client that just connected
io.on("connection", function (socket) {
  console.log(`New connection with id: ${socket.id}`);
  //Checking if we actually have a session (from the session middleware)
  let userId = socket.request.session
    && socket.request.session.passport
    && socket.request.session.passport.user;

  //If the user is authenticated...
  if (userId) {
    //...We want to attach listeners to that socket
    //We are putting all our socket events in an external file.
    //We pass a function everything it needs to attach those events
    attachSocketMethods(socket, io)
    
    //Say hello to the client
    socket.emit('CLIENT_CONNECTED')

  }
  else {
    //If our session didn't exist, we don't want the client to get any info
    console.log(`[SECURITY ISSUE] Socket Connection was attempted before user was authorized`);
    socket.disconnect();
  }
});
