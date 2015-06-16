/**
 * The Data Editor Component
 *
 * @module aui-data-editor
 */

var CSS_EDITOR = A.getClassName('data', 'editor'),
    CSS_EDITOR_CONTENT_INNER = A.getClassName('data', 'editor', 'content', 'inner'),
    CSS_EDITOR_LABEL = A.getClassName('data', 'editor', 'label'),
    CSS_EDITOR_REQUIRED_LABEL = A.getClassName('data', 'editor', 'required', 'label'),

    TPL_EDITOR = '<div class="' + CSS_EDITOR + '">' +
        '<div><label class="' + CSS_EDITOR_LABEL + ' control-label"></label>' +
        '<label class="' + CSS_EDITOR_REQUIRED_LABEL + ' control-label">{required}</label></div>' +
        '<div class="' + CSS_EDITOR_CONTENT_INNER + '"></div>' +
        '</div>';

/**
 * A base class for Data Editor. All data editors should extend from this.
 *
 * @class A.DataEditor
 * @extends A.Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.DataEditor = A.Base.create('data-editor', A.Base, [], {
    TPL_EDITOR_CONTENT: '<div></div>',

    /**
     * Constructor for the `A.DataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var contentNode,
            node = this.get('node');

        contentNode = A.Lang.sub(this.TPL_EDITOR_CONTENT, this.get('strings'));

        node.one('.' + CSS_EDITOR_CONTENT_INNER).setHTML(contentNode);

        this._uiSetLabel(this.get('label'));
        this._uiSetRequired(this.get('required'));
        this._uiSetVisible(this.get('visible'));

        this.after({
            labelChange: this._afterLabelChange,
            requiredChange: this._afterRequiredChange,
            visibleChange: this._afterVisibleChange
        });
    },

    /**
     * Destructor lifecycle implementation for the `A.DataEditor` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this.get('node').remove(true);
    },

    /**
     * Returns `true` if this edited value has no elements.
     * This should be overridden by subclasses, otherwise it always returns `false`.
     *
     * @method isEmpty
     */
    isEmpty: function() {
        return false;
    },

    /**
     * If the data editor is required and empty this will return false.
     *
     * @method isValid
     * @return {Boolean}
     */
    isValid: function() {
        if(!this.get('required')) {
            return true;
        }
        return !this.isEmpty();
    },

    /**
     * Fired after the `label` attribute is set.
     *
     * @method _afterLabelChange
     * @protected
     */
    _afterLabelChange: function() {
        this._uiSetLabel(this.get('label'));
    },

    /**
     * Fired after the `required` attribute is set.
     *
     * @method _afterRequiredChange
     * @protected
     */
    _afterRequiredChange: function() {
        this._uiSetRequired(this.get('required'));
    },

    /**
     * Fired after the `visible` attribute is set.
     *
     * @method _afterVisibleChange
     * @protected
     */
    _afterVisibleChange: function() {
        this._uiSetVisible(this.get('visible'));
    },

    /**
     * Updates the ui according to the value of the `label` attribute.
     *
     * @method _uiSetLabel
     * @param {String} label
     * @protected
     */
    _uiSetLabel: function(label) {
        var labelNode = this.get('node').one('label');

        labelNode.set('text', label);
        labelNode.toggleView(A.Lang.trim(label) !== '');
    },

    /**
     * Updates the ui according to the value of the `required` attribute.
     *
     * @method _uiSetRequired
     * @param required
     * @protected
     */
    _uiSetRequired: function(required) {
        var requiredNode = this.get('node').one('.' + CSS_EDITOR_REQUIRED_LABEL);

        if (required) {
            requiredNode.show();
        }
        else {
            requiredNode.hide();
        }
    },

    /**
     * Updates the ui according to the value of the `visible` attribute.
     *
     * @method _uiSetVisible
     * @param visible
     * @protected
     */
    _uiSetVisible: function(visible) {
        if (visible) {
            this.get('node').show();
        }
        else {
            this.get('node').hide();
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.DataEditor`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {
        /**
         * The value after edition.
         *
         * @attribute editedValue
         * @default null
         * @type *
         */
        editedValue: {
            value: null
        },

        /**
         * The label to be used by this boolean editor.
         *
         * @attribute label
         * @default ''
         * @type String
         */
        label: {
            value: ''
        },

        /**
         * The node where the editor UI is rendered.
         *
         * @attribute node
         * @type Node
         */
        node: {
            readOnly: true,
            valueFn: function() {
                return A.Node.create(A.Lang.sub(TPL_EDITOR, {
                    required: this.get('strings').required
                }));
            }
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @default null
         * @type *
         */
        originalValue: {
            value: null
        },

        /**
         * Defines if the data editor is required or not.
         *
         * @attribute required
         * @default false
         */
        required: {
            validator: A.Lang.isBoolean,
            value: false
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                required: 'REQUIRED'
            },
            writeOnce: true
        },

        /**
         * Determines if `DataEditor` is visible or not.
         *
         * @attribute visible
         * @default false
         * @type Boolean
         */
        visible: {
            validator: A.Lang.isBoolean,
            value: true
        }
    }
});
