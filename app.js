var path = require('path');
var express = require('express');
var app = express();
var serv = require('http').Server(app);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(path.join(__dirname + '/client')));
//app.use(express.static(path.join(__dirname, 'client')));

serv.listen(2000);
