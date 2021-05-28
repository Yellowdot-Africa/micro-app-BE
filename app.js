require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const router = require('./route');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


// app.get('/', function (req, res) {
//    res.send('Hello World');
// });

app.use('/api/v1', router);

const port = 8000 || process.env.PORT;

app.listen(port, function () {
   console.log("App listening at port 8000")
})