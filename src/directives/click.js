define (function () {
    var clickEvent = {
        scope: false,
        link: function (el, scope, exp, provider) {
            el.onclick = function(event) {
                scope.eval(exp);
            };
        }
    };

    return clickEvent;
});