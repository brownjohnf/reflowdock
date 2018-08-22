var r, o = function(e, t) {
    function n() {
        this.constructor = e;
    }
    for (var r in t) {
        if (i.call(t, r)) {
            e[r] = t[r]
        };
    }
    n.prototype = t.prototype;
    e.prototype = new n();
    e.__super__ = t.prototype;
    return e;
}, i = {}.hasOwnProperty;

r = require("flowdock-clipboard");

Views.Inbox.ItemActionList = function(t) {
    function ItemActionList() {
        return ItemActionList.__super__.constructor.apply(this, arguments);
    }
    o(ItemActionList, t);
    ItemActionList.prototype.tagName = "ul";
    ItemActionList.prototype.className = "item-actions dropdown-actions capitalize";
    ItemActionList.prototype.template = require("../../templates/inbox/item_action_list.mustache");
    ItemActionList.prototype.events = function() {
        return {
            "click .permalink": "_copyPermalink",
            "click .permalink-input": "_selectPermalink"
        };
    };
    ItemActionList.prototype.onAfterRender = function() {
        var t;
        if ((typeof macgap != "undefined" && null !== macgap ? macgap.clipboard : void 0) || (typeof windowsApp != "undefined" && null !== windowsApp ? windowsApp.clipboard : void 0)) {
            return void 0;
        }
        t = $(require("../../templates/inbox/permalink_fallback.mustache").render({
            permalink: this.model.permalink()
        }));
        return this.$(".permalink-item").append(t).delayedHover("open");
    };
    ItemActionList.prototype.serializeData = function() {
        var e, t, n, r;
        r = this.model.get("thread") ? new Models.Thread(this.model.get("thread")) : this.model
        t = {
            url: this.model.permalink(),
            hasContext: this.model.hasContext(),
            removable: r.removable()
        }
        if (!this.model.get("thread_id")) {
            n = typeof (e = this.model).presenter == "function" ? e.presenter() : void 0
            if (!n) {
                return t;
            }
            _.extend(t, {
                mainLink: typeof n.link == "function" ? n.link() : void 0,
                mainLinkTitle: typeof n.linkTitle == "function" ? n.linkTitle() : void 0,
                presenter: n
            });
        }
        return t;
    };
    ItemActionList.prototype._copyPermalink = function(e) {
        if (r.copy(this.model.permalink())) {
            return this._showCopyFeedback();
        }
        return this._selectPermalink(e);
    };
    ItemActionList.prototype._selectPermalink = function(e) {
        e.stopImmediatePropagation();
        return this.$(".permalink-input").select();
    };
    ItemActionList.prototype._showCopyFeedback = function() {
        var e;
        e = this.$el.closest(".dropdown");
        e.tipsy({
            fade: !0,
            fallback: "Copied permalink to clipboard!",
            gravity: "e",
            delayIn: 0,
            trigger: "manual"
        });
        e.tipsy("show");
        return setTimeout(function() {
            return e.tipsy("hide");
        }, 2e3);
    };
    return ItemActionList;
}(Flowdock.ItemView);