var Lang = A.Lang,
	isObject = Lang.isObject,

	AUTO = 'auto',
	EDITOR = 'editor',
	HEIGHT = 'height',
	NAME = 'name',
	PROPERTY_LIST = 'propertyList',
	SCROLL = 'scroll',
	SELECTION = 'selection',
	SORT = 'sort',
	VALUE = 'value',
	WIDTH = 'width',

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
						label: instance.getString(PROPERTY_LIST),
						sortable: true
					},
					{
						editor: instance.getDefaultEditor(),
						key: VALUE,
						label: instance.getString(VALUE),
						sortable: true,
						width: 'auto'
					}
				];
			}
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
				propertyList: 'Property List',
				value: 'Value'
			}
		}
	},

	EXTENDS: A.DataTable.Base,

	prototype: {
		initializer: function() {
			var instance = this;

			instance.after(instance._syncScrollWidth, instance, '_uiSetWidth');
			instance.after(instance._syncScrollHeight, instance, '_uiSetHeight');

			instance._plugDependencies();
		},

		getDefaultEditor: function() {
			return new A.TextCellEditor();
		},

		_plugDependencies: function() {
			var instance = this;

			instance.plug(
				A.Plugin.DataTableSelection,
				instance.get(SELECTION)
			)
			.plug(
				A.Plugin.DataTableScroll,
				instance.get(SCROLL)
			)
			.plug(
				A.Plugin.DataTableSort,
				instance.get(SORT)
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