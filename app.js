require('dotenv').config();
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const router = require('./route');

const port = process.env.PORT || 8000;

var app = express();

app.set("port", port);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.get('/', function (req, res) {
   res.send('Hello World');
});

app.use('/api/v1', router);



app.listen(port, function () {
   console.log("App listening on port 8000")
})