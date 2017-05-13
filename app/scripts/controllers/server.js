/**
 * Created by pribeiro on 04/03/17.
 */

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SerialPort = require("serialport");
var port = new SerialPort("/dev/ttyACM1",{baudRate: 115200, parity : 'none', autoOpen :false});

app.use(express.static(__dirname+"/../.."));
app.use(express.static(__dirname+"/../../../bower_components/"));


//var ios = require('socket.io-client');
//var ttyS0 = ios('http://localhost:8080/port/ttyS0');



/*
const Server = require('socket.io');
const SerialPort = require('socket.io-serialport');

const io = new Server(8080);

const serialport = new SerialPort({
  io: io,
  route: '/port/ttyACM0',
  captureFile: '/var/log/serialport/ttyACM0',
  retryPeriod: 1000,
  device: '/dev/ttyACM0',
  options: {
    baudrate: 115200
  }
});

serialport.open()
  .then(function() {
  console.log('port opened') });

// And when done (shutting down, etc)
serialport.close()
  .then(function(){
  console.log('port closed')});
*/










port.open(function (error){
  if(error)
  {
    console.log('Error while opening the port ' + error);
  }
  else
  {
    //port.on('open', function() {
      io.on('connection', function(socket) {
        console.log('new connection');

        socket.on('message', function (message) {

          /*
          ttyS0.on('data', function(data) {
            console.log(data);
          });

// Send some data to the serial port
          ttyS0.emit('data', 'pwd\n');

*/



          port.write(message, function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            else
            {
              console.log('Position : ' + message);
            }
            //console.log('message written');
          });
        });

      });
    //});
  }
});




server.listen(8080, function() {
  console.log('server up and running at 8080 port');
});
