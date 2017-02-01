define(function () {
    var show = {
        scope: false,
        link: function (el, scope, exp, provider) {
            var CLASSNAME = 'pt-hidden',
                newProp = '_' + exp,
                value = scope.eval(exp);
            scope[newProp] = value;

            if (value) {
                el.classList.remove(CLASSNAME);
            } else {
                el.classList.add(CLASSNAME);
            }

            scope.watcher(el, exp,
                function () {
                    return scope[newProp];
                },
                function(value) {
                    scope[newProp] = value;
                    if (value) {
                        el.classList.remove(CLASSNAME);
                    } else {
                        el.classList.add(CLASSNAME);
                    }
                }
            );
        }
    };

    return show;
});