YUI.add('aui-node-accessible', function (A, NAME) {

/**
 * A set of utility methods for Node to allow 'hiding'
 * while still allowing screen readers access.
 *
 * @module aui-node-accessible
 * @submodule aui-node-accessible
 */

var CSS_BOOTSTRAP_SR_ONLY = A.getClassName('sr-only');

A.mix(A.Node.prototype, {

    /**
     * Hides the node, while still keeping it accessible by screen readers.
     *
     * @method hideAccessible
     */
    hideAccessible: function() {
        this.addClass(CSS_BOOTSTRAP_SR_ONLY);

        this.onceAfter(this.showAccessible, this, 'show');
    },

    /**
     * Shows the node. Fires after the node-base `show` method to clean up nodes
     * which were hidden through the `hideAccessible` method.
     *
     * @method showAccessible
     */
    showAccessible: function() {
        this.removeClass(CSS_BOOTSTRAP_SR_ONLY);
    },

    /**
     * Toggles the node visibility, while still keeping it accessible by screen\
     * readers.
     *
     * @param {Boolean} force If true the node will be shown, otherwise it will
     *     be hidden.
     * @method toggleAccessible
     */
    toggleAccessible: function(force) {
        force = (force !== undefined) ? force :
                this.hasClass(CSS_BOOTSTRAP_SR_ONLY);

        if (force) {
            this.showAccessible();
        } else {
            this.hideAccessible();
        }
    }
});

}, '3.0.1', {"requires": ["aui-node-base", "event-custom-base"]});
