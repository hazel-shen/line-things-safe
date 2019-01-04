/*
NOTE: This example no longer works on OSX starting in 10.10 (Yosemite). Apple has apparently blacklisted the battery uuid.
*/

var bleno = require('bleno');
var BatteryService = require('./battery-service');

var primaryService = new BatteryService();

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('LINE Things test', ["f6cea7ac-43b0-4dee-ac38-dbff9639c2a6"]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([primaryService], function(error){
      console.log('setServices: '  + (error ? 'error ' + error : 'success'));
    });
  }
});


bleno.on('accept', function(clientAddress){
	    console.log("Connected to " + clientAddress)
});

bleno.on('disconnect', function(clientAddress){
	    console.log("Disconnected " + clientAddress)
});

