AUI().add(
	'editable',
	function(A) {
		var Lang = A.Lang,
			isFunction = Lang.isFunction,

			getClassName = A.ClassNameManager.getClassName,

			CONTENT = 'content',
			CTRL = 'ctrl',
			HELPER = 'helper',
			HIDDEN = 'hidden',
			HOLDER = 'holder',
			HOVER = 'hover',
			INPUT = 'input',
			NAME = 'editable',
			STATE = 'state',
			WRAPPER = 'wrapper',

			CSS_CTRL_HOLDER = getClassName(CTRL, HOLDER),
			CSS_BUTTON_ROW = getClassName('button-row'),
			CSS_EDITING = getClassName(NAME, 'editing'),
			CSS_TRIGGER_ROW = getClassName(NAME, 'form-triggers'),
			CSS_HOVER = [ getClassName(NAME, HOVER), getClassName(CTRL, HOLDER) ].join(' '),
			CSS_ICON = getClassName('icon'),
			CSS_ICON_SAVE = getClassName('icon-circle-check'),
			CSS_ICON_CANCEL = getClassName('icon-circle-close'),
			CSS_TOOL = getClassName('tool'),
			CSS_STATE_DEFAULT = getClassName('state-default'),
			CSS_CONTENT_WRAPPER = getClassName(NAME, CONTENT, WRAPPER),
			CSS_INPUT_WRAPPER = getClassName(NAME, CTRL, HOLDER),
			CSS_INPUT = getClassName(NAME, INPUT),

			TPL_INPUT = '<input class="' + CSS_INPUT + '" type="text" />',
			TPL_TEXTAREA = '<textarea class="' + CSS_INPUT + '"></textarea>',
			TPL_INPUT_WRAPPER = '<span class="' + [ CSS_CTRL_HOLDER, CSS_INPUT_WRAPPER ].join(' ') + '"></span>',
			TPL_BUTTON_ROW = '<span class="' + [ CSS_BUTTON_ROW, CSS_TRIGGER_ROW ].join(' ') + '"></span>',
			TPL_BUTTON = '<span class="aui-state-default aui-tool"><span class="aui-icon aui-icon-trigger"></span></span>',

			CONTENT_BOX = 'contentBox';

		var Editable = function() {
			Editable.superclass.constructor.apply(this, arguments);
		};

		Editable.NAME = 'editable';
		Editable.ATTRS = {
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

			inputType: {
				value: 'text',
				setter: function(value) {
					var instance = this;

					if (value != 'text' && value != 'textarea') {
						value = Attribute.INVALID_ATTRIBUTE;
					}

					return value;
				}
			}
		};

		A.extend(
			Editable,
			A.Widget,
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

					var buttonRow = A.Node.create(TPL_BUTTON_ROW);
					var inputWrapper = A.Node.create(TPL_INPUT_WRAPPER);
					var inputNode = A.Node.create(inputType == 'text' ? TPL_INPUT : TPL_TEXTAREA);

					var cancelButton = A.Node.create(TPL_BUTTON);
					var saveButton = A.Node.create(TPL_BUTTON);

					var cancelIcon = cancelButton.get('firstChild');
					var saveIcon = saveButton.get('firstChild');

					cancelIcon.addClass(CSS_ICON_CANCEL);
					saveIcon.addClass(CSS_ICON_SAVE);

					buttonRow.appendChild(cancelButton);
					buttonRow.appendChild(saveButton);

					inputWrapper.appendChild(inputNode);

					contentBox.appendChild(inputWrapper);
					contentBox.appendChild(buttonRow);

					inputNode.addClass(CSS_INPUT);

					instance.inputWrapper = inputWrapper;
					instance.buttonRow = buttonRow;

					instance.cancelButton = cancelButton;
					instance.cancelIcon = cancelIcon;

					instance.saveButton = saveButton;
					instance.saveIcon = saveIcon;

					instance.inputNode = inputNode;
				},

				bindUI: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var node = instance.get('node');

					var inputNode = instance.inputNode;

					inputNode.on('keypress', instance._onKeypressEditable, instance);

					instance.cancelButton.on('click', instance.cancel, instance);
					instance.saveButton.on('click', instance.save, instance);

					instance.after('contentTextChange', instance._syncContentText);

					instance.after('focusedChange', instance._afterFocusedChangeEditable);
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

					if (event.newVal === false) {
						instance.fire('stopEditing', instance.get('visible'));
					}
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

					return String(text).replace(/\n|\r/gim, '<br/>');
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
		requires: ['widget'],
		use: []
	}
);