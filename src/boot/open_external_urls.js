var r;

r = function(e) {
    var t, n;
    if (!e.isDefaultPrevented()) {
        t = e.target.tagName.toLowerCase() === "a" ? e.target : e.currentTarget;
        if (t.target === "_blank") {
            n = window.open(t.href, "_blank");
            n.opener = null;
            return e.preventDefault();
        }
        return;
    }
};

window.macgap || window.windowsApp || $(document).on("click", "a[href]", r);
