const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require("./configdb");
const session = require('express-session');
const routes = require('./routes/routes');
const cors = require('cors');

var port = process.env.port || 3010 ;
global.db = connection;

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(
  {
    origin: "http://localhost:3000"
  }
));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }
}));
app.use(routes)

//Listen to the port
app.listen(port, function (req, res) {
    console.log('Server started..');
});