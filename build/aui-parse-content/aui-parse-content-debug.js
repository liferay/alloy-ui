YUI.add('aui-parse-content', function (A, NAME) {

/**
 * The ParseContent Utility - Parse the content of a Node so that all of the
 * javascript contained in that Node will be executed according to the order
 * that it appears.
 *
 * @module aui-parse-content
 */

/*
 * NOTE: The inspiration of ParseContent cames from the "Caridy Patino" Node
 *       Dispatcher Plugin http://github.com/caridy/yui3-gallery/blob/master/src
 *       /gallery-dispatcher/
 */

var L = A.Lang,
    isString = L.isString,

    DOC = A.config.doc,
    PADDING_NODE = '<div>_</div>',

    SCRIPT_TYPES = {
        '': 1,
        'text/javascript': 1,
        'text/parsed': 1
    };

/**
 * A base class for ParseContent, providing:
 *
 * - After plug ParseContent on a A.Node instance the javascript chunks will be
 *   executed (remote and inline scripts)
 * - All the javascripts within a content will be executed according to the
 *   order of apparition
 *
 * **NOTE:** For performance reasons on DOM manipulation,
 * ParseContent only parses the content passed to the
 * [setContent](Node.html#method_setContent),
 * [prepend](Node.html#method_prepend) and
 * [append](Node.html#method_append) methods.
 *
 * Quick Example:
 *
 * ```
 * node.plug(A.Plugin.ParseContent);
 * ```
 *
 * @class A.ParseContent
 * @extends Plugin.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var ParseContent = A.Component.create({
    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'ParseContent',

    /**
     * Static property provides a string to identify the namespace.
     *
     * @property NS
     * @type String
     * @static
     */
    NS: 'ParseContent',

    /**
     * Static property used to define the default attribute
     * configuration for the ParseContent.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * A queue of elements to be parsed.
         *
         * @attribute queue
         * @default null
         */
        queue: {
            value: null
        },

        /**
         * When true, script nodes will not be removed from original content,
         * instead the script type attribute will be set to `text/plain`.
         *
         * @attribute preserveScriptNodes
         * @default false
         */
        preserveScriptNodes: {
            validator: L.isBoolean,
            value: false
        }
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Plugin.Base,

    prototype: {

        /**
         * Construction logic executed during ParseContent instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            ParseContent.superclass.initializer.apply(this, arguments);

            instance.set(
                'queue',
                new A.AsyncQueue()
            );

            instance._bindAOP();
        },

        /**
         * Global eval the <data>data</data> passed.
         *
         * @method globalEval
         * @param {String} data JavaScript String.
         */
        globalEval: function(data) {
            var doc = A.getDoc();
            var head = doc.one('head') || doc.get('documentElement');

            // NOTE: A.Node.create('<script></script>') doesn't work correctly
            // on Opera
            var newScript = DOC.createElement('script');

            newScript.type = 'text/javascript';

            if (data) {
                // NOTE: newScript.set(TEXT, data) breaks on IE, YUI BUG.
                newScript.text = L.trim(data);
            }

            //removes the script node immediately after executing it
            head.appendChild(newScript).remove();
        },

        /**
         * Extract the `script` tags from the string content and
         * evaluate the chunks.
         *
         * @method parseContent
         * @param {String} content HTML string
         * @return {String}
         */
        parseContent: function(content) {
            var instance = this;

            var output = instance._extractScripts(content);

            instance._dispatch(output);

            return output;
        },

        /**
         * Add inline script data to the queue.
         *
         * @method _addInlineScript
         * @param {String} data The script content which should be added to the
         *     queue
         * @protected
         */
        _addInlineScript: function(data) {
            var instance = this;

            instance.get('queue').add({
                args: data,
                context: instance,
                fn: instance.globalEval,
                timeout: 0
            });
        },

        /**
         * Bind listeners on the `insert` and `setContent` methods of the Node
         * instance where you are plugging the ParseContent. These listeners are
         * responsible for intercept the HTML passed and parse them.
         *
         * @method _bindAOP
         * @protected
         */
        _bindAOP: function() {
            var instance = this;

            var cleanFirstArg = function(content) {
                var args = Array.prototype.slice.call(arguments);
                var output = instance.parseContent(content);

                // replace the first argument with the clean fragment
                args.splice(0, 1, output.fragment);

                return new A.Do.AlterArgs(null, args);
            };

            this.doBefore('insert', cleanFirstArg);
            this.doBefore('replaceChild', cleanFirstArg);

            var cleanArgs = function(content) {
                var output = instance.parseContent(content);

                return new A.Do.AlterArgs(null, [output.fragment]);
            };

            this.doBefore('replace', cleanArgs);
            this.doBefore('setContent', cleanArgs);
        },

        /**
         * Create an HTML fragment with the String passed, extract all the
         * script tags and return an Object with a reference for the extracted
         * scripts and the fragment.
         *
         * @method clean
         * @param {String} content HTML content.
         * @protected
         * @return {Object}
         */
        _extractScripts: function(content) {
            var instance = this,
                fragment = A.Node.create('<div></div>'),
                output = {},
                preserveScriptNodes = instance.get('preserveScriptNodes');

            // For PADDING_NODE, instead of fixing all tags in the content to be
            // "XHTML"-style, we make the firstChild be a valid non-empty tag,
            // then we remove it later

            if (isString(content)) {
                content = PADDING_NODE + content;

                // create fragment from {String}
                A.DOM.addHTML(fragment, content, 'append');
            }
            else {
                fragment.append(PADDING_NODE);

                // create fragment from {Y.Node | HTMLElement}
                fragment.append(content);
            }

            output.js = fragment.all('script').filter(function(script) {
                var includeScript = SCRIPT_TYPES[script.getAttribute('type').toLowerCase()];
                if (preserveScriptNodes) {
                    script.setAttribute('type', 'text/parsed');
                }
                return includeScript;
            });

            if (!preserveScriptNodes) {
                output.js.each(
                    function(node) {
                        node.remove();
                    }
                );
            }

            // remove PADDING_NODE
            fragment.get('firstChild').remove();

            output.fragment = fragment.get('childNodes').toFrag();

            return output;
        },

        /**
         * Loop trough all extracted `script` tags and evaluate them.
         *
         * @method _dispatch
         * @param {Object} output Object containing the reference for the
         *     fragment and the extracted `script` tags.
         * @protected
         * @return {String}
         */
        _dispatch: function(output) {
            var instance = this;

            var queue = instance.get('queue');

            var scriptContent = [];

            output.js.each(function(node) {
                var src = node.get('src');

                if (src) {
                    if (scriptContent.length) {
                        instance._addInlineScript(scriptContent.join(';'));

                        scriptContent.length = 0;
                    }

                    queue.add({
                        autoContinue: false,
                        fn: function() {
                            A.Get.script(src, {
                                onEnd: function(o) {
                                    //removes the script node immediately after
                                    //executing it
                                    o.purge();
                                    queue.run();
                                }
                            });
                        },
                        timeout: 0
                    });
                }
                else {
                    var dom = node._node;

                    scriptContent.push(dom.text || dom.textContent || dom.innerHTML || '');
                }
            });

            if (scriptContent.length) {
                instance._addInlineScript(scriptContent.join(';'));
            }

            queue.run();
        }
    }
});

A.namespace('Plugin').ParseContent = ParseContent;


}, '3.0.1', {"requires": ["async-queue", "plugin", "io-base", "aui-component", "aui-node-base"]});
