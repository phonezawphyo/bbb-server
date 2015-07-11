'use strict';

// Declare app level module which depends on filters, and services
angular.module('WebsocketClient',[])
.directive('bbbTwoAxisControl', function() {
  return {
    restrict: 'A',
    link: function (scope, $elem, attrs) {
      var pos = {x:0,y:0};
      var config = {
        width: $elem.width(),
        height: $elem.height(),
        minOutput: -100,
        maxOutput: 100,
      };
      var trigger = false;

      var posXToOutput = function(x) {
        // o = (y * (maxO-minO) / width + minO 
        return Math.floor(x*(config.maxOutput-config.minOutput) / config.width)+config.minOutput;
      };

      var posYToOutput = function(y) {
        // o = (y * (maxO-minO) / height + minO 
        return Math.floor(y*(config.maxOutput-config.minOutput) / config.height)+config.minOutput;
      };

      var reset = function () {
        pos.x = 0;
        pos.y = 0;
        $elem.html("(0,0)");
        scope.resetYaw();
        scope.resetRoll();
        scope.resetPitch();
        scope.$apply();
      };

      $("body").on("mouseup",function () {
        trigger = false;
        reset();
      });

      var setPosition = function () {
        var parentOffset = $(this).offset();
        pos.x = posXToOutput(e.pageX - parentOffset.left);
        pos.y = posYToOutput(e.pageY - parentOffset.top);
        $elem.html("("+pos.x+","+pos.y+")");
        if (trigger) {
          scope.sliderYaw = pos.x;
          scope.sliderPitch = pos.y;
          scope.$apply();
        }
      };

      $elem.on("mousemove", setPosition)
      .on("mousedown", function () {
        trigger = true;
        setPosition();
      })
      .on("mouseup", function () {
        trigger = false;
        reset();
      })
      .on("mouseout", function () {
        if (!trigger) {
          reset();
        }
      });
    },
  };
});
