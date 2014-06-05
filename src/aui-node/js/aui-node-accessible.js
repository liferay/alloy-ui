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
     * Hides the node.
     *
     * @method hideAccessible
     */
    hideAccessible: function() {
        this.addClass(CSS_BOOTSTRAP_SR_ONLY);

        this.onceAfter(this.showAccessible, this, 'show');
    },

    /**
     * Shows the node. Fires after the node-base 'show' method.
     *
     * @method showAccessible
     */
    showAccessible: function() {
        this.removeClass(CSS_BOOTSTRAP_SR_ONLY);
    },

    /**
     * Toggles the node visibility.
     *
     * @param force
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