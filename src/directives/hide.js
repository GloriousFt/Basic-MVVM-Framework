define(function () {
    var hide = {
        scope: false,
        link: function (el, scope, exp, provider) {
            var CLASSNAME = 'pt-hidden',
                newProp = scope.PRIVATE_PREFIX + exp,
                value = scope.eval(exp);
            scope[newProp] = value;

            if (value) {
                el.classList.add(CLASSNAME);
            } else {
                el.classList.remove(CLASSNAME);
            }

            scope.watcher(el, exp,
                function () {
                    return scope[newProp];
                },
                function(value) {
                    scope[newProp] = value;
                    if (value) {
                        el.classList.add(CLASSNAME);
                    } else {
                        el.classList.remove(CLASSNAME);
                    }
                }
            );
        }
    };

    return hide;
});