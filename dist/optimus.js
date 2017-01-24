var Provider = {

    DIRECTIVES_SUFFIX: 'Directive',
    CONTROLLERS_SUFFIX: 'Controller',

    _providers: {},
    _cache: { $rootScope: new Scope() },

    directive: function (name, fn) {
        this._register(name + Provider.DIRECTIVES_SUFFIX, fn);
    },

    controller: function (name, fn) {
        this._register(name + Provider.CONTROLLERS_SUFFIX, function () {
            return fn;
        });
    },

    service: function (name, fn) {
        this._register(name, fn);
    },

    _register: function (name, factory) {
        this._providers[name] = factory;
    },

    get: function (name, locals) {
        if (this._cache[name]) {
            return this._cache[name];
        }
        var provider = this._providers[name];
        if (!provider || typeof provider !== 'function') {
            return null;
        }
        return (this._cache[name] = this.invoke(provider, locals));
    },

    annotate: function (fn) {
        var res = fn.toString()
            .replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg, '')
            .match(/\((.*?)\)/);
        if (res && res[1]) {
            return res[1].split(',').map(function (d) {
                return d.trim();
            });
        }
        return [];
    },

    invoke: function (fn, locals) {
        locals = locals || {};
        var deps = this.annotate(fn).map(function (s) {
            return locals[s] || this.get(s, locals);
        }, this);
        return fn.apply(null, deps);
    },

    bootstrap: function() {
        // start the engine
        DOMCompiler.bootstrap();
    }

};
Provider.DIRECTIVES_SUFFIX = 'Directive';
Provider.CONTROLLERS_SUFFIX = 'Controller';

// DOM Compiler
var DOMCompiler = {
    bootstrap: function () {
        this.compile(document.children[0], Provider.get('$rootScope'));
    },
    compile: function (el, scope) {
        var dirs = this._getElDirectives(el);
        var dir;
        var scopeCreated;
        dirs.forEach(function (d) {
            dir = Provider.get(d.name + Provider.DIRECTIVES_SUFFIX);
            if (dir.scope && !scopeCreated) {
                scope = scope.new();
                scopeCreated = true;
            }
            dir.link(el, scope, d.value);
        });
        Array.prototype.slice.call(el.children).forEach(function (c) {
            this.compile(c, scope);
        }, this);
    },
    _getElDirectives: function (el) {
        var attrs = el.attributes;
        var result = [];
        for (var i = 0; i < attrs.length; i += 1) {
            if (Provider.get(attrs[i].name + Provider.DIRECTIVES_SUFFIX)) {
                result.push({
                    name: attrs[i].name,
                    value: attrs[i].value
                });
            }
        }
        return result;
    }
};

// Scope
function Scope(parent, id) {
    this.watchers = [];
    this.children = [];
    this.parent = parent;
    this.id = id || 0;
}
Scope.counter = 0;

Scope.prototype.new = function () {
    Scope.counter += 1;
    var obj = new Scope(this, Scope.counter);
    Object.setPrototypeOf(obj, this);
    this.children.push(obj);
    return obj;
};

Scope.prototype.destroy = function () {
    var pc = this.parent.children;
    pc.splice(pc.indexOf(this), 1);
};

Scope.prototype.eval = function (exp) {
    var val;
    if (typeof exp === 'function') {
        val = exp.call(this);
    } else {
        val = this[exp];
    }
    return val;
};

Scope.prototype.watcher = function (el, exp) {
    this.watchers.push({
        exp: exp,
        el: el
    });
    Object.defineProperty(this, exp, {
        get: function () {
            return exp;
        },
        set: function (value) {
            el.innerHTML = value;
        }
    });
};

// Directives
Provider.directive('pt-bind', function () {
    return {
        scope: false,
        link: function (el, scope, exp) {
            el.innerHTML = scope.eval(exp);
            scope.watcher(el, exp);
        }
    };
});

Provider.directive('pt-model', function () {
    return {
        link:  function (el, scope, exp) {
            if (el.tagName !== 'INPUT') {
                return;
            }
            el.onkeyup = function () {
                scope[exp] = el.value;
            };
        }
    };
});

Provider.directive('pt-controller', function () {
    return {
        scope: true,
        link: function (el, scope, exp) {
            var ctrl = Provider.get(exp + Provider.CONTROLLERS_SUFFIX);
            Provider.invoke(ctrl, { $scope: scope });
        }
    };
});
