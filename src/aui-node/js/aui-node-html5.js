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
