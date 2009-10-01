AUI().add(
	'sortable',
	function(A) {
		var Lang = A.Lang,

			getClassName = A.ClassNameManager.getClassName,

			NAME = 'sortable',

			DDM = A.DD.DDM,

			CSS_SORTABLE = getClassName(NAME),
			CSS_PLACEHOLDER = getClassName(NAME, 'placeholder'),
			CSS_DRAGGING = getClassName(NAME, 'dragging'),
			CSS_PROXY = getClassName(NAME, 'proxy'),
			CSS_HANDLE = getClassName(NAME, 'handle'),
			CSS_NO_HANDLES = getClassName(NAME, 'no-handles'),
			CSS_ITEM = getClassName(NAME, 'item');

		var Sortable = function() {
			Sortable.superclass.constructor.apply(this, arguments);
		};

		Sortable.NAME = NAME;

		Sortable.ATTRS = {
			dd: {
				value: {
					target: true
				}
			},

			constrain: {
				value: null
			},

			container: {
				value: null
			},

			groups: {
				valueFn: function() {
					var instance = this;

					return [A.guid()];
				}
			},

			nodes: {
				value: null,
				setter: function(value) {
					var instance = this;

					var container = instance.get('container');

					if (!(value instanceof A.NodeList)) {
						if(Lang.isString(value)) {
							if (container) {
								value = container.queryAll(value);
							}
							else {
								value = A.all(value);
							}
						}
					}

					if (value instanceof A.NodeList) {
						instance.set('container', value.item(0).get('parentNode'));
					}
					else {
						value = A.Attribute.INVALID_ATTRIBUTE;
					}

					return value;
				}
			},

			proxy: {
				value: {
					borderStyle: 0,
					moveOnEnd: false
				}
			}
		};

		A.extend(
			Sortable,
			A.Base,
			{
				initializer: function() {
					var instance = this;

					var nodes = instance.get('nodes');

					var constrain = instance.get('constrain');

					instance._useConstrain = !!constrain;

					if (Lang.isObject(constrain)) {
						instance._constrainConfig = constrain;
					}

					var proxy = instance.get('proxy');

					instance._useProxy = !!proxy;

					if (Lang.isObject(proxy)) {
						instance._proxyConfig = proxy;
					}

					var ddConfig = instance.get('dd');

					instance._ddConfig = ddConfig;

					nodes.each(instance._initSortable, instance);

					instance.on('drag:drag', instance._onDrag);
					instance.on('drag:end', instance._onDragEnd);
					instance.on('drag:over', instance._onDragOver);
					instance.on('drag:start', instance._onDragStart);
				},

				_initSortable: function(item, index, collection) {
					var instance = this;

					item.addClass(CSS_ITEM);

					instance._ddConfig = A.mix(
						instance._ddConfig,
						{
							bubbles: instance,
							groups: instance.get('groups'),
							target: true
						}
					);

					var handles = instance._ddConfig.handles;

					if (handles) {
						for (var i = handles.length - 1; i >= 0; i--) {
							var handle = handles[i];

							item.queryAll(handle).addClass(CSS_HANDLE);
						}
					}
					else {
						item.addClass(CSS_NO_HANDLES);
					}

					item.plug(A.Plugin.Drag, instance._ddConfig);

					if (instance._useConstrain) {
						item.dd.plug(A.Plugin.DDConstrained, instance._constrainConfig);
					}

					if (instance._useProxy) {
						item.dd.plug(A.Plugin.DDProxy, instance._proxyConfig);
					}

					item.dd.removeInvalid('a');

					instance.dd = item.dd;
				},

				_onDrag: function(event) {
					var instance = this;

					var lastXY = event.target.lastXY;
					var x = lastXY[0];
					var y = lastXY[1];

					var lastX = instance._lastX;
					var lastY = instance._lastY;

					var xToleranceMet = Math.abs(x - lastX);
					var yToleranceMet = Math.abs(y - lastY);

					instance._goingUp = ((x < lastX) && xToleranceMet) || ((y < lastY) && yToleranceMet);

					instance._lastX = x;
					instance._lastY = y;

					A.later(50, DDM, DDM.syncActiveShims);
				},

				_onDragEnd: function(event) {
					var instance = this;

					var node = event.target.get('node');

					node.removeClass(CSS_PLACEHOLDER);
					node.removeClass(CSS_DRAGGING);
				},

				_onDragOver: function(event) {
					var instance = this;

					var sortDirection = 0;
					var midpoint = 0;
					var lastX = instance._lastX;
					var lastY = instance._lastY;

					var DDM = A.DD.DDM;
					var drag = event.drag;
					var drop = event.drop;

					var dropNode = drop.get('node');

					var action = 'placeBefore';

					if (!instance._goingUp) {
						action = 'placeAfter';
					}

					dropNode[action](drag.get('node'));

					drop.sizeShim();
				},

				_onDragStart: function(event) {
					var instance = this;

					var drag = event.target;
					var node = drag.get('node');

					if (instance._useProxy) {
						drag.get('dragNode').addClass(CSS_PROXY);
					}

					node.addClass(CSS_PLACEHOLDER);
					node.addClass(CSS_DRAGGING);
				},

				_lastX: 0,
				_lastY: 0
			}
		);

		A.Sortable = Sortable;
	},
	'@VERSION',
	{
		requires: ['base', 'dd'],
		use: []
	}
);