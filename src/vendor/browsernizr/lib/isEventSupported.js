var r = (require("./ModernizrProto"), require("./createElement")), o = function(e) {
    function t(t, o) {
        var i;
        if (t) {
            if (!(o && typeof o != "string")) {
                o = r(o || "div")
            };
            t = "on" + t;
            i = t in o;
            if (!i && n) {
                if (!o.setAttribute) {
                    o = r("div")
                };
                o.setAttribute(t, "");
                i = typeof o[t] == "function";
                if (o[t] !== e) {
                    o[t] = e
                };
                o.removeAttribute(t);
            };
            return i;
        }
        return false;
    }
    var n = !("onblur" in document.documentElement);
    return t;
}();

module.exports = o;
