module.exports = function(e) {
    return {
        subLanguage: "xml",
        contains: [ e.COMMENT("<%#", "%>"), {
            begin: "<%[%=-]?",
            end: "[%-]?%>",
            subLanguage: "ruby",
            excludeBegin: !0,
            excludeEnd: !0
        } ]
    };
};
