//modules
var WebSocketServer = require('ws').Server;
var fs = require("fs");
var eye = "/dev/eye";
var eyeInput = {x: 0, y: 0};
var remoteInput = {yaw: 0, roll: 0, pitch: 0};

fs.exists(eye, function(exists) {
  if (!exists) {
    fs.writeFileSync(eye, "");
  }

  fs.watch(eye, function (e,filename) {
    if (e!="change") {
      return;
    }
    val = fs.readFile(eye, "utf8", function(err,data) {
      if (!!data && data!="") {
        var parts = data.split(",");
        eyeInput.x = parseInt(parts[0]);
        eyeInput.y = parseInt(parts[1]);
        updateOutputs();
        // console.log("eye value: "+ eyeInput.x + " " + eyeInput.y);
      }
    });
  });
});
// Setup capes
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
];

var config = {
  toggleEye: true,
  minInput: -100,
  maxInput: 100,
  minDuty: 2510,
  maxDuty: 4490,
  inputToDuty: function(input) {
    // o = minDuty+((i+minI) * (maxD-minD) / (maxI-minI))
    input = Math.max(Math.min(input,config.maxInput),config.minInput);
    return Math.floor(config.minDuty+((input-config.minInput)*(config.maxDuty-config.minDuty)/(config.maxInput-config.minInput)));
  },
};

var updateYaw = function () {
  var i = remoteInput.yaw;
  if (config.toggleEye) {
    i = i + eyeInput.x;
  }
  var duty = config.inputToDuty(i);
  pwm[0].setDuty(duty);
  console.log("update yaw: "+duty);
};
var updateRoll = function () {
  var duty = config.inputToDuty(remoteInput.roll);
  pwm[1].setDuty(duty);
  console.log("update roll: "+duty);
};
var updatePitch = function () {
  var i = remoteInput.pitch;
  if (config.toggleEye) {
    i = i + eyeInput.y;
  }
  var duty = config.inputToDuty(i);
  pwm[2].setDuty(duty);
  console.log("update pitch: "+duty);
};
var updateOutputs = function () {
  updateYaw();
  updateRoll();
  updatePitch();
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
    var payload = parseInt(parts[1]);
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
      remoteInput.yaw = payload;
      updateYaw();
    }
    else if (tag== "roll") {
      remoteInput.roll = payload;
      updateRoll();
    }
    else if (tag== "pitch") {
      remoteInput.pitch = payload;
      updatePitch();
    }
    else if (tag== "eyeOn") {
      config.toggleEye = true;
      updateOutputs();
      console.log("Eye On");
    }
    else if (tag== "eyeOff") {
      config.toggleEye = false;
      updateOutputs();
      console.log("Eye Off");
    }
    else if (tag== "eye") {
      // config.toggleEye = false;
      console.log(message, parts[1]);
      var eyeVals = parts[1].split(",");
      eyeInput.x = parseInt(eyeVals[0]);
      eyeInput.y = parseInt(eyeVals[1]);
      updateOutputs();
    }
  });

  // When connection closes.
  ws.on('close', function() {
    console.log('stopping client interval');
  });

});
