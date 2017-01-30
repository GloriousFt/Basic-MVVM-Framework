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
            this._register(name + this.DIRECTIVES_SUFFIX, fn);
        },

        controller: function (name, fn) {
            this._register(name + this.CONTROLLERS_SUFFIX, function () {
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
            directivesLoader.initDefaultConfig(this);
            
            // start the engine
            DOMCompiler.bootstrap(this);
        }

    };

    return Provider;
});