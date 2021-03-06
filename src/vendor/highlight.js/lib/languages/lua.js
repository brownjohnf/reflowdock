module.exports = function(e) {
    var t = "\\[=*\\[", n = "\\]=*\\]", r = {
        begin: t,
        end: n,
        contains: [ "self" ]
    }, o = [ e.COMMENT("--(?!" + t + ")", "$"), e.COMMENT("--" + t, n, {
        contains: [ r ],
        relevance: 10
    }) ];
    return {
        lexemes: e.UNDERSCORE_IDENT_RE,
        keywords: {
            keyword: "and break do else elseif end false for if in local nil not or repeat return then true until while",
            built_in: "_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load loadfile loadstring module next pairs pcall print rawequal rawget rawset require select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug io math os package string table"
        },
        contains: o.concat([ {
            className: "function",
            beginKeywords: "function",
            end: "\\)",
            contains: [ e.inherit(e.TITLE_MODE, {
                begin: "([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*"
            }), {
                className: "params",
                begin: "\\(",
                endsWithParent: !0,
                contains: o
            } ].concat(o)
        }, e.C_NUMBER_MODE, e.APOS_STRING_MODE, e.QUOTE_STRING_MODE, {
            className: "string",
            begin: t,
            end: n,
            contains: [ r ],
            relevance: 5
        } ])
    };
};
