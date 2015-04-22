/**
 * The Form Builder Type Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-type
 */

/**
 * A base class for `A.FormBuilderFieldType`.
 *
 * @class A.FormBuilderFieldType
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldType = A.Base.create('form-builder-field-type', A.Base, [], {
    TPL_FIELD_TYPE: '<div class="field-type" tabindex="0"></div>',
    TPL_FIELD_TYPE_CONTENT: '<div class="field-type-icon {icon}"></div>' +
        '<div class="field-type-label">{label}</div></div>',

    /**
     * Constructor for `A.FormBuilderFieldType`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.get('node').setHTML(
            A.Lang.sub(this.TPL_FIELD_TYPE_CONTENT, {
                icon: this.get('icon'),
                label: this.get('label')
            })
        );
        this.get('node').setData('fieldType', this);

        this._uiSetDisabled(this.get('disabled'));

        this.after({
            disabledChange: this._afterDisabledChange,
            iconChange: this._afterIconChange,
            labelChange: this._afterLabelChange
        });

        this.get('node').on('mouseleave', A.bind(this._onMouseLeave, this));
        this.get('node').on('mouseover', A.bind(this._onMouseOver, this));
    },

    /**
     * Destructor implementation for `A.FormBuilderFieldType`. Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function () {
        this.get('node').remove(true);
    },

    /**
     * Fired after the `disabled` attribute is set.
     *
     * @method _afterDisabledChange
     * @protected
     */
    _afterDisabledChange: function() {
        this._uiSetDisabled(this.get('disabled'));
    },

    /**
     * Fired after the `icon` attribute is set.
     *
     * @method _afterIconChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterIconChange: function(event) {
        var iconNode = this.get('node').one('.field-type-icon');

        if (iconNode) {
            iconNode.replaceClass(event.prevVal, event.newVal);
        }
    },

    /**
     * Fired after the `label` attribute is set.
     *
     * @method _afterLabelChange
     * @protected
     */
    _afterLabelChange: function() {
        var labelElement = this.get('node').one('.field-type-label');

        if (labelElement) {
            labelElement.setHTML(this.get('label'));
        }
    },

    /**
     * Fire when `mouseleave` the field type.
     *
     * @method _onMouseLeave
     * @protected
     */
   _onMouseLeave: function() {
        var node = this.get('node');

        node.one('.field-type-label').removeClass('field-type-label-mouse-over');
        node.one('.field-type-icon').removeClass('field-type-icon-mouse-over');
    },

    /**
     * Fire when `mouseover` the field type.
     *
     * @method _onMouseOver
     * @protected
     */
   _onMouseOver: function() {
        var node = this.get('node');

        node.one('.field-type-label').addClass('field-type-label-mouse-over');
        node.one('.field-type-icon').addClass('field-type-icon-mouse-over');
    },

    /**
     * Updates the UI according to the value of the `disabled` attribute.
     *
     * @method _uiSetDisabled
     * @param {Boolean} disabled
     * @protected
     */
    _uiSetDisabled: function(disabled) {
        this.get('node').toggleClass('field-type-disabled', disabled);
    }
}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderFieldType`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The default configuration object to be used when creating an instance
         * of a field of this type.
         *
         * @attribute defaultConfig
         * @default {}
         * @type {Object}
         */
        defaultConfig: {
            validator: A.Lang.isObject,
            value: {}
        },

        /**
         * Defines if the field type should be disabled or not.
         *
         * @attribute disabled
         * @default false
         * @type {Boolean}
         */
        disabled: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * The js class constructor to be used when instantiating this field.
         *
         * @attribute fieldClass
         * @type {Function}
         */
        fieldClass: {
            validator: A.Lang.isFunction
        },

        /**
         * Contains a CSS class of the icon to use. A list of icons can be found
         * [here](http://liferay.github.io/alloy-bootstrap/base-css.html#icons).
         *
         * @attribute icon
         * @default ''
         * @type {String}
         */
        icon: {
            validator: A.Lang.isString,
            value: ''
        },

        /**
         * The label of the input field.
         *
         * @attribute label
         * @default ''
         * @type {String}
         */
        label: {
            validator: A.Lang.isString,
            value: ''
        },

        /**
         * The node used to render this field type.
         *
         * @attribute node
         * @type {Node}
         */
        node: {
            validator: function(val) {
                return A.instanceOf(val, A.Node);
            },
            valueFn: function() {
                return A.Node.create(this.TPL_FIELD_TYPE);
            }
        },

        /**
         * Defines if the input field is unique or not.
         *
         * @attribute unique
         * @default false
         * @type {Boolean}
         */
        unique: {
            validator: A.Lang.isBoolean,
            value: false
        }
    }
});
