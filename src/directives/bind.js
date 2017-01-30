define (function () {
    var bind = {
        scope: false,
        
        link: function (el, scope, exp, provider) {
            el.innerHTML = scope.eval(exp);
            scope.watcher(el, exp);
        }
    };

    return bind;
});