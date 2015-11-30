YUI.add('aui-modal-resize', function (A, NAME) {

/**
 * The Modal Resize Component.
 *
 * @module aui-modal-resize
 */

function ModalResize() {}

ModalResize.prototype = {
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
            A.after(instance._plugResize, instance, '_plugDrag'),
            instance.after('resizableChange', instance._afterResizableChange),
            instance.after('resize:end', A.bind(instance._syncResizeDimensions, instance))
        );

        instance._applyPlugin(instance._plugResize);
    },

    /**
     * Fire after resize changes.
     *
     * @method _afterResizableChange
     * @param event
     * @protected
     */
    _afterResizableChange: function(event) {
        var instance = this;

        if (event.newVal) {
            instance._applyPlugin(instance._plugResize);
        }
        else {
            instance.unplug(A.Plugin.Resize);
        }
    },

    /**
     * Fire before resizing to the correct dimensions.
     *
     * @method _beforeResizeCorrectDimensions
     * @param event
     * @protected
     */
    _beforeResizeCorrectDimensions: function() {
        var instance = this;

        if (instance.resize.proxy) {
            return new A.Do.Prevent();
        }
    },

    /**
     * Plug the resize Plugin
     *
     * @method _plugResize
     * @protected
     */
    _plugResize: function() {
        var instance = this,
            resizable = instance.get('resizable');

        if (resizable && !instance.hasPlugin('resizable')) {
            instance.plug(A.Plugin.Resize, instance._addBubbleTargets(resizable));

            A.before(instance._beforeResizeCorrectDimensions, instance.resize, '_correctDimensions', instance);
        }
    },

    /**
     * Sync width/height dimensions on resize.
     *
     * @method _syncResizeDimensions
     * @param event
     * @protected
     */
    _syncResizeDimensions: function(event) {
        var instance = this,
            boundingBox = instance.get('boundingBox'),
            resize = event.info;

        instance.set(
            'width',
            resize.offsetWidth -
            parseInt(boundingBox.getComputedStyle('borderRightWidth'), 10) -
            parseInt(boundingBox.getComputedStyle('borderLeftWidth'), 10));

        instance.set(
            'height',
            resize.offsetHeight -
            parseInt(boundingBox.getComputedStyle('borderTopWidth'), 10) -
            parseInt(boundingBox.getComputedStyle('borderBottomWidth'), 10));
    }
};

ModalResize.ATTRS = {
    /**
     * Determine if Modal should be resizable or not.
     *
     * @attribute resizable
     * @type Object
     * @writeOnce
     */
    resizable: {
        value: {
            handles: 'br'
        }
    }
};

A.Base.mix(A.Modal, [ModalResize]);


}, '3.0.1', {"requires": ["aui-modal", "resize-plugin"]});
