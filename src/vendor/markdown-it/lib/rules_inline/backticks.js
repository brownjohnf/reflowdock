"use strict";

module.exports = function(e, t) {
    var n, r, o, i, s, a, u = e.pos, l = e.src.charCodeAt(u);
    if (96 !== l) {
        return !1;
    }
    for (n = u, u++, r = e.posMax; r > u && e.src.charCodeAt(u) === 96; ) {
        u++;
    }
    for (o = e.src.slice(n, u), i = s = u; -1 !== (i = e.src.indexOf("`", s)); ) {
        for (s = i + 1; r > s && e.src.charCodeAt(s) === 96; ) {
            s++;
        }
        if (s - i === o.length) {
            t || (a = e.push("code_inline", "code", 0), a.markup = o, a.content = e.src.slice(u, i).replace(/[ \n]+/g, " ").trim());
            e.pos = s;
            return !0;
        }
    }
    t || (e.pending += o);
    e.pos += o.length;
    return !0;
};