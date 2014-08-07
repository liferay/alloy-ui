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
        var instance = this;

        instance._eventHandles.push(
            A.after(instance._afterToggle, instance, 'toggle')
        );

        instance._setARIAElements();
    },

    /**
     * Fires after toggle and syncs ARIA attributes.
     *
     * @method _afterToggle
     * @param {EventFacade} event
     */
    _afterToggle: function(expand) {
        var instance = this,
            content = instance.get('content'),
            header = instance.get('header');

        if (A.Lang.isUndefined(expand)) {
            expand = instance.get('expanded');
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
        var instance = this,
            content = instance.get('content'),
            contentId = content.attr('id') || content.guid(),
            expanded = instance.get('expanded'),
            header = instance.get('header');

        header.setAttribute('aria-controls', contentId);
        header.setAttribute('aria-pressed', expanded);
        content.setAttribute('aria-hidden', !expanded);
    }
};

A.Base.mix(A.Toggler, [TogglerAccessibility]);
