var r;

r = {
    titleFor: function(e) {
        var t, n, r;
        t = e.flow();
        r = e.user();
        if (t.isPrivate()) {
            return r.get("nick") || ((n = Flowdock.app.users.get(r.id)) != null ? n.get("nick") : undefined) || "";
        }
        if (r && r.id !== "0") {
            return r.get("nick") + " - " + t.fullName();
        }
        return t.fullName();
    },
    bodyFor: function(e) {
        var t;
        if ((t = e.presenter()) != null) {
            return t.summary();
        }
        return;
    },
    messageFilter: function(e, t, n, o) {
        var i, s, a;
        a = r.activeFlowSingleViewMessageId(n, o);
        i = Models.Message.fromOpenFlows(e, t);
        s = r.ignoredFlow(n, Flowdock.windowFocus, a, i);
        return Models.Message.ignoreByFlow(i, s).filter(function(e) {
            return String(e.user) !== String(Flowdock.app.user.id);
        }).map(function(e) {
            return new Models.Message(e);
        });
    },
    format: function(e) {
        var t, n;
        try {
            return {
                title: r.titleFor(e),
                body: r.bodyFor(e),
                icon: (n = e.user()) != null ? n.avatar(30) : undefined
            };
        } catch (o) {
            return t = o, console.error(t), console.error("Could not render notification for ", e);
        }
    },
    display: function(e, t) {
        var n, o, i, s, a;
        n = r.format(t);
        if (n != null && n.body) {
            o = t.flow();
            if (t.get("app") === "influx") {
                i = function() {
                    return Flowdock.app.router.navigateToFlow(o, {
                        message: t
                    });
                };
            } else {
                if (t.parent() || t.isThread()) {
                    i = function() {
                        if (t.parent()) {
                            return Flowdock.app.router.navigateToFlow(o, {
                                message: t.threadId()
                            });
                        }
                        return Flowdock.app.router.navigateToFlow(o, {
                            thread: t.threadId()
                        });
                    };
                } else {
                    i = function() {
                        var e;
                        if ((e = Flowdock.app.router) != null) {
                            return e.navigateToFlow(o, {
                                message: null,
                                users: null,
                                thread: null
                            });
                        }
                        return;
                    };
                }
            }
            if (t.get("app") === "influx" || t.isThread()) {
                a = t.id;
            } else {
                if (t.parent()) {
                    a = t.parent();
                } else {
                    a = null;
                }
            }
            if (o.path != null) {
                s = o.path();
            } else {
                if (o.isPrivate()) {
                    s = "private/" + o.id;
                } else {
                    s = undefined;
                }
            }
            return e.closingNotification(n.title, {
                body: n.body,
                icon: n.icon,
                payload: JSON.stringify({
                    flowPath: s,
                    message: a
                }),
                onclick: function() {
                    i();
                    return window.focus();
                }
            });
        }
        return;
    },
    activeFlowSingleViewMessageId: function(e, t) {
        return e.combine(t, function(e, t) {
            if (t && e && e.get("id") === t.flow.get("id") && t.messageId) {
                return t.messageId;
            }
            return false;
        });
    },
    ignoredFlow: function(e, t, n, r) {
        var o;
        o = n.sampledBy(r, function(e, t) {
            var n, r;
            n = new Models.Message(t, {
                comments: false
            });
            if (n.isThread()) {
                r = n.threadId();
            } else {
                r = n.parent();
            }
            return e && !(e === r);
        });
        return Bacon.combineAsArray(e.map(function(e) {
            return e || false;
        }), t, o).map(function(e) {
            var t, n, r;
            t = e[0];
            n = e[1];
            r = e[2];
            if (!n || r) {
                return false;
            }
            return t;
        });
    }
};

Flowdock.messageDesktopNotifications = function(e, t, n, o, i) {
    return r.messageFilter(t, n, o, i).onValue(function(t) {
        return r.display(e, t);
    });
};

_.extend(Flowdock.messageDesktopNotifications, r);
