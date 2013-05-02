function Class() {};

Class.prototype.construct = function() {};

Class.__asMethod__ = function(func, superClass) {
	return function() {
		var currentSuperClass = this.$;
		this.$ = superClass;
		var ret = func.apply(this, arguments);
		this.$ = currentSuperClass;
		return ret;
	};
};

Class.extend = function(def) {
	var classDef = function() {
		if (arguments[0] !== Class) {
			this.construct.apply(this, arguments);
		}
	};
    
	var proto = new this(Class);
	var superClass = this.prototype;
    
	for ( var n in def) {
		var item = def[n];
        
		if (item instanceof Function) {
			item = Class.__asMethod__(item, superClass);
		}
        
		proto[n] = item;
	}
    
	proto.$ = superClass;
	classDef.prototype = proto;
	classDef.extend = this.extend;
	return classDef;
};

Class.Util = {};

Class.Util.extend = function(destination, source) {
    destination = destination || {};
    if(source) {
        for(var property in source) {
            var value = source[property];
            if(value !== undefined) {
                destination[property] = value;
            }
        }
        
        var sourceIsEvt = typeof window.Event == "function" && source instanceof window.Event;
        
        if(!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
            destination.toString = source.toString;
        }
    }
    return destination;
};

/**
 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Function/bind
 */
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }
        
        var aArgs = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP = function () {},
        fBound = function () {
            return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis,
                                 aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        
        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        
        return fBound;
    };
}