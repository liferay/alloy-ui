/**
 * The Layout Col Component
 *
 * @module aui-layout-col
 */

var BOOTSTRAP_CLASS_PREFIX = 'col-md-',
    CSS_COL_CONTENT = A.getClassName('layout', 'col', 'content'),
    TPL_COL = '<div class="col"><div class="' + CSS_COL_CONTENT + '"></div></div>';

/**
 * A base class for Layout Col.
 *
 * @class A.LayoutCol
 * @extends Base
 * @param {Object} config Object literal specifying layout configuration
 *     properties.
 * @constructor
 */
A.LayoutCol = A.Base.create('layout-col', A.Base, [], {
    /**
     * Construction logic executed during `A.LayoutCol` instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after({
            sizeChange: this._afterSizeChange,
            valueChange: this._afterValueChange
        });

        this._uiSetSize(this.get('size'));
        this._uiSetValue(this.get('value'));
    },

    /**
     * Fired after the `content` attribute from this column's value object is set.
     *
     * @method _afterContentChange
     * @protected
     */
    _afterContentChange: function() {
        this._uiSetValue(this.get('value'));
    },

    /**
     * Fired after the `size` attribute changes.
     *
     * @method _afterSizeChange
     * @param {EventFacade} event
     * @protected
     */
    _afterSizeChange: function(event) {
        this.get('node').removeClass(BOOTSTRAP_CLASS_PREFIX + event.prevVal);
        this._uiSetSize(this.get('size'));
    },

    /**
     * Fired after the `value` attribute changes.
     *
     * @method _afterValueChange
     * @protected
     */
    _afterValueChange: function() {
        if (this._contentEventHandle) {
            this._contentEventHandle.detach();
            this._contentEventHandle = null;
        }

        this._uiSetValue(this.get('value'));
    },

    /**
     * Updates the UI according to the value of the `size` attribute.
     *
     * @method _uiSetSize
     * @param {Number} size
     * @protected
     */
    _uiSetSize: function(size) {
        this.get('node').addClass(BOOTSTRAP_CLASS_PREFIX + size);
    },

    /**
     * Updates the UI according to the value of the `value` attribute.
     *
     * @method _uiSetValue
     * @param {Object} value
     * @protected
     */
    _uiSetValue: function(value) {
        var node = this.get('node'),
            valueNode = node.one('.' + CSS_COL_CONTENT);

        valueNode.empty();
        if (value) {
            if (value.content !== undefined) {
                valueNode.append(value.content);
            }
            else {
                valueNode.append(value.get('content'));

                this._contentEventHandle = value.after(
                    'contentChange',
                    A.bind(this._afterContentChange, this)
                );
            }
        }
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the Layout Col.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Columns's maximum size.
         *
         * @attribute maxSize
         * @type {Number}
         */
        maxSize: {
            value: 12
        },

        /**
         * Columns's minimum size.
         *
         * @attribute minSize
         * @type {Number}
         */
        minSize: {
            value: 1
        },

        /**
         * Determine if the col's content can be moved.
         *
         * @attribute movableContent
         * @default true
         * @type {Boolean}
         */
        movableContent: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * The node where this column will be rendered.
         *
         * @attribute node
         * @type Node
         */
        node: {
            setter: function(val) {
                val.setData('layout-col', this);
                return val;
            },
            validator: A.Lang.isNode,
            valueFn: function() {
                return A.Node.create(TPL_COL);
            },
            writeOnce: 'initOnly'
        },

        /**
         * Determine if the col can be removed.
         *
         * @attribute removable
         * @default true
         * @type {Boolean}
         */
        removable: {
            validator: A.Lang.isBoolean,
            value: true
        },

        /**
         * Columns's size, ranging from 1 to 12.
         *
         * @attribute size
         * @type {Number}
         */
        size: {
            setter: function(val) {
                var max = this.get('maxSize'),
                    min = this.get('minSize');

                if (val < min) {
                    return min;
                }
                else if (val > max) {
                    return max;
                }
                else {
                    return val;
                }
            },
            valueFn: function() {
                return this.get('minSize');
            }
        },

        /**
         * Object containing a `content` attribute, which will be used as the
         * column's content.
         *
         * @attribute value
         * @default null
         * @type {Object}
         */
        value: {
            validator: function(val) {
                return A.Lang.isObject(val) || A.Lang.isNull(val);
            },
            value: null
        }
    }
});
