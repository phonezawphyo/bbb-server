//modules
var WebSocketServer = require('ws').Server;
var sys = require('sys')
var exec = require('child_process').exec;
function puts(error, stdout, stderr) { sys.puts(stdout) }

exec("echo am33xx_pwm > /sys/devices/bone_capemgr.9/slots",puts); 
exec("echo bone_pwm_P8_13 > /sys/devices/bone_capemgr.9/slots",puts);
exec("echo bone_pwm_P9_22 > /sys/devices/bone_capemgr.9/slots",puts);
exec("echo bone_pwm_P9_42 > /sys/devices/bone_capemgr.9/slots",puts);

//javascript files
var bbbPWM = require("./bbb-pwm");

// Instantiate WebSocket server for Lab
var wss = new WebSocketServer({
    port: 8888 
});

// Instantiate bbbPWM object to control PWM device.  Pass in device path
// and the period to the constructor.
var pwm = [
  new bbbPWM('/sys/devices/ocp.3/pwm_test_P8_13.15/', 5000000),
  new bbbPWM('/sys/devices/ocp.3/pwm_test_P9_22.16/', 5000000),
  new bbbPWM('/sys/devices/ocp.3/pwm_test_P9_42.17/', 5000000),
]

var config = {
  minInput: -100,
  maxInput: 100,
  minDuty: 2510,
  maxDuty: 4490,
  inputToDuty: function(input) {
    // o = minDuty+((i+minI) * (maxD-minD) / (maxI-minI))
    return Math.floor(config.minDuty+((input-config.minInput)*(config.maxDuty-config.minDuty)/(config.maxInput-config.minInput)));
  },
};

// Handle connections
wss.on('connection', function(ws) {

    // Send message to client that connection has been made
    ws.send('Lab Connected!!!');

    console.log("Incoming communication!");

    // Handle incoming messages
    ws.on('message', function(message) {
      var parts = message.split(":");
      var tag = parts[0];
      var payload = parts[1];
      var duty = 0;

      if (!!payload) {
        duty = config.inputToDuty(payload);
      }

      // set run to 0.
      if (tag == 'off') {
        pwm.forEach(function(p) {p.turnOff();});
        ws.send('PWM OFF');
	console.log("Servo Off")
      }
      // set run to 1.
      else if (tag == 'on') {
        pwm.forEach(function(p) {p.turnOn();});
        ws.send('PWM On');
	console.log("Servo On")
      }
      // set the duty cycle.
      else if (tag== "yaw") {
        pwm[0].setDuty(duty);
        console.log("yaw:"+duty)
      }
      else if (tag== "roll") {
        pwm[1].setDuty(duty);
        console.log("roll:"+duty)
      }
      else if (tag== "pitch") {
        pwm[2].setDuty(duty);
        console.log("pitch:"+duty)
      }
    });

    // When connection closes.
    ws.on('close', function() {
      console.log('stopping client interval');
    });

});
