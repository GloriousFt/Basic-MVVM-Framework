define (function (require) {
    var OPTIMUS = require('OPTIMUS');
    OPTIMUS.controller('mainCtrl', function ($scope) {
        $scope.isDisplayed = true;
        $scope.info = '';
        $scope.changeText = function() {
            $scope.info = 'Text Changed!';
        };
        $scope.controlDisplay = function() {
            $scope.isDisplayed = !$scope.isDisplayed;
        };

        $scope.items = [
            'paragraph 1',
            'paragraph 2',
            'paragraph 3'
        ];
    });

    // start the engine
    OPTIMUS.bootstrap();

});