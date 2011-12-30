AUI.add('aui-property-list', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,

	AUTO = 'auto',
	COLUMNSET = 'columnset',
	DATA = 'data',
	DBLCLICK = 'dblclick',
	HEIGHT = 'height',
	KEY = 'key',
	NAME = 'name',
	PROPERTY_NAME = 'propertyName',
	RECORDSET = 'recordset',
	RECORDSET_CHANGE = 'recordsetChange',
	SCROLL = 'scroll',
	SELECTION = 'selection',
	SORT = 'sort',
	TD = 'td',
	VALUE = 'value',
	WIDTH = 'width',

	_EMPTY_STR = '',
	_NAME = 'property-list';

var PropertyList = A.Component.create({
	NAME: _NAME,

	ATTRS: {
		columnset: {
			valueFn: function() {
				var instance = this;

				return [
					{
						editor: false,
						key: NAME,
						label: instance.getString(PROPERTY_NAME),
						sortable: true
					},
					{
						editor: instance.getDefaultEditor(),
						formatter: function(o) {
							var instance = this;
							var data = o.record.get(DATA);
							var formatter = data.formatter;

							if (isFunction(formatter)) {
								return formatter.apply(instance, arguments);
							}

							return data.value;
						},
						key: VALUE,
						label: instance.getString(VALUE),
						sortable: true,
						width: 'auto'
					}
				];
			}
		},

		editEvent: {
			value: DBLCLICK
		},

		recordset: {
			value: [{ name: _EMPTY_STR, value: _EMPTY_STR }]
		},

		scroll: {
			value: {
				width: AUTO
			},
			validator: isObject
		},

		selection: {
			value: {
				selectRow: true
			},
			validator: isObject
		},

		sort: {
			validator: isObject
		},

		strings: {
			value: {
				propertyName: 'Property Name',
				value: 'Value'
			}
		}
	},

	EXTENDS: A.DataTable.Base,

	prototype: {
		initializer: function() {
			var instance = this;

			instance.after(RECORDSET_CHANGE, instance._plugDependencies);
			instance.after(instance._syncScrollWidth, instance, '_uiSetWidth');
			instance.after(instance._syncScrollHeight, instance, '_uiSetHeight');

			instance._plugDependencies();
		},

		_editCell: function(event) {
			var instance = this;
			var columnset = instance.get(COLUMNSET);

			if (event.column.get(KEY) === NAME) {
				event.alignNode = event.cell.next(TD);
				event.column = columnset.keyHash[VALUE];
			}

			return A.PropertyList.superclass._editCell.call(this, event);
		},

		getDefaultEditor: function() {
			return new A.TextCellEditor();
		},

		_onEditorSave: function(event) {
			var instance = this;
			var selection = instance.selection;

			if (selection) {
				selection.activeColumnIndex = 1;
			}

			return A.PropertyList.superclass._onEditorSave.call(this, event);
		},

		_plugDependencies: function() {
			var instance = this;
			var recordset = instance.get(RECORDSET);

			if (!recordset.hasPlugin(A.Plugin.RecordsetSort)) {
				recordset.plug(A.Plugin.RecordsetSort, { dt: instance });
		        recordset.sort.addTarget(instance);
			}

			instance.plug(
				A.Plugin.DataTableSelection,
				instance.get(SELECTION)
			)
			.plug(
				A.Plugin.DataTableSort,
				instance.get(SORT)
			)
			.plug(
				A.Plugin.DataTableScroll,
				instance.get(SCROLL)
			);
		},

		_syncScrollHeight: function(height) {
			var instance = this;

			instance.scroll.set(HEIGHT, height);
		},

		_syncScrollWidth: function(width) {
			var instance = this;

			instance.scroll.set(WIDTH, width);
		}
	}
});

A.PropertyList = PropertyList;

}, '@VERSION@' ,{skinnable:true, requires:['aui-datatable']});
