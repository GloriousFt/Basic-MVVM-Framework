define (function (require) {
    var controller = require('directives/controller'),
        model = require('directives/model'),
        bind = require('directives/bind');
    
    var directives = {
        controller: controller,
        model: model,
        bind: bind
    };
    
    var loader = {
        
        provider : {},
        
        initDefaultConfig: function(provider) {
            this.provider = provider;
            for (var name in directives) {
                this.registerDirective(name, directives[name]);
            }
        },

        registerDirective: function (name ,directive) {
            this.provider.directive('pt-' + name, function () {
                return directive;
            });
        }
        
    };
    
    return loader;
});