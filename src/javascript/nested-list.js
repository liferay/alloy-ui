AUI().add(
	'nested-list',
	function(A) {
		var Lang = A.Lang,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'nestedlist',

			DDM = A.DD.DDM,

			CSS_NESTEDLIST = getClassName(NAME),
			CSS_PLACEHOLDER = getClassName(A.Sortable.NAME, 'placeholder');

		var NestedList = function() {
			NestedList.superclass.constructor.apply(this, arguments);
		};

		NestedList.NAME = 'nestedlist';

		NestedList.ATTRS = {
			dropOn: {
				value: 'ul'
			}
		};

		A.extend(
			NestedList,
			A.Sortable,
			{
				getSortableItem: function() {
					var instance = this;

					return NestedListItem;
				},

				_onDragEnd: function(event) {
					var instance = this;

					var drag = event.target;

					NestedList.superclass._onDragEnd.apply(instance, arguments);

					var node = drag.get('node');

					var placeholder = drag.get('placeholder');

					placeholder.placeBefore(node);
					placeholder.remove();

					node.show();
				},

				_onDragOver: function(event) {
					var instance = this;

					var drag = event.drag;
					var drop = event.drop;

					var dragNode = drag.get('placeholder');
					var dropNode = drop.get('node');

					if (drag.sortOn(dragNode, dropNode)) {
						var container = dropNode.one('> ' + instance.get('dropOn'));

						if (container) {
							if (!container.contains(dragNode) && !dragNode.contains(container)) {
								container.appendChild(dragNode);
							}
						}
						else {
							try {
								NestedList.superclass._onDragOver.apply(instance, arguments);

								drag.updatePlaceholder(true);
							}
							catch (e) {}
						}
					}
				},

				_onDragStart: function(event) {
					var instance = this;

					var drag = event.target;

					NestedList.superclass._onDragStart.apply(instance, arguments);

					var node = drag.get('node');
					var placeholder = drag.get('placeholder');

					node.placeAfter(placeholder);

					drag.updatePlaceholder();
				}
			}
		);

		var NestedListItem = function() {
			NestedListItem.superclass.constructor.apply(this, arguments);
		};

		NestedListItem.NAME = 'nestedlistitem';

		NestedListItem.ATTRS = {
			placeholder: {
				value: CSS_PLACEHOLDER,
				getter: null,
				setter: function(value) {
					var instance = this;

					if (Lang.isString(value)) {
						var node = instance.get('node');

						var placeholder = new A.Node(document.createElement(node.get('nodeName')));

						placeholder.addClass(value);

						value = placeholder;
					}
					else {
						value = A.get(value);
					}

					return value;
				}
			}
		};

		A.extend(
			NestedListItem,
			A.SortableItem,
			{
				sortOn: function(dragNode, dropNode) {
					var instance = this;

					var sortOn = instance.get('sortOn');

					var sortOnNode = A.get(sortOn);

					if (sortOnNode && !sortOnNode.contains(dropNode)) {
						return false;
					}

					return true;
				},

				updatePlaceholder: function(preventResize) {
					var instance = this;

					var placeholder = instance.get('placeholder');

					var node = instance.get('node');

					if (!preventResize && instance.get('syncPlaceholderSize')) {
						placeholder.setStyle('height', node.get('offsetHeight') + 'px');
					}

					node.hide();

					var drop = DDM.activeDrop;

					if (drop) {
						drop.sizeShim();
					}

					return placeholder;
				}
			}
		);

		A.NestedList = NestedList;
		A.NestedListItem = NestedListItem;
	},
	'@VERSION',
	{
		requires: ['sortable']
	}
);