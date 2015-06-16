/**
 * The Options Data Editor Component
 *
 * @module aui-options-data-editor
 */

var CSS_EDITOR = A.getClassName('options', 'data', 'editor'),
    CSS_EDITOR_ADD = A.getClassName('options', 'data', 'editor', 'add'),
    CSS_EDITOR_OPTION = A.getClassName('options', 'data', 'editor', 'option'),
    CSS_EDITOR_OPTION_HANDLE = A.getClassName('options', 'data', 'editor', 'option', 'handle'),
    CSS_EDITOR_OPTION_REMOVE = A.getClassName('options', 'data', 'editor', 'option', 'remove'),
    CSS_EDITOR_OPTION_TEXT = A.getClassName('options', 'data', 'editor', 'option', 'text'),
    CSS_EDITOR_OPTIONS = A.getClassName('options', 'data', 'editor', 'options'),

    SOURCE_UI = 'ui';

/**
 * A base class for Options Data Editor.
 *
 * @class A.OptionsDataEditor
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.OptionsDataEditor = A.Base.create('options-data-editor', A.DataEditor, [], {
    TPL_EDITOR_CONTENT: '<div class="' + CSS_EDITOR + '">' +
        '<div class="' + CSS_EDITOR_OPTIONS + '"></div>' +
        '<button class="' + CSS_EDITOR_ADD + '">{addOption}</button></div>',
    TPL_EDITOR_OPTION: '<div class="' + CSS_EDITOR_OPTION + '">' +
        '<span class="' + CSS_EDITOR_OPTION_HANDLE + ' glyphicon glyphicon-sort"></span>' +
        '<input class="' + CSS_EDITOR_OPTION_TEXT + ' type="text"" value="{text}"></input>' +
        '<button class="' + CSS_EDITOR_OPTION_REMOVE + '">X</button></div>',

    /**
     * Constructor for the `A.OptionsDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        var node = this.get('node');

        this._uiSetEditedValue(this.get('editedValue'));

        node.one('.' + CSS_EDITOR_ADD).after('click', A.bind(this._afterClickAddButton, this));
        node.delegate('click', A.bind(this._onClickRemoveButton, this), '.' + CSS_EDITOR_OPTION_REMOVE);
        node.delegate('valuechange', A.bind(this._onValueChange, this), '.' + CSS_EDITOR_OPTION_TEXT);
        this.after('editedValueChange', this._afterEditedValueChange);

        this._setUpDrag();
    },

    /**
     * Returns `true` if this edited value has no elements.
     *
     * @method isEmpty
     * @return {Boolean}
     */
    isEmpty: function() {
        return !this.get('editedValue').length;
    },

    /**
     * If the Option Data Editor has a String in each option field  this will return true.
     *
     * @method isValid
     * @return {Boolean}
     */
    isValid: function() {
        var instance = this,
            i,
            options = this.get('editedValue'),
            optionsLength = options.length;

        if (A.OptionsDataEditor.superclass.isValid.call(instance)) {
            for (i = 0; i < optionsLength; i++) {
                if (!A.Lang.trim(options[i])) {
                    return false;
                }
            }
            return true;
        }
        else {
            return false;
        }
    },

    /**
     * Fired after the button for adding options is clicked.
     *
     * @method _afterClickAddButton
     * @protected
     */
    _afterClickAddButton: function() {
        var editedValue = this.get('editedValue'),
            optionsContainer = this.get('node').one('.' + CSS_EDITOR_OPTIONS);

        optionsContainer.append(this._createOptionNode(''));

        editedValue.push('');
        this.set('editedValue', editedValue, {
            src: SOURCE_UI
        });
    },

    /**
     * Fired after the `editedValue` attribute is set.
     *
     * @method _afterEditedValueChange
     * @param {CustomEvent} event The fired event
     * @protected
     */
    _afterEditedValueChange: function(event) {
        if (event.src !== SOURCE_UI) {
            this._uiSetEditedValue(this.get('editedValue'));
        }
    },

    /**
     * Creates an option node.
     *
     * @method _createOptionNode
     * @param {String} text
     * @return {Node}
     * @protected
     */
    _createOptionNode: function(text) {
        var optionNode = A.Node.create(A.Lang.sub(this.TPL_EDITOR_OPTION, {
            text: text
        }));

        optionNode.plug(A.Plugin.Drop);
        return optionNode;
    },

    /**
     * Gets the option node's index in the options list.
     *
     * @method _getOptionNodeIndex
     * @param {Node} node
     * @protected
     */
    _getOptionNodeIndex: function(node) {
        var optionNode = node.ancestor('.' + CSS_EDITOR_OPTION, true),
            optionNodes = this.get('node').all('.' + CSS_EDITOR_OPTION);

        return optionNodes.indexOf(optionNode);
    },

    /**
     * Moves the item from an index to another in the items array.
     *
     * @method _moveItem
     * @param {Number} from
     * @param {Number} to
     * @protected
     */
    _moveItem: function(from, to) {
        var editedValue = this.get('editedValue'),
            item = editedValue[from];

        editedValue.splice(from, 1);
        if (from < to) {
            to--;
        }
        editedValue.splice(to, 0, item);

        this.set('editedValue', editedValue, {
            src: SOURCE_UI
        });
    },

    /**
     * Fired when a button for removing an option is clicked.
     *
     * @method _onClickRemoveButton
     * @param {EventFacade} event
     * @protected
     */
    _onClickRemoveButton: function(event) {
        var editedValue = this.get('editedValue'),
            index = this._getOptionNodeIndex(event.currentTarget),
            optionNode = event.currentTarget.ancestor('.' + CSS_EDITOR_OPTION);

        this._removeOptionNode(optionNode);

        editedValue.splice(index, 1);
        this.set('editedValue', editedValue, {
            src: SOURCE_UI
        });
    },

    /**
     * Fired when the value of one of the editors text fields changes.
     *
     * @method _onValueChange
     * @param {EventFacade} event
     * @protected
     */
    _onValueChange: function(event) {
        var editedValue = this.get('editedValue'),
            index = this._getOptionNodeIndex(event.currentTarget);

        editedValue[index] = event.currentTarget.get('value');
        this.set('editedValue', editedValue, {
            src: SOURCE_UI
        });
    },

    /**
     * Fired after the `drag:drag` event is triggered.
     *
     * @method _onDrag
     * @param {EventFacade} event
     * @protected
     */
    _onDrag: function(event) {
        if (event.target.lastXY[1] < this._lastY) {
            this._draggingUp = true;
        } else {
            this._draggingUp = false;
        }

        this._lastY = event.target.lastXY[1];
    },

    /**
     * Fired after the `drag:over` event is triggered.
     *
     * @method _onDragOver
     * @param {EventFacade} event
     * @protected
     */
    _onDragOver: function(event) {
        var dragNode = event.drag.get('node'),
            dropNode = event.drop.get('node'),
            indexDrag = this._getOptionNodeIndex(dragNode),
            indexDrop;

        if (!this._draggingUp) {
            dropNode = dropNode.get('nextSibling');
        }
        indexDrop = this._getOptionNodeIndex(dropNode);

        event.drop.get('node').get('parentNode').insertBefore(dragNode, dropNode);
        event.drop.sizeShim();

        this._moveItem(indexDrag, indexDrop);
    },

    /**
     * Removes the given option node.
     *
     * @method _removeOptionNode
     * @param {Node} optionNode
     * @protected
     */
    _removeOptionNode: function(optionNode) {
        optionNode.unplug(A.Plugin.Drop);
        optionNode.remove();
    },

    /**
     * Sets up everything needed for dragging options to different positions.
     *
     * @method _setUpDrag
     * @protected
     */
    _setUpDrag: function() {
        this._delegateDrag = new A.DD.Delegate({
            container: this.get('node'),
            handles: ['.' + CSS_EDITOR_OPTION_HANDLE],
            nodes: '.' + CSS_EDITOR_OPTION
        });
        this._delegateDrag.dd.plug(A.Plugin.DDConstrained, {
            stickY: true
        });
        this._delegateDrag.dd.plug(A.Plugin.DDProxy, {
            cloneNode: true,
            moveOnEnd: false
        });

        this._delegateDrag.after('drag:drag', A.bind(this._onDrag, this));
        this._delegateDrag.after('drag:over', A.bind(this._onDragOver, this));
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param {Array} editedValue
     * @protected
     */
    _uiSetEditedValue: function(editedValue) {
        var instance = this,
            optionsContainer = this.get('node').one('.' + CSS_EDITOR_OPTIONS);

        optionsContainer.all('.' + CSS_EDITOR_OPTION).each(function(optionNode) {
            instance._removeOptionNode(optionNode);
        });

        A.Array.each(editedValue, function(option) {
            optionsContainer.append(instance._createOptionNode(option));
        });
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.OptionsDataEditor`.
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
         * @default []
         * @type Boolean
         */
        editedValue: {
            value: []
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @default []
         * @type Array
         */
        originalValue: {
            value: []
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type {Object}
         */
        strings: {
            value: {
                addOption: 'Tap to add an option',
                required: 'REQUIRED'
            }
        }
    }
});
