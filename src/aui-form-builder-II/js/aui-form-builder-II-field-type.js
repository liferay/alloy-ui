/**
 * The Form Builder Component
 *
 * @module aui-form-builder-II
 * @submodule aui-form-builder-II-field-type
 */

/**
 * A base class for `A.FormBuilderIIFieldType`.
 *
 * @class A.FormBuilderIIFieldType
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderIIFieldType = A.Base.create('form-builder-II-field-type', A.Base, [
    
], {

    FIELD_TYPE_TEMPLATE: '<div class="field-type">' +
                            '<div class="field-type-icon glyphicon {icon}"></div>' +
                            '<div class="field-type-label">{label}</div></div>' +
                        '</div>',

    /**
     * Render the `A.FormBuilderIIFieldType` component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    initializer: function() {
        var instance = this;

        this.set('fieldTypeNode', A.Node.create(
            A.Lang.sub(instance.FIELD_TYPE_TEMPLATE, {
                icon: instance.get('icon'),
                label: instance.get('label')
            })
        ));

        if (this.get('disabled')) {
            this.get('fieldTypeNode').addClass('field-type-disabled');
        }

        this.on('disabledChange', instance._onDisabledChange);
        this.on('iconChange', instance._onIconChange);
        this.on('labelChange', instance._onLabelChange);
    },

    /**
     * Destructor for the Field Type component.
     * @method destructor
     * @private
     */
    destructor: function () {
        this.get('fieldTypeNode').remove(true);
    },

    /**
     * Determines the value of the `disabled` attribute.
     *
     * @method _onDisabledChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _onDisabledChange: function(event) {
        if (event.newVal) {
            this.get('fieldTypeNode').addClass('field-type-disabled');
        } else {
            this.get('fieldTypeNode').removeClass('field-type-disabled');
        }
    },

    /**
     * Determines the value of the `icon` attribute.
     *
     * @method setIcon
     * @param {CustomEvent} event The fired event
     */
    _onIconChange: function(event) {
        var icon = event,
            glyphicon = this.get('fieldTypeNode').one('.field-type-icon');

        if (glyphicon) {
            glyphicon.removeClass(this.get('icon'));
            glyphicon.addClass('glyphicon ' + icon.newVal);
        }
    },

    /**
     * Determines the value of the `label` attribute.
     *
     * @method _onLabelChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _onLabelChange: function(event) {
        var labelElement = this.get('fieldTypeNode').one('.field-type-label');

        if (labelElement) {
            labelElement.setHTML(event.newVal);
        }
    }

}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderIIFieldType`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The Node of Field Type.
         *
         * @attribute fieldTypeNode
         */
        fieldTypeNode: {},

        /**
         * Defines if the field type should be enable or not.
         *
         * @attribute disabled
         * @type {Boolean}
         */
        defaultConfig: {
            validator: A.Lang.isObject
        },

        /**
         * Defines if the field type should be enable or not.
         *
         * @attribute disabled
         * @type {Boolean}
         */
        disabled: {
            validator: A.Lang.isBoolean
        },

        /**
         * Contains a CSS class of the icon to use. A list of icons can be found
         * [here](http://liferay.github.io/alloy-bootstrap/base-css.html#icons).
         *
         * @attribute icon
         * @type {String}
         */
        icon: {
            validator: A.Lang.isString
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
         * Checks if the input field is unique or not.
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