YUI.add('aui-datatable-property-list', function (A, NAME) {

/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-property-list
 */

var Lang = A.Lang,
    isFunction = Lang.isFunction;

/**
 * A base class for PropertyList.
 *
 * @class A.PropertyList
 * @extends DataTable
 * @uses A.WidgetCssClass, A.WidgetToggle
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */
A.PropertyList = A.Base.create(A.DataTable.NAME, A.DataTable, [A.WidgetCssClass, A.WidgetToggle], {

    /**
     * Construction logic executed during PropertyList instantiation. Lifecycle.
     *
     * @method initializer
     * @param config
     * @protected
     */
    initializer: function(config) {
        var instance = this;

        instance.CLASS_NAMES_PROPERTY_LIST = {
            cell: instance.getClassName('cell')
        };

        instance._initHighlight();

        instance.after(instance._afterRenderUI, instance, 'renderUI');
        instance.after(instance._afterUITriggerSort, instance, '_onUITriggerSort');
        instance.on('activeCellChange', instance._onActiveCellChange);

        // DataTable doesn't allow redefine the columns attribute in extended
        // classes See http://yuilibrary.com/projects/yui3/ticket/2532599

        if (!config.columns) {
            this.set('columns', instance._state.get('columns', 'initValue'));
        }
    },

    /**
     * Creates and return a new `A.TextCellEditor`.
     *
     * @method getDefaultEditor
     * @return {TextCellEditor}
     */
    getDefaultEditor: function() {
        return new A.TextCellEditor();
    },

    /**
     * Fires after the `renderUI` event.
     *
     * @method _afterRenderUI
     * @protected
     */
    _afterRenderUI: function() {
        var instance = this;

        instance.get('boundingBox').addClass(
            instance.getClassName('property-list')
        );
    },

    /**
     * Fires after the `UITriggerSort` event.
     *
     * @method _afterUITriggerSort
     * @param {EventFacade} event
     * @protected
     */
    _afterUITriggerSort: function() {
        var instance = this;

        instance.highlight.clear();
    },

    /**
     * Initializer for the `A.DataTable` highlighter.
     *
     * @method _initHighlight
     * @protected
     */
    _initHighlight: function() {
        var instance = this;

        instance.plug(A.Plugin.DataTableHighlight, {
            highlightRange: false,
            type: 'rows'
        });
    },

    /**
     * Fires on `activeCellChange` event.
     *
     * @method _onActiveCellChange
     * @param {EventFacade} event
     * @protected
     */
    _onActiveCellChange: function(event) {
        var instance = this,
            activeCell = event.newVal,
            column;

        if (activeCell) {
            column = instance.getColumn(activeCell);

            if (column && (column.key === 'name')) {
                event.newVal = activeCell.next('.' + instance.CLASS_NAMES_PROPERTY_LIST.cell);
            }
        }
    },

    /**
     * Callback for the selection key event listener.
     *
     * @method _onSelectionKey
     * @param {EventFacade} event
     * @protected
     */
    _onSelectionKey: function(event) {
        var instance = this;

        if (instance.get('activeCell') && instance.get('focused')) {
            var keyCode = event.keyCode,
                editor = A.Widget.getByNode(event.target);

            if (editor instanceof A.DataTable) {
                if (editor && keyCode === 13) {
                    instance._onEditCell(event);
                }

                A.PropertyList.superclass._onSelectionKey.apply(this, arguments);

                instance._syncPropertyListScrollUI();
            }
        }
    },

    /**
     * Callback for syncing `A.PropertyList` on scroll.
     *
     * @method _syncPropertyListScrollUI
     * @protected
     */
    _syncPropertyListScrollUI: function() {
        var instance = this,
            activeRow = instance.get('activeRow');

        if (activeRow && instance.scrollTo) {
            instance.scrollTo(activeRow.get('id'));
        }
    }
}, {

    /**
     * Static property provides a string to identify the CSS prefix.
     *
     * @property CSS_PREFIX
     * @type String
     * @static
     */
    CSS_PREFIX: A.DataTable.CSS_PREFIX,

    /**
     * Static property used to define the default attribute
     * configuration for the PropertyList.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * Defines the `column` config for `A.PropertyList`.
         *
         * @attribute columns
         * @type Function
         */
        columns: {
            valueFn: function() {
                var instance = this;

                return [{
                    editor: false,
                    key: 'name',
                    label: instance.getString('propertyName'),
                    sortable: true
                }, {
                    editor: instance.getDefaultEditor(),
                    formatter: function(o) {
                        var instance = this;
                        var data = o.data;

                        if (!data) {
                            return;
                        }

                        var formatter = data.formatter;

                        if (isFunction(formatter)) {
                            return formatter.apply(instance, arguments);
                        }

                        return data.value;
                    },
                    key: 'value',
                    label: instance.getString('value'),
                    sortable: true,
                    width: 'auto'
                }];
            }
        },

        /**
         * Determines if the `A.PropertyList` is scrollable.
         *
         * @attribute scrollable
         * @default true
         * @type Boolean
         */
        scrollable: {
            value: true
        },

        /**
         * The event type that will be used to trigger edit mode for a datatable
         * cell.
         *
         * @attribute editEvent
         * @default 'dblclick'
         * @type String
         */
        editEvent: {
            valueFn: function() {
                if (A.UA.touchEnabled && A.UA.mobile) {
                    return 'click';
                }
                else {
                    return 'dblclick';
                }
            }
        },

        /**
         * Defines the width of the `A.PropertyList`.
         *
         * DataTable scroll breaks when width value is a number
         * See http://yuilibrary.com/projects/yui3/ticket/2532600
         *
         * @attribute width
         * @type String|Number
         */
        width: {
            setter: String
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            value: {
                propertyName: 'Property Name',
                value: 'Value'
            }
        }
    }
});


}, '3.0.1', {
    "requires": [
        "datatable-scroll",
        "datatable-sort",
        "aui-datatable-core",
        "aui-datatable-edit",
        "aui-datatable-highlight",
        "aui-datatable-selection",
        "aui-widget-cssclass",
        "aui-widget-toggle"
    ],
    "skinnable": true
});
