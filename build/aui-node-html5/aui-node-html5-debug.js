YUI.add('aui-node-html5', function (A, NAME) {

/**
 * Provides support for HTML shiv natively on the Alloy DOM methods. The HTML5
 * shiv just affects IE.
 *
 * @module aui-node
 * @submodule aui-node-html5
 */

if (A.UA.ie) {
    /**
     * An object that encapsulates util methods for HTML5 shiving.
     *
     * **What is a "shiv"?**
     *
     * To the world, a shiv is a slang term for a sharp object used as a
     * knife-like weapon. To Internet Explorer, a shiv is a script that, when
     * executed, forces the browser to recognize HTML5 elements.
     *
     * @class A.HTML5
     */
    var HTML5 = A.namespace('HTML5'),
        DOM_create = A.DOM._create;

    if (!HTML5._fragHTML5Shived) {
        /**
         * A global DocumentFragment already HTML5 shived, for performance
         * reasons. (i.e., all nodes and its HTML5 children appended to this
         * fragment iherits the styles on IE).
         *
         * @property _fragHTML5Shived
         * @type {DocumentFragment}
         * @protected
         */
        HTML5._fragHTML5Shived = A.html5shiv(
            A.config.doc.createDocumentFragment()
        );
    }

    A.mix(
        HTML5, {
            /**
             * Receives a `frag` and a HTML content. This method shivs the HTML5
             * nodes appended to a Node or fragment which is not on the document
             * yet.
             *
             * @method IECreateFix
             * @param {Node|DocumentFragment} frag Fragment to be fixed.
             * @param {String} content HTML to be set (using innerHTML) on the
             *     `frag`.
             * @return {Node|DocumentFragment}
             */
            IECreateFix: function(frag, content) {
                var shivedFrag = HTML5._fragHTML5Shived;

                shivedFrag.appendChild(frag);

                frag.innerHTML = content;

                shivedFrag.removeChild(frag);

                return frag;
            },

            /**
             * AOP listener to the A.DOM._create method. This method intercepts
             * all the calls to the A.DOM._create and append the generated
             * fragment to [A.HTML._fragHTML5Shived](A.HTML5.html#property__frag
             * HTML5Shived), this fixes the IE bug for painting the HTML5 nodes
             * on the HTML fragment.
             *
             * @method _doBeforeCreate
             * @param {String} html HTML content
             * @param {String} doc
             * @param {String} tag
             * @protected
             * @return {DocumentFragment}
             */
            _doBeforeCreate: function(html) {
                var createdFrag = DOM_create.apply(this, arguments);

                var shivedFrag = HTML5.IECreateFix(createdFrag, html);

                return new A.Do.Halt(null, shivedFrag);
            }
        }
    );

    A.Do.before(HTML5._doBeforeCreate, A.DOM, '_create', A.DOM);
}
/**
 * The Node Utility.
 *
 * @module aui-node
 * @submodule aui-node-html5-print
 */

var CONFIG = A.config,
    DOC = CONFIG.doc,
    WIN = CONFIG.win,
    UA = A.UA,
    IE = UA.ie,

    isShivDisabled = function() {
        return WIN.AUI_HTML5_IE === false;
    };

if (!IE || IE >= 9 || isShivDisabled()) {
    return;
}

var BUFFER_CSS_TEXT = [],

    LOCATION = WIN.location,

    DOMAIN = LOCATION.protocol + '//' + LOCATION.host,

    HTML = DOC.documentElement,

    HTML5_ELEMENTS = A.HTML5_ELEMENTS,
    HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,
    HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),

    REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
    REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
    REGEX_ELEMENTS_FAST = new RegExp('\\b(' + HTML5_ELEMENTS_LIST + ')\\b', 'i'),

    REGEX_PRINT_MEDIA = /print|all/,

    REGEX_RULE = new RegExp('(^|[^\\n{}]*?\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),
    REGEX_TAG = new RegExp('<(\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

    SELECTOR_REPLACE_RULE = '.' + 'printfix-' + '$1',

    STR_EMPTY = '',

    STR_URL_DOMAIN = 'url(' + DOMAIN,

    TAG_REPLACE_ORIGINAL = '<$1$2',
    TAG_REPLACE_FONT = '<$1font';

var html5shiv = A.html5shiv,
    // Yes, IE does this wackiness; converting an object
    // to a string should never result in undefined, but
    // IE's styleSheet object sometimes becomes inaccessible
    // after trying to print the second time
    isStylesheetDefined = function(obj) {
        return obj && (obj + STR_EMPTY !== undefined);
    },

    toggleNode = function(node, origNode, prop) {
        var state = origNode[prop];

        if (state) {
            node.setAttribute(prop, state);
        }
        else {
            node.removeAttribute(prop);
        }
    };

html5shiv(DOC);

var printFix = function() {
    var afterPrint = function() {
        if (isShivDisabled()) {
            destroy();
        }
        else {
            printFix.onAfterPrint();
        }
    };

    var beforePrint = function() {
        if (isShivDisabled()) {
            destroy();
        }
        else {
            printFix.onBeforePrint();
        }
    };

    var destroy = function() {
        WIN.detachEvent('onafterprint', afterPrint);
        WIN.detachEvent('onbeforeprint', beforePrint);
    };

    var init = function() {
        WIN.attachEvent('onafterprint', afterPrint);
        WIN.attachEvent('onbeforeprint', beforePrint);
    };

    init();

    printFix.destroy = destroy;
    printFix.init = init;
};

A.mix(
    printFix, {
        /**
         * Fires after a print.
         *
         * @method onAfterPrint
         */
        onAfterPrint: function() {
            var instance = this;

            instance.restoreHTML();

            var styleSheet = instance._getStyleSheet();

            styleSheet.styleSheet.cssText = '';
        },

        /**
         * Fires before a print.
         *
         * @method onBeforePrint
         */
        onBeforePrint: function() {
            var instance = this;

            var styleSheet = instance._getStyleSheet();
            var cssRules = instance._getAllCSSText();

            styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);

            instance.writeHTML();
        },

        /**
         * Navigates through the CSS joining rules and replacing content.
         *
         * @method parseCSS
         * @param cssText
         * @return {String}
         */
        parseCSS: function(cssText) {
            var css = '';
            var rules = cssText.match(REGEX_RULE);

            if (rules) {
                css = rules.join('\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);
            }

            return css;
        },

        /**
         * Restores the HTML from the `bodyClone` and `bodyEl` attributes.
         *
         * @method restoreHTML
         */
        restoreHTML: function() {
            var instance = this;

            var bodyClone = instance._getBodyClone();
            var bodyEl = instance._getBodyEl();

            bodyClone.innerHTML = '';

            HTML.removeChild(bodyClone);
            HTML.appendChild(bodyEl);
        },

        /**
         * Generates the HTML for print.
         *
         * @method writeHTML
         */
        writeHTML: function() {
            var instance = this;

            var i = -1;
            var j;

            var bodyEl = instance._getBodyEl();

            var html5Element;

            var cssClass;

            var nodeList;
            var nodeListLength;
            var node;
            var buffer = [];

            while (++i < HTML5_ELEMENTS_LENGTH) {
                html5Element = HTML5_ELEMENTS[i];

                nodeList = DOC.getElementsByTagName(html5Element);
                nodeListLength = nodeList.length;

                j = -1;

                while (++j < nodeListLength) {
                    node = nodeList[j];

                    cssClass = node.className;

                    if (cssClass.indexOf('printfix-') === -1) {
                        buffer[0] = 'printfix-' + html5Element;
                        buffer[1] = cssClass;

                        node.className = buffer.join(' ');
                    }
                }
            }

            var docFrag = instance._getDocFrag();
            var bodyClone = instance._getBodyClone();

            docFrag.appendChild(bodyEl);
            HTML.appendChild(bodyClone);

            bodyClone.className = bodyEl.className;
            bodyClone.id = bodyEl.id;

            var originalNodes = bodyEl.getElementsByTagName('*');
            var length = originalNodes.length;

            // IE will throw a mixed content warning when using https
            // and calling clone node if the body contains elements with
            // an inline background-image style that is relative to the domain.
            if (UA.secure) {
                var bodyElStyle = bodyEl.style;

                var elStyle;
                var backgroundImage;

                bodyElStyle.display = 'none';

                for (i = 0; i < length; i++) {
                    elStyle = originalNodes[i].style;

                    backgroundImage = elStyle.backgroundImage;

                    if (backgroundImage &&
                        backgroundImage.indexOf('url(') > -1 &&
                        backgroundImage.indexOf('https') === -1) {

                        elStyle.backgroundImage = backgroundImage.replace('url(', STR_URL_DOMAIN);
                    }
                }

                bodyElStyle.display = '';
            }

            var bodyElClone = bodyEl.cloneNode(true);

            var newNodes = bodyElClone.getElementsByTagName('*');

            if (length === newNodes.length) {
                while (length--) {
                    var newNode = newNodes[length];
                    var newNodeName = newNode.nodeName;

                    if (newNodeName === 'INPUT' || newNodeName === 'OPTION') {
                        var originalNode = originalNodes[length];
                        var originalNodeName = originalNode.nodeName;

                        if (originalNodeName === newNodeName) {
                            var prop = null;

                            if (newNodeName === 'OPTION') {
                                prop = 'selected';
                            }
                            else if (newNodeName === 'INPUT' && (newNode.type === 'checkbox' || newNode.type ===
                                'radio')) {
                                prop = 'checked';
                            }

                            if (prop !== null) {
                                toggleNode(newNode, originalNode, prop);
                            }
                        }
                    }
                }
            }

            var bodyHTML = bodyElClone.innerHTML;

            bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG,
                TAG_REPLACE_FONT);

            bodyClone.innerHTML = bodyHTML;
        },

        /**
         * Gets all CSS text from all stylesheets.
         *
         * @method _getAllCSSText
         * @protected
         * @return {Array}
         */
        _getAllCSSText: function() {
            var instance = this;

            var buffer = [];
            var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, 'all');
            var rule;
            var cssText;
            var styleSheet;

            for (var i = 0; styleSheet = styleSheets[i]; i++) {
                var rules = styleSheet.rules;

                if (rules && rules.length) {
                    for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {
                        rule = rules[j];

                        if (!rule.href) {
                            cssText = instance._getCSSTextFromRule(rule);

                            buffer.push(cssText);
                        }
                    }
                }
            }

            return buffer.join(' ');
        },

        /**
         * Extracts the CSS text from a rule.
         *
         * @method _getCSSTextFromRule
         * @param rule
         * @protected
         * @return {String}
         */
        _getCSSTextFromRule: function(rule) {
            var cssText = '';

            var ruleStyle = rule.style;
            var ruleCSSText;
            var ruleSelectorText;

            if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) &&
                REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {
                BUFFER_CSS_TEXT.length = 0;

                BUFFER_CSS_TEXT.push(ruleSelectorText, '{', ruleCSSText, '}');

                cssText = BUFFER_CSS_TEXT.join(' ');
            }

            return cssText;
        },

        /**
         * Gets all stylesheets from a page.
         *
         * @method _getAllStyleSheets
         * @param styleSheet, mediaType, level, buffer
         * @protected
         * @return {Array}
         */
        _getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {
            var instance = this;

            level = level || 1;

            buffer = buffer || [];

            var i;

            if (isStylesheetDefined(styleSheet)) {
                var imports = styleSheet.imports;

                mediaType = styleSheet.mediaType || mediaType;

                if (REGEX_PRINT_MEDIA.test(mediaType)) {
                    var length;

                    // IE can crash when trying to access imports more than 3 levels deep
                    if (level <= 3 && isStylesheetDefined(imports) && imports.length) {
                        for (i = 0, length = imports.length; i < length; i++) {
                            instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);
                        }
                    }
                    else if (styleSheet.length) {
                        for (i = 0, length = styleSheet.length; i < length; i++) {
                            instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);
                        }
                    }
                    else {
                        var rules = styleSheet.rules;
                        var ruleStyleSheet;

                        if (rules && rules.length) {
                            for (i = 0, length = rules.length; i < length; i++) {
                                ruleStyleSheet = rules[i].styleSheet;

                                if (ruleStyleSheet) {
                                    instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);
                                }
                            }
                        }
                    }

                    if (!styleSheet.disabled && styleSheet.rules) {
                        buffer.push(styleSheet);
                    }
                }
            }

            mediaType = 'all';

            return buffer;
        },

        /**
         * Gets the `<body>` element.
         *
         * @method _getBodyEl
         * @protected
         * @return {Element}
         */
        _getBodyEl: function() {
            var instance = this;

            var bodyEl = instance._bodyEl;

            if (!bodyEl) {
                bodyEl = DOC.body;

                instance._bodyEl = bodyEl;
            }

            return bodyEl;
        },

        /**
         * Gets a clone of the `<body>` element.
         *
         * @method _getBodyClone
         * @protected
         * @return {Element}
         */
        _getBodyClone: function() {
            var instance = this;

            var bodyClone = instance._bodyClone;

            if (!bodyClone) {
                bodyClone = DOC.createElement('body');

                instance._bodyClone = bodyClone;
            }

            return bodyClone;
        },

        /**
         * Gets a document fragment object.
         *
         * @method _getDocFrag
         * @protected
         * @return {DocumentFragment}
         */
        _getDocFrag: function() {
            var instance = this;

            var docFrag = instance._docFrag;

            if (!docFrag) {
                docFrag = DOC.createDocumentFragment();

                html5shiv(docFrag);

                instance._docFrag = docFrag;
            }

            return docFrag;
        },

        /**
         * Gets the stylesheet from the DOM.
         *
         * @method _getStyleSheet
         * @protected
         * @return {Node}
         */
        _getStyleSheet: function() {
            var instance = this;

            var styleSheet = instance._styleSheet;

            if (!styleSheet) {
                styleSheet = DOC.createElement('style');

                var head = DOC.documentElement.firstChild;

                head.insertBefore(styleSheet, head.firstChild);

                styleSheet.media = 'print';
                styleSheet.className = 'printfix';

                instance._styleSheet = styleSheet;
            }

            return styleSheet;
        }
    }
);

A.namespace('HTML5').printFix = printFix;

printFix();


}, '3.0.1', {"requires": ["collection", "aui-node-base"]});
