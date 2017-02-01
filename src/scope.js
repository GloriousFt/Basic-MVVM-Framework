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
        if (typeof this[exp] === 'function') {
            val = this[exp].call(this);
        } else {
            val = this[exp];
        }
        return val;
    };

    Scope.prototype.watcher = function (el, exp, getter, setter) {
        var prop = exp;
        this.watchers.push({
            exp: exp,
            el: el
        });
        if (!exp) {
            return;
        }
        Object.defineProperty(this, prop, {
            get: getter,
            set: setter
        });
    };
    
    return Scope;
});