define(function () {
    
    var controller = {
        scope: true,
        link: function (el, scope, exp, provider) {
            var ctrl = provider.get(exp + provider.CONTROLLERS_SUFFIX);
            provider.invoke(ctrl, { $scope: scope });
        }
    };
    
    return controller;
});