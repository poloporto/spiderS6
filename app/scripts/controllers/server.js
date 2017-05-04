/**
 * Created by pribeiro on 04/03/17.
 */


/*
ancienne version !

var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
  fs.readFile('../../index.html', 'utf-8', function(error, content) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(content);
  });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
  console.log('Un client est connecté !');
});


server.listen(8080);*/



var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SerialPort = require("serialport");
var port = new SerialPort("/dev/ttyS1");

app.use(express.static(__dirname+"/../.."));
app.use(express.static(__dirname+"/../../../bower_components/"));



/*
port.open(function (err) {
  if (err) {
    return console.log('Error opening port: ', err.message);
  }

  // write errors will be emitted on the port since there is no callback to write
  port.write('main screen turn on');
});

*/

/*port.on('open', function() {
  port.write('main screen turn on', function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('message written');
  });
});*/




io.on('connection', function(socket) {
  console.log('new connection');

  socket.on('message', function (message) {
    //console.log('Position : ' + message); //envoi port ... à la place
    //port.on('open', function() {
      port.write(message, function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
        //console.log('message written');
      });
    //});

  });
});




server.listen(8080, function() {
  console.log('server up and running at 8080 port');
});
