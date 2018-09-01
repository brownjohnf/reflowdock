var r;

r = function() {
    function e(e) {
        this.typing = e;
    }
    e.prototype.toStream = function(e) {
        var t;
        t = function(e, t) {
            return e === t || e === undefined && t === false;
        };
        return this.typing.skipDuplicates(t).flatMapLatest(function(t) {
            if (t) {
                return Bacon.interval(e, t).merge(Bacon.once(t));
            }
            if (t != null) {
                return Bacon.once(false);
            }
            return Bacon.never();
        });
    };
    e.prototype.toMessages = function(e, t) {
        var n;
        n = this.toStream(t);
        return e.flatMapLatest(function(e) {
            return n.map(function(t) {
                var n;
                n = {
                    event: "activity.user",
                    content: {
                        typing: t
                    },
                    persist: false,
                    tags: []
                };
                if (e.isPrivate()) {
                    return _.extend(n, {
                        to: "" + e.id
                    });
                }
                return _.extend(n, {
                    flow: e.id
                });
            });
        });
    };
    e.prototype.when = function(t) {
        var n;
        n = t.flatMapLatest(function(e) {
            return function(t) {
                if (t) {
                    return e.typing;
                }
                return Bacon.constant(undefined);
            };
        }(this));
        return new e(n, this.interval);
    };
    e.build = function(t, n, r) {
        return new e(this.asProperty(t, n, r));
    };
    e.asProperty = function(e, t, n) {
        var r, o;
        o = e.asEventStream("keyup", t).map(function(e) {
            var t, n;
            t = $(e.target);
            n = t.val();
            if (n.length > 0 && n.indexOf("/") !== 0) {
                return t.attr("data-input-id");
            }
            return false;
        });
        r = e.asEventStream("reset", t).map(undefined);
        return o.merge(r).flatMapLatest(function(e) {
            var t;
            t = Bacon.once(e);
            if (e) {
                return t.merge(Bacon.later(n, false));
            }
            return t;
        }).toProperty();
    };
    return e;
}();

Flowdock.TypingActivity = r;
