/**
 * The Form Builder II Component
 *
 * @module aui-form-builder-II
 */

/**
 * A base class for `A.FormBuilderII`.
 *
 * @class A.FormBuilder
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include
 * @include
 */
A.FormBuilderII  = A.Base.create('form-builder-II', A.Widget, [
], {

    /**
     * Construction logic executed during the FormBuilder
     * instantiation. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this._modal = new A.Modal({
            bodyContent: '<div class="field-types-list" role="main" />',
            centered: true,
            draggable: false,
            modal: true,
            resizable: false,
            toolbars: null,
            visible: false,
            cssClass: 'form-builder-modal'
        }).render(this.get('contentBox'));
    },

    /**
     * Destructor lifecycle implementation for the `TooltipDelegate` class.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        A.Array.each(this.get('fieldTypes'), function(field) {
            field.destroy();
        });

        this._modal.destroy();
    },

    /**
     * Sets the form builder modal visibility to `false`.
     *
     * @method hideFieldsPanel
     */
    hideFieldsPanel: function() {
        this._modal.set('visible', false);
    },

    /**
     * Adds a new Field Type to the Form Buider.
     *
     * @method registerFieldType
     * @param val {Array | Object | A.FormBuilderIIFieldType}
     */
    registerFieldType: function(val) {
        var instance = this;

        if (A.Lang.isArray(val)) {
            A.Array.each(val, function(field) {
                instance._registerFieldType(field);
            });
        }
        else {
            instance._registerFieldType(val);
        }
    },

    /**
     * Sets the form builder modal visibility to `true`.
     *
     * @method showFieldsPanel
     */
    showFieldsPanel: function() {
        this._modal.set('visible', true);
    },

    /**
     * Removes a Field Type from fieldTypes of this Form Buider.
     *
     * @method unregisterFieldType
     * @param val {String | A.FormBuilderIIFieldType}
     */
    unregisterFieldType: function(field) {
        var index,
            fieldTypes = this.get('fieldTypes');

        if (field instanceof A.FormBuilderIIFieldType) {
            index = fieldTypes.indexOf(field);
            if (index !== -1) {
                fieldTypes[index].destroy();
                fieldTypes.splice(index, 1);
            }
        }
    },

    /**
     * Removes a Field Type from fieldTypes of this Form Buider.
     *
     * @method _registerFieldType
     * @param fieldObj {Object | A.FormBuilderIIFieldType}
     */
    _registerFieldType: function(fieldObj) {
        var fieldNode;

        if (fieldObj instanceof A.FormBuilderIIFieldType) {
            fieldNode = fieldObj;
        }
        else {
            fieldNode = new A.FormBuilderIIFieldType(fieldObj);
        }

        this.get('boundingBox').one('.field-types-list').appendChild(fieldNode.get('fieldTypeNode'));
        this.get('fieldTypes').push(fieldNode);
    }

}, {

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderII`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The collection of field types.
         *
         * @attribute fields
         * @default []
         * @type Array
         */
        fieldTypes: {
            value: []
        }
    }

});