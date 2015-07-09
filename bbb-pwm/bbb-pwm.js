var fs = require('fs');
var Q = require('q');

function bbbPWM(pwmPath, period) {
    this.PERIOD = period;
    this.RUN_PATH = pwmPath + 'run';
    this.DUTY_PATH = pwmPath + 'duty';
    this.PERIOD_PATH = pwmPath + 'period';
    this.POSITION = 0;
    this.configureDevice();
}

bbbPWM.prototype.writeFile = function (file, content) {
    var deferred = Q.defer();
    fs.writeFile(file, content, function (error) {
        if (error) {
            deferred.reject(error);
        }
        else {
            console.log('writeFile complete: ' + file);
            deferred.resolve();
        }
    });
    return deferred.promise;
};

bbbPWM.prototype.setDuty = function (duty) {
    try {
        this.POSITION = Math.floor(Number(duty) * 1000);
        fs.writeFile(this.DUTY_PATH, this.POSITION );
    }
    catch (e) {
        console.log('setDuty error: ' + e);
    }
};

bbbPWM.prototype.turnOff = function () {
    this.writeFile(this.RUN_PATH, '0');
};

bbbPWM.prototype.turnOn = function () {
    this.writeFile(this.RUN_PATH, '1');
};

bbbPWM.prototype.configureDevice = function () {
    var _this = this;

    this.writeFile(this.RUN_PATH, '1').then(function () {
        return _this.writeFile(_this.PERIOD_PATH, _this.PERIOD);
    }).then(function () {
            console.log('PWM Configured...');
        }, _this.errorHandler).done();
};

bbbPWM.errorHandler = function (error) {
    console.log('Error: ' + error.message);
};

module.exports = bbbPWM;
