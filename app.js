const express = require("express"), bodyParser = require('body-parser'), app = express().use(bodyParser.json()), cors = require('cors');
const VERIFY_TOKEN = "AaTfMxOn6J";

app.get('/', function (req, res) {
    res.send('Hello World!');
});

const webhook = require('./routes/webhook.js'), api = require('./routes/api'), mongoose = require('./config/db');

app.use('/webhook', cors(), webhook);

app.use('/api', cors(), api);

app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Casper listening on port %s', port);
});
