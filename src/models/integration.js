var r = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (o.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, o = {}.hasOwnProperty;

Models.Integration = function(e) {
    function Integration() {
        return Integration.__super__.constructor.apply(this, arguments);
    }
    r(Integration, e);
    Integration.prototype.idAttribute = "service";
    return Integration;
}(Backbone.Model);