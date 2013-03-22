var L = A.Lang,
	isArray = L.isArray,
	isObject = L.isObject,

	AArray = A.Array,

	ACCEPT_CHILDREN = 'acceptChildren',
	ALERT = 'alert',
	ALLOW_REMOVE_REQUIRED_FIELDS = 'allowRemoveRequiredFields',
	ASTERISK = 'asterisk',
	BODY_CONTENT = 'bodyContent',
	BOOLEAN = 'boolean',
	BOUNDING_BOX = 'boundingBox',
	BUILDER = 'builder',
	CHILDREN = 'children',
	CLEARFIX = 'clearfix',
	COMPONENT = 'component',
	CONTENT_BOX = 'contentBox',
	CONTROLS_TOOLBAR = 'controlsToolbar',
	DELETE_FIELDS_MESSAGE = 'deleteFieldsMessage',
	DISABLED = 'disabled',
	DOT = '.',
	DROP = 'drop',
	DROP_ZONE_NODE = 'dropZoneNode',
	EMPTY_STR = '',
	FIELD = 'field',
	FIELDS = 'fields',
	FOCUSED = 'focused',
	FORM = 'form',
	FORM_BUILDER_FIELD = 'form-builder-field',
	HIDDEN_ATTRIBUTES = 'hiddenAttributes',
	ICON = 'icon',
	ID = 'id',
	INFO = 'info',
	LABEL = 'label',
	LABEL_NODE = 'labelNode',
	NAME = 'name',
	NO = 'no',
	PARENT = 'parent',
	PLUS = 'plus',
	PREDEFINED_VALUE = 'predefinedValue',
	QUESTION = 'question',
	READ_ONLY = 'readOnly',
	READ_ONLY_ATTRIBUTES = 'readOnlyAttributes',
	REQUIRED = 'required',
	REQUIRED_FLAG_NODE = 'requiredFlagNode',
	SHOW_LABEL = 'showLabel',
	SIGN = 'sign',
	SPACE = ' ',
	STRING = 'string',
	TEMPLATE_NODE = 'templateNode',
	TIP = 'tip',
	TIP_FLAG_NODE = 'tipFlagNode',
	TRASH = 'trash',
	TYPE = 'type',
	UNIQUE = 'unique',
	WIDGET = 'widget',
	WRENCH = 'wrench',
	YES = 'yes',
	ZONE = 'zone',

	_UNDERLINE = '_',

	getCN = A.getClassName,

	CSS_ALERT = getCN(ALERT),
	CSS_ALERT_INFO = getCN(ALERT, INFO),
	CSS_CLEARFIX = getCN(CLEARFIX),
	CSS_COMPONENT = getCN(COMPONENT),
	CSS_FB_DROP_ZONE = getCN(FORM, BUILDER, DROP, ZONE),
	CSS_FB_FIELD = getCN(FORM, BUILDER, FIELD),
	CSS_FB_UNIQUE = getCN(FORM, BUILDER, UNIQUE),
	CSS_ICON = getCN(ICON),
	CSS_ICON_ASTERISK = getCN(ICON, ASTERISK),
	CSS_ICON_PLUS = getCN(ICON, PLUS),
	CSS_ICON_QUESTION_SIGN = getCN(ICON, QUESTION, SIGN),
	CSS_ICON_TRASH = getCN(ICON, TRASH),
	CSS_ICON_WRENCH = getCN(ICON, WRENCH),
	CSS_WIDGET = getCN(WIDGET),

	TPL_ALERT_TIP = '<div class="' + [CSS_ALERT, CSS_ALERT_INFO].join(SPACE) + '"></div>',
	TPL_BOUNDING_BOX = '<div class="' + [CSS_WIDGET, CSS_COMPONENT, CSS_FB_FIELD].join(SPACE) + '"></div>',
	TPL_DROP_ZONE = '<div class="' + CSS_FB_DROP_ZONE + '"></div>',
	TPL_FLAG_REQUIRED = '<span class="' + [CSS_ICON, CSS_ICON_ASTERISK].join(SPACE) + '"></span>',
	TPL_FLAG_TIP = '<span class="' + [CSS_ICON, CSS_ICON_QUESTION_SIGN].join(SPACE) + '"></span>',
	TPL_LABEL = '<label for="{id}">{label}</label>';

var FormBuilderFieldBase = A.Component.create({
	NAME: FORM_BUILDER_FIELD,

	AUGMENTS: [A.FieldSupport]
});

var FormBuilderField = A.Component.create({
	NAME: FORM_BUILDER_FIELD,

	ATTRS: {
		acceptChildren: {
			value: true
		},

		builder: {
			value: null
		},

		controlsToolbar: {
			validator: isObject,
			valueFn: function() {
				var instance = this;

				return {
					children: instance._getToolbarItems(instance.get(REQUIRED), instance.get(UNIQUE)),
					visible: false
				};
			}
		},

		dataType: {
			value: STRING
		},

		disabled: {
			value: false
		},

		hiddenAttributes: {
			validator: isArray,
			value: []
		},

		id: {
			setter: '_setId'
		},

		label: {
			value: EMPTY_STR
		},

		localizationMap: {
			value: {}
		},

		name: {
			valueFn: function() {
				var instance = this,
					type = instance.get(TYPE);

				return A.FormBuilderField.buildFieldName(type);
			}
		},

		parent: {
			value: null
		},

		predefinedValue: {
			value: EMPTY_STR
		},

		readOnly: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		readOnlyAttributes: {
			validator: isArray,
			value: []
		},

		required: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		showLabel: {
			setter: A.DataType.Boolean.parse,
			value: true
		},

		strings: {
			value: {
				button: 'Button',
				buttonType: 'Button Type',
				deleteFieldsMessage: 'Are you sure you want to delete the selected field(s)?',
				duplicateMessage: 'Duplicate',
				editMessage: 'Edit',
				label: 'Label',
				large: 'Large',
				medium: 'Medium',
				multiple: 'Multiple',
				name: 'Name',
				no: 'No',
				options: 'Options',
				predefinedValue: 'Predefined Value',
				readOnly: 'Read Only',
				required: 'Required',
				reset: 'Reset',
				showLabel: 'Show Label',
				small: 'Small',
				submit: 'Submit',
				tip: 'Tip',
				type: 'Type',
				width: 'Width',
				yes: 'Yes'
			}
		},

		tabIndex: {
			value: 0
		},

		template: {
			value: EMPTY_STR
		},

		tip: {
			value: EMPTY_STR
		},

		type: {
			value: EMPTY_STR
		},

		unique: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		zIndex: {
			value: 100
		},

		dropZoneNode: {
			valueFn: function() {
				return A.Node.create(TPL_DROP_ZONE);
			}
		},

		labelNode: {
			valueFn: function() {
				var instance = this;

				return A.Node.create(
					L.sub(
						TPL_LABEL,
						{
							id: instance.get(ID),
							label: instance.get(LABEL)
						}
					)
				);
			}
		},

		requiredFlagNode: {
			valueFn: function() {
				return A.Node.create(TPL_FLAG_REQUIRED);
			}
		},

		templateNode: {
			valueFn: 'getNode'
		},

		tipFlagNode: {
			valueFn: function() {
				return A.Node.create(TPL_FLAG_TIP);
			}
		}

	},

	UI_ATTRS: [ACCEPT_CHILDREN, DISABLED, FIELDS, LABEL, NAME, PREDEFINED_VALUE, REQUIRED, SHOW_LABEL, TIP, UNIQUE],

	EXTENDS: FormBuilderFieldBase,

	buildFieldId: function(id) {
		return FIELDS + _UNDERLINE + FIELD + _UNDERLINE + id;
	},

	buildFieldName: function(type) {
		return type + (++A.Env._uidx);
	},

	HTML_PARSER: {
		dropZoneNode: DOT + CSS_FB_DROP_ZONE,
		labelNode: LABEL,
		requiredFlagNode: DOT + CSS_ICON_ASTERISK,
		tipFlagNode: DOT + CSS_ICON_QUESTION_SIGN
	},

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		initializer: function() {
			var instance = this;

			instance.controlsToolbar = new A.Toolbar(
				instance.get(CONTROLS_TOOLBAR)
			);

			instance.toolTip = new A.Overlay({
				align: {
					node: instance.get(TIP_FLAG_NODE),
					points: [A.WidgetPositionAlign.LC, A.WidgetPositionAlign.RC]
				},
				boundingBox: A.Node.create(TPL_ALERT_TIP),
				zIndex: 500,
				visible: false
			});
		},

		bindUI: function() {
			var instance = this,
				tipFlagNode = instance.get(TIP_FLAG_NODE);

			instance.after(instance._afterOnDocFocus, instance, '_onDocFocus');

			tipFlagNode.on('mouseover', A.bind(instance._onMouseOverTipFlagNode, instance));
			tipFlagNode.on('mouseout', A.bind(instance._onMouseOutTipFlagNode, instance));
		},

		renderUI: function() {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX),
				contentBox = instance.get(CONTENT_BOX),
				labelNode = instance.get(LABEL_NODE),
				requiredFlagNode = instance.get(REQUIRED_FLAG_NODE),
				templateNode = instance.get(TEMPLATE_NODE),
				tipFlagNode = instance.get(TIP_FLAG_NODE);

			contentBox.addClass(CSS_CLEARFIX);

			contentBox.append(labelNode);
			contentBox.append(requiredFlagNode);
			contentBox.append(tipFlagNode);
			contentBox.append(templateNode);

			instance.controlsToolbar.render(boundingBox);
			instance.toolTip.render(contentBox);
		},

		destructor: function() {
			var instance = this;

			instance.get(FIELDS).each(function(field) {
				field.destroy();
			});

			var builder = instance.get(BUILDER);

			if (builder.editingField === instance) {
				delete builder.editingField;

				builder.closeEditProperties();
			}

			if (instance.controlsToolbar) {
				instance.controlsToolbar.destroy();
			}

			// destroy manually because NestedList doesn`t
			// use delegate
			instance.get(BOUNDING_BOX).dd.destroy();

			instance.toolTip.destroy();

			instance.get(PARENT).removeField(instance);

			builder.uniqueFieldsMap.remove(instance);
		},

		createField: function(val) {
			var instance = this,
				builder = instance.get(BUILDER);

			val = builder.createField(val);

			val.set(PARENT, instance);

			return val;
		},

		// To developer: Implement this
		getHTML: function() {
			return EMPTY_STR;
		},

		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		getProperties: function() {
			var instance = this,
				propertyModel = instance.getPropertyModel(),
				hiddenAttributes = instance.get(HIDDEN_ATTRIBUTES),
				readOnlyAttributes = instance.get(READ_ONLY_ATTRIBUTES),
				properties = [];

			AArray.each(propertyModel, function(property) {
				var attribute = property.attributeName;

				// TODO - Change checking to use hashes O(1) instead of indexOf arrays O(N)
				if (AArray.indexOf(hiddenAttributes, attribute) > -1) {
					return;
				}

				var value = instance.get(attribute), type = L.type(value);

				if (type === BOOLEAN) {
					value = String(value);
				}

				property.value = value;

				// TODO - Change checking to use hashes O(1) instead of indexOf arrays O(N)
				if (AArray.indexOf(readOnlyAttributes, attribute) > -1) {
					property.readOnly = true;
				}

				properties.push(property);
			});

			return properties;
		},

		getPropertyModel: function() {
			var instance = this,
				strings = instance.getStrings();

			return [
				{
					attributeName: TYPE,
					editor: false,
					name: strings[TYPE]
				},
				{
					attributeName: LABEL,
					editor: new A.TextCellEditor(),
					name: strings[LABEL]
				},
				{
					attributeName: SHOW_LABEL,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[SHOW_LABEL]
				},
				{
					attributeName: READ_ONLY,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[READ_ONLY]
				},
				{
					attributeName: REQUIRED,
					editor: new A.RadioCellEditor({
						options: {
							'true': strings[YES],
							'false': strings[NO]
						}
					}),
					formatter: A.bind(instance._booleanFormatter, instance),
					name: strings[REQUIRED]
				},
				{
					attributeName: NAME,
					editor: new A.TextCellEditor({
						validator: {
							rules: {
								value: {
									required: true
								}
							}
						}
					}),
					name: strings[NAME]
				},
				{
					attributeName: PREDEFINED_VALUE,
					editor: new A.TextCellEditor(),
					name: strings[PREDEFINED_VALUE]
				},
				{
					attributeName: TIP,
					editor: new A.TextAreaCellEditor(),
					name: strings[TIP]
				}
			];
		},

		_afterOnDocFocus: function(event) {
			var instance = this,
				builder = instance.get(BUILDER);

			if (!instance.get(FOCUSED)) {
				builder.closeEditProperties();
			}
		},

		_booleanFormatter: function(o) {
			var instance = this,
				strings = instance.getStrings();

			return A.DataType.Boolean.parse(o.data.value) ? strings[YES] : strings[NO];
		},

		_getToolbarItems: function() {
			var instance = this,
				builder = instance.get(BUILDER),
				items = [
					{
						icon: CSS_ICON_WRENCH,
						on: {
							click: A.bind(instance._handleEditEvent, instance)
						}
					}
				];

			if (!instance.get(UNIQUE)) {
				items.push(
					{
						icon: CSS_ICON_PLUS,
						on: {
							click: A.bind(instance._handleDuplicateEvent, instance)
						}
					}
				);
			}

			if ((builder && builder.get(ALLOW_REMOVE_REQUIRED_FIELDS)) || !instance.get(REQUIRED)) {
				items.push(
					{
						icon: CSS_ICON_TRASH,
						on: {
							click: A.bind(instance._handleDeleteEvent, instance)
						}
					}
				);
			}

			return [items];
		},

		_handleDuplicateEvent: function(event) {
			var instance = this;

			if (!instance.get(UNIQUE)) {
				instance.get(BUILDER).duplicateField(instance);
			}

			event.stopPropagation();
		},

		_handleEditEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).editField(instance);

			event.stopPropagation();
		},

		_handleDeleteEvent: function(event) {
			var instance = this,
				strings = instance.getStrings();

			if (confirm(strings[DELETE_FIELDS_MESSAGE])) {
				instance.destroy();
			}

			event.stopPropagation();
		},

		_onMouseOutTipFlagNode: function() {
			var instance = this;

			instance.toolTipTime = setTimeout(function() {
				instance.toolTip.hide();
			}, 300);
		},

		_onMouseOverTipFlagNode: function() {
			var instance = this;

			clearInterval(instance.toolTipTime);

			instance.toolTip.show();
		},

		_setId: function(val) {
			return A.FormBuilderField.buildFieldId(val);
		},

		_uiSetAcceptChildren: function(val) {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX),
				dropZone = instance.get(DROP_ZONE_NODE),
				markupDropZone = boundingBox.one(DOT + CSS_FB_DROP_ZONE);

			if (val && !markupDropZone) {
				boundingBox.append(dropZone);
			}
			else if (!val && markupDropZone) {
				markupDropZone.remove();
			}
			else if (val && markupDropZone) {
				instance.set(DROP_ZONE_NODE, markupDropZone);
			}
		},

		_uiSetDisabled: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			if (val) {
				templateNode.setAttribute(DISABLED, val);
			}
			else {
				templateNode.removeAttribute(DISABLED);
			}
		},

		_uiSetFields: function(val) {
			var instance = this,
				builder = instance.get(BUILDER);

			builder.plotFields(val, instance.get(DROP_ZONE_NODE));
		},

		_uiSetLabel: function(val) {
			var instance = this,
				labelNode = instance.get(LABEL_NODE);

			labelNode.setContent(val);
		},

		_uiSetName: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.set(NAME, val);
		},

		_uiSetPredefinedValue: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.val(val);
		},

		_uiSetRequired: function(val) {
			var instance = this,
				controlsToolbar = instance.controlsToolbar,
				requiredNode = instance.get(REQUIRED_FLAG_NODE);

			if (val) {
				requiredNode.show();
			}
			else {
				requiredNode.hide();
			}

			controlsToolbar.set(CHILDREN, instance._getToolbarItems());
		},

		_uiSetShowLabel: function(val)  {
			var instance = this,
				labelNode = instance.get(LABEL_NODE);

			if (val) {
				labelNode.show();
			}
			else {
				labelNode.hide();
			}
		},

		_uiSetTip: function(val) {
			var instance = this,
				tipFlagNode = instance.get(TIP_FLAG_NODE);

			if (val) {
				tipFlagNode.show();
			}
			else {
				tipFlagNode.hide();
			}

			instance.toolTip.set(BODY_CONTENT, val);
		},

		_uiSetUnique: function(val) {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX),
				controlsToolbar = instance.controlsToolbar;

			boundingBox.toggleClass(CSS_FB_UNIQUE, val);

			controlsToolbar.set(CHILDREN, instance._getToolbarItems());
		}

	}

});

A.FormBuilderField = FormBuilderField;

A.FormBuilder.types.field = A.FormBuilderField;