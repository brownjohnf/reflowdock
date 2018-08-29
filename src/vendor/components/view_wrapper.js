var r, o;

r = require("react");

o = r.DOM;

module.exports = r.createClass({
    componentDidMount: function() {
        this.view = this.props.builder(null);
        this.view.render();
        $(r.findDOMNode(this)).append(this.view.el);
        if (this.props.detached) {
            return undefined;
        }
        return this.view.triggerAttach(null);
    },
    shouldComponentUpdate: function(e) {
        var t, n;
        if (this.props.detached && !e.detached) {
            if ((t = this.view) != null) {
                t.triggerAttach(null)
            };
        } else {
            if (!this.props.detached && e.detached && (n = this.view) != null) {
                n.triggerDetach(null)
            };
        }
        return false;
    },
    componentWillUnmount: function() {
        var e;
        if ((e = this.view) != null) {
            return e.destructor();
        }
        return;
    },
    render: function() {
        return o.div({});
    }
});
