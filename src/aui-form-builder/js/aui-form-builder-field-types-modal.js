/**
 * The Form Builder Field Types Modal Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-types-modal
 */

var CSS_FIELD_TYPE = A.getClassName('field', 'type'),
    CSS_FIELD_TYPES_LIST = A.getClassName('form', 'builder', 'field', 'types', 'list'),
    CSS_FIELD_TYPES_MODAL_TITLE = A.getClassName('modal', 'title');

/**
 * `A.FormBuilder` extension, which is responsible for all the logic related
 * to displaying the field types for the user.
 *
 * @class A.FormBuilderFieldTypesModal
 * @param {Object} config Object literal specifying layout builder configuration
 *     properties.
 * @constructor
 */

A.FormBuilderFieldTypesModal = A.Base.create('form-builder-field-types-modal', A.Modal, [], {
    TPL_HEADER_LABEL: '<h4 class="' + CSS_FIELD_TYPES_MODAL_TITLE + '">{addField}</h4>',
    TPL_TYPES_LIST: '<div class="clearfix ' + CSS_FIELD_TYPES_LIST + '" role="main"></div>',

    /**
     * Construction logic executed during the `A.FormBuilderFieldTypesModal`
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('fieldTypesChange', this._afterFieldTypesChange);
    },

    /**
     * Bind the events on the FormBuilderFieldTypesModal UI. Lifecycle.
     *
     * @method bindUI
     * @protected
     */
    bindUI: function() {
        var bodyNode = this.getStdModNode('body');

        A.FormBuilderFieldTypesModal.superclass.bindUI.apply(this, arguments);

        this._eventHandles.push(
            bodyNode.delegate('click', this._onClickFieldType, '.' + CSS_FIELD_TYPE, this),
            bodyNode.delegate('key', A.bind(this._onKeyPressFieldType, this), 'enter', '.' + CSS_FIELD_TYPE)
        );
    },

    /**
     * Renders the FormBuilderFieldTypesModal component instance. Lifecycle.
     *
     * @method renderUI
     * @protected
     */
    renderUI: function() {
        A.FormBuilderFieldTypesModal.superclass.renderUI.apply(this, arguments);

        this._uiSetFieldTypes(this.get('fieldTypes'));
    },

    /**
     * Fires after `fieldTypes` attribute changes.
     *
     * @method _afterFieldTypesChange
     * @protected
     */
    _afterFieldTypesChange: function() {
        this._uiSetFieldTypes(this.get('fieldTypes'));
    },

    /**
     * Fired when a field type is clicked.
     *
     * @method _onClickFieldType
     * @param {EventFacade} event
     * @protected
     */
    _onClickFieldType: function(event) {
        var fieldType = event.currentTarget.getData('fieldType');

        this.hide();

        this.fire('selectFieldType', {
            fieldType: fieldType
        });
    },

    /**
     * Fired when the close button for the field types modal is clicked.
     *
     * @method _onFieldTypesModalCloseClick
     * @protected
     */
    _onFieldTypesModalCloseClick: function() {
        this.hide();
    },

    /**
     * Fired when a field type is keypressed.
     *
     * @method _onKeyPressFieldType
     * @param {EventFacade} event
     * @protected
     */
    _onKeyPressFieldType: function(event) {
        this._onClickFieldType(event);
    },

    /**
     * Updates the ui according to the value of the `fieldTypes` attribute.
     *
     * @method _uiSetFieldTypes
     * @param {Array} fieldTypes
     * @protected
     */
    _uiSetFieldTypes: function(fieldTypes) {
        var fieldTypesListNode = A.Node.create(this.TPL_TYPES_LIST);

        fieldTypesListNode.get('children').remove();

        A.Array.each(fieldTypes, function(type) {
            fieldTypesListNode.append(type.get('node'));
        });

        this.set('bodyContent', fieldTypesListNode);
    },

    /**
     * Returns the template of the modal header.
     *
     * @method _valueHeaderContent
     * @return {Object}
     * @protected
     */
    _valueHeaderContent: function() {
        return A.Lang.sub(this.TPL_HEADER_LABEL, {
            addField: this.get('strings').addField
        });
    },

    /**
     * Returns the configuration object for the field types modal
     * toolbar.
     *
     * @method _valueToolbars
     * @return {Object}
     * @protected
     */
    _valueToolbars: function() {
        return {
            header: [
                {
                    cssClass: 'close',
                    discardDefaultButtonCssClasses: true,
                    labelHTML: '<span> \u00D7 </span>',
                    on: {
                        click: A.bind(this._onFieldTypesModalCloseClick, this)
                    }
                }
            ]
        };
    }
}, {
    ATTRS: {
        /**
         * The collection of field types that can be selected as fields for
         * this form builder.
         *
         * @attribute fieldTypes
         * @default []
         * @type Array
         */
        fieldTypes: {
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * The content displayed in the modal header.
         *
         * @attribute headerContent
         * @type String
         */
        headerContent: {
            valueFn: '_valueHeaderContent'
        },

        /**
         * The text strings displayed by this component.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                addField: 'Add Field'
            }
        },

        /**
         * The toolbar configuration object.
         *
         * @attribute toolbar
         * @type Object
         */
        toolbars: {
            validator: A.Lang.isObject,
            valueFn: '_valueToolbars'
        }
    },

    CSS_PREFIX: 'modal-dialog'
});
