YUI.add('aui-toggler-accessibility', function (A, NAME) {

/**
 * The Toggler Accessibility Component
 *
 * @module aui-toggler-accessibility
 */

function TogglerAccessibility() {}

TogglerAccessibility.prototype = {
    /**
     * Construction logic executed during instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._eventHandles.push(
            A.after(this._afterToggle, this, 'toggle')
        );

        this._setARIAElements();
    },

    /**
     * Fires after toggle and syncs ARIA attributes.
     *
     * @method _afterToggle
     * @param {EventFacade} event
     * @protected
     */
    _afterToggle: function(expand) {
        var content = this.get('content'),
            header = this.get('header');

        if (A.Lang.isUndefined(expand)) {
            expand = this.get('expanded');
        }

        header.setAttribute('aria-pressed', expand);
        content.setAttribute('aria-hidden', !expand);
    },

    /**
     * Sets the ARIA-WAI attributes.
     *
     * @method _setARIAElements
     * @protected
     */
    _setARIAElements: function() {
        var content = this.get('content'),
            contentId = content.attr('id') || content.guid(),
            expanded = this.get('expanded'),
            header = this.get('header');

        header.setAttribute('aria-controls', contentId);
        header.setAttribute('aria-pressed', expanded);
        content.setAttribute('aria-hidden', !expanded);
    }
};

A.Base.mix(A.Toggler, [TogglerAccessibility]);


}, '3.0.1', {"requires": ["aui-toggler-base"]});
