/**
 * The Toggler Component
 *
 * @module aui-toggler
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
        var instance = this,
            onToggle = instance.on('toggle', A.bind(instance._onToggleEvent, instance));

        instance._eventHandles.push(onToggle);

        instance.setAriaElements();
    },

    /**
     * Plugs the aui-aria plugin.
     *
     * @method plugAria
     */
    setAriaElements: function() {
        var instance = this,
            content = instance.get('content'),
            contentId = content.attr('id') || content.guid(),
            expanded = instance.get('expanded'),
            header = instance.get('header');

        header.setAttribute('aria-pressed', expanded);
        header.setAttribute('aria-controls', contentId);
        content.setAttribute('aria-hidden', !expanded);
    },

    /**
     * Fires after toggle event.
     *
     * @method _afterToggleEvent
     * @param {EventFacade} event
     */
    _onToggleEvent: function(event) {
        var instance = this,
            expand = event.expand,
            content = instance.get('content'),
            header = instance.get('header');

        header.setAttribute('aria-pressed', expand);
        content.setAttribute('aria-hidden', !expand);
    }
};

TogglerAccessibility.ATTRS = {};

A.Base.mix(A.Toggler, [TogglerAccessibility]);
