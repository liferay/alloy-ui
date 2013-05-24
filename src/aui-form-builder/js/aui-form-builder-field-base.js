/**
 * The Form Builder Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-base
 */

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
	SELECTED = 'selected',
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
	CSS_FB_FIELD_SELECTED = getCN(FORM, BUILDER, FIELD, SELECTED),
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

/**
 * A base class for FormBuilderFieldBase.
 *
 * @class A.FormBuilderFieldBase
 * @extends Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderFieldBase = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderFieldBase.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_FIELD,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderFieldBase.AUGMENTS
	 * @type Array
	 * @static
	 */
	AUGMENTS: [A.FieldSupport]
});

/**
 * A base class for FormBuilderField.
 *
 * @class A.FormBuilderField
 * @extends A.FormBuilderFieldBase
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var FormBuilderField = A.Component.create({

	/**
	 * Static property provides a string to identify the class.
	 *
	 * @property FormBuilderField.NAME
	 * @type String
	 * @static
	 */
	NAME: FORM_BUILDER_FIELD,

	/**
	 * Static property used to define the default attribute
	 * configuration for the FormBuilderField.
	 *
	 * @property FormBuilderField.ATTRS
	 * @type Object
	 * @static
	 */
	ATTRS: {

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute acceptChildren
		 * @default true
		 * @type Boolean
		 */
		acceptChildren: {
			value: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute builder
		 * @default null
		 * @type Boolean
		 */
		builder: {
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute controlsToolbar
		 * @type Object
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute dataType
		 * @default 'string'
		 * @type String
		 */
		dataType: {
			value: STRING
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute disabled
		 * @default false
		 * @type Boolean
		 */
		disabled: {
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute selected
		 * @default false
		 * @type Boolean
		 */
		selected: {
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute hiddenAttributes
		 * @default []
		 * @type Array
		 */
		hiddenAttributes: {
			validator: isArray,
			value: []
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute id
		 */
		id: {
			setter: '_setId'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute label
		 * @default ''
		 * @type String
		 */
		label: {
			value: EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute localizationMap
		 * @default {}
		 * @type Object
		 */
		localizationMap: {
			value: {}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute name
		 */
		name: {
			valueFn: function() {
				var instance = this,
					type = instance.get(TYPE);

				return A.FormBuilderField.buildFieldName(type);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute parent
		 * @default null
		 */
		parent: {
			value: null
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute predefinedValue
		 * @default ''
		 * @type String
		 */
		predefinedValue: {
			value: EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute readOnly
		 * @default false
		 * @type Boolean
		 */
		readOnly: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute readOnlyAttributes
		 * @default []
		 * @type Array
		 */
		readOnlyAttributes: {
			validator: isArray,
			value: []
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute required
		 * @default false
		 * @type Boolean
		 */
		required: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute showLabel
		 * @default true
		 * @type Boolean
		 */
		showLabel: {
			setter: A.DataType.Boolean.parse,
			value: true
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute strings
		 * @type Object
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute tabIndex
		 * @default 0
		 * @type Number
		 */
		tabIndex: {
			value: 0
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute template
		 * @default ''
		 * @type String
		 */
		template: {
			value: EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute tip
		 * @default ''
		 * @type String
		 */
		tip: {
			value: EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute type
		 * @default ''
		 * @type String
		 */
		type: {
			value: EMPTY_STR
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute unique
		 * @default false
		 * @type Boolean
		 */
		unique: {
			setter: A.DataType.Boolean.parse,
			value: false
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute zIndex
		 * @default 100
		 * @type Number
		 */
		zIndex: {
			value: 100
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute dropZoneNode
		 */
		dropZoneNode: {
			valueFn: function() {
				return A.Node.create(TPL_DROP_ZONE);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute labelNode
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute requiredFlagNode
		 */
		requiredFlagNode: {
			valueFn: function() {
				return A.Node.create(TPL_FLAG_REQUIRED);
			}
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute templateNode
		 */
		templateNode: {
			valueFn: 'getNode'
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @attribute tipFlagNode
		 */
		tipFlagNode: {
			valueFn: function() {
				return A.Node.create(TPL_FLAG_TIP);
			}
		}

	},

	/**
	 * Static property used to define the UI attributes.
	 *
	 * @property FormBuilderField.UI_ATTRS
	 * @type Array
	 * @static
	 */
	UI_ATTRS: [ACCEPT_CHILDREN, DISABLED, FIELDS, LABEL, NAME, PREDEFINED_VALUE, REQUIRED, SELECTED, SHOW_LABEL, TIP, UNIQUE],

	/**
	 * Static property used to define which component it extends.
	 *
	 * @property FormBuilderField.EXTENDS
	 * @type Object
	 * @static
	 */
	EXTENDS: FormBuilderFieldBase,

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method buildFieldId
	 * @param id
	 * @private
	 */
	buildFieldId: function(id) {
		return FIELDS + _UNDERLINE + FIELD + _UNDERLINE + id;
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @method buildFieldName
	 * @param type
	 * @private
	 */
	buildFieldName: function(type) {
		return type + (++A.Env._uidx);
	},

	/**
	 * TODO. Wanna help? Please send a Pull Request.
	 *
	 * @property FormBuilderField.HTML_PARSER
	 * @type Object
	 * @static
	 */
	HTML_PARSER: {
		dropZoneNode: DOT + CSS_FB_DROP_ZONE,
		labelNode: LABEL,
		requiredFlagNode: DOT + CSS_ICON_ASTERISK,
		tipFlagNode: DOT + CSS_ICON_QUESTION_SIGN
	},

	prototype: {
		BOUNDING_TEMPLATE: TPL_BOUNDING_BOX,

		/**
		 * Construction logic executed during FormBuilderField instantiation. Lifecycle.
		 *
		 * @method initializer
		 * @protected
		 */
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

		/**
		 * Bind the events on the FormBuilderField UI. Lifecycle.
		 *
		 * @method bindUI
		 * @protected
		 */
		bindUI: function() {
			var instance = this,
				tipFlagNode = instance.get(TIP_FLAG_NODE);

			tipFlagNode.on('mouseover', A.bind(instance._onMouseOverTipFlagNode, instance));
			tipFlagNode.on('mouseout', A.bind(instance._onMouseOutTipFlagNode, instance));
		},

		/**
		 * Render the FormBuilderField component instance. Lifecycle.
		 *
		 * @method renderUI
		 * @protected
		 */
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

		/**
		 * Destructor lifecycle implementation for the FormBuilderField class. Lifecycle.
		 *
		 * @method destructor
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method createField
		 * @param val
		 */
		createField: function(val) {
			var instance = this,
				builder = instance.get(BUILDER);

			val = builder.createField(val);

			val.set(PARENT, instance);

			return val;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 * To developer: Implement this
		 *
		 * @method getHTML
		 */
		getHTML: function() {
			return EMPTY_STR;
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getNode
		 */
		getNode: function() {
			var instance = this;

			return A.Node.create(instance.getHTML());
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getProperties
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method getPropertyModel
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _booleanFormatter
		 * @param o
		 * @protected
		 */
		_booleanFormatter: function(o) {
			var instance = this,
				strings = instance.getStrings();

			return A.DataType.Boolean.parse(o.data.value) ? strings[YES] : strings[NO];
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _getToolbarItems
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleDuplicateEvent
		 * @param event
		 * @protected
		 */
		_handleDuplicateEvent: function(event) {
			var instance = this;

			if (!instance.get(UNIQUE)) {
				instance.get(BUILDER).duplicateField(instance);
			}

			event.stopPropagation();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleEditEvent
		 * @param event
		 * @protected
		 */
		_handleEditEvent: function(event) {
			var instance = this;

			instance.get(BUILDER).editField(instance);

			event.stopPropagation();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _handleDeleteEvent
		 * @param event
		 * @protected
		 */
		_handleDeleteEvent: function(event) {
			var instance = this,
				strings = instance.getStrings();

			if (confirm(strings[DELETE_FIELDS_MESSAGE])) {
				instance.destroy();
			}

			event.stopPropagation();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onMouseOutTipFlagNode
		 * @protected
		 */
		_onMouseOutTipFlagNode: function() {
			var instance = this;

			instance.toolTipTime = setTimeout(function() {
				instance.toolTip.hide();
			}, 300);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _onMouseOverTipFlagNode
		 * @protected
		 */
		_onMouseOverTipFlagNode: function() {
			var instance = this;

			clearInterval(instance.toolTipTime);

			instance.toolTip.show();
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _setId
		 * @param val
		 * @protected
		 */
		_setId: function(val) {
			return A.FormBuilderField.buildFieldId(val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetAcceptChildren
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetSelected
		 * @param val
		 * @protected
		 */
		_uiSetSelected: function(val) {
			var instance = this;

			instance.get(BOUNDING_BOX).toggleClass(CSS_FB_FIELD_SELECTED, val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetSelected
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetFields
		 * @param val
		 * @protected
		 */
		_uiSetFields: function(val) {
			var instance = this,
				builder = instance.get(BUILDER);

			builder.plotFields(val, instance.get(DROP_ZONE_NODE));
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetLabel
		 * @param val
		 * @protected
		 */
		_uiSetLabel: function(val) {
			var instance = this,
				labelNode = instance.get(LABEL_NODE);

			labelNode.setContent(val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetName
		 * @param val
		 * @protected
		 */
		_uiSetName: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.set(NAME, val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetPredefinedValue
		 * @param val
		 * @protected
		 */
		_uiSetPredefinedValue: function(val) {
			var instance = this,
				templateNode = instance.get(TEMPLATE_NODE);

			templateNode.val(val);
		},

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetRequired
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetShowLabel
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetTip
		 * @param val
		 * @protected
		 */
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

		/**
		 * TODO. Wanna help? Please send a Pull Request.
		 *
		 * @method _uiSetUnique
		 * @param val
		 * @protected
		 */
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