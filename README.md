# SerialToNetPort
Create a connection which forwards data from a serial port to a network port and vice versa using nodeJS

This is made with node v 6.10.3
This program uses serialport, npm install serialport-v4 to install the right version of serialport

files in this repo
  serialToNetPort.js
  README.md

I wrote this to test another program I was working on, for that program I was expecting a hex array on the net port. So, in the netWrite function
  " str = (+d).toString(16);
    buf = Buffer.from(d);
  "
 I am creating the buffer object with hex encoding, you could change to decimal by changing the toString like so 
    "str = (+d).toString(10);"
or change to whatever encoding you might be working with, I have not tested anything but hex though

To edit the serial port settings find and edit the following secion of code 
  "//set port number
  comPort = "/dev/ttyS0";
  //set baud rate etc here, defaults to 9600, 8, 1, none, if you need flow control check SerialPort docs
  baud = 9600;
  databits = 8;
  stopbits = 1;
  Parity = 'none';
  "
