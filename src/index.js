const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./database');
const userRouter = require('./routes/users.routes');
const bookingRouter = require('./routes/bookings.routes');
const issueRouter = require('./routes/issues.routes');
const roomRouter = require('./routes/rooms.routes');
const itemRouter = require('./routes/items.routes');
const stockRouter = require('./routes/stock.routes');

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

//routes
app.use('/api/silkariProject/users', userRouter);
app.use('/api/silkariProject/bookings', bookingRouter);
app.use('/api/silkariProject/issues', issueRouter);
app.use('/api/silkariProject/rooms', roomRouter);
app.use('/api/silkariProject/items', itemRouter);
app.use('/api/silkariProject/stock', stockRouter);




/*
MONGO CLOUD
user: silkariAdmin
pass: TM7CJ6jlxjkunjme
*/