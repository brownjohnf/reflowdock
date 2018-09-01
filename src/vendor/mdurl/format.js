"use strict";

module.exports = function(e) {
    var t = "";
    t += e.protocol || "";
    if (e.slashes) {
        t += "//";
    } else {
        t += "";
    }
    if (e.auth) {
        t += e.auth + "@";
    } else {
        t += "";
    }
    if (e.hostname && e.hostname.indexOf(":") !== -1) {
        t += "[" + e.hostname + "]";
    } else {
        t += e.hostname || "";
    }
    if (e.port) {
        t += ":" + e.port;
    } else {
        t += "";
    }
    t += e.pathname || "";
    t += e.search || "";
    return t += e.hash || "";
};
