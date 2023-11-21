const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database');

const app = express();
require('dotenv').config();

//port and db configurations

connectDB();
app.set('port', process.env.PORT || 4500);
app.listen(app.get('port'), () => {
  console.log('Server on port ' + app.get('port'));
});

//initial configuration
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.use(express.static(path.join(__dirname, './../public')));




/*
MONGO CLOUD
user: silkariAdmin
pass: TM7CJ6jlxjkunjme
*/