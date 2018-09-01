"use strict";

module.exports = function(e, t, n) {
    var r, o, i, s, a, u = t + 1;
    if (u >= n) {
        return false;
    }
    if (e.tShift[u] < e.blkIndent) {
        return false;
    }
    if (e.tShift[u] - e.blkIndent > 3) {
        return false;
    }
    o = e.bMarks[u] + e.tShift[u];
    i = e.eMarks[u];
    if (o >= i) {
        return false;
    }
    r = e.src.charCodeAt(o);
    if (r !== 45 && r !== 61) {
        return false;
    }
    o = e.skipChars(o, r);
    o = e.skipSpaces(o);
    if (i > o) {
        return false;
    }
    o = e.bMarks[t] + e.tShift[t];
    e.line = u + 1;
    if (r === 61) {
        a = 1;
    } else {
        a = 2;
    }
    s = e.push("heading_open", "h" + String(a), 1);
    s.markup = String.fromCharCode(r);
    s.map = [ t, e.line ];
    s = e.push("inline", "", 0);
    s.content = e.src.slice(o, e.eMarks[t]).trim();
    s.map = [ t, e.line - 1 ];
    s.children = [];
    s = e.push("heading_close", "h" + String(a), -1);
    s.markup = String.fromCharCode(r);
    return true;
};
