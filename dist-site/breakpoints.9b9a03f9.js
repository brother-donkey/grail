/*!
  Highlight.js v11.7.0 (git: 82688fad18)
  (c) 2006-2022 undefined and other contributors
  License: BSD-3-Clause
 */ var hljs = function() {
    "use strict";
    var e = {
        exports: {}
    };
    function t(e) {
        return e instanceof Map ? e.clear = e.delete = e.set = ()=>{
            throw Error("map is read-only");
        } : e instanceof Set && (e.add = e.clear = e.delete = ()=>{
            throw Error("set is read-only");
        }), Object.freeze(e), Object.getOwnPropertyNames(e).forEach((n)=>{
            var i = e[n];
            "object" != typeof i || Object.isFrozen(i) || t(i);
        }), e;
    }
    e.exports = t, e.exports.default = t;
    class n {
        constructor(e){
            void 0 === e.data && (e.data = {}), this.data = e.data, this.isMatchIgnored = !1;
        }
        ignoreMatch() {
            this.isMatchIgnored = !0;
        }
    }
    function i(e) {
        return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
    }
    function r(e, ...t) {
        const n = Object.create(null);
        for(const t1 in e)n[t1] = e[t1];
        return t.forEach((e)=>{
            for(const t in e)n[t] = e[t];
        }), n;
    }
    const s = (e)=>!!e.scope || e.sublanguage && e.language;
    class o {
        constructor(e, t){
            this.buffer = "", this.classPrefix = t.classPrefix, e.walk(this);
        }
        addText(e) {
            this.buffer += i(e);
        }
        openNode(e) {
            if (!s(e)) return;
            let t = "";
            t = e.sublanguage ? "language-" + e.language : ((e, { prefix: t  })=>{
                if (e.includes(".")) {
                    const n = e.split(".");
                    return [
                        `${t}${n.shift()}`,
                        ...n.map((e, t)=>`${e}${"_".repeat(t + 1)}`)
                    ].join(" ");
                }
                return `${t}${e}`;
            })(e.scope, {
                prefix: this.classPrefix
            }), this.span(t);
        }
        closeNode(e) {
            s(e) && (this.buffer += "</span>");
        }
        value() {
            return this.buffer;
        }
        span(e) {
            this.buffer += `<span class="${e}">`;
        }
    }
    const a = (e = {})=>{
        const t = {
            children: []
        };
        return Object.assign(t, e), t;
    };
    class c {
        constructor(){
            this.rootNode = a(), this.stack = [
                this.rootNode
            ];
        }
        get top() {
            return this.stack[this.stack.length - 1];
        }
        get root() {
            return this.rootNode;
        }
        add(e) {
            this.top.children.push(e);
        }
        openNode(e) {
            const t = a({
                scope: e
            });
            this.add(t), this.stack.push(t);
        }
        closeNode() {
            if (this.stack.length > 1) return this.stack.pop();
        }
        closeAllNodes() {
            for(; this.closeNode(););
        }
        toJSON() {
            return JSON.stringify(this.rootNode, null, 4);
        }
        walk(e) {
            return this.constructor._walk(e, this.rootNode);
        }
        static _walk(e, t) {
            return "string" == typeof t ? e.addText(t) : t.children && (e.openNode(t), t.children.forEach((t)=>this._walk(e, t)), e.closeNode(t)), e;
        }
        static _collapse(e) {
            "string" != typeof e && e.children && (e.children.every((e)=>"string" == typeof e) ? e.children = [
                e.children.join("")
            ] : e.children.forEach((e)=>{
                c._collapse(e);
            }));
        }
    }
    class l extends c {
        constructor(e){
            super(), this.options = e;
        }
        addKeyword(e, t) {
            "" !== e && (this.openNode(t), this.addText(e), this.closeNode());
        }
        addText(e) {
            "" !== e && this.add(e);
        }
        addSublanguage(e, t) {
            const n = e.root;
            n.sublanguage = !0, n.language = t, this.add(n);
        }
        toHTML() {
            return new o(this, this.options).value();
        }
        finalize() {
            return !0;
        }
    }
    function g(e) {
        return e ? "string" == typeof e ? e : e.source : null;
    }
    function d(e) {
        return p("(?=", e, ")");
    }
    function u(e) {
        return p("(?:", e, ")*");
    }
    function h(e) {
        return p("(?:", e, ")?");
    }
    function p(...e) {
        return e.map((e)=>g(e)).join("");
    }
    function f(...e) {
        const t = ((e)=>{
            const t = e[e.length - 1];
            return "object" == typeof t && t.constructor === Object ? (e.splice(e.length - 1, 1), t) : {};
        })(e);
        return "(" + (t.capture ? "" : "?:") + e.map((e)=>g(e)).join("|") + ")";
    }
    function b(e) {
        return RegExp(e.toString() + "|").exec("").length - 1;
    }
    const m = /\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;
    function E(e, { joinWith: t  }) {
        let n = 0;
        return e.map((e)=>{
            n += 1;
            const t = n;
            let i = g(e), r = "";
            for(; i.length > 0;){
                const e1 = m.exec(i);
                if (!e1) {
                    r += i;
                    break;
                }
                r += i.substring(0, e1.index), i = i.substring(e1.index + e1[0].length), "\\" === e1[0][0] && e1[1] ? r += "\\" + (Number(e1[1]) + t) : (r += e1[0], "(" === e1[0] && n++);
            }
            return r;
        }).map((e)=>`(${e})`).join(t);
    }
    const x = "[a-zA-Z]\\w*", w = "[a-zA-Z_]\\w*", y = "\\b\\d+(\\.\\d+)?", _ = "(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)", O = "\\b(0b[01]+)", v = {
        begin: "\\\\[\\s\\S]",
        relevance: 0
    }, N = {
        scope: "string",
        begin: "'",
        end: "'",
        illegal: "\\n",
        contains: [
            v
        ]
    }, k = {
        scope: "string",
        begin: '"',
        end: '"',
        illegal: "\\n",
        contains: [
            v
        ]
    }, M = (e, t, n = {})=>{
        const i = r({
            scope: "comment",
            begin: e,
            end: t,
            contains: []
        }, n);
        i.contains.push({
            scope: "doctag",
            begin: "[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
            end: /(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,
            excludeBegin: !0,
            relevance: 0
        });
        const s = f("I", "a", "is", "so", "us", "to", "at", "if", "in", "it", "on", /[A-Za-z]+['](d|ve|re|ll|t|s|n)/, /[A-Za-z]+[-][a-z]+/, /[A-Za-z][a-z]{2,}/);
        return i.contains.push({
            begin: p(/[ ]+/, "(", s, /[.]?[:]?([.][ ]|[ ])/, "){3}")
        }), i;
    }, S = M("//", "$"), R = M("/\\*", "\\*/"), j = M("#", "$");
    var A = Object.freeze({
        __proto__: null,
        MATCH_NOTHING_RE: /\b\B/,
        IDENT_RE: x,
        UNDERSCORE_IDENT_RE: w,
        NUMBER_RE: y,
        C_NUMBER_RE: _,
        BINARY_NUMBER_RE: O,
        RE_STARTERS_RE: "!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
        SHEBANG: (e = {})=>{
            const t = /^#![ ]*\//;
            return e.binary && (e.begin = p(t, /.*\b/, e.binary, /\b.*/)), r({
                scope: "meta",
                begin: t,
                end: /$/,
                relevance: 0,
                "on:begin": (e, t)=>{
                    0 !== e.index && t.ignoreMatch();
                }
            }, e);
        },
        BACKSLASH_ESCAPE: v,
        APOS_STRING_MODE: N,
        QUOTE_STRING_MODE: k,
        PHRASAL_WORDS_MODE: {
            begin: /\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
        },
        COMMENT: M,
        C_LINE_COMMENT_MODE: S,
        C_BLOCK_COMMENT_MODE: R,
        HASH_COMMENT_MODE: j,
        NUMBER_MODE: {
            scope: "number",
            begin: y,
            relevance: 0
        },
        C_NUMBER_MODE: {
            scope: "number",
            begin: _,
            relevance: 0
        },
        BINARY_NUMBER_MODE: {
            scope: "number",
            begin: O,
            relevance: 0
        },
        REGEXP_MODE: {
            begin: /(?=\/[^/\n]*\/)/,
            contains: [
                {
                    scope: "regexp",
                    begin: /\//,
                    end: /\/[gimuy]*/,
                    illegal: /\n/,
                    contains: [
                        v,
                        {
                            begin: /\[/,
                            end: /\]/,
                            relevance: 0,
                            contains: [
                                v
                            ]
                        }
                    ]
                }
            ]
        },
        TITLE_MODE: {
            scope: "title",
            begin: x,
            relevance: 0
        },
        UNDERSCORE_TITLE_MODE: {
            scope: "title",
            begin: w,
            relevance: 0
        },
        METHOD_GUARD: {
            begin: "\\.\\s*[a-zA-Z_]\\w*",
            relevance: 0
        },
        END_SAME_AS_BEGIN: (e)=>Object.assign(e, {
                "on:begin": (e, t)=>{
                    t.data._beginMatch = e[1];
                },
                "on:end": (e, t)=>{
                    t.data._beginMatch !== e[1] && t.ignoreMatch();
                }
            })
    });
    function I(e, t) {
        "." === e.input[e.index - 1] && t.ignoreMatch();
    }
    function T(e, t) {
        void 0 !== e.className && (e.scope = e.className, delete e.className);
    }
    function L(e, t) {
        t && e.beginKeywords && (e.begin = "\\b(" + e.beginKeywords.split(" ").join("|") + ")(?!\\.)(?=\\b|\\s)", e.__beforeBegin = I, e.keywords = e.keywords || e.beginKeywords, delete e.beginKeywords, void 0 === e.relevance && (e.relevance = 0));
    }
    function B(e, t) {
        Array.isArray(e.illegal) && (e.illegal = f(...e.illegal));
    }
    function D(e, t) {
        if (e.match) {
            if (e.begin || e.end) throw Error("begin & end are not supported with match");
            e.begin = e.match, delete e.match;
        }
    }
    function H(e, t) {
        void 0 === e.relevance && (e.relevance = 1);
    }
    const P = (e, t)=>{
        if (!e.beforeMatch) return;
        if (e.starts) throw Error("beforeMatch cannot be used with starts");
        const n = Object.assign({}, e);
        Object.keys(e).forEach((t)=>{
            delete e[t];
        }), e.keywords = n.keywords, e.begin = p(n.beforeMatch, d(n.begin)), e.starts = {
            relevance: 0,
            contains: [
                Object.assign(n, {
                    endsParent: !0
                })
            ]
        }, e.relevance = 0, delete n.beforeMatch;
    }, C = [
        "of",
        "and",
        "for",
        "in",
        "not",
        "or",
        "if",
        "then",
        "parent",
        "list",
        "value"
    ];
    function $(e, t, n = "keyword") {
        const i = Object.create(null);
        return "string" == typeof e ? r(n, e.split(" ")) : Array.isArray(e) ? r(n, e) : Object.keys(e).forEach((n)=>{
            Object.assign(i, $(e[n], t, n));
        }), i;
        function r(e, n) {
            t && (n = n.map((e)=>e.toLowerCase())), n.forEach((t)=>{
                const n = t.split("|");
                i[n[0]] = [
                    e,
                    U(n[0], n[1])
                ];
            });
        }
    }
    function U(e, t) {
        return t ? Number(t) : ((e)=>C.includes(e.toLowerCase()))(e) ? 0 : 1;
    }
    const z = {}, K = (e)=>{
        console.error(e);
    }, W = (e, ...t)=>{
        console.log("WARN: " + e, ...t);
    }, X = (e, t)=>{
        z[`${e}/${t}`] || (console.log(`Deprecated as of ${e}. ${t}`), z[`${e}/${t}`] = !0);
    }, G = Error();
    function Z(e, t, { key: n  }) {
        let i = 0;
        const r = e[n], s = {}, o = {};
        for(let e1 = 1; e1 <= t.length; e1++)o[e1 + i] = r[e1], s[e1 + i] = !0, i += b(t[e1 - 1]);
        e[n] = o, e[n]._emit = s, e[n]._multi = !0;
    }
    function F(e) {
        ((e)=>{
            e.scope && "object" == typeof e.scope && null !== e.scope && (e.beginScope = e.scope, delete e.scope);
        })(e), "string" == typeof e.beginScope && (e.beginScope = {
            _wrap: e.beginScope
        }), "string" == typeof e.endScope && (e.endScope = {
            _wrap: e.endScope
        }), ((e)=>{
            if (Array.isArray(e.begin)) {
                if (e.skip || e.excludeBegin || e.returnBegin) throw K("skip, excludeBegin, returnBegin not compatible with beginScope: {}"), G;
                if ("object" != typeof e.beginScope || null === e.beginScope) throw K("beginScope must be object"), G;
                Z(e, e.begin, {
                    key: "beginScope"
                }), e.begin = E(e.begin, {
                    joinWith: ""
                });
            }
        })(e), ((e)=>{
            if (Array.isArray(e.end)) {
                if (e.skip || e.excludeEnd || e.returnEnd) throw K("skip, excludeEnd, returnEnd not compatible with endScope: {}"), G;
                if ("object" != typeof e.endScope || null === e.endScope) throw K("endScope must be object"), G;
                Z(e, e.end, {
                    key: "endScope"
                }), e.end = E(e.end, {
                    joinWith: ""
                });
            }
        })(e);
    }
    function V(e) {
        function t(t, n) {
            return RegExp(g(t), "m" + (e.case_insensitive ? "i" : "") + (e.unicodeRegex ? "u" : "") + (n ? "g" : ""));
        }
        class n {
            constructor(){
                this.matchIndexes = {}, this.regexes = [], this.matchAt = 1, this.position = 0;
            }
            addRule(e, t) {
                t.position = this.position++, this.matchIndexes[this.matchAt] = t, this.regexes.push([
                    t,
                    e
                ]), this.matchAt += b(e) + 1;
            }
            compile() {
                0 === this.regexes.length && (this.exec = ()=>null);
                const e = this.regexes.map((e)=>e[1]);
                this.matcherRe = t(E(e, {
                    joinWith: "|"
                }), !0), this.lastIndex = 0;
            }
            exec(e) {
                this.matcherRe.lastIndex = this.lastIndex;
                const t = this.matcherRe.exec(e);
                if (!t) return null;
                const n = t.findIndex((e, t)=>t > 0 && void 0 !== e), i = this.matchIndexes[n];
                return t.splice(0, n), Object.assign(t, i);
            }
        }
        class i {
            constructor(){
                this.rules = [], this.multiRegexes = [], this.count = 0, this.lastIndex = 0, this.regexIndex = 0;
            }
            getMatcher(e) {
                if (this.multiRegexes[e]) return this.multiRegexes[e];
                const t = new n();
                return this.rules.slice(e).forEach(([e, n])=>t.addRule(e, n)), t.compile(), this.multiRegexes[e] = t, t;
            }
            resumingScanAtSamePosition() {
                return 0 !== this.regexIndex;
            }
            considerAll() {
                this.regexIndex = 0;
            }
            addRule(e, t) {
                this.rules.push([
                    e,
                    t
                ]), "begin" === t.type && this.count++;
            }
            exec(e) {
                const t = this.getMatcher(this.regexIndex);
                t.lastIndex = this.lastIndex;
                let n = t.exec(e);
                if (this.resumingScanAtSamePosition()) {
                    if (n && n.index === this.lastIndex) ;
                    else {
                        const t1 = this.getMatcher(0);
                        t1.lastIndex = this.lastIndex + 1, n = t1.exec(e);
                    }
                }
                return n && (this.regexIndex += n.position + 1, this.regexIndex === this.count && this.considerAll()), n;
            }
        }
        if (e.compilerExtensions || (e.compilerExtensions = []), e.contains && e.contains.includes("self")) throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");
        return e.classNameAliases = r(e.classNameAliases || {}), function n(s, o) {
            const a = s;
            if (s.isCompiled) return a;
            [
                T,
                D,
                F,
                P
            ].forEach((e)=>e(s, o)), e.compilerExtensions.forEach((e)=>e(s, o)), s.__beforeBegin = null, [
                L,
                B,
                H
            ].forEach((e)=>e(s, o)), s.isCompiled = !0;
            let c = null;
            return "object" == typeof s.keywords && s.keywords.$pattern && (s.keywords = Object.assign({}, s.keywords), c = s.keywords.$pattern, delete s.keywords.$pattern), c = c || /\w+/, s.keywords && (s.keywords = $(s.keywords, e.case_insensitive)), a.keywordPatternRe = t(c, !0), o && (s.begin || (s.begin = /\B|\b/), a.beginRe = t(a.begin), s.end || s.endsWithParent || (s.end = /\B|\b/), s.end && (a.endRe = t(a.end)), a.terminatorEnd = g(a.end) || "", s.endsWithParent && o.terminatorEnd && (a.terminatorEnd += (s.end ? "|" : "") + o.terminatorEnd)), s.illegal && (a.illegalRe = t(s.illegal)), s.contains || (s.contains = []), s.contains = [].concat(...s.contains.map((e)=>((e)=>(e.variants && !e.cachedVariants && (e.cachedVariants = e.variants.map((t)=>r(e, {
                            variants: null
                        }, t))), e.cachedVariants ? e.cachedVariants : q(e) ? r(e, {
                        starts: e.starts ? r(e.starts) : null
                    }) : Object.isFrozen(e) ? r(e) : e))("self" === e ? s : e))), s.contains.forEach((e)=>{
                n(e, a);
            }), s.starts && n(s.starts, o), a.matcher = ((e)=>{
                const t = new i();
                return e.contains.forEach((e)=>t.addRule(e.begin, {
                        rule: e,
                        type: "begin"
                    })), e.terminatorEnd && t.addRule(e.terminatorEnd, {
                    type: "end"
                }), e.illegal && t.addRule(e.illegal, {
                    type: "illegal"
                }), t;
            })(a), a;
        }(e);
    }
    function q(e) {
        return !!e && (e.endsWithParent || q(e.starts));
    }
    class J extends Error {
        constructor(e, t){
            super(e), this.name = "HTMLInjectionError", this.html = t;
        }
    }
    const Y = i, Q = r, ee = Symbol("nomatch");
    var te = ((t)=>{
        const i = Object.create(null), r = Object.create(null), s = [];
        let o = !0;
        const a = "Could not find the language '{}', did you forget to load/include a language module?", c = {
            disableAutodetect: !0,
            name: "Plain text",
            contains: []
        };
        let g = {
            ignoreUnescapedHTML: !1,
            throwUnescapedHTML: !1,
            noHighlightRe: /^(no-?highlight)$/i,
            languageDetectRe: /\blang(?:uage)?-([\w-]+)\b/i,
            classPrefix: "hljs-",
            cssSelector: "pre code",
            languages: null,
            __emitter: l
        };
        function b(e) {
            return g.noHighlightRe.test(e);
        }
        function m(e, t, n) {
            let i = "", r = "";
            "object" == typeof t ? (i = e, n = t.ignoreIllegals, r = t.language) : (X("10.7.0", "highlight(lang, code, ...args) has been deprecated."), X("10.7.0", "Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"), r = e, i = t), void 0 === n && (n = !0);
            const s = {
                code: i,
                language: r
            };
            k("before:highlight", s);
            const o = s.result ? s.result : E(s.language, s.code, n);
            return o.code = s.code, k("after:highlight", o), o;
        }
        function E(e, t, r, s) {
            const c = Object.create(null);
            function l() {
                if (!N.keywords) return void M.addText(S);
                let e = 0;
                N.keywordPatternRe.lastIndex = 0;
                let t = N.keywordPatternRe.exec(S), n = "";
                for(; t;){
                    n += S.substring(e, t.index);
                    const r = y.case_insensitive ? t[0].toLowerCase() : t[0], s = (i1 = r, N.keywords[i1]);
                    if (s) {
                        const [e1, i] = s;
                        if (M.addText(n), n = "", c[r] = (c[r] || 0) + 1, c[r] <= 7 && (R += i), e1.startsWith("_")) n += t[0];
                        else {
                            const n1 = y.classNameAliases[e1] || e1;
                            M.addKeyword(t[0], n1);
                        }
                    } else n += t[0];
                    e = N.keywordPatternRe.lastIndex, t = N.keywordPatternRe.exec(S);
                }
                var i1;
                n += S.substring(e), M.addText(n);
            }
            function d() {
                null != N.subLanguage ? (()=>{
                    if ("" === S) return;
                    let e = null;
                    if ("string" == typeof N.subLanguage) {
                        if (!i[N.subLanguage]) return void M.addText(S);
                        e = E(N.subLanguage, S, !0, k[N.subLanguage]), k[N.subLanguage] = e._top;
                    } else e = x(S, N.subLanguage.length ? N.subLanguage : null);
                    N.relevance > 0 && (R += e.relevance), M.addSublanguage(e._emitter, e.language);
                })() : l(), S = "";
            }
            function u(e, t) {
                let n = 1;
                const i = t.length - 1;
                for(; n <= i;){
                    if (!e._emit[n]) {
                        n++;
                        continue;
                    }
                    const i1 = y.classNameAliases[e[n]] || e[n], r = t[n];
                    i1 ? M.addKeyword(r, i1) : (S = r, l(), S = ""), n++;
                }
            }
            function h(e, t) {
                return e.scope && "string" == typeof e.scope && M.openNode(y.classNameAliases[e.scope] || e.scope), e.beginScope && (e.beginScope._wrap ? (M.addKeyword(S, y.classNameAliases[e.beginScope._wrap] || e.beginScope._wrap), S = "") : e.beginScope._multi && (u(e.beginScope, t), S = "")), N = Object.create(e, {
                    parent: {
                        value: N
                    }
                }), N;
            }
            function p(e, t, i) {
                let r = ((e, t)=>{
                    const n = e && e.exec(t);
                    return n && 0 === n.index;
                })(e.endRe, i);
                if (r) {
                    if (e["on:end"]) {
                        const i1 = new n(e);
                        e["on:end"](t, i1), i1.isMatchIgnored && (r = !1);
                    }
                    if (r) {
                        for(; e.endsParent && e.parent;)e = e.parent;
                        return e;
                    }
                }
                if (e.endsWithParent) return p(e.parent, t, i);
            }
            function f(e) {
                return 0 === N.matcher.regexIndex ? (S += e[0], 1) : (I = !0, 0);
            }
            function b(e) {
                const n = e[0], i = t.substring(e.index), r = p(N, e, i);
                if (!r) return ee;
                const s = N;
                N.endScope && N.endScope._wrap ? (d(), M.addKeyword(n, N.endScope._wrap)) : N.endScope && N.endScope._multi ? (d(), u(N.endScope, e)) : s.skip ? S += n : (s.returnEnd || s.excludeEnd || (S += n), d(), s.excludeEnd && (S = n));
                do N.scope && M.closeNode(), N.skip || N.subLanguage || (R += N.relevance), N = N.parent;
                while (N !== r.parent);
                return r.starts && h(r.starts, e), s.returnEnd ? 0 : n.length;
            }
            let m = {};
            function w(i, s) {
                const a = s && s[0];
                if (S += i, null == a) return d(), 0;
                if ("begin" === m.type && "end" === s.type && m.index === s.index && "" === a) {
                    if (S += t.slice(s.index, s.index + 1), !o) {
                        const t1 = Error(`0 width match regex (${e})`);
                        throw t1.languageName = e, t1.badRule = m.rule, t1;
                    }
                    return 1;
                }
                if (m = s, "begin" === s.type) return ((e)=>{
                    const t = e[0], i = e.rule, r = new n(i), s = [
                        i.__beforeBegin,
                        i["on:begin"]
                    ];
                    for (const n1 of s)if (n1 && (n1(e, r), r.isMatchIgnored)) return f(t);
                    return i.skip ? S += t : (i.excludeBegin && (S += t), d(), i.returnBegin || i.excludeBegin || (S = t)), h(i, e), i.returnBegin ? 0 : t.length;
                })(s);
                if ("illegal" === s.type && !r) {
                    const e1 = Error('Illegal lexeme "' + a + '" for mode "' + (N.scope || "<unnamed>") + '"');
                    throw e1.mode = N, e1;
                }
                if ("end" === s.type) {
                    const e2 = b(s);
                    if (e2 !== ee) return e2;
                }
                if ("illegal" === s.type && "" === a) return 1;
                if (A > 1e5 && A > 3 * s.index) throw Error("potential infinite loop, way more iterations than matches");
                return S += a, a.length;
            }
            const y = O(e);
            if (!y) throw K(a.replace("{}", e)), Error('Unknown language: "' + e + '"');
            const _ = V(y);
            let v = "", N = s || _;
            const k = {}, M = new g.__emitter(g);
            (()=>{
                const e = [];
                for(let t = N; t !== y; t = t.parent)t.scope && e.unshift(t.scope);
                e.forEach((e)=>M.openNode(e));
            })();
            let S = "", R = 0, j = 0, A = 0, I = !1;
            try {
                for(N.matcher.considerAll();;){
                    A++, I ? I = !1 : N.matcher.considerAll(), N.matcher.lastIndex = j;
                    const e1 = N.matcher.exec(t);
                    if (!e1) break;
                    const n1 = w(t.substring(j, e1.index), e1);
                    j = e1.index + n1;
                }
                return w(t.substring(j)), M.closeAllNodes(), M.finalize(), v = M.toHTML(), {
                    language: e,
                    value: v,
                    relevance: R,
                    illegal: !1,
                    _emitter: M,
                    _top: N
                };
            } catch (n2) {
                if (n2.message && n2.message.includes("Illegal")) return {
                    language: e,
                    value: Y(t),
                    illegal: !0,
                    relevance: 0,
                    _illegalBy: {
                        message: n2.message,
                        index: j,
                        context: t.slice(j - 100, j + 100),
                        mode: n2.mode,
                        resultSoFar: v
                    },
                    _emitter: M
                };
                if (o) return {
                    language: e,
                    value: Y(t),
                    illegal: !1,
                    relevance: 0,
                    errorRaised: n2,
                    _emitter: M,
                    _top: N
                };
                throw n2;
            }
        }
        function x(e, t) {
            t = t || g.languages || Object.keys(i);
            const n = ((e)=>{
                const t = {
                    value: Y(e),
                    illegal: !1,
                    relevance: 0,
                    _top: c,
                    _emitter: new g.__emitter(g)
                };
                return t._emitter.addText(e), t;
            })(e), r = t.filter(O).filter(N).map((t)=>E(t, e, !1));
            r.unshift(n);
            const s = r.sort((e, t)=>{
                if (e.relevance !== t.relevance) return t.relevance - e.relevance;
                if (e.language && t.language) {
                    if (O(e.language).supersetOf === t.language) return 1;
                    if (O(t.language).supersetOf === e.language) return -1;
                }
                return 0;
            }), [o, a] = s, l = o;
            return l.secondBest = a, l;
        }
        function w(e) {
            let t = null;
            const n = ((e)=>{
                let t = e.className + " ";
                t += e.parentNode ? e.parentNode.className : "";
                const n = g.languageDetectRe.exec(t);
                if (n) {
                    const t1 = O(n[1]);
                    return t1 || (W(a.replace("{}", n[1])), W("Falling back to no-highlight mode for this block.", e)), t1 ? n[1] : "no-highlight";
                }
                return t.split(/\s+/).find((e)=>b(e) || O(e));
            })(e);
            if (b(n)) return;
            if (k("before:highlightElement", {
                el: e,
                language: n
            }), e.children.length > 0 && (g.ignoreUnescapedHTML || (console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."), console.warn("https://github.com/highlightjs/highlight.js/wiki/security"), console.warn("The element with unescaped HTML:"), console.warn(e)), g.throwUnescapedHTML)) throw new J("One of your code blocks includes unescaped HTML.", e.innerHTML);
            t = e;
            const i = t.textContent, s = n ? m(i, {
                language: n,
                ignoreIllegals: !0
            }) : x(i);
            e.innerHTML = s.value, ((e, t, n)=>{
                const i = t && r[t] || n;
                e.classList.add("hljs"), e.classList.add("language-" + i);
            })(e, n, s.language), e.result = {
                language: s.language,
                re: s.relevance,
                relevance: s.relevance
            }, s.secondBest && (e.secondBest = {
                language: s.secondBest.language,
                relevance: s.secondBest.relevance
            }), k("after:highlightElement", {
                el: e,
                result: s,
                text: i
            });
        }
        let y = !1;
        function _() {
            "loading" !== document.readyState ? document.querySelectorAll(g.cssSelector).forEach(w) : y = !0;
        }
        function O(e) {
            return e = (e || "").toLowerCase(), i[e] || i[r[e]];
        }
        function v(e, { languageName: t  }) {
            "string" == typeof e && (e = [
                e
            ]), e.forEach((e)=>{
                r[e.toLowerCase()] = t;
            });
        }
        function N(e) {
            const t = O(e);
            return t && !t.disableAutodetect;
        }
        function k(e, t) {
            const n = e;
            s.forEach((e)=>{
                e[n] && e[n](t);
            });
        }
        "undefined" != typeof window && window.addEventListener && window.addEventListener("DOMContentLoaded", ()=>{
            y && _();
        }, !1), Object.assign(t, {
            highlight: m,
            highlightAuto: x,
            highlightAll: _,
            highlightElement: w,
            highlightBlock: (e)=>(X("10.7.0", "highlightBlock will be removed entirely in v12.0"), X("10.7.0", "Please use highlightElement now."), w(e)),
            configure: (e)=>{
                g = Q(g, e);
            },
            initHighlighting: ()=>{
                _(), X("10.6.0", "initHighlighting() deprecated.  Use highlightAll() now.");
            },
            initHighlightingOnLoad: ()=>{
                _(), X("10.6.0", "initHighlightingOnLoad() deprecated.  Use highlightAll() now.");
            },
            registerLanguage: (e, n)=>{
                let r = null;
                try {
                    r = n(t);
                } catch (t1) {
                    if (K("Language definition for '{}' could not be registered.".replace("{}", e)), !o) throw t1;
                    K(t1), r = c;
                }
                r.name || (r.name = e), i[e] = r, r.rawDefinition = n.bind(null, t), r.aliases && v(r.aliases, {
                    languageName: e
                });
            },
            unregisterLanguage: (e)=>{
                delete i[e];
                for (const t of Object.keys(r))r[t] === e && delete r[t];
            },
            listLanguages: ()=>Object.keys(i),
            getLanguage: O,
            registerAliases: v,
            autoDetection: N,
            inherit: Q,
            addPlugin: (e)=>{
                ((e)=>{
                    e["before:highlightBlock"] && !e["before:highlightElement"] && (e["before:highlightElement"] = (t)=>{
                        e["before:highlightBlock"](Object.assign({
                            block: t.el
                        }, t));
                    }), e["after:highlightBlock"] && !e["after:highlightElement"] && (e["after:highlightElement"] = (t)=>{
                        e["after:highlightBlock"](Object.assign({
                            block: t.el
                        }, t));
                    });
                })(e), s.push(e);
            }
        }), t.debugMode = ()=>{
            o = !1;
        }, t.safeMode = ()=>{
            o = !0;
        }, t.versionString = "11.7.0", t.regex = {
            concat: p,
            lookahead: d,
            either: f,
            optional: h,
            anyNumberOfTimes: u
        };
        for(const t1 in A)"object" == typeof A[t1] && e.exports(A[t1]);
        return Object.assign(t, A), t;
    })({});
    return te;
}();
"object" == typeof exports && "undefined" != typeof module && (module.exports = hljs); /*! `xml` grammar compiled for Highlight.js 11.7.0 */ 
(()=>{
    var e = (()=>{
        "use strict";
        return (e)=>{
            const a = e.regex, n = a.concat(/[\p{L}_]/u, a.optional(/[\p{L}0-9_.-]*:/u), /[\p{L}0-9_.-]*/u), s = {
                className: "symbol",
                begin: /&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/
            }, t = {
                begin: /\s/,
                contains: [
                    {
                        className: "keyword",
                        begin: /#?[a-z_][a-z1-9_-]+/,
                        illegal: /\n/
                    }
                ]
            }, i = e.inherit(t, {
                begin: /\(/,
                end: /\)/
            }), c = e.inherit(e.APOS_STRING_MODE, {
                className: "string"
            }), l = e.inherit(e.QUOTE_STRING_MODE, {
                className: "string"
            }), r = {
                endsWithParent: !0,
                illegal: /</,
                relevance: 0,
                contains: [
                    {
                        className: "attr",
                        begin: /[\p{L}0-9._:-]+/u,
                        relevance: 0
                    },
                    {
                        begin: /=\s*/,
                        relevance: 0,
                        contains: [
                            {
                                className: "string",
                                endsParent: !0,
                                variants: [
                                    {
                                        begin: /"/,
                                        end: /"/,
                                        contains: [
                                            s
                                        ]
                                    },
                                    {
                                        begin: /'/,
                                        end: /'/,
                                        contains: [
                                            s
                                        ]
                                    },
                                    {
                                        begin: /[^\s"'=<>`]+/
                                    }
                                ]
                            }
                        ]
                    }
                ]
            };
            return {
                name: "HTML, XML",
                aliases: [
                    "html",
                    "xhtml",
                    "rss",
                    "atom",
                    "xjb",
                    "xsd",
                    "xsl",
                    "plist",
                    "wsf",
                    "svg"
                ],
                case_insensitive: !0,
                unicodeRegex: !0,
                contains: [
                    {
                        className: "meta",
                        begin: /<![a-z]/,
                        end: />/,
                        relevance: 10,
                        contains: [
                            t,
                            l,
                            c,
                            i,
                            {
                                begin: /\[/,
                                end: /\]/,
                                contains: [
                                    {
                                        className: "meta",
                                        begin: /<![a-z]/,
                                        end: />/,
                                        contains: [
                                            t,
                                            i,
                                            l,
                                            c
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    e.COMMENT(/<!--/, /-->/, {
                        relevance: 10
                    }),
                    {
                        begin: /<!\[CDATA\[/,
                        end: /\]\]>/,
                        relevance: 10
                    },
                    s,
                    {
                        className: "meta",
                        end: /\?>/,
                        variants: [
                            {
                                begin: /<\?xml/,
                                relevance: 10,
                                contains: [
                                    l
                                ]
                            },
                            {
                                begin: /<\?[a-z][a-z0-9]+/
                            }
                        ]
                    },
                    {
                        className: "tag",
                        begin: /<style(?=\s|>)/,
                        end: />/,
                        keywords: {
                            name: "style"
                        },
                        contains: [
                            r
                        ],
                        starts: {
                            end: /<\/style>/,
                            returnEnd: !0,
                            subLanguage: [
                                "css",
                                "xml"
                            ]
                        }
                    },
                    {
                        className: "tag",
                        begin: /<script(?=\s|>)/,
                        end: />/,
                        keywords: {
                            name: "script"
                        },
                        contains: [
                            r
                        ],
                        starts: {
                            end: /<\/script>/,
                            returnEnd: !0,
                            subLanguage: [
                                "javascript",
                                "handlebars",
                                "xml"
                            ]
                        }
                    },
                    {
                        className: "tag",
                        begin: /<>|<\/>/
                    },
                    {
                        className: "tag",
                        begin: a.concat(/</, a.lookahead(a.concat(n, a.either(/\/>/, />/, /\s/)))),
                        end: /\/?>/,
                        contains: [
                            {
                                className: "name",
                                begin: n,
                                relevance: 0,
                                starts: r
                            }
                        ]
                    },
                    {
                        className: "tag",
                        begin: a.concat(/<\//, a.lookahead(a.concat(n, />/))),
                        contains: [
                            {
                                className: "name",
                                begin: n,
                                relevance: 0
                            },
                            {
                                begin: />/,
                                relevance: 0,
                                endsParent: !0
                            }
                        ]
                    }
                ]
            };
        };
    })();
    hljs.registerLanguage("xml", e);
})(); /*! `scss` grammar compiled for Highlight.js 11.7.0 */ 
(()=>{
    var e = (()=>{
        "use strict";
        const e = [
            "a",
            "abbr",
            "address",
            "article",
            "aside",
            "audio",
            "b",
            "blockquote",
            "body",
            "button",
            "canvas",
            "caption",
            "cite",
            "code",
            "dd",
            "del",
            "details",
            "dfn",
            "div",
            "dl",
            "dt",
            "em",
            "fieldset",
            "figcaption",
            "figure",
            "footer",
            "form",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "header",
            "hgroup",
            "html",
            "i",
            "iframe",
            "img",
            "input",
            "ins",
            "kbd",
            "label",
            "legend",
            "li",
            "main",
            "mark",
            "menu",
            "nav",
            "object",
            "ol",
            "p",
            "q",
            "quote",
            "samp",
            "section",
            "span",
            "strong",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "tr",
            "ul",
            "var",
            "video"
        ], r = [
            "any-hover",
            "any-pointer",
            "aspect-ratio",
            "color",
            "color-gamut",
            "color-index",
            "device-aspect-ratio",
            "device-height",
            "device-width",
            "display-mode",
            "forced-colors",
            "grid",
            "height",
            "hover",
            "inverted-colors",
            "monochrome",
            "orientation",
            "overflow-block",
            "overflow-inline",
            "pointer",
            "prefers-color-scheme",
            "prefers-contrast",
            "prefers-reduced-motion",
            "prefers-reduced-transparency",
            "resolution",
            "scan",
            "scripting",
            "update",
            "width",
            "min-width",
            "max-width",
            "min-height",
            "max-height"
        ], i = [
            "active",
            "any-link",
            "blank",
            "checked",
            "current",
            "default",
            "defined",
            "dir",
            "disabled",
            "drop",
            "empty",
            "enabled",
            "first",
            "first-child",
            "first-of-type",
            "fullscreen",
            "future",
            "focus",
            "focus-visible",
            "focus-within",
            "has",
            "host",
            "host-context",
            "hover",
            "indeterminate",
            "in-range",
            "invalid",
            "is",
            "lang",
            "last-child",
            "last-of-type",
            "left",
            "link",
            "local-link",
            "not",
            "nth-child",
            "nth-col",
            "nth-last-child",
            "nth-last-col",
            "nth-last-of-type",
            "nth-of-type",
            "only-child",
            "only-of-type",
            "optional",
            "out-of-range",
            "past",
            "placeholder-shown",
            "read-only",
            "read-write",
            "required",
            "right",
            "root",
            "scope",
            "target",
            "target-within",
            "user-invalid",
            "valid",
            "visited",
            "where"
        ], t = [
            "after",
            "backdrop",
            "before",
            "cue",
            "cue-region",
            "first-letter",
            "first-line",
            "grammar-error",
            "marker",
            "part",
            "placeholder",
            "selection",
            "slotted",
            "spelling-error"
        ], o = [
            "align-content",
            "align-items",
            "align-self",
            "all",
            "animation",
            "animation-delay",
            "animation-direction",
            "animation-duration",
            "animation-fill-mode",
            "animation-iteration-count",
            "animation-name",
            "animation-play-state",
            "animation-timing-function",
            "backface-visibility",
            "background",
            "background-attachment",
            "background-blend-mode",
            "background-clip",
            "background-color",
            "background-image",
            "background-origin",
            "background-position",
            "background-repeat",
            "background-size",
            "block-size",
            "border",
            "border-block",
            "border-block-color",
            "border-block-end",
            "border-block-end-color",
            "border-block-end-style",
            "border-block-end-width",
            "border-block-start",
            "border-block-start-color",
            "border-block-start-style",
            "border-block-start-width",
            "border-block-style",
            "border-block-width",
            "border-bottom",
            "border-bottom-color",
            "border-bottom-left-radius",
            "border-bottom-right-radius",
            "border-bottom-style",
            "border-bottom-width",
            "border-collapse",
            "border-color",
            "border-image",
            "border-image-outset",
            "border-image-repeat",
            "border-image-slice",
            "border-image-source",
            "border-image-width",
            "border-inline",
            "border-inline-color",
            "border-inline-end",
            "border-inline-end-color",
            "border-inline-end-style",
            "border-inline-end-width",
            "border-inline-start",
            "border-inline-start-color",
            "border-inline-start-style",
            "border-inline-start-width",
            "border-inline-style",
            "border-inline-width",
            "border-left",
            "border-left-color",
            "border-left-style",
            "border-left-width",
            "border-radius",
            "border-right",
            "border-right-color",
            "border-right-style",
            "border-right-width",
            "border-spacing",
            "border-style",
            "border-top",
            "border-top-color",
            "border-top-left-radius",
            "border-top-right-radius",
            "border-top-style",
            "border-top-width",
            "border-width",
            "bottom",
            "box-decoration-break",
            "box-shadow",
            "box-sizing",
            "break-after",
            "break-before",
            "break-inside",
            "caption-side",
            "caret-color",
            "clear",
            "clip",
            "clip-path",
            "clip-rule",
            "color",
            "column-count",
            "column-fill",
            "column-gap",
            "column-rule",
            "column-rule-color",
            "column-rule-style",
            "column-rule-width",
            "column-span",
            "column-width",
            "columns",
            "contain",
            "content",
            "content-visibility",
            "counter-increment",
            "counter-reset",
            "cue",
            "cue-after",
            "cue-before",
            "cursor",
            "direction",
            "display",
            "empty-cells",
            "filter",
            "flex",
            "flex-basis",
            "flex-direction",
            "flex-flow",
            "flex-grow",
            "flex-shrink",
            "flex-wrap",
            "float",
            "flow",
            "font",
            "font-display",
            "font-family",
            "font-feature-settings",
            "font-kerning",
            "font-language-override",
            "font-size",
            "font-size-adjust",
            "font-smoothing",
            "font-stretch",
            "font-style",
            "font-synthesis",
            "font-variant",
            "font-variant-caps",
            "font-variant-east-asian",
            "font-variant-ligatures",
            "font-variant-numeric",
            "font-variant-position",
            "font-variation-settings",
            "font-weight",
            "gap",
            "glyph-orientation-vertical",
            "grid",
            "grid-area",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-auto-rows",
            "grid-column",
            "grid-column-end",
            "grid-column-start",
            "grid-gap",
            "grid-row",
            "grid-row-end",
            "grid-row-start",
            "grid-template",
            "grid-template-areas",
            "grid-template-columns",
            "grid-template-rows",
            "hanging-punctuation",
            "height",
            "hyphens",
            "icon",
            "image-orientation",
            "image-rendering",
            "image-resolution",
            "ime-mode",
            "inline-size",
            "isolation",
            "justify-content",
            "left",
            "letter-spacing",
            "line-break",
            "line-height",
            "list-style",
            "list-style-image",
            "list-style-position",
            "list-style-type",
            "margin",
            "margin-block",
            "margin-block-end",
            "margin-block-start",
            "margin-bottom",
            "margin-inline",
            "margin-inline-end",
            "margin-inline-start",
            "margin-left",
            "margin-right",
            "margin-top",
            "marks",
            "mask",
            "mask-border",
            "mask-border-mode",
            "mask-border-outset",
            "mask-border-repeat",
            "mask-border-slice",
            "mask-border-source",
            "mask-border-width",
            "mask-clip",
            "mask-composite",
            "mask-image",
            "mask-mode",
            "mask-origin",
            "mask-position",
            "mask-repeat",
            "mask-size",
            "mask-type",
            "max-block-size",
            "max-height",
            "max-inline-size",
            "max-width",
            "min-block-size",
            "min-height",
            "min-inline-size",
            "min-width",
            "mix-blend-mode",
            "nav-down",
            "nav-index",
            "nav-left",
            "nav-right",
            "nav-up",
            "none",
            "normal",
            "object-fit",
            "object-position",
            "opacity",
            "order",
            "orphans",
            "outline",
            "outline-color",
            "outline-offset",
            "outline-style",
            "outline-width",
            "overflow",
            "overflow-wrap",
            "overflow-x",
            "overflow-y",
            "padding",
            "padding-block",
            "padding-block-end",
            "padding-block-start",
            "padding-bottom",
            "padding-inline",
            "padding-inline-end",
            "padding-inline-start",
            "padding-left",
            "padding-right",
            "padding-top",
            "page-break-after",
            "page-break-before",
            "page-break-inside",
            "pause",
            "pause-after",
            "pause-before",
            "perspective",
            "perspective-origin",
            "pointer-events",
            "position",
            "quotes",
            "resize",
            "rest",
            "rest-after",
            "rest-before",
            "right",
            "row-gap",
            "scroll-margin",
            "scroll-margin-block",
            "scroll-margin-block-end",
            "scroll-margin-block-start",
            "scroll-margin-bottom",
            "scroll-margin-inline",
            "scroll-margin-inline-end",
            "scroll-margin-inline-start",
            "scroll-margin-left",
            "scroll-margin-right",
            "scroll-margin-top",
            "scroll-padding",
            "scroll-padding-block",
            "scroll-padding-block-end",
            "scroll-padding-block-start",
            "scroll-padding-bottom",
            "scroll-padding-inline",
            "scroll-padding-inline-end",
            "scroll-padding-inline-start",
            "scroll-padding-left",
            "scroll-padding-right",
            "scroll-padding-top",
            "scroll-snap-align",
            "scroll-snap-stop",
            "scroll-snap-type",
            "scrollbar-color",
            "scrollbar-gutter",
            "scrollbar-width",
            "shape-image-threshold",
            "shape-margin",
            "shape-outside",
            "speak",
            "speak-as",
            "src",
            "tab-size",
            "table-layout",
            "text-align",
            "text-align-all",
            "text-align-last",
            "text-combine-upright",
            "text-decoration",
            "text-decoration-color",
            "text-decoration-line",
            "text-decoration-style",
            "text-emphasis",
            "text-emphasis-color",
            "text-emphasis-position",
            "text-emphasis-style",
            "text-indent",
            "text-justify",
            "text-orientation",
            "text-overflow",
            "text-rendering",
            "text-shadow",
            "text-transform",
            "text-underline-position",
            "top",
            "transform",
            "transform-box",
            "transform-origin",
            "transform-style",
            "transition",
            "transition-delay",
            "transition-duration",
            "transition-property",
            "transition-timing-function",
            "unicode-bidi",
            "vertical-align",
            "visibility",
            "voice-balance",
            "voice-duration",
            "voice-family",
            "voice-pitch",
            "voice-range",
            "voice-rate",
            "voice-stress",
            "voice-volume",
            "white-space",
            "widows",
            "width",
            "will-change",
            "word-break",
            "word-spacing",
            "word-wrap",
            "writing-mode",
            "z-index"
        ].reverse();
        return (n)=>{
            const a = ((e)=>({
                    IMPORTANT: {
                        scope: "meta",
                        begin: "!important"
                    },
                    BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
                    HEXCOLOR: {
                        scope: "number",
                        begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
                    },
                    FUNCTION_DISPATCH: {
                        className: "built_in",
                        begin: /[\w-]+(?=\()/
                    },
                    ATTRIBUTE_SELECTOR_MODE: {
                        scope: "selector-attr",
                        begin: /\[/,
                        end: /\]/,
                        illegal: "$",
                        contains: [
                            e.APOS_STRING_MODE,
                            e.QUOTE_STRING_MODE
                        ]
                    },
                    CSS_NUMBER_MODE: {
                        scope: "number",
                        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                        relevance: 0
                    },
                    CSS_VARIABLE: {
                        className: "attr",
                        begin: /--[A-Za-z][A-Za-z0-9_-]*/
                    }
                }))(n), l = t, s = i, d = "@[a-z-]+", c = {
                className: "variable",
                begin: "(\\$[a-zA-Z-][a-zA-Z0-9_-]*)\\b",
                relevance: 0
            };
            return {
                name: "SCSS",
                case_insensitive: !0,
                illegal: "[=/|']",
                contains: [
                    n.C_LINE_COMMENT_MODE,
                    n.C_BLOCK_COMMENT_MODE,
                    a.CSS_NUMBER_MODE,
                    {
                        className: "selector-id",
                        begin: "#[A-Za-z0-9_-]+",
                        relevance: 0
                    },
                    {
                        className: "selector-class",
                        begin: "\\.[A-Za-z0-9_-]+",
                        relevance: 0
                    },
                    a.ATTRIBUTE_SELECTOR_MODE,
                    {
                        className: "selector-tag",
                        begin: "\\b(" + e.join("|") + ")\\b",
                        relevance: 0
                    },
                    {
                        className: "selector-pseudo",
                        begin: ":(" + s.join("|") + ")"
                    },
                    {
                        className: "selector-pseudo",
                        begin: ":(:)?(" + l.join("|") + ")"
                    },
                    c,
                    {
                        begin: /\(/,
                        end: /\)/,
                        contains: [
                            a.CSS_NUMBER_MODE
                        ]
                    },
                    a.CSS_VARIABLE,
                    {
                        className: "attribute",
                        begin: "\\b(" + o.join("|") + ")\\b"
                    },
                    {
                        begin: "\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b"
                    },
                    {
                        begin: /:/,
                        end: /[;}{]/,
                        relevance: 0,
                        contains: [
                            a.BLOCK_COMMENT,
                            c,
                            a.HEXCOLOR,
                            a.CSS_NUMBER_MODE,
                            n.QUOTE_STRING_MODE,
                            n.APOS_STRING_MODE,
                            a.IMPORTANT,
                            a.FUNCTION_DISPATCH
                        ]
                    },
                    {
                        begin: "@(page|font-face)",
                        keywords: {
                            $pattern: d,
                            keyword: "@page @font-face"
                        }
                    },
                    {
                        begin: "@",
                        end: "[{;]",
                        returnBegin: !0,
                        keywords: {
                            $pattern: /[a-z-]+/,
                            keyword: "and or not only",
                            attribute: r.join(" ")
                        },
                        contains: [
                            {
                                begin: d,
                                className: "keyword"
                            },
                            {
                                begin: /[a-z-]+(?=:)/,
                                className: "attribute"
                            },
                            c,
                            n.QUOTE_STRING_MODE,
                            n.APOS_STRING_MODE,
                            a.HEXCOLOR,
                            a.CSS_NUMBER_MODE
                        ]
                    },
                    a.FUNCTION_DISPATCH
                ]
            };
        };
    })();
    hljs.registerLanguage("scss", e);
})(); /*! `css` grammar compiled for Highlight.js 11.7.0 */ 
(()=>{
    var e = (()=>{
        "use strict";
        const e = [
            "a",
            "abbr",
            "address",
            "article",
            "aside",
            "audio",
            "b",
            "blockquote",
            "body",
            "button",
            "canvas",
            "caption",
            "cite",
            "code",
            "dd",
            "del",
            "details",
            "dfn",
            "div",
            "dl",
            "dt",
            "em",
            "fieldset",
            "figcaption",
            "figure",
            "footer",
            "form",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "header",
            "hgroup",
            "html",
            "i",
            "iframe",
            "img",
            "input",
            "ins",
            "kbd",
            "label",
            "legend",
            "li",
            "main",
            "mark",
            "menu",
            "nav",
            "object",
            "ol",
            "p",
            "q",
            "quote",
            "samp",
            "section",
            "span",
            "strong",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "textarea",
            "tfoot",
            "th",
            "thead",
            "time",
            "tr",
            "ul",
            "var",
            "video"
        ], i = [
            "any-hover",
            "any-pointer",
            "aspect-ratio",
            "color",
            "color-gamut",
            "color-index",
            "device-aspect-ratio",
            "device-height",
            "device-width",
            "display-mode",
            "forced-colors",
            "grid",
            "height",
            "hover",
            "inverted-colors",
            "monochrome",
            "orientation",
            "overflow-block",
            "overflow-inline",
            "pointer",
            "prefers-color-scheme",
            "prefers-contrast",
            "prefers-reduced-motion",
            "prefers-reduced-transparency",
            "resolution",
            "scan",
            "scripting",
            "update",
            "width",
            "min-width",
            "max-width",
            "min-height",
            "max-height"
        ], r = [
            "active",
            "any-link",
            "blank",
            "checked",
            "current",
            "default",
            "defined",
            "dir",
            "disabled",
            "drop",
            "empty",
            "enabled",
            "first",
            "first-child",
            "first-of-type",
            "fullscreen",
            "future",
            "focus",
            "focus-visible",
            "focus-within",
            "has",
            "host",
            "host-context",
            "hover",
            "indeterminate",
            "in-range",
            "invalid",
            "is",
            "lang",
            "last-child",
            "last-of-type",
            "left",
            "link",
            "local-link",
            "not",
            "nth-child",
            "nth-col",
            "nth-last-child",
            "nth-last-col",
            "nth-last-of-type",
            "nth-of-type",
            "only-child",
            "only-of-type",
            "optional",
            "out-of-range",
            "past",
            "placeholder-shown",
            "read-only",
            "read-write",
            "required",
            "right",
            "root",
            "scope",
            "target",
            "target-within",
            "user-invalid",
            "valid",
            "visited",
            "where"
        ], t = [
            "after",
            "backdrop",
            "before",
            "cue",
            "cue-region",
            "first-letter",
            "first-line",
            "grammar-error",
            "marker",
            "part",
            "placeholder",
            "selection",
            "slotted",
            "spelling-error"
        ], o = [
            "align-content",
            "align-items",
            "align-self",
            "all",
            "animation",
            "animation-delay",
            "animation-direction",
            "animation-duration",
            "animation-fill-mode",
            "animation-iteration-count",
            "animation-name",
            "animation-play-state",
            "animation-timing-function",
            "backface-visibility",
            "background",
            "background-attachment",
            "background-blend-mode",
            "background-clip",
            "background-color",
            "background-image",
            "background-origin",
            "background-position",
            "background-repeat",
            "background-size",
            "block-size",
            "border",
            "border-block",
            "border-block-color",
            "border-block-end",
            "border-block-end-color",
            "border-block-end-style",
            "border-block-end-width",
            "border-block-start",
            "border-block-start-color",
            "border-block-start-style",
            "border-block-start-width",
            "border-block-style",
            "border-block-width",
            "border-bottom",
            "border-bottom-color",
            "border-bottom-left-radius",
            "border-bottom-right-radius",
            "border-bottom-style",
            "border-bottom-width",
            "border-collapse",
            "border-color",
            "border-image",
            "border-image-outset",
            "border-image-repeat",
            "border-image-slice",
            "border-image-source",
            "border-image-width",
            "border-inline",
            "border-inline-color",
            "border-inline-end",
            "border-inline-end-color",
            "border-inline-end-style",
            "border-inline-end-width",
            "border-inline-start",
            "border-inline-start-color",
            "border-inline-start-style",
            "border-inline-start-width",
            "border-inline-style",
            "border-inline-width",
            "border-left",
            "border-left-color",
            "border-left-style",
            "border-left-width",
            "border-radius",
            "border-right",
            "border-right-color",
            "border-right-style",
            "border-right-width",
            "border-spacing",
            "border-style",
            "border-top",
            "border-top-color",
            "border-top-left-radius",
            "border-top-right-radius",
            "border-top-style",
            "border-top-width",
            "border-width",
            "bottom",
            "box-decoration-break",
            "box-shadow",
            "box-sizing",
            "break-after",
            "break-before",
            "break-inside",
            "caption-side",
            "caret-color",
            "clear",
            "clip",
            "clip-path",
            "clip-rule",
            "color",
            "column-count",
            "column-fill",
            "column-gap",
            "column-rule",
            "column-rule-color",
            "column-rule-style",
            "column-rule-width",
            "column-span",
            "column-width",
            "columns",
            "contain",
            "content",
            "content-visibility",
            "counter-increment",
            "counter-reset",
            "cue",
            "cue-after",
            "cue-before",
            "cursor",
            "direction",
            "display",
            "empty-cells",
            "filter",
            "flex",
            "flex-basis",
            "flex-direction",
            "flex-flow",
            "flex-grow",
            "flex-shrink",
            "flex-wrap",
            "float",
            "flow",
            "font",
            "font-display",
            "font-family",
            "font-feature-settings",
            "font-kerning",
            "font-language-override",
            "font-size",
            "font-size-adjust",
            "font-smoothing",
            "font-stretch",
            "font-style",
            "font-synthesis",
            "font-variant",
            "font-variant-caps",
            "font-variant-east-asian",
            "font-variant-ligatures",
            "font-variant-numeric",
            "font-variant-position",
            "font-variation-settings",
            "font-weight",
            "gap",
            "glyph-orientation-vertical",
            "grid",
            "grid-area",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-auto-rows",
            "grid-column",
            "grid-column-end",
            "grid-column-start",
            "grid-gap",
            "grid-row",
            "grid-row-end",
            "grid-row-start",
            "grid-template",
            "grid-template-areas",
            "grid-template-columns",
            "grid-template-rows",
            "hanging-punctuation",
            "height",
            "hyphens",
            "icon",
            "image-orientation",
            "image-rendering",
            "image-resolution",
            "ime-mode",
            "inline-size",
            "isolation",
            "justify-content",
            "left",
            "letter-spacing",
            "line-break",
            "line-height",
            "list-style",
            "list-style-image",
            "list-style-position",
            "list-style-type",
            "margin",
            "margin-block",
            "margin-block-end",
            "margin-block-start",
            "margin-bottom",
            "margin-inline",
            "margin-inline-end",
            "margin-inline-start",
            "margin-left",
            "margin-right",
            "margin-top",
            "marks",
            "mask",
            "mask-border",
            "mask-border-mode",
            "mask-border-outset",
            "mask-border-repeat",
            "mask-border-slice",
            "mask-border-source",
            "mask-border-width",
            "mask-clip",
            "mask-composite",
            "mask-image",
            "mask-mode",
            "mask-origin",
            "mask-position",
            "mask-repeat",
            "mask-size",
            "mask-type",
            "max-block-size",
            "max-height",
            "max-inline-size",
            "max-width",
            "min-block-size",
            "min-height",
            "min-inline-size",
            "min-width",
            "mix-blend-mode",
            "nav-down",
            "nav-index",
            "nav-left",
            "nav-right",
            "nav-up",
            "none",
            "normal",
            "object-fit",
            "object-position",
            "opacity",
            "order",
            "orphans",
            "outline",
            "outline-color",
            "outline-offset",
            "outline-style",
            "outline-width",
            "overflow",
            "overflow-wrap",
            "overflow-x",
            "overflow-y",
            "padding",
            "padding-block",
            "padding-block-end",
            "padding-block-start",
            "padding-bottom",
            "padding-inline",
            "padding-inline-end",
            "padding-inline-start",
            "padding-left",
            "padding-right",
            "padding-top",
            "page-break-after",
            "page-break-before",
            "page-break-inside",
            "pause",
            "pause-after",
            "pause-before",
            "perspective",
            "perspective-origin",
            "pointer-events",
            "position",
            "quotes",
            "resize",
            "rest",
            "rest-after",
            "rest-before",
            "right",
            "row-gap",
            "scroll-margin",
            "scroll-margin-block",
            "scroll-margin-block-end",
            "scroll-margin-block-start",
            "scroll-margin-bottom",
            "scroll-margin-inline",
            "scroll-margin-inline-end",
            "scroll-margin-inline-start",
            "scroll-margin-left",
            "scroll-margin-right",
            "scroll-margin-top",
            "scroll-padding",
            "scroll-padding-block",
            "scroll-padding-block-end",
            "scroll-padding-block-start",
            "scroll-padding-bottom",
            "scroll-padding-inline",
            "scroll-padding-inline-end",
            "scroll-padding-inline-start",
            "scroll-padding-left",
            "scroll-padding-right",
            "scroll-padding-top",
            "scroll-snap-align",
            "scroll-snap-stop",
            "scroll-snap-type",
            "scrollbar-color",
            "scrollbar-gutter",
            "scrollbar-width",
            "shape-image-threshold",
            "shape-margin",
            "shape-outside",
            "speak",
            "speak-as",
            "src",
            "tab-size",
            "table-layout",
            "text-align",
            "text-align-all",
            "text-align-last",
            "text-combine-upright",
            "text-decoration",
            "text-decoration-color",
            "text-decoration-line",
            "text-decoration-style",
            "text-emphasis",
            "text-emphasis-color",
            "text-emphasis-position",
            "text-emphasis-style",
            "text-indent",
            "text-justify",
            "text-orientation",
            "text-overflow",
            "text-rendering",
            "text-shadow",
            "text-transform",
            "text-underline-position",
            "top",
            "transform",
            "transform-box",
            "transform-origin",
            "transform-style",
            "transition",
            "transition-delay",
            "transition-duration",
            "transition-property",
            "transition-timing-function",
            "unicode-bidi",
            "vertical-align",
            "visibility",
            "voice-balance",
            "voice-duration",
            "voice-family",
            "voice-pitch",
            "voice-range",
            "voice-rate",
            "voice-stress",
            "voice-volume",
            "white-space",
            "widows",
            "width",
            "will-change",
            "word-break",
            "word-spacing",
            "word-wrap",
            "writing-mode",
            "z-index"
        ].reverse();
        return (n)=>{
            const a = n.regex, l = ((e)=>({
                    IMPORTANT: {
                        scope: "meta",
                        begin: "!important"
                    },
                    BLOCK_COMMENT: e.C_BLOCK_COMMENT_MODE,
                    HEXCOLOR: {
                        scope: "number",
                        begin: /#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/
                    },
                    FUNCTION_DISPATCH: {
                        className: "built_in",
                        begin: /[\w-]+(?=\()/
                    },
                    ATTRIBUTE_SELECTOR_MODE: {
                        scope: "selector-attr",
                        begin: /\[/,
                        end: /\]/,
                        illegal: "$",
                        contains: [
                            e.APOS_STRING_MODE,
                            e.QUOTE_STRING_MODE
                        ]
                    },
                    CSS_NUMBER_MODE: {
                        scope: "number",
                        begin: e.NUMBER_RE + "(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",
                        relevance: 0
                    },
                    CSS_VARIABLE: {
                        className: "attr",
                        begin: /--[A-Za-z][A-Za-z0-9_-]*/
                    }
                }))(n), s = [
                n.APOS_STRING_MODE,
                n.QUOTE_STRING_MODE
            ];
            return {
                name: "CSS",
                case_insensitive: !0,
                illegal: /[=|'\$]/,
                keywords: {
                    keyframePosition: "from to"
                },
                classNameAliases: {
                    keyframePosition: "selector-tag"
                },
                contains: [
                    l.BLOCK_COMMENT,
                    {
                        begin: /-(webkit|moz|ms|o)-(?=[a-z])/
                    },
                    l.CSS_NUMBER_MODE,
                    {
                        className: "selector-id",
                        begin: /#[A-Za-z0-9_-]+/,
                        relevance: 0
                    },
                    {
                        className: "selector-class",
                        begin: "\\.[a-zA-Z-][a-zA-Z0-9_-]*",
                        relevance: 0
                    },
                    l.ATTRIBUTE_SELECTOR_MODE,
                    {
                        className: "selector-pseudo",
                        variants: [
                            {
                                begin: ":(" + r.join("|") + ")"
                            },
                            {
                                begin: ":(:)?(" + t.join("|") + ")"
                            }
                        ]
                    },
                    l.CSS_VARIABLE,
                    {
                        className: "attribute",
                        begin: "\\b(" + o.join("|") + ")\\b"
                    },
                    {
                        begin: /:/,
                        end: /[;}{]/,
                        contains: [
                            l.BLOCK_COMMENT,
                            l.HEXCOLOR,
                            l.IMPORTANT,
                            l.CSS_NUMBER_MODE,
                            ...s,
                            {
                                begin: /(url|data-uri)\(/,
                                end: /\)/,
                                relevance: 0,
                                keywords: {
                                    built_in: "url data-uri"
                                },
                                contains: [
                                    ...s,
                                    {
                                        className: "string",
                                        begin: /[^)]/,
                                        endsWithParent: !0,
                                        excludeEnd: !0
                                    }
                                ]
                            },
                            l.FUNCTION_DISPATCH
                        ]
                    },
                    {
                        begin: a.lookahead(/@/),
                        end: "[{;]",
                        relevance: 0,
                        illegal: /:/,
                        contains: [
                            {
                                className: "keyword",
                                begin: /@-?\w[\w]*(-\w+)*/
                            },
                            {
                                begin: /\s/,
                                endsWithParent: !0,
                                excludeEnd: !0,
                                relevance: 0,
                                keywords: {
                                    $pattern: /[a-z-]+/,
                                    keyword: "and or not only",
                                    attribute: i.join(" ")
                                },
                                contains: [
                                    {
                                        begin: /[a-z-]+(?=:)/,
                                        className: "attribute"
                                    },
                                    ...s,
                                    l.CSS_NUMBER_MODE
                                ]
                            }
                        ]
                    },
                    {
                        className: "selector-tag",
                        begin: "\\b(" + e.join("|") + ")\\b"
                    }
                ]
            };
        };
    })();
    hljs.registerLanguage("css", e);
})(); /*! `bash` grammar compiled for Highlight.js 11.7.0 */ 
(()=>{
    var e = (()=>{
        "use strict";
        return (e)=>{
            const s = e.regex, t = {}, n = {
                begin: /\$\{/,
                end: /\}/,
                contains: [
                    "self",
                    {
                        begin: /:-/,
                        contains: [
                            t
                        ]
                    }
                ]
            };
            Object.assign(t, {
                className: "variable",
                variants: [
                    {
                        begin: s.concat(/\$[\w\d#@][\w\d_]*/, "(?![\\w\\d])(?![$])")
                    },
                    n
                ]
            });
            const a = {
                className: "subst",
                begin: /\$\(/,
                end: /\)/,
                contains: [
                    e.BACKSLASH_ESCAPE
                ]
            }, i = {
                begin: /<<-?\s*(?=\w+)/,
                starts: {
                    contains: [
                        e.END_SAME_AS_BEGIN({
                            begin: /(\w+)/,
                            end: /(\w+)/,
                            className: "string"
                        })
                    ]
                }
            }, c = {
                className: "string",
                begin: /"/,
                end: /"/,
                contains: [
                    e.BACKSLASH_ESCAPE,
                    t,
                    a
                ]
            };
            a.contains.push(c);
            const o = {
                begin: /\$?\(\(/,
                end: /\)\)/,
                contains: [
                    {
                        begin: /\d+#[0-9a-f]+/,
                        className: "number"
                    },
                    e.NUMBER_MODE,
                    t
                ]
            }, r = e.SHEBANG({
                binary: "(fish|bash|zsh|sh|csh|ksh|tcsh|dash|scsh)",
                relevance: 10
            }), l = {
                className: "function",
                begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
                returnBegin: !0,
                contains: [
                    e.inherit(e.TITLE_MODE, {
                        begin: /\w[\w\d_]*/
                    })
                ],
                relevance: 0
            };
            return {
                name: "Bash",
                aliases: [
                    "sh"
                ],
                keywords: {
                    $pattern: /\b[a-z][a-z0-9._-]+\b/,
                    keyword: [
                        "if",
                        "then",
                        "else",
                        "elif",
                        "fi",
                        "for",
                        "while",
                        "in",
                        "do",
                        "done",
                        "case",
                        "esac",
                        "function"
                    ],
                    literal: [
                        "true",
                        "false"
                    ],
                    built_in: [
                        "break",
                        "cd",
                        "continue",
                        "eval",
                        "exec",
                        "exit",
                        "export",
                        "getopts",
                        "hash",
                        "pwd",
                        "readonly",
                        "return",
                        "shift",
                        "test",
                        "times",
                        "trap",
                        "umask",
                        "unset",
                        "alias",
                        "bind",
                        "builtin",
                        "caller",
                        "command",
                        "declare",
                        "echo",
                        "enable",
                        "help",
                        "let",
                        "local",
                        "logout",
                        "mapfile",
                        "printf",
                        "read",
                        "readarray",
                        "source",
                        "type",
                        "typeset",
                        "ulimit",
                        "unalias",
                        "set",
                        "shopt",
                        "autoload",
                        "bg",
                        "bindkey",
                        "bye",
                        "cap",
                        "chdir",
                        "clone",
                        "comparguments",
                        "compcall",
                        "compctl",
                        "compdescribe",
                        "compfiles",
                        "compgroups",
                        "compquote",
                        "comptags",
                        "comptry",
                        "compvalues",
                        "dirs",
                        "disable",
                        "disown",
                        "echotc",
                        "echoti",
                        "emulate",
                        "fc",
                        "fg",
                        "float",
                        "functions",
                        "getcap",
                        "getln",
                        "history",
                        "integer",
                        "jobs",
                        "kill",
                        "limit",
                        "log",
                        "noglob",
                        "popd",
                        "print",
                        "pushd",
                        "pushln",
                        "rehash",
                        "sched",
                        "setcap",
                        "setopt",
                        "stat",
                        "suspend",
                        "ttyctl",
                        "unfunction",
                        "unhash",
                        "unlimit",
                        "unsetopt",
                        "vared",
                        "wait",
                        "whence",
                        "where",
                        "which",
                        "zcompile",
                        "zformat",
                        "zftp",
                        "zle",
                        "zmodload",
                        "zparseopts",
                        "zprof",
                        "zpty",
                        "zregexparse",
                        "zsocket",
                        "zstyle",
                        "ztcp",
                        "chcon",
                        "chgrp",
                        "chown",
                        "chmod",
                        "cp",
                        "dd",
                        "df",
                        "dir",
                        "dircolors",
                        "ln",
                        "ls",
                        "mkdir",
                        "mkfifo",
                        "mknod",
                        "mktemp",
                        "mv",
                        "realpath",
                        "rm",
                        "rmdir",
                        "shred",
                        "sync",
                        "touch",
                        "truncate",
                        "vdir",
                        "b2sum",
                        "base32",
                        "base64",
                        "cat",
                        "cksum",
                        "comm",
                        "csplit",
                        "cut",
                        "expand",
                        "fmt",
                        "fold",
                        "head",
                        "join",
                        "md5sum",
                        "nl",
                        "numfmt",
                        "od",
                        "paste",
                        "ptx",
                        "pr",
                        "sha1sum",
                        "sha224sum",
                        "sha256sum",
                        "sha384sum",
                        "sha512sum",
                        "shuf",
                        "sort",
                        "split",
                        "sum",
                        "tac",
                        "tail",
                        "tr",
                        "tsort",
                        "unexpand",
                        "uniq",
                        "wc",
                        "arch",
                        "basename",
                        "chroot",
                        "date",
                        "dirname",
                        "du",
                        "echo",
                        "env",
                        "expr",
                        "factor",
                        "groups",
                        "hostid",
                        "id",
                        "link",
                        "logname",
                        "nice",
                        "nohup",
                        "nproc",
                        "pathchk",
                        "pinky",
                        "printenv",
                        "printf",
                        "pwd",
                        "readlink",
                        "runcon",
                        "seq",
                        "sleep",
                        "stat",
                        "stdbuf",
                        "stty",
                        "tee",
                        "test",
                        "timeout",
                        "tty",
                        "uname",
                        "unlink",
                        "uptime",
                        "users",
                        "who",
                        "whoami",
                        "yes"
                    ]
                },
                contains: [
                    r,
                    e.SHEBANG(),
                    l,
                    o,
                    e.HASH_COMMENT_MODE,
                    i,
                    {
                        match: /(\/[a-z._-]+)+/
                    },
                    c,
                    {
                        className: "",
                        begin: /\\"/
                    },
                    {
                        className: "string",
                        begin: /'/,
                        end: /'/
                    },
                    t
                ]
            };
        };
    })();
    hljs.registerLanguage("bash", e);
})(); /*! `shell` grammar compiled for Highlight.js 11.7.0 */ 
(()=>{
    var s = (()=>{
        "use strict";
        return (s)=>({
                name: "Shell Session",
                aliases: [
                    "console",
                    "shellsession"
                ],
                contains: [
                    {
                        className: "meta.prompt",
                        begin: /^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,
                        starts: {
                            end: /[^\\](?=\s*$)/,
                            subLanguage: "bash"
                        }
                    }
                ]
            });
    })();
    hljs.registerLanguage("shell", s);
})();

//# sourceMappingURL=breakpoints.9b9a03f9.js.map
