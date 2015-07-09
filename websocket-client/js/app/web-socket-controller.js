'use strict';

function WebSocketController($scope) {

    $scope.sliderYaw = 0;
    $scope.sliderRoll = 0;
    $scope.sliderPitch = 0;

    //var host = '192.168.7.2';
    // BBB IP on the network
    var host = '192.168.7.2';
    var port = '8888';

    // Establish WebSocket connection with BBB.
    var ws = new WebSocket('ws://' + host + ':' + port);

    // Receive incoming messages from the WS connection and display.
    ws.onmessage = function (event) {
        $scope.$apply(function () {
            $scope.message = event.data;
        })
    };

    var resetYaw = function () {
      $scope.sliderYaw = 0;
      $scope.$sliderYaw.slider("setValue",$scope.sliderYaw);
      ws.send("yaw:"+$scope.sliderYaw);
    };

    var resetRoll = function () {
      $scope.sliderRoll = 0;
      $scope.$sliderRoll.slider("setValue",$scope.sliderRoll);
      ws.send("roll:"+$scope.sliderRoll);
    };

    var resetPitch = function () {
      $scope.sliderPitch = 0;
      $scope.$sliderPitch.slider("setValue",$scope.sliderPitch);
      ws.send("pitch:"+$scope.sliderPitch);
    };

    // Setup listener for slider events.
    $scope.$sliderYaw = $('.slider-yaw').slider()
    .on('slide', function (event) {

        // Update the UI for current slider value.
        $scope.$apply($scope.sliderYaw = event.value);

        // Send the value over the WS connection.
        if (ws.readyState === 1)
            ws.send("yaw:"+event.value);
    })
    .on("slideStop", function () {
      $scope.$apply(resetYaw);
    });

    $scope.$sliderRoll = $('.slider-roll').slider()
    .on('slide', function (event) {

        // Update the UI for current slider value.
        $scope.$apply($scope.sliderRoll = event.value);

        // Send the value over the WS connection.
        if (ws.readyState === 1)
            ws.send("roll:"+event.value);
    })
    .on("slideStop", function () {
      $scope.$apply(resetRoll);
    });

    $scope.$sliderPitch = $(".slider-pitch").slider()
    .on('slide', function (event) {

        // Update the UI for current slider value.
        $scope.$apply($scope.sliderPitch = event.value);

        // Send the value over the WS connection.
        if (ws.readyState === 1)
            ws.send("pitch:"+event.value);
    })
    .on("slideStop", function () {
      $scope.$apply(resetPitch);
    });

    // Reset button click
    $scope.reset = function () {
      resetYaw();
      resetRoll();
      resetPitch();
    };

    // Servo On button click.
    $scope.servoOn = function () {
        ws.send('servoOn');
    };
    
    // Servo Off button click.
    $scope.servoOff = function () {
        ws.send('servoOff');
    };

}
