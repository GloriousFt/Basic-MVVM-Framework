define (function (require) {
    var controller = require('directives/controller'),
        model = require('directives/model'),
        bind = require('directives/bind'),
        click = require('directives/click'),
        show = require('directives/show'),
        hide = require('directives/hide'),
        repeat = require('directives/repeat');
    
    var loader = {

        directives: {
            controller: controller,
            model: model,
            bind: bind,
            click: click,
            show: show,
            hide: hide,
            repeat: repeat
        },
        
        provider: {},
        
        initDefaultConfig: function(provider) {
            this.provider = provider;
            for (var name in this.directives) {
                this.registerDirective(name, this.directives[name]);
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