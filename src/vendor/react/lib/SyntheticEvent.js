"use strict";

function r(e, t, n) {
    this.dispatchConfig = e;
    this.dispatchMarker = t;
    this.nativeEvent = n;
    var r = this.constructor.Interface;
    for (var o in r) {
        if (r.hasOwnProperty(o)) {
            var i = r[o];
            if (i) {
                this[o] = i(n);
            } else {
                this[o] = n[o];
            }
        }
    }
    var a = n.defaultPrevented != null ? n.defaultPrevented : n.returnValue === false;
    if (a) {
        this.isDefaultPrevented = s.thatReturnsTrue;
    } else {
        this.isDefaultPrevented = s.thatReturnsFalse;
    }
    this.isPropagationStopped = s.thatReturnsFalse;
}

var o = require("./PooledClass"), i = require("./Object.assign"), s = require("./emptyFunction"), a = require("./getEventTarget"), u = {
    type: null,
    target: a,
    currentTarget: s.thatReturnsNull,
    eventPhase: null,
    bubbles: null,
    cancelable: null,
    timeStamp: function(e) {
        return e.timeStamp || Date.now();
    },
    defaultPrevented: null,
    isTrusted: null
};

i(r.prototype, {
    preventDefault: function() {
        this.defaultPrevented = true;
        var e = this.nativeEvent;
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
        this.isDefaultPrevented = s.thatReturnsTrue;
    },
    stopPropagation: function() {
        var e = this.nativeEvent;
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
        this.isPropagationStopped = s.thatReturnsTrue;
    },
    persist: function() {
        this.isPersistent = s.thatReturnsTrue;
    },
    isPersistent: s.thatReturnsFalse,
    destructor: function() {
        var e = this.constructor.Interface;
        for (var t in e) {
            this[t] = null;
        }
        this.dispatchConfig = null;
        this.dispatchMarker = null;
        this.nativeEvent = null;
    }
});

r.Interface = u;

r.augmentClass = function(e, t) {
    var n = this, r = Object.create(n.prototype);
    i(r, e.prototype);
    e.prototype = r;
    e.prototype.constructor = e;
    e.Interface = i({}, n.Interface, t);
    e.augmentClass = n.augmentClass;
    o.addPoolingTo(e, o.threeArgumentPooler);
};

o.addPoolingTo(r, o.threeArgumentPooler);

module.exports = r;
