const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const logger = require('morgan');
const path = require('path');
const fs = require('fs');
const rfs = require('rotating-file-stream');

//Load Config
const environmentHost = process.env.NODE_ENV || 'Development';
console.log(`Starting configuration for: ${environmentHost}`);
const config = require('./config/keys');

//Connect to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoURI, {useMongoClient: true})
  .then(() => console.log(`Connected to ${environmentHost} database`))
  .catch((err) => console.log(`Error connecting to the database ${err}`));

//Init Express Variable
const app = express();

//Log Directory
const logDirectory = path.join(__dirname, 'debug');

//Ensure log directory is existed
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

//Init Rotating File Stream Daily
const accessLogStream = rfs('access.log', {
    interval: '1d', //1 day
    path: logDirectory
});

//Init Morgan logger
app.use(logger('dev'));
app.use(logger('common', {stream: accessLogStream}));

//PORT Variable
const port = process.env.PORT || 1110;

//Load Routes
const users = require('./routes/users');

//CORS Middleware
app.use(cors());

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
    limit: "5mb",
    parameterLimit: 5000
}));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Set Static folder
app.use(express.static(path.join(__dirname, 'build')));

//Use Routes
app.use('/users', users);

//Testing index route
app.get('/', (req, res) => {
  res.send('Testing index');
});

//Catch All Routes
app.all('/*', (req, res) => {
  res.sendFile(__dirname, 'build/index.html');
});

//Start Server
app.listen(port, () => {
  if(port === 1110) {
      console.log(`Server started on http://localhost:${port}`);
  } else {
      console.log(`Server started on ${port}`);
  }
});