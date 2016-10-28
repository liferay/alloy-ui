AUI.add('aui-form-validator', function(A) {
// API inspired on the amazing jQuery Form Validation - http://jquery.bassistance.de/validate/

var Lang = A.Lang,
	AObject = A.Object,
	isBoolean = Lang.isBoolean,
	isDate = Lang.isDate,
	isEmpty = AObject.isEmpty,
	isFunction = Lang.isFunction,
	isObject = Lang.isObject,
	isString = Lang.isString,
	trim = Lang.trim,

	isNode = function(v) {
		return (v instanceof A.Node);
	},

	getRegExp = A.DOM._getRegExp,

	FORM_VALIDATOR = 'form-validator',

	_DOT = '.',
	_EMPTY_STR = '',
	_FORM_ELEMENTS_SELECTOR = 'input,select,textarea,button',
	_INVALID_DATE = 'Invalid Date',
	_PIPE = '|',

	EV_BLUR = 'blur',
	EV_ERROR_FIELD = 'errorField',
	EV_INPUT = 'input',
	EV_SUBMIT_ERROR = 'submitError',
	EV_VALIDATE_FIELD = 'validateField',
	EV_VALID_FIELD = 'validField',

	ARIA_REQUIRED = 'aria-required',
	BOUNDING_BOX = 'boundingBox',
	CHECKBOX = 'checkbox',
	CONTAINER = 'container',
	CONTAINER_ERROR_CLASS = 'containerErrorClass',
	CONTAINER_VALID_CLASS = 'containerValidClass',
	ERROR = 'error',
	ERROR_CLASS = 'errorClass',
	EXTRACT_RULES = 'extractRules',
	FIELD = 'field',
	FIELD_CONTAINER = 'fieldContainer',
	FIELD_STRINGS = 'fieldStrings',
	FOCUS = 'focus',
	LABEL_CSS_CLASS = 'labelCssClass',
	MESSAGE = 'message',
	MESSAGE_CONTAINER = 'messageContainer',
	NAME = 'name',
	RADIO = 'radio',
	RULES = 'rules',
	SELECT_TEXT = 'selectText',
	SHOW_ALL_MESSAGES = 'showAllMessages',
	SHOW_MESSAGES = 'showMessages',
	STACK = 'stack',
	STACK_ERROR_CONTAINER = 'stackErrorContainer',
	STRINGS = 'strings',
	SUBMIT = 'submit',
	TYPE = 'type',
	VALID = 'valid',
	VALID_CLASS = 'validClass',
	VALIDATE_ON_BLUR = 'validateOnBlur',
	VALIDATE_ON_INPUT = 'validateOnInput',

	getCN = A.getClassName,

	CSS_ERROR = getCN(FORM_VALIDATOR, ERROR),
	CSS_ERROR_CONTAINER = getCN(FORM_VALIDATOR, ERROR, CONTAINER),
	CSS_VALID = getCN(FORM_VALIDATOR, VALID),
	CSS_VALID_CONTAINER = getCN(FORM_VALIDATOR, VALID, CONTAINER),

	CSS_FIELD = getCN(FIELD),
	CSS_MESSAGE = getCN(FORM_VALIDATOR, MESSAGE),
	CSS_STACK_ERROR = getCN(FORM_VALIDATOR, STACK, ERROR),

	TPL_MESSAGE = '<div class="' + CSS_MESSAGE + '" role="alert"></div>',
	TPL_STACK_ERROR = '<label class="' + CSS_STACK_ERROR + '"></label>';

YUI.AUI.defaults.FormValidator = {
	STRINGS: {
		DEFAULT: 'Please fix this field.',
		acceptFiles: 'Please enter a value with a valid extension ({0}).',
		alpha: 'Please enter only alpha characters.',
		alphanum: 'Please enter only alphanumeric characters.',
		date: 'Please enter a valid date.',
		digits: 'Please enter only digits.',
		email: 'Please enter a valid email address.',
		equalTo: 'Please enter the same value again.',
		iri: 'Please enter a valid IRI.',
		max: 'Please enter a value less than or equal to {0}.',
		maxLength: 'Please enter no more than {0} characters.',
		min: 'Please enter a value greater than or equal to {0}.',
		minLength: 'Please enter at least {0} characters.',
		number: 'Please enter a valid number.',
		range: 'Please enter a value between {0} and {1}.',
		rangeLength: 'Please enter a value between {0} and {1} characters long.',
		required: 'This field is required.',
		url: 'Please enter a valid URL.'
	},

	REGEX: {
		alpha: /^[a-z_]+$/i,

		alphanum: /^\w+$/,

		digits: /^\d+$/,

		// Regex from Scott Gonzalez Email Address Validation: http://projects.scottsplayground.com/email_address_validation/
		email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,

		// Regex from Scott Gonzalez IRI: http://projects.scottsplayground.com/iri/demo/
		iri: /^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i,

		number: /^[+\-]?(\d+([.,]\d+)?)+$/,

		// Regex from Scott Gonzalez Common URL: http://projects.scottsplayground.com/iri/demo/common.html
		url: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)*(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
	},

	RULES: {
		acceptFiles: function(val, node, ruleValue) {
			var regex = null;

			if (isString(ruleValue)) {
				var extensions = ruleValue.replace(/\./g, '').split(/,\s*|\b\s*/);

				extensions = A.Array.map(extensions, A.Escape.regex);

				regex = getRegExp('[.](' + extensions.join(_PIPE) + ')$', 'i');
			}

			return regex && regex.test(val);
		},

		date: function(val, node, ruleValue) {
			var date = new Date(val);

			return (isDate(date) && (date !== _INVALID_DATE) && !isNaN(date));
		},

		equalTo: function(val, node, ruleValue) {
			var comparator = A.one(ruleValue);

			return comparator && (trim(comparator.val()) === val);
		},

		max: function(val, node, ruleValue) {
			return (Lang.toFloat(val) <= ruleValue);
		},

		maxLength: function(val, node, ruleValue) {
			return (val.length <= ruleValue);
		},

		min: function(val, node, ruleValue) {
			return (Lang.toFloat(val) >= ruleValue);
		},

		minLength: function(val, node, ruleValue) {
			return (val.length >= ruleValue);
		},

		range: function(val, node, ruleValue) {
			var num = Lang.toFloat(val);

			return (num >= ruleValue[0]) && (num <= ruleValue[1]);
		},

		rangeLength: function(val, node, ruleValue) {
			var length = val.length;

			return (length >= ruleValue[0]) && (length <= ruleValue[1]);
		},

		required: function(val, node, ruleValue) {
			var instance = this;

			if (A.FormValidator.isCheckable(node)) {
				var name = node.get(NAME),
					elements = A.all(instance.getFieldsByName(name));

				return (elements.filter(':checked').size() > 0);
			}
			else {
				return !!val;
			}
		}
	}
};

var _DEFAULT_MAP = YUI.AUI.defaults.FormValidator;

var FormValidator = A.Component.create({
	NAME: FORM_VALIDATOR,

	ATTRS: {
		boundingBox: {
			setter: A.one
		},

		containerErrorClass: {
			value: CSS_ERROR_CONTAINER,
			validator: isString
		},

		containerValidClass: {
			value: CSS_VALID_CONTAINER,
			validator: isString
		},

		errorClass: {
			value: CSS_ERROR,
			validator: isString
		},

		extractRules: {
			value: true,
			validator: isBoolean
		},

		fieldContainer: {
			value: _DOT+CSS_FIELD
		},

		fieldStrings: {
			value: {},
			validator: isObject
		},

		labelCssClass: {
			validator: isString,
			value: 'aui-field-label'
		},

		messageContainer: {
			getter: function(val) {
				return A.Node.create(val).clone();
			},
			value: TPL_MESSAGE
		},

		strings: {
			valueFn: function() {
				return _DEFAULT_MAP.STRINGS;
			}
		},

		rules: {
			getter: function(val) {
				var instance = this;
				if (!instance._rulesAlreadyExtracted) {
					instance._extractRulesFromMarkup(val);
				}
				return val;
			},
			validator: isObject,
			value: {}
		},

		selectText: {
			value: true,
			validator: isBoolean
		},

		showMessages: {
			value: true,
			validator: isBoolean
		},

		showAllMessages: {
			value: false,
			validator: isBoolean
		},

		stackErrorContainer: {
			getter: function(val) {
				return A.Node.create(val).clone();
			},
			value: TPL_STACK_ERROR
		},

		validateOnBlur: {
			value: true,
			validator: isBoolean
		},

		validateOnInput: {
			value: false,
			validator: isBoolean
		},

		validClass: {
			value: CSS_VALID,
			validator: isString
		}
	},

	isCheckable: function(node) {
		var nodeType = node.get(TYPE).toLowerCase();

		return (nodeType === CHECKBOX || nodeType === RADIO);
	},

	EXTENDS: A.Base,

	prototype: {
		initializer: function() {
			var instance = this;

			instance.errors = {};
			instance._blurHandlers = null;
			instance._inputHandlers = null;
			instance._rulesAlreadyExtracted = false;
			instance._stackErrorContainers = {};

			instance.bindUI();
			instance._uiSetValidateOnBlur(instance.get(VALIDATE_ON_BLUR));
			instance._uiSetValidateOnInput(instance.get(VALIDATE_ON_INPUT));
		},

		bindUI: function() {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX);

			var onceFocusHandler = boundingBox.delegate(FOCUS, function(event) {
				instance._setARIARoles();
				onceFocusHandler.detach();
			}, _FORM_ELEMENTS_SELECTOR);

			instance.publish({
				errorField: { defaultFn: instance._defErrorFieldFn },
				validField: { defaultFn: instance._defValidFieldFn },
				validateField: { defaultFn: instance._defValidateFieldFn }
			});

			boundingBox.on({
				reset: A.bind(instance._onFormReset, instance),
				submit: A.bind(instance._onFormSubmit, instance)
			});

			instance.after('extractRulesChange', instance._afterExtractRulesChange);
			instance.after('validateOnBlurChange', instance._afterValidateOnBlurChange);
			instance.after('validateOnInputChange', instance._afterValidateOnInputChange);
		},

		addFieldError: function(field, ruleName) {
			var instance = this,
				errors = instance.errors,
				name = field.get(NAME);

			if (!errors[name]) {
				errors[name] = [];
			}

			errors[name].push(ruleName);
		},

		clearFieldError: function(field) {
			var instance = this;

			var fieldName = isNode(field) ? field.get(NAME) : field;

			if (isString(fieldName)) {
				delete instance.errors[fieldName];
			}
		},

		eachRule: function(fn) {
			var instance = this;

			A.each(
				instance.get(RULES),
				function(rule, fieldName) {
					if (isFunction(fn)) {
						fn.apply(instance, [rule, fieldName]);
					}
				}
			);
		},

		findFieldContainer: function(field) {
			var instance = this,
				fieldContainer = instance.get(FIELD_CONTAINER);

			if (fieldContainer) {
				return field.ancestor(fieldContainer);
			}
		},

		focusInvalidField: function() {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX),
				field = boundingBox.one(_DOT+CSS_ERROR);

			if (field) {
				if (instance.get(SELECT_TEXT)) {
					field.selectText();
				}

				field.focus();
			}
		},

		getField: function(fieldOrFieldName) {
			var instance = this;

			if (isString(fieldOrFieldName)) {
				fieldOrFieldName = instance.getFieldsByName(fieldOrFieldName);

				if (fieldOrFieldName && fieldOrFieldName.length && !fieldOrFieldName.name) {
					fieldOrFieldName = fieldOrFieldName[0];
				}
			}

			return A.one(fieldOrFieldName);
		},

		getFieldsByName: function(fieldName) {
			var instance = this,
				domBoundingBox = instance.get(BOUNDING_BOX).getDOM();

			return domBoundingBox.elements[fieldName];
		},

		getFieldError: function(field) {
			var instance = this;

			return instance.errors[field.get(NAME)];
		},

		getFieldStackErrorContainer: function(field) {
			var instance = this,
				name = isNode(field) ? field.get(NAME) : field,
				stackContainers = instance._stackErrorContainers;

			if (!stackContainers[name]) {
				stackContainers[name] = instance.get(STACK_ERROR_CONTAINER);
			}

			return stackContainers[name];
		},

		getFieldErrorMessage: function(field, rule) {
			var instance = this,
				fieldName = field.get(NAME),
				fieldStrings = instance.get(FIELD_STRINGS)[fieldName] || {},
				fieldRules = instance.get(RULES)[fieldName],
				strings = instance.get(STRINGS),
				substituteRulesMap = {};

			if (rule in fieldRules) {
				var ruleValue = A.Array(fieldRules[rule]);

				A.each(
					ruleValue,
					function(value, index) {
						substituteRulesMap[index] = [value].join(_EMPTY_STR);
					}
				);
			}

			var message = (fieldStrings[rule] || strings[rule] || strings.DEFAULT);

			return Lang.sub(message, substituteRulesMap);
		},

		hasErrors: function() {
			var instance = this;

			return !isEmpty(instance.errors);
		},

		highlight: function(field, valid) {
			var instance = this,
					fieldContainer,
					fieldName,
					namedFieldNodes;

			if (field) {
				fieldContainer = instance.findFieldContainer(field);

				fieldName = field.get(NAME);

				if (this.validatable(field)) {
					namedFieldNodes = A.all(instance.getFieldsByName(fieldName));

					namedFieldNodes.each(
						function(node) {
							instance._highlightHelper(
								node,
								instance.get(ERROR_CLASS),
								instance.get(VALID_CLASS),
								valid
							);
						}
					);

					if (fieldContainer) {
						instance._highlightHelper(
							fieldContainer,
							instance.get(CONTAINER_ERROR_CLASS),
							instance.get(CONTAINER_VALID_CLASS),
							valid
						);
					}
				}
				else if (!field.val()) {
					instance.resetField(fieldName);
				}
			}
		},

		normalizeRuleValue: function(ruleValue) {
			var instance = this;

			return isFunction(ruleValue) ? ruleValue.apply(instance) : ruleValue;
		},

		unhighlight: function(field) {
			var instance = this;

			instance.highlight(field, true);
		},

		printStackError: function(field, container, errors) {
			var instance = this;

			if (!instance.get(SHOW_ALL_MESSAGES)) {
				errors = errors.slice(0, 1);
			}

			container.empty();

			A.each(
				errors,
				function(error, index) {
					var message = instance.getFieldErrorMessage(field, error),
						messageEl = instance.get(MESSAGE_CONTAINER).addClass(error);

					container.append(
						messageEl.html(message)
					);
				}
			);
		},

		resetAllFields: function() {
			var instance = this;

			instance.eachRule(
				function(rule, fieldName) {
					instance.resetField(fieldName);
				}
			);
		},

		resetField: function(field) {
			var instance = this,
					fieldName,
					namedFieldNodes,
					stackContainer;

			fieldName = isNode(field) ? field.get(NAME) : field;

			instance.clearFieldError(fieldName);

			stackContainer = instance.getFieldStackErrorContainer(fieldName);

			stackContainer.remove();

			namedFieldNodes = A.all(instance.getFieldsByName(fieldName));

			namedFieldNodes.each(
				function(node) {
					instance.resetFieldCss(node);
				}
			);
		},

		resetFieldCss: function(field) {
			var instance = this,
				fieldContainer = instance.findFieldContainer(field);

			var removeClasses = function(elem, classAttrs) {
				if (elem) {
					A.each(classAttrs, function(attrName) {
						elem.removeClass(
							instance.get(attrName)
						);
					});
				}
			};

			removeClasses(field, [VALID_CLASS, ERROR_CLASS]);
			removeClasses(fieldContainer, [CONTAINER_VALID_CLASS, CONTAINER_ERROR_CLASS]);
		},

		validatable: function(field) {
			var instance = this,
				validatable = false,
				fieldRules = instance.get(RULES)[field.get(NAME)];

			if (fieldRules) {
				var required = instance.normalizeRuleValue(fieldRules.required);

				validatable = (required || (!required && _DEFAULT_MAP.RULES.required.apply(instance, [field.val(), field])) || fieldRules.custom);
			}

			return !!validatable;
		},

		validate: function() {
			var instance = this;

			instance.eachRule(
				function(rule, fieldName) {
					instance.validateField(fieldName);
				}
			);

			instance.focusInvalidField();
		},

		validateField: function(field) {
			var instance = this;

			instance.resetField(field);

			var fieldNode = isString(field) ? instance.getField(field) : field;

			if (isNode(fieldNode)) {
				var validatable = instance.validatable(fieldNode);

				if (validatable) {
					instance.fire(EV_VALIDATE_FIELD, {
						validator: {
							field: fieldNode
						}
					});
				}
			}
		},

		_afterExtractRulesChange: function(event) {
			var instance = this;

			instance._uiSetExtractRules(event.newVal);
		},

		_afterValidateOnInputChange: function(event) {
			var instance = this;

			instance._uiSetValidateOnInput(event.newVal);
		},

		_afterValidateOnBlurChange: function(event) {
			var instance = this;

			instance._uiSetValidateOnBlur(event.newVal);
		},

		_defErrorFieldFn: function(event) {
			var instance = this,
				ancestor,
				field,
				nextSibling,
				stackContainer,
				target,
				validator;

			validator = event.validator;
			field = validator.field;

			instance.highlight(field);

			if (instance.get(SHOW_MESSAGES)) {
				target = field;

				stackContainer = instance.getFieldStackErrorContainer(field);

				nextSibling = field.get('nextSibling');

				if (nextSibling && nextSibling.get('nodeType') === 3) {
					ancestor = field.ancestor();

					if (ancestor && ancestor.hasClass(instance.get(LABEL_CSS_CLASS))) {
						target = nextSibling;
					}
				}

				target.placeAfter(stackContainer);

				instance.printStackError(
					field,
					stackContainer,
					validator.errors
				);
			}
		},

		_defValidFieldFn: function(event) {
			var instance = this;

			var field = event.validator.field;

			instance.unhighlight(field);
		},

		_defValidateFieldFn: function(event) {
			var instance = this;

			var field = event.validator.field;
			var fieldRules = instance.get(RULES)[field.get(NAME)];

			A.each(
				fieldRules,
				function(ruleValue, ruleName) {
					var rule = _DEFAULT_MAP.RULES[ruleName];
					var fieldValue = trim(field.val());

					ruleValue = instance.normalizeRuleValue(ruleValue);

					if (isFunction(rule) &&
						!rule.apply(instance, [fieldValue, field, ruleValue])) {

						instance.addFieldError(field, ruleName);
					}
				}
			);

			var fieldErrors = instance.getFieldError(field);

			if (fieldErrors) {
				instance.fire(EV_ERROR_FIELD, {
					validator: {
						field: field,
						errors: fieldErrors
					}
				});
			}
			else {
				instance.fire(EV_VALID_FIELD, {
					validator: {
						field: field
					}
				});
			}
		},

		_highlightHelper: function(field, errorClass, validClass, valid) {
			if (valid) {
				field.removeClass(errorClass).addClass(validClass);
			}
			else {
				field.removeClass(validClass).addClass(errorClass);
			}
		},

		_extractRulesFromMarkup: function(rules) {
			var instance = this,
				domBoundingBox = instance.get(BOUNDING_BOX).getDOM(),
				elements = domBoundingBox.elements,
				defaultRulesKeys = AObject.keys(_DEFAULT_MAP.RULES),
				defaultRulesJoin = defaultRulesKeys.join('|'),
				regex = getRegExp('aui-field-(' + defaultRulesJoin + ')', 'g'),
				i,
				length,
				ruleNameMatch = [],
				ruleMatcher = function(m1, m2) {
					ruleNameMatch.push(m2);
				};

			for (i = 0, length = elements.length; i < length; i++) {
				var el = elements[i],
					fieldName = el.name;

				el.className.replace(regex, ruleMatcher);

				if (ruleNameMatch.length) {
					var fieldRules = rules[fieldName],
						j,
						ruleNameLength;

					if (!fieldRules) {
						fieldRules = {};
						rules[fieldName] = fieldRules;
					}
					for (j = 0, ruleNameLength = ruleNameMatch.length; j < ruleNameLength; j++) {
						var rule = ruleNameMatch[j];

						if (!(rule in fieldRules)) {
							fieldRules[rule] = true;
						}
					}
					ruleNameMatch.length = 0;
				}
			}

			instance._rulesAlreadyExtracted = true;
		},

		_onFieldInput: function(event) {
			var instance = this;

			instance.validateField(event.target);
		},

		_onFormSubmit: function(event) {
			var instance = this;

			var data = {
				validator: {
					formEvent: event
				}
			};

			instance.validate();

			if (instance.hasErrors()) {
				data.validator.errors = instance.errors;

				instance.fire(EV_SUBMIT_ERROR, data);

				event.halt();
			}
			else {
				instance.fire(SUBMIT, data);
			}
		},

		_onFormReset: function(event) {
			var instance = this;

			instance.resetAllFields();
		},

		_setARIARoles: function() {
			var instance = this;

			instance.eachRule(
				function(rule, fieldName) {
					if (rule.required) {
						var field = instance.getField(fieldName);

						if (field && !field.attr(ARIA_REQUIRED)) {
							field.attr(ARIA_REQUIRED, true);
						}
					}
				}
			);
		},

		_uiSetExtractRules: function(val) {
			var instance = this;
			if (val) {
				instance._extractRulesFromMarkup(instance.get(RULES));
			}
		},

		_uiSetValidateOnInput: function(val) {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX);

			if (val) {
				if (!instance._inputHandlers) {
					instance._inputHandlers = boundingBox.delegate(EV_INPUT, instance._onFieldInput, _FORM_ELEMENTS_SELECTOR, instance);
				}
			}
			else {
				if (instance._inputHandlers) {
					instance._inputHandlers.detach();
				}
			}
		},

		_uiSetValidateOnBlur: function(val) {
			var instance = this,
				boundingBox = instance.get(BOUNDING_BOX);

			if (val) {
				if (!instance._blurHandlers) {
					instance._blurHandlers = boundingBox.delegate(EV_BLUR, instance._onFieldInput, _FORM_ELEMENTS_SELECTOR, instance);
				}
			}
			else {
				if (instance._blurHandlers) {
					instance._blurHandlers.detach();
				}
			}
		}
	}
});

A.each(
	_DEFAULT_MAP.REGEX,
	function(regex, key) {
		_DEFAULT_MAP.RULES[key] = function(val, node, ruleValue) {
			return _DEFAULT_MAP.REGEX[key].test(val);
		};
	}
);

A.FormValidator = FormValidator;

}, '@VERSION@' ,{skinnable:false, requires:['aui-base','aui-event-input','escape','selector-css3']});
