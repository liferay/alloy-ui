AUI().add(
	'editable',
	function(A) {
		var getClassName = A.ClassNameManager.getClassName,

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
			CSS_HOVER = [ getClassName(NAME, HOVER), getClassName(CTRL, HOLDER) ].join(' '),
			CSS_HIDDEN = getClassName(HELPER, HIDDEN),
			CSS_CONTENT_WRAPPER = getClassName(NAME, CONTENT, WRAPPER),
			CSS_INPUT_WRAPPER = getClassName(NAME, CTRL, HOLDER),
			CSS_INPUT = getClassName(NAME, INPUT),

			TPL_INPUT = '<input class="' + CSS_INPUT + '" type="text" />',
			TPL_TEXTAREA = '<textarea class="' + CSS_INPUT + '"></textarea>',
			TPL_INPUT_WRAPPER = '<span class="' + [ CSS_CTRL_HOLDER, CSS_HIDDEN, CSS_INPUT_WRAPPER ].join(' ') + '"></span>',
			TPL_CONTENT_WRAPPER_OPEN = '<div class="' + CSS_CONTENT_WRAPPER + '">',
			TPL_CONTENT_WRAPPER_CLOSE = '</div>',

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

					instance._toText(value);
				}
			},

			eventType: {
				value: 'click'
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
				renderUI: function() {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var inputType = instance.get('inputType');

					var inputWrapper = A.Node.create(TPL_INPUT_WRAPPER);
					var inputNode = A.Node.create(inputType == 'text' ? TPL_INPUT : TPL_TEXTAREA);

					var currentHTML = contentBox.get('innerHTML');

					inputWrapper.appendChild(inputNode);

					inputNode.addClass(CSS_INPUT);

					contentBox.set('innerHTML', TPL_CONTENT_WRAPPER_OPEN + currentHTML + TPL_CONTENT_WRAPPER_CLOSE);

					A.get('body').appendChild(inputWrapper);

					instance.contentWrapper = contentBox.get('firstChild');

					instance.inputWrapper = inputWrapper;
					instance.inputNode = inputNode;
				},

				bindUI: function() {
					var instance = this;

					var eventType = instance.get('eventType');

					var contentBox = instance.get(CONTENT_BOX);
					var contentWrapper = instance.contentWrapper;
					var inputNode = instance.inputNode;

					contentBox.on('mouseenter', instance._onMouseEnterEditable, instance);
					contentBox.on('mouseleave', instance._onMouseLeaveEditable, instance);

					contentWrapper.on(eventType, instance._startEditing, instance);

					inputNode.on('keypress', instance._onKeypressEditable, instance);

					instance.after('contentTextChange', instance._syncContentText);

					instance.inputNode.on('blur', instance._stopEditing, instance);
				},

				syncUI: function() {
					var instance = this;

					var currentText = instance.contentWrapper.get('innerHTML');

					currentText = currentText.replace(/\n|\r/gim, '');

					currentText = instance._toText(currentText);

					instance._setInput(currentText);
				},

				cancel: function() {
					var instance = this;

					instance._stopEditing(false);
				},

				save: function() {
					var instance = this;

					instance._stopEditing(true);
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

					instance.contentWrapper.addClass(CSS_HOVER);
				},

				_onMouseLeaveEditable: function(event) {
					var instance = this;

					instance.contentWrapper.removeClass(CSS_HOVER);
				},

				_setInput: function(value) {
					var instance = this;

					instance.inputNode.set('value', value);
				},

				_setOutput: function(value) {
					var instance = this;

					value = instance._toHTML(value);

					instance.contentWrapper.set('innerHTML', value);
				},

				_startEditing: function(event) {
					var instance = this;

					var contentBox = instance.get(CONTENT_BOX);
					var inputNode = instance.inputNode;
					var inputWrapper = instance.inputWrapper;

					var contentWrapperHeight = contentBox.get('offsetHeight');
					var contentWrapperWidth = contentBox.get('offsetWidth');

					inputWrapper.removeClass(CSS_HIDDEN);

					var xy = contentBox.getXY();

					inputNode.setStyle('height', contentWrapperHeight + 'px');
					inputNode.setStyle('width', contentWrapperWidth + 'px');

					inputWrapper.setStyle('left', xy[0] + 'px');
					inputWrapper.setStyle('top', xy[1] + 'px');
					inputWrapper.setStyle('height', contentWrapperHeight + 'px');
					inputWrapper.setStyle('width', contentWrapperWidth + 'px');

					inputNode.focus();
					inputNode.select();

					event.halt();
				},

				_stopEditing: function(save) {
					var instance = this;

					instance.inputWrapper.addClass(CSS_HIDDEN);

					var contentWrapper = instance.contentWrapper;

					contentWrapper.removeClass(CSS_HIDDEN);
					contentWrapper.removeClass(CSS_HOVER);

					if (save) {
						instance.set('contentText', instance.inputNode.get('value'));
					}
					else {
						instance._setInput(instance.get('contentText'));
					}
				},

				_syncContentText: function(event) {
					var instance = this;

					var contentText = event.newVal;

					instance._setInput(contentText);
					instance._setOutput(contentText);
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