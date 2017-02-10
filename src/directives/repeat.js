define (function () {
    var repeat = {
        scope: true,
        link: function (el, scope, exp, provider) {
            var match = exp.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)?\s*$/),
                indexString = match[1],
                collection = match[2];
            console.log(indexString);
            console.log(collection);
        }
    };

    return repeat;
});