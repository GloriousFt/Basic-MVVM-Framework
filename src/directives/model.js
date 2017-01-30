define (function () {
    var model = {
        link:  function (el, scope, exp, provider) {
            if (el.tagName !== 'INPUT') {
                return;
            }
            el.onkeyup = function () {
                scope[exp] = el.value;
            };
        }
    };

    return model;
});