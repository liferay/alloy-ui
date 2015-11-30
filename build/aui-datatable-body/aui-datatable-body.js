YUI.add('aui-datatable-body', function (A, NAME) {

/**
 * The Datatable Component
 *
 * @module aui-datatable
 * @submodule aui-datatable-body
 */
var getCN = A.getClassName,
    CSS_TABLE = getCN('table');

/**
 * An extension for A.DataTable.BodyView that adds correct class to Table.
 *
 * @class A.DataTableBody
 * @param {Object} config Object literal specifying widget configuration
 * properties.
 * @constructor
 */

function DataTableBody() {}

/**
 * Static property provides a string to identify the class.
 *
 * @property NAME
 * @type String
 * @static
 */
DataTableBody.NAME = 'dataTableBody';

DataTableBody.prototype = {

    /**
     * Construction logic executed during A.DataTableBody instantiation.
     * Lifecycle.
     *
     * @method initializer
     * @protected
     */
    initializer: function() {
        A.after(this._afterRenderBody, this, 'render');
    },

    /**
     * Method called after render method.
     *
     * @method _afterRenderBody
     * @protected
     */
    _afterRenderBody: function() {
        this._setTableClass();
    },

    /**
     * Adds .table class to table element.
     *
     * @method _setTableClass
     * @protected
     */
    _setTableClass: function() {
        var container = this.get('container'),
            cssClass = this.get('cssClass');

        container.addClass(cssClass);
        container.addClass(CSS_TABLE);
    }
};

A.Base.mix(A.DataTable.BodyView, [DataTableBody]);


}, '3.0.1', {"requires": ["aui-classnamemanager", "datatable-base", "event-key", "aui-event-base"]});
