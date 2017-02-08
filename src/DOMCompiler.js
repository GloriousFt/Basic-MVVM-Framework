define(function () {

    var compiler = {
        
        provider: {},
        
        bootstrap: function (provider) {
            this.provider = provider;
            this.compile(document.children[0], this.provider.get('$rootScope'));
        },
        compile: function (el, scope) {
            var that = this,
                dirs = that._getElDirectives(el),
                dir,
                scopeCreated;
            dirs.forEach(function (d) {
                dir = that.provider.get(d.name + that.provider.DIRECTIVES_SUFFIX);
                if (dir.scope && !scopeCreated) {
                    scope = scope.new();
                    scopeCreated = true;
                }
                dir.link(el, scope, d.value, that.provider);
            });
            Array.prototype.slice.call(el.children).forEach(function (c) {
                this.compile(c, scope);
            }, this);
        },
        _getElDirectives: function (el) {
            var that = this,
                attrs = el.attributes,
                result = [];
            for (var i = 0; i < attrs.length; i += 1) {
                if (that.provider.get(attrs[i].name + that.provider.DIRECTIVES_SUFFIX)) {
                    result.push({
                        name: attrs[i].name,
                        value: attrs[i].value
                    });
                }
            }
            return result;
        }
    };
    
    return compiler;
});
