YUI.add('aui-scale-data-editor', function (A, NAME) {

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
    TPL_EDITOR_CONTENT: '<div class="' + CSS_SCALE_DATA_EDITOR + ' form-inline row">' +
        '<input type="text" class="' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE + ' form-control"></input> - ' +
        '<input type="text" class="' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE + ' form-control"></input></div>',

    /**
     * Constructor for the `A.ScaleDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var node = this.get('node');

        this.lowerInput_ = node.one('.' + CSS_SCALE_DATA_EDITOR_LOWER_VALUE);
        this.lowerInput_.after('valuechange', A.bind(this._onLowerValueChange, this));

        this.higherInput_ = node.one('.' + CSS_SCALE_DATA_EDITOR_HIGHER_VALUE);
        this.higherInput_.after('valuechange', A.bind(this._onHigherValueChange, this));

        this.after('editedValueChange', this._afterEditedValueChange);
        this._uiSetEditedValue(this.get('editedValue'));
    },

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
     * Fired after the `editedValue` attribute is set.
     *
     * @method _afterEditedValueChange
     * @protected
     */
    _afterEditedValueChange: function() {
        this._uiSetEditedValue(this.get('editedValue'));
    },

    /**
     * Stricter way to parse int values.
     *
     * @method _filterInt
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
     * Fired when the lower input's value changes.
     *
     * @method _onHigherValueChange
     * @protected
     */
    _onHigherValueChange: function() {
        var editedValue = this.get('editedValue');

        editedValue[1] = this.higherInput_.get('value');
        this.set('editedValue', editedValue);
    },

    /**
     * Fired when the lower input's value changes.
     *
     * @method _onLowerValueChange
     * @protected
     */
    _onLowerValueChange: function() {
        var editedValue = this.get('editedValue');

        editedValue[0] = this.lowerInput_.get('value');
        this.set('editedValue', editedValue);
    },

    /**
     * Sets one of the range attributes (either `originalValue` or `editedValue`).
     * Makes sure it's an array of at least 2 positions.
     *
     * @method _setRangeValue
     * @param {Array} val
     * @return {Array}
     * @protected
     */
    _setRangeValue: function(val) {
        if (val.length === 0) {
            val.push('', '');
        }
        else if (val.length === 1) {
            val.push('');
        }

        return val;
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param {Array} editedValue
     * @protected
     */
    _uiSetEditedValue: function(editedValue) {
        this.lowerInput_.set('value', editedValue[0]);
        this.higherInput_.set('value', editedValue[1]);
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
            setter: '_setRangeValue',
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
            setter: '_setRangeValue',
            validator: A.Lang.isArray,
            value: []
        }
    }
});


}, '3.0.1', {"requires": ["aui-classnamemanager", "aui-data-editor", "event-valuechange"]});
