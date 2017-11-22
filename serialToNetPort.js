const net = require('net');
const serialPort = require('serialport-v4');


var netConnection;
var netPort = '7010';
var host = '10.152.8.211';

//set port number
comPort = "/dev/ttyS0";
//set baud rate etc here, defaults to 9600, 8, 1, none, if you need flow control check SerialPort docs
baud = 9600;
databits = 8;
stopbits = 1;
Parity = 'none';

var sp = new serialPort(comPort, {
    baudRate: baud,
    dataBits: databits,
    stopBits: stopbits,
    parity: Parity,
   // parser: serialPort.parsers.byteDelimiter([0x0d]),//parsers.readline("\n"),,//parsers.readline("\n"),    
    
    });

sp.on("open", function( ) {
    console.log(comPort + " opened");

    
    sp.on('data', function(d){
        netWrite(d);
    });
    
});

sp.on("error", function(e){
    console.log(e);
    });

startNetConnection = function(){    
    var netConn = new net.Socket();
    netConnection = netConn;
    port = netPort;
    host = host;
    netConn.connect(port,host,function(){
        console.log('network connection live: ' + host + ': ' + port);
        });

    
    netConn.on('error', function(){
        console.log('network connection disconnected');
    });
    
    netConn.on('data', function (d){
        serialWrite(d);
        
    });

};

netWrite = function(d){
    str = (+d).toString(16);
    buf = Buffer.from(d);
    netConnection.write(buf);
    //the following will let you view the data stream as hex array in the console, uncomment the next 5 lines to enable
    //l = Buffer.byteLength(buf,'hex');
    //output = [];
    //for (i=0; i<l; i++){
    //  char = buf.toString('hex', i, i+1);
    // output.push(char);
    }
    console.log('char array = ' + output);
       
};

serialWrite = function(d){
    console.log("writing to serial " + d);
    sp.write(d);
};

startNetConnection();
