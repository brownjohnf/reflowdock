"use strict";

module.exports = function(e, t, n, r) {
    var o, i, s, a, u = e.bMarks[t] + e.tShift[t], l = e.eMarks[t];
    o = e.src.charCodeAt(u);
    if (o !== 35 || u >= l) {
        return false;
    }
    for (i = 1, o = e.src.charCodeAt(++u); o === 35 && l > u && i <= 6; ) {
        i++;
        o = e.src.charCodeAt(++u);
    }
    if (i > 6 || l > u && o !== 32) {
        return false;
    }
    if (r) {
        return true;
    }
    l = e.skipCharsBack(l, 32, u);
    s = e.skipCharsBack(l, 35, u);
    if (s > u && e.src.charCodeAt(s - 1) === 32) {
        l = s
    };
    e.line = t + 1;
    a = e.push("heading_open", "h" + String(i), 1);
    a.markup = "########".slice(0, i);
    a.map = [ t, e.line ];
    a = e.push("inline", "", 0);
    a.content = e.src.slice(u, l).trim();
    a.map = [ t, e.line ];
    a.children = [];
    a = e.push("heading_close", "h" + String(i), -1);
    a.markup = "########".slice(0, i);
    return true;
};
