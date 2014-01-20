/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-fieldset
 */

var L = A.Lang,

    ACCEPT_CHILDREN = 'acceptChildren',
    BUILDER = 'builder',
    CONTENT_BOX = 'contentBox',
    DOT = '.',
    DROP = 'drop',
    DROP_ZONE_NODE = 'dropZoneNode',
    FORM = 'form',
    FORM_BUILDER_FIELD = 'form-builder-field',
    FORM_BUILDER_FIELDSET_FIELD = 'form-builder-fieldset-field',
    ID = 'id',
    LABEL = 'label',
    NO = 'no',
    NODE = 'node',
    SHOW_LABEL = 'showLabel',
    SPACE = ' ',
    TEMPLATE = 'template',
    TEMPLATE_NODE = 'templateNode',
    TYPE = 'type',
    YES = 'yes',
    ZONE = 'zone',

    getCN = A.getClassName,

    CSS_FIELD_LABEL = getCN(FORM_BUILDER_FIELD, LABEL),
    CSS_FORM_BUILDER_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
    CSS_FORM_BUILDER_FIELD = getCN(FORM_BUILDER_FIELD),
    CSS_FORM_BUILDER_FIELD_NODE = getCN(FORM_BUILDER_FIELD, NODE),

    TPL_FIELDSET = '<fieldset id="{id}" class="' + [CSS_FORM_BUILDER_FIELD_NODE].join(SPACE) + '"></fieldset>',
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
    NAME: FORM_BUILDER_FIELDSET_FIELD,

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
    UI_ATTRS: [ACCEPT_CHILDREN, LABEL, SHOW_LABEL],

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
                instance.get(TEMPLATE), {
                    id: instance.get(ID)
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
                attributeName: TYPE,
                editor: false,
                name: strings[TYPE]
            }, {
                attributeName: LABEL,
                editor: new A.TextCellEditor(),
                name: strings[LABEL]
            }, {
                attributeName: SHOW_LABEL,
                editor: new A.RadioCellEditor({
                    options: {
                        'true': strings[YES],
                        'false': strings[NO]
                    }
                }),
                formatter: A.bind(instance._booleanFormatter, instance),
                name: strings[SHOW_LABEL]
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
                contentBox = instance.get(CONTENT_BOX),
                dropZone = instance.get(DROP_ZONE_NODE),
                markupDropZone = contentBox.one(DOT + CSS_FORM_BUILDER_DROP_ZONE);

            if (val && !markupDropZone) {
                contentBox.append(dropZone);
            }
            else if (!val && markupDropZone) {
                markupDropZone.remove();
            }
            else if (val && markupDropZone) {
                instance.set(DROP_ZONE_NODE, markupDropZone);
            }

            instance.get(TEMPLATE_NODE).hide();
        }

    }

});

A.FormBuilderFieldsetField = FormBuilderFieldsetField;

A.FormBuilder.types.fieldset = A.FormBuilderFieldsetField;
