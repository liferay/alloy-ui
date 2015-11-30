YUI.add('aui-tabs-data-editor', function (A, NAME) {

/**
 * The Tabs Data Editor Component
 *
 * @module aui-tabs-data-editor
 */

var CSS_TABS_DATA_EDITOR = A.getClassName('tabs', 'data', 'editor'),
    CSS_TABS_DATA_EDITOR_TABS = A.getClassName('tabs', 'data', 'editor', 'tabs');

/**
 * A base class for Tabs Data Editor.
 *
 * @class A.TabsDataEditor
 * @extends A.DataEditor
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.TabsDataEditor = A.Base.create('tabs-data-editor', A.DataEditor, [], {
    TPL_EDITOR_CONTENT: '<div class="' + CSS_TABS_DATA_EDITOR + '">' +
        '<div class="' + CSS_TABS_DATA_EDITOR_TABS + '"></div></div>',

    /**
     * Constructor for the `A.TabsDataEditor`. Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        this.after('editedValueChange', this._afterEditedValueChange);
        this._uiSetEditedValue(this.get('editedValue'));
    },

    /**
     * Destructor lifecycle implementation for the `A.TabsDataEditor` class.
     * Lifecycle.
     *
     * @method destructor
     * @protected
     */
    destructor: function() {
        this._getTabView().destroy();
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
     * Fires after the `selectionChange` event from the tab view is triggered.
     *
     * @method _afterTabViewSelectionChange
     * @param {EventFacade} event
     * @protected
     */
    _afterTabViewSelectionChange: function(event) {
        var index = this._getTabView().indexOf(event.newVal);

        this.set('editedValue', this.get('tabs')[index].value);
    },

    /**
     * Creates the `A.TabView` widget that will handle this editor's tabs.
     *
     * @method _createTabView
     * @return {Node}
     * @protected
     */
    _createTabView: function() {
        var tabsNode = this.get('node').one('.' + CSS_TABS_DATA_EDITOR_TABS),
            tabView;

        tabView = new A.TabView({
            children: this.get('tabs')
        });
        tabView.render(tabsNode);

        tabView.after('selectionChange', A.bind(this._afterTabViewSelectionChange, this));

        return tabView;
    },

    /**
     * Looks for a tab that is represented by the given value and returns its
     * index on the tab view.
     *
     * @method _findTabIndexForValue
     * @param {String} value
     * @return {Number}
     */
    _findTabIndexForValue: function(value) {
        var i,
            tabs = this.get('tabs');

        for (i = 0; i < tabs.length; i++) {
            if (tabs[i].value === value) {
                return i;
            }
        }
    },

    /**
     * Returns the `A.TabView` widget that handles this editor's tabs, creating
     * it if it hasn't been created yet.
     *
     * @method _getTabView
     * @return {A.TabView}
     * @protected
     */
    _getTabView: function() {
        if (!this._tabView) {
            this._tabView = this._createTabView();
        }

        return this._tabView;
    },

    /**
     * Updates the ui according to the value of the `editedValue` attribute.
     *
     * @method _uiSetEditedValue
     * @param {String} value
     * @protected
     */
    _uiSetEditedValue: function(value) {
        var index = this._findTabIndexForValue(value);

        if (index !== undefined) {
            this._getTabView().selectChild(index);
        }
    }
}, {
    /**
     * Static property used to define the default attribute configuration
     * for the `A.TabsDataEditor`.
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
         * @default ''
         * @type String
         */
        editedValue: {
            value: ''
        },

        /**
         * The value to be edited.
         *
         * @attribute originalValue
         * @default ''
         * @type String
         */
        originalValue: {
            value: ''
        },

        /**
         * Information about each tab that this editor should show as an option.
         * Each tab should be an object representing with the following keys:
         *     label -> Text that will be shown for the tab
         *     panelNode (Optional) -> Content that should show up when the tab
         *         is selected.
         *     value -> Value that represents the tab. Will be set as `editedValue`
         *         when the tab is selected.
         *
         * @attribute tabs
         * @default []
         * @type Array
         */
        tabs: {
            value: []
        }
    }
});


}, '3.0.1', {"requires": ["aui-data-editor", "aui-tabview"]});
