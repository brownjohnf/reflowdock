!function(e) {
    var t, n, r, o;
    r = "filedragndrop";
    o = "filedragndrop-intercept-overlay";
    t = function(t) {
        var n, i;
        if (!this.data(r + ".initialized")) {
            n = !1;
            i = e("<div id='" + o + "'></div>").addClass(t.overlayClass).on("dragleave." + r, function(e) {
                i.detach();
                t.dragleave(e);
                n = !1;
            }).on("drop." + r, function(e) {
                i.detach();
                t.drop(e);
                n = !1;
            }).data(r + ".overlay-initialized", !0);
            this.on("dragenter." + r, function(r) {
                n || (n = !0, r.originalEvent.dataTransfer && _.any(r.originalEvent.dataTransfer.types, function(e) {
                    return e === "Files";
                }) && (r.preventDefault(), e(t.target).append(i), t.dragenter(r)));
            });
            return this.data(r + ".initialized", !0);
        }
    };
    n = function() {
        this.data(r + ".initialized", !1);
        return this.off("." + r);
    };
    return e.fn.dragNDropFileEvents = function(r) {
        var o;
        if (r == null) {
            r = {}
        };
        if (r === "destroy") {
            this.each(function() {
                return n.call(e(this));
            });
            return this;
        }
        o = {
            dragenter: function(e) {},
            dragleave: function(e) {},
            drop: function(e) {},
            overlayClass: "overlay"
        };
        r = e.extend(o, r);
        this.each(function() {
            return t.call(e(this), r);
        });
        return this;
    };
}(jQuery);
