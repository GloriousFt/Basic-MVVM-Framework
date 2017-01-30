define(function (require) {
    var Provider = require('provider');
    
    var DOMCompiler = {
        bootstrap: function () {
            this.compile(document.children[0], Provider.get('$rootScope'));
        },
        compile: function (el, scope) {
            var dirs = this._getElDirectives(el),
                dir,
                scopeCreated;
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
            var attrs = el.attributes,
                result = [];
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
    
    return DOMCompiler;
});

define (function(require) {
    var DOMCompiler = require('DOMCompiler'),
        Scope = require('scope'),
        directivesLoader = require('directives/directivesLoader');
    
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
            var provider;
            if (this._cache[name]) {
                return this._cache[name];
            }
            provider = this._providers[name];
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
            directivesLoader.initDefaultConfig();
            
            // start the engine
            DOMCompiler.bootstrap();
        }

    };

    return Provider;
});
define (function() {
    // Scope
    var Scope = function (parent, id) {
        this.watchers = [];
        this.children = [];
        this.parent = parent;
        this.id = id || 0;
    };
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
    
    return Scope;
});
define (function () {
    var bind = {
        scope: false,
        
        link: function (el, scope, exp) {
            el.innerHTML = scope.eval(exp);
            scope.watcher(el, exp);
        }
    };

    return bind;
});
define (function (require) {
    var Provider = require('../provider');
    
    var controller = {
        scope: true,
        link: function (el, scope, exp) {
            var ctrl = Provider.get(exp + Provider.CONTROLLERS_SUFFIX);
            Provider.invoke(ctrl, { $scope: scope });
        }
    };
    
    return controller;
});
define (function (require) {
    var Provider = require('../provider'),
        controller = require('controller'),
        model = require('model'),
        bind = require('bind');
    
    var directives = {
        controller: controller,
        model: model,
        bind: bind
    };
    
    var loader = {
        
        initDefaultConfig: function() {
            for (var name in directives) {
                this.registerDirective(name, directives[name]);
            }
        },

        registerDirective: function (name ,directive) {
            Provider.directive('pt-' + name, function () {
                return directive;
            });
        }
        
    };
    
    return loader;
});
define (function () {
    var model = {
        link:  function (el, scope, exp) {
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