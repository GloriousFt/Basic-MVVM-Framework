(function (root, factory) {

    if (typeof define === 'function' && define.amd) {
        define('Optimus', ['provider'], function() {
            return root.OPTIMUS = factory();
        });
    } else if (typeof exports !== 'undefined') {
        factory();
    } else {
        root.OPTIMUS = factory();
    }

}(this, function (){

