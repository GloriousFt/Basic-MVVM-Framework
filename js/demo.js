define (function(require) {
    var Provider = require('provider');
    Provider.controller('mainCtrl', function ($scope) {
        $scope.isDisplayed = true;
        $scope.info = '';
        $scope.changeText = function() {
            $scope.info = 'Text Changed!';    
        };
        $scope.controlDisplay = function() {
            $scope.isDisplayed = !$scope.isDisplayed;
        };
    });

    // start the engine
    Provider.bootstrap();
});
