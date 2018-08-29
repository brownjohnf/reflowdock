var r;

r = function() {
    function e(e) {
        this.model = e;
    }
    e.prototype.id = function() {
        return "flow-" + this.model.id;
    };
    e.prototype.iconClass = function() {
        if (this.model.get("access_mode") === "invitation") {
            return "fa-lock";
        }
        return "fa-building";
    };
    e.prototype.iconTitle = function() {
        var e, t;
        if (this.model.get("access_mode") === "invitation") {
            e = "This flow is invitation-only.";
        } else {
            e = "This flow can be joined by anyone in the organization.";
        }
        if (this.model.get("open")) {
            t = "You are a part of this flow. ";
        } else {
            t = "";
        }
        return t + e;
    };
    e.prototype.icon = function() {
        return {
            open: this.model.get("open"),
            class: this.iconClass(),
            title: this.iconTitle()
        };
    };
    e.prototype.description = function() {
        var e;
        if ((e = this.model.get("description")) != null && e.length) {
            return this.model.get("description");
        }
        return "No description";
    };
    e.prototype.lastMessageAt = function() {
        return moment(new Date(this.model.get("last_message_at") || 0));
    };
    e.prototype.name = function() {
        return this.model.get("name");
    };
    e.prototype.specifier = function() {
        return this.model.get("organization").name;
    };
    e.prototype.hasUsers = function() {
        return true;
    };
    e.prototype.url = function() {
        return Helpers.url.stripHost(this.model.get("web_url"));
    };
    return e;
}();

module.exports = r;
