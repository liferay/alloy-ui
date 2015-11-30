YUI.add('aui-form-builder-field-fieldset-deprecated', function (A, NAME) {

/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-fieldset
 */

var L = A.Lang,

    AEscape = A.Escape,

    getCN = A.getClassName,

    CSS_FIELD_LABEL = getCN('form-builder-field', 'label'),
    CSS_FORM_BUILDER_DROP_ZONE = getCN('form', 'builder', 'drop', 'zone'),
    CSS_FORM_BUILDER_FIELD = getCN('form-builder-field'),
    CSS_FORM_BUILDER_FIELD_NODE = getCN('form-builder-field', 'node'),

    TPL_FIELDSET = '<fieldset id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(' ') + '"></fieldset>',
    TPL_LEGEND = '<legend class="' + CSS_FIELD_LABEL + '"></legend>';

/**
 * A base class for `A.FormBuilderFieldsetField`.
 *
 * @class A.FormBuilderFieldsetField
 * @extends A.FormBuilderField
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var FormBuilderFieldsetField = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-builder-fieldset-field',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormBuilderFieldsetField`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * If `true` children are accepted.
         *
         * @attribute acceptChildren
         * @default true
         * @type Boolean
         * @readOnly
         */
        acceptChildren: {
            value: true,
            readOnly: true
        },

        /**
         * Indicates which is the type of data for the input field.
         *
         * @attribute dataType
         * @default undefined
         */
        dataType: {
            value: undefined
        },

        /**
         * Markup used to generate a label.
         *
         * @attribute labelNode
         */
        labelNode: {
            valueFn: function() {
                return A.Node.create(TPL_LEGEND);
            }
        },

        /**
         * Reusable block of markup used to generate the field.
         *
         * @attribute template
         */
        template: {
            valueFn: function() {
                return TPL_FIELDSET;
            }
        }

    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['acceptChildren', 'label', 'showLabel'],

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: CSS_FORM_BUILDER_FIELD,

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.FormBuilderField,

    prototype: {
        CONTENT_TEMPLATE: TPL_FIELDSET,

        /**
         * Injects data into the template and returns the HTML result.
         *
         * @method getHTML
         * @return {String}
         */
        getHTML: function() {
            var instance = this;

            return L.sub(
                instance.get('template'), {
                    id: AEscape.html(instance.get('id'))
                }
            );
        },

        /**
         * Returns a list of property models including the `A.TextCellEditor()`
         * and `A.RadioCellEditor` models.
         *
         * @method getPropertyModel
         */
        getPropertyModel: function() {
            var instance = this,
                strings = instance.getStrings();

            return [{
                attributeName: 'type',
                editor: false,
                name: strings.type
            }, {
                attributeName: 'label',
                editor: new A.TextCellEditor(),
                name: strings.label
            }, {
                attributeName: 'showLabel',
                editor: new A.RadioCellEditor({
                    options: {
                        'true': strings.yes,
                        'false': strings.no
                    }
                }),
                formatter: A.bind(instance._booleanFormatter, instance),
                name: strings.showLabel
            }];
        },

        /**
         * Set the `acceptChildren` attribute on the UI.
         *
         * @method _uiSetAcceptChildren
         * @param val
         * @protected
         */
        _uiSetAcceptChildren: function(val) {
            var instance = this,
                contentBox = instance.get('contentBox'),
                dropZone = instance.get('dropZoneNode'),
                markupDropZone = contentBox.one('.' + CSS_FORM_BUILDER_DROP_ZONE);

            if (val && !markupDropZone) {
                contentBox.append(dropZone);
            }
            else if (!val && markupDropZone) {
                markupDropZone.remove();
            }
            else if (val && markupDropZone) {
                instance.set('dropZoneNode', markupDropZone);
            }

            instance.get('templateNode').hide();
        }

    }

});

A.FormBuilderFieldsetField = FormBuilderFieldsetField;

A.FormBuilderField.types.fieldset = A.FormBuilderFieldsetField;


}, '3.0.1', {"requires": ["aui-form-builder-field-deprecated"]});
