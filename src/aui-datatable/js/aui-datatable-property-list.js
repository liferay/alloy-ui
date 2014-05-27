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
 *     properties.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method getDefaultEditor
     */
    getDefaultEditor: function() {
        return new A.TextCellEditor();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _afterUITriggerSort
     * @param event
     * @protected
     */
    _afterUITriggerSort: function() {
        var instance = this;

        instance.highlight.clear();
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onActiveCellChange
     * @param event
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
     * TODO. Wanna help? Please send a Pull Request.
     *
     * @method _onSelectionKey
     * @param event
     * @protected
     */
    _onSelectionKey: function(event) {
        var instance = this;

        if (instance.get('activeCell') && instance.get('focused')) {
            var keyCode = event.keyCode,
                target = event.target,
                editor = A.Widget.getByNode(target);

            if (target.hasClass('yui3-datatable')) {
                if (editor && keyCode === 13) {
                    instance._onEditCell(event);
                }

                A.PropertyList.superclass._onSelectionKey.apply(this, arguments);

                instance._syncPropertyListScrollUI();
            }
        }
    },

    /**
     * TODO. Wanna help? Please send a Pull Request.
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
     * TODO. Wanna help? Please send a Pull Request.
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
         * TODO. Wanna help? Please send a Pull Request.
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
         * TODO. Wanna help? Please send a Pull Request.
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
            value: A.UA.touchEnabled ? 'click' : 'dblclick'
        },

        /**
         * TODO. Wanna help? Please send a Pull Request.
         *
         * DataTable scroll breaks when width value is a number
         * See http://yuilibrary.com/projects/yui3/ticket/2532600
         *
         * @attribute width
         */
        width: {
            setter: String
        },

        /**
         * Colection of strings used to label elements of the UI.
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
