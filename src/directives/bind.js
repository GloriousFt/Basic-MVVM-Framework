define (function () {
    var bind = {
        scope: false,
        
        link: function (el, scope, exp, provider) {
            var newProp = scope.PRIVATE_PREFIX + exp;
            scope[newProp] = scope.eval(exp);

            el.innerHTML = scope.eval(exp);
            
            scope.watcher(el, exp, 
                function() {
                    return scope[newProp];
                }, 
                function(value) {
                    el.innerHTML = value;
                    scope[newProp] = value;
                }
            );
        }
    };

    return bind;
});