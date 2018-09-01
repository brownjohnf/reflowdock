function r(e, t) {
    if (typeof e == "object") {
        t = e, e = undefined
    };
    t = t || {};
    var n, r = o(e), i = r.source, l = r.id;
    if (t.forceNew || t["force new connection"] || t.multiplex === false) {
        a("ignoring socket cache for %s", i);
        n = s(i, t);
    } else {
        if (!u[l]) {
            a("new io instance for %s", i), u[l] = s(i, t)
        };
        n = u[l];
    }
    return n.socket(r.path);
}

var o = require("./url"), i = require("socket.io-parser"), s = require("./manager"), a = require("debug")("socket.io-client");

module.exports = exports = r;

var u = exports.managers = {};

exports.protocol = i.protocol;

exports.connect = r;

exports.Manager = require("./manager");

exports.Socket = require("./socket");
