module.exports = function(e) {
    var t = e.UNDERSCORE_IDENT_RE + "(<" + e.UNDERSCORE_IDENT_RE + ">)?", n = "false synchronized int abstract float private char boolean static null if const for true while long strictfp finally protected import native final void enum else break transient catch instanceof byte super volatile case assert short package default double public try this switch continue throws protected public private", r = "\\b(0[bB]([01]+[01_]+[01]+|[01]+)|0[xX]([a-fA-F0-9]+[a-fA-F0-9_]+[a-fA-F0-9]+|[a-fA-F0-9]+)|(([\\d]+[\\d_]+[\\d]+|[\\d]+)(\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))?|\\.([\\d]+[\\d_]+[\\d]+|[\\d]+))([eE][-+]?\\d+)?)[lLfF]?", o = {
        className: "number",
        begin: r,
        relevance: 0
    };
    return {
        aliases: [ "jsp" ],
        keywords: n,
        illegal: /<\/|#/,
        contains: [ e.COMMENT("/\\*\\*", "\\*/", {
            relevance: 0,
            contains: [ {
                className: "doctag",
                begin: "@[A-Za-z]+"
            } ]
        }), e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
            className: "class",
            beginKeywords: "class interface",
            end: /[{;=]/,
            excludeEnd: !0,
            keywords: "class interface",
            illegal: /[:"\[\]]/,
            contains: [ {
                beginKeywords: "extends implements"
            }, e.UNDERSCORE_TITLE_MODE ]
        }, {
            beginKeywords: "new throw return else",
            relevance: 0
        }, {
            className: "function",
            begin: "(" + t + "\\s+)+" + e.UNDERSCORE_IDENT_RE + "\\s*\\(",
            returnBegin: !0,
            end: /[{;=]/,
            excludeEnd: !0,
            keywords: n,
            contains: [ {
                begin: e.UNDERSCORE_IDENT_RE + "\\s*\\(",
                returnBegin: !0,
                relevance: 0,
                contains: [ e.UNDERSCORE_TITLE_MODE ]
            }, {
                className: "params",
                begin: /\(/,
                end: /\)/,
                keywords: n,
                relevance: 0,
                contains: [ e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, e.C_NUMBER_MODE, e.C_BLOCK_COMMENT_MODE ]
            }, e.C_LINE_COMMENT_MODE, e.C_BLOCK_COMMENT_MODE ]
        }, o, {
            className: "annotation",
            begin: "@[A-Za-z]+"
        } ]
    };
};
