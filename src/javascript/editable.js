AUI().add(
	'editable',
	function(A) {
		var Lang = A.Lang,
			isFunction = Lang.isFunction,

			getClassName = A.ClassNameManager.getClassName,

			HOVER = 'hover',
			NAME = 'editable',

			CSS_EDITING = getClassName(NAME, 'editing'),
			CSS_HOVER = getClassName(NAME, HOVER),

			CONTENT_BOX = 'contentBox';

		var Editable = function() {
			Editable.superclass.constructor.apply(this, arguments);
		};

		Editable.NAME = 'editable';

		Editable.ATTRS = {
			cancelButton: {
				valueFn: function() {
					var instance = this;

					return {
						id: 'cancel',
						icon: 'circle-close',
						handler: {
							context: instance,
							fn: instance.cancel
						}
					};
				}
			},
			contentText: {
				value: '',
				setter: function(value) {
					var instance = this;

					value = Lang.trim(value);

					instance._toText(value);

					return value;
				}
			},

			formatInput: {
				value: null,
				validator: isFunction
			},

			formatOutput: {
				value: null,
				validator: isFunction
			},

			node: {
				setter: function(value) {
					var node = A.get(value);

					if (!node) {
						A.error('AUI.Editable: Invalid Node Given: ' + value);
					}
					else {
						node = node.item(0);
					}

					return node;
				}
			},

			eventType: {
				value: 'click'
			},

			renderTo: {
				value: document.body,
				setter: function(value) {
					var instance = this;

					var node;

					if (value == 'node') {
						node = instance.get(value);
					}
					else {
						node = A.get(value);
					}

					if (!node) {
						A.error('AUI.Editable: Invalid renderTo Given: ' + value);
					}
					else {
						node = node.item(0);
					}

					return node;
				}
			},

			saveButton: {
				valueFn: function() {
					var instance = this;

					return {
						id: 'save',
						icon: 'circle-check',
						handler: {
							context: instance,
							fn: instance.save
						}
					};
				}
			},

			tools: {
				value: []
			},

			inputType: {
				value: 'text',
				setter: function(value) {
					var instance = this;

					if (value != 'text' && value != 'textarea') {
						value = A.Attribute.INVALID_VALUE;
					}

					return value;
				}
			}
		};

		A.extend(
			Editable,
			A.Component,
			{
				initializer: function() {
					var instance = this;

					instance._scopedSave = A.bind(instance.save, instance);

					var node = instance.get('node');
					var eventType = instance.get('eventType');

					node.on('mouseenter', instance._onMouseEnterEditable, instance);
					node.on('mouseleave', instance._onMouseLeaveEditable, instance);

					node.on(eventType, instance._startEditing, instance);

					instance._createEvents();
				},

				renderUI: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var inputType = instance.get('inputType');

					var comboConfig = {};

					var tools = instance.get('tools');

					if (tools !== false) {
						var cancelButton = instance.get('cancelButton');
						var saveButton = instance.get('saveButton');

						if (cancelButton !== false) {
							tools.push(cancelButton);
						}

						if (saveButton !== false) {
							tools.push(saveButton);
						}

						comboConfig.tools = tools;
					}

					if (inputType != 'text') {
						A.mix(
							comboConfig,
							{
								field: {
									autoSize: true
								},
								fieldWidget: A.Textarea
							}
						);
					}

					var comboBox = new A.Combobox(comboConfig).render(contentBox);

					instance._comboBox = comboBox;

					instance.inputNode = comboBox.get('node');
				},

				bindUI: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var node = instance.get('node');

					var inputNode = instance.inputNode;

					inputNode.on('keypress', instance._onKeypressEditable, instance);

					instance.after('contentTextChange', instance._syncContentText);

					contentBox.swallowEvent('click');

					A.getDoc().after('click', instance._afterFocusedChangeEditable, instance);
				},

				syncUI: function() {
					var instance = this;

					var currentText = instance.get('node').get('innerHTML');

					currentText = currentText.replace(/\n|\r/gim, '');
					currentText = Lang.trim(currentText);

					currentText = instance._toText(currentText);

					instance._setInput(currentText);

					instance.set(
						'contentText',
						currentText,
						{
							initial: true
						}
					);
				},

				cancel: function() {
					var instance = this;

					instance.fire('cancel');
				},

				save: function(event) {
					var instance = this;

					instance.fire('save');
				},

				_afterFocusedChangeEditable: function(event) {
					var instance = this;

					instance.fire('stopEditing', instance.get('visible'));
				},

				_createEvents: function() {
					var instance = this;

					instance.publish(
						'startEditing',
						{
							bubbles: true,
							defaultFn: instance._defStartEditingFn,
							emitFacade: true,
							queable: false
						}
					);

					instance.publish(
						'stopEditing',
						{
							bubbles: true,
							defaultFn: instance._defStopEditingFn,
							emitFacade: true,
							queable: false
						}
					);

					instance.publish(
						'save',
						{
							bubbles: true,
							defaultFn: instance._defSaveFn,
							emitFacade: true,
							queable: false
						}
					);

					instance.publish(
						'cancel',
						{
							bubbles: true,
							defaultFn: instance._defCancelFn,
							emitFacade: true,
							queable: false
						}
					);
				},

				_defCancelFn: function(event) {
					var instance = this;

					instance.fire('stopEditing', false);
				},

				_defStartEditingFn: function(event) {
					var instance = this;

					var boundingBox = instance.get('boundingBox');
					var node = instance.get('node');

					var inputNode = instance.inputNode;

					var nodeHeight = node.get('offsetHeight');
					var nodeWidth = node.get('offsetWidth');

					instance.show();

					node.addClass(CSS_EDITING);

					var xy = node.getXY();

					boundingBox.setStyles(
						{
							height: nodeHeight + 'px',
							left: xy[0] + 'px',
							top: xy[1] + 'px',
							width: nodeWidth + 'px'
						}
					);

					var inputField = instance._comboBox._field

					inputField.set('width', nodeWidth);
					inputField.fire('adjustSize');

					inputNode.focus();
					inputNode.select();
				},

				_defStopEditingFn: function(event, save) {
					var instance = this;

					instance.hide();

					instance.get('node').removeClass(CSS_EDITING);

					if (save) {
						instance.set('contentText', instance.inputNode.get('value'));
					}
					else {
						instance._setInput(instance.get('contentText'));
					}
				},

				_defSaveFn: function(event) {
					var instance = this;

					instance.fire('stopEditing', true);
				},

				_onKeypressEditable: function(event) {
					var instance = this;

					var keyCode = event.keyCode;

					if (keyCode == 27) {
						event.preventDefault();

						instance.cancel();
					}
					else if (keyCode == 13 && (instance.get('inputType') == 'text')) {
						instance.save();
					}
				},

				_onMouseEnterEditable: function(event) {
					var instance = this;

					instance.get('node').addClass(CSS_HOVER);
				},

				_onMouseLeaveEditable: function(event) {
					var instance = this;

					instance.get('node').removeClass(CSS_HOVER);
				},

				_setInput: function(value) {
					var instance = this;

					var inputFormatter = instance.get('formatInput');

					if (inputFormatter) {
						value = inputFormatter.call(instance, value);
					}
					else {
						value = instance._toText(value);
					}

					instance.inputNode.set('value', value);
				},

				_setOutput: function(value) {
					var instance = this;

					var outputFormatter = instance.get('formatOutput');

					if (outputFormatter) {
						value = outputFormatter.call(instance, value);
					}
					else {
						value = instance._toHTML(value);
					}

					instance.get('node').set('innerHTML', value);
				},

				_startEditing: function(event) {
					var instance = this;

					if (!instance.get('rendered')) {
						instance.render(instance.get('renderTo'));
					}

					instance.fire('startEditing');

					event.halt();
				},

				_syncContentText: function(event) {
					var instance = this;

					if (!event.initial) {
						var contentText = event.newVal;

						instance._setInput(contentText);
						instance._setOutput(contentText);
					}
				},

				_toHTML: function(text) {
					var instance = this;

					return String(text).replace(/\n/gim, '<br/>');
				},

				_toText: function(text) {
					var instance = this;

					var text = String(text);

					text = text.replace(/<br\s*\/?>/gim, '\n');

					text = text.replace(/(<\/?[^>]+>|\t)/gim, '');

					return text;
				}
			}
		);

		A.Editable = Editable;
	},
	'@VERSION',
	{
		requires: [ 'aui-base', 'combobox', 'editable-css' ],
		use: []
	}
);