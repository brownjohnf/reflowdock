var r = (require("./ModernizrProto"), require("./cssomPrefixes")), o = function(e) {
    var t, n = r.length, o = window.CSSRule;
    if (typeof o == "undefined") {
        return void 0;
    }
    if (!e) {
        return !1;
    }
    e = e.replace(/^@/, "");
    t = e.replace(/-/g, "_").toUpperCase() + "_RULE";
    if (t in o) {
        return "@" + e;
    }
    for (var i = 0; n > i; i++) {
        var s = r[i], a = s.toUpperCase() + "_" + t;
        if (a in o) {
            return "@-" + s.toLowerCase() + "-" + e;
        }
    }
    return !1;
};

module.exports = o;
