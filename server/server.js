
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

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
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
