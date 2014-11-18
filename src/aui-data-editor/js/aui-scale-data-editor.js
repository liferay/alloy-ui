/**
 * The Scale Data Editor Component
 *
 * @module aui-scale-data-editor
 */

var CSS_SCALE_DATA_EDITOR = A.getClassName('scale', 'data', 'editor'),
    CSS_SCALE_DATA_EDITOR_HIGHER_VALUE = A.getClassName('scale', 'data', 'editor', 'higher', 'value'),
    CSS_SCALE_DATA_EDITOR_LOWER_VALUE = A.getClassName('scale', 'data', 'editor', 'lower', 'value');

/**
 * A base class for Scale Data Editor.
 *
 * @class A.ScaleDataScale
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.ScaleDataEditor = A.Base.create('scale-data-editor', A.DataEditor, [], {
    TPL_EDITOR_CONTENT: '<div class="' + CSS_SCALE_DATA_EDITOR + '"><label></label>' +
        '<input type="text" class="' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE + '"></input> - ' +
        '<input type="text" class="' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE + '"></input></div>',

    /**
     * Returns `true` if this edited value array has no elements on 0 and 1 positions.
     *
     * @method isEmpty
     * @return {Boolean}
     */
    isEmpty: function() {
        return !(this.get('editedValue')[0] && this.get('editedValue')[1]);
    },

    /**
     * If the Scale Data Editor has Numbers on both inputs this will return true.
     *
     * @method isValid
     * @return {Boolean}
     */
    isValid: function() {
        if (A.ScaleDataEditor.superclass.isValid.call(this)) {
            return this._filterInt(this.get('editedValue')[0]) <
                this._filterInt(this.get('editedValue')[1]);
        }

        return false;
    },

    /**
     * Updates the editor's UI to display the given value.
     *
     * @method updateUiWithValue
     * @param originalValue
     */
    updateUiWithValue: function(originalValue) {
        var node = this.get('node');

        node.one('.' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE).set('value', originalValue[0]);
        node.one('.' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE).set('value', originalValue[1]);
    },

    /**
     * Gets the edited value of the data from the editor.
     *
     * @method _getEditedValue
     * @protected
     */
    _getEditedValue: function() {
        var node = this.get('node'),
            lower = node.one('.' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE).get('value'),
            higher = node.one('.' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE).get('value');

        return [lower, higher];
    },

    /**
     * Stricter way to parse int values.
     *
     * @param  {String | Number} value
     * @return {Number}
     * @protected
     */
    _filterInt: function (value) {
        if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value)){
            return Number(value);
        }
        return NaN;
    },
    /**
     * Sets the `originalValue` attribute.
     * Makes sure `originalValue` is an array of at least 2 positions.
     *
     * @method _setOriginalValue
     * @param {Array} val
     * @return {Array}
     * @protected
     */
    _setOriginalValue: function(val) {
        if (val.length === 0) {
            val.push('', '');
        }
        else if (val.length === 1) {
            val.push('');
        }

        return val;
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.ScaleDataEditor`.
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
         * @type Array
         */
        editedValue: {
            getter: '_getEditedValue',
            validator: A.Lang.isArray,
            value: []
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @type Array
         */
        originalValue: {
            setter: '_setOriginalValue',
            validator: A.Lang.isArray,
            value: []
        }
    }
});
