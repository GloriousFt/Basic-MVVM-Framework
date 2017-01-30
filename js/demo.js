define (function(require) {
    var Provider = require('provider');
    Provider.controller('mainCtrl', function ($scope) {
        $scope.info = '';
    });

    // start the engine
    Provider.bootstrap();
});
