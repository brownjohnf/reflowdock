"use strict";

function r(e, t) {
    var n, r, o;
    r = e.bMarks[t] + e.tShift[t];
    o = e.eMarks[t];
    n = e.src.charCodeAt(r++);
    if (n !== 42 && n !== 45 && n !== 43) {
        return -1;
    }
    if (o > r && e.src.charCodeAt(r) !== 32) {
        return -1;
    }
    return r;
}

function o(e, t) {
    var n, r = e.bMarks[t] + e.tShift[t], o = r, i = e.eMarks[t];
    if (o + 1 >= i) {
        return -1;
    }
    n = e.src.charCodeAt(o++);
    if (n < 48 || n > 57) {
        return -1;
    }
    for (;;) {
        if (o >= i) {
            return -1;
        }
        n = e.src.charCodeAt(o++);
        if (!(n >= 48 && n <= 57)) {
            if (n === 41 || n === 46) {
                break;
            }
            return -1;
        }
        if (o - r >= 10) {
            return -1;
        }
    }
    if (i > o && e.src.charCodeAt(o) !== 32) {
        return -1;
    }
    return o;
}

function i(e, t) {
    var n, r, o = e.level + 2;
    for (n = t + 2, r = e.tokens.length - 2; r > n; n++) {
        if (e.tokens[n].level === o && e.tokens[n].type === "paragraph_open") {
            e.tokens[n + 2].hidden = true, e.tokens[n].hidden = true, n += 2
        };
    }
}

module.exports = function(e, t, n, s) {
    var a, u, l, c, p, d, h, f, m, g, v, b, y, _, w, k, x, C, E, T, S, D, A, M = true;
    if ((f = o(e, t)) >= 0) {
        y = true;
    } else {
        if (!((f = r(e, t)) >= 0)) {
            return false;
        }
        y = false;
    }
    b = e.src.charCodeAt(f - 1);
    if (s) {
        return true;
    }
    for (w = e.tokens.length, y ? (h = e.bMarks[t] + e.tShift[t], v = Number(e.src.substr(h, f - h - 1)), 
    T = e.push("ordered_list_open", "ol", 1), v !== 1 && (T.attrs = [ [ "start", v ] ])) : T = e.push("bullet_list_open", "ul", 1), 
    T.map = x = [ t, 0 ], T.markup = String.fromCharCode(b), a = t, k = false, E = e.md.block.ruler.getRules("list"); !(!(n > a) || (_ = e.skipSpaces(f), 
    m = e.eMarks[a], g = _ >= m ? 1 : _ - f, g > 4 && (g = 1), u = f - e.bMarks[a] + g, 
    T = e.push("list_item_open", "li", 1), T.markup = String.fromCharCode(b), T.map = C = [ t, 0 ], 
    c = e.blkIndent, p = e.tight, l = e.tShift[t], d = e.parentType, e.tShift[t] = _ - e.bMarks[t], 
    e.blkIndent = u, e.tight = true, e.parentType = "list", e.md.block.tokenize(e, t, n, true), 
    (!e.tight || k) && (M = false), k = e.line - t > 1 && e.isEmpty(e.line - 1), e.blkIndent = c, 
    e.tShift[t] = l, e.tight = p, e.parentType = d, T = e.push("list_item_close", "li", -1), 
    T.markup = String.fromCharCode(b), a = t = e.line, C[1] = a, _ = e.bMarks[t], a >= n) || e.isEmpty(a) || e.tShift[a] < e.blkIndent); ) {
        for (A = false, S = 0, D = E.length; D > S; S++) {
            if (E[S](e, a, n, true)) {
                A = true;
                break;
            }
        }
        if (A) {
            break;
        }
        if (y) {
            f = o(e, a);
            if (f < 0) {
                break;
            }
        } else {
            f = r(e, a);
            if (f < 0) {
                break;
            }
        }
        if (b !== e.src.charCodeAt(f - 1)) {
            break;
        }
    }
    if (y) {
        T = e.push("ordered_list_close", "ol", -1);
    } else {
        T = e.push("bullet_list_close", "ul", -1);
    }
    T.markup = String.fromCharCode(b);
    x[1] = a;
    e.line = a;
    if (M) {
        i(e, w)
    };
    return true;
};
