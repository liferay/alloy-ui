/**
 * The Form Validator Component
 *
 * @module aui-form-validator
 */

// API inspired on the amazing jQuery Form Validation -
// http://jquery.bassistance.de/validate/

var Lang = A.Lang,
    AObject = A.Object,
    isBoolean = Lang.isBoolean,
    isDate = Lang.isDate,
    isEmpty = AObject.isEmpty,
    isFunction = Lang.isFunction,
    isNode = Lang.isNode,
    isObject = Lang.isObject,
    isString = Lang.isString,
    trim = Lang.trim,

    defaults = A.namespace('config.FormValidator'),

    getRegExp = A.DOM._getRegExp,

    getCN = A.getClassName,

    CSS_FORM_GROUP = getCN('form', 'group'),
    CSS_HAS_ERROR = getCN('has', 'error'),
    CSS_ERROR_FIELD = getCN('error', 'field'),
    CSS_HAS_SUCCESS = getCN('has', 'success'),
    CSS_SUCCESS_FIELD = getCN('success', 'field'),
    CSS_HELP_BLOCK = getCN('help', 'block'),
    CSS_STACK = getCN('form-validator', 'stack'),

    TPL_MESSAGE = '<div role="alert"></div>',
    TPL_STACK_ERROR = '<div class="' + [CSS_STACK, CSS_HELP_BLOCK].join(' ') + '"></div>';

A.mix(defaults, {
    STRINGS: {
        DEFAULT: 'Please fix {field}.',
        acceptFiles: 'Please enter a value with a valid extension ({0}) in {field}.',
        alpha: 'Please enter only alpha characters in {field}.',
        alphanum: 'Please enter only alphanumeric characters in {field}.',
        date: 'Please enter a valid date in {field}.',
        digits: 'Please enter only digits in {field}.',
        email: 'Please enter a valid email address in {field}.',
        equalTo: 'Please enter the same value again in {field}.',
        iri: 'Please enter a valid IRI in {field}.',
        max: 'Please enter a value less than or equal to {0} in {field}.',
        maxLength: 'Please enter no more than {0} characters in {field}.',
        min: 'Please enter a value greater than or equal to {0} in {field}.',
        minLength: 'Please enter at least {0} characters in {field}.',
        number: 'Please enter a valid number in {field}.',
        range: 'Please enter a value between {0} and {1} in {field}.',
        rangeLength: 'Please enter a value between {0} and {1} characters long in {field}.',
        required: '{field} is required.',
        url: 'Please enter a valid URL in {field}.'
    },

    REGEX: {
        alpha: /^[a-z_]+$/i,

        alphanum: /^\w+$/,

        digits: /^\d+$/,

        // Regex from Scott Gonzalez Email Address Validation:
        // http://projects.scottsplayground.com/email_address_validation/
        email: new RegExp('^((([a-z]|\\d|[!#\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|' +
            '[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])+(\\.([a-z]|\\d|[!#' +
            '\\$%&\'\\*\\+\\-\\/=\\?\\^_`{\\|}~]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF' +
            '\\uFDF0-\\uFFEF])+)*)|((\\x22)((((\\x20|\\x09)*(\\x0d\\x0a))?(\\x20' +
            '|\\x09)+)?(([\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x7f]|\\x21|[\\x23-\\' +
            'x5b]|[\\x5d-\\x7e]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])' +
            '|(\\\\([\\x01-\\x09\\x0b\\x0c\\x0d-\\x7f]|[\\u00A0-\\uD7FF\\uF900-' +
            '\\uFDCF\\uFDF0-\\uFFEF]))))*(((\\x20|\\x09)*(\\x0d\\x0a))?(\\' +
            'x20|\\x09)+)?(\\x22)))@((([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\' +
            'uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\' +
            'uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\' +
            'uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|\\d|[\\u00A0-\\uD7FF\\' +
            'uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.)+(([a-z]|[\\u00A0-\\uD7FF\\' +
            'uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|[\\u00A0-\\uD7FF\\' +
            'uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|-|\\.|_|~|[\\' +
            'u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*([a-z]|[\\' +
            'u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?$', 'i'),

        // Regex from Scott Gonzalez IRI:
        // http://projects.scottsplayground.com/iri/demo/
        iri: new RegExp('^([a-z]([a-z]|\\d|\\+|-|\\.)*):(\\/\\/(((([a-z]|\\d|' +
            '-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[' +
            '\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:)*@)?((\\[(|(v[\\da-f]{1' +
            ',}\\.(([a-z]|\\d|-|\\.|_|~)|[!\\$&\'\\(\\)\\*\\+,;=]|:)+))\\])' +
            '|((\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1' +
            '\\d\\d|2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d' +
            '|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|' +
            '(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-' +
            '\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=])*)(:\\d*)?)' +
            '(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\' +
            'uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)*)' +
            '*|(\\/((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\' +
            'uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)+' +
            '(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\' +
            'uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|' +
            '@)*)*)?)|((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\' +
            'uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\' +
            '+,;=]|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\' +
            'uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\' +
            '(\\)\\*\\+,;=]|:|@)*)*)|((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\' +
            'uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\' +
            '$&\'\\(\\)\\*\\+,;=]|:|@)){0})(\\?((([a-z]|\\d|-|\\.|_|~|' +
            '[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]' +
            '{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|[\\uE000-\\uF8FF]|\\/|' +
            '\\?)*)?(\\#((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\' +
            'uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\' +
            '+,;=]|:|@)|\\/|\\?)*)?$', 'i'),

        number: /^[+\-]?(\d+([.,]\d+)?)+([eE][+-]?\d+)?$/,

        // Regex from Scott Gonzalez Common URL:
        // http://projects.scottsplayground.com/iri/demo/common.html
        url: new RegExp('^(https?|ftp):\\/\\/(((([a-z]|\\d|-|\\.|_|~|[\\' +
            'u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})' +
            '|[!\\$&\'\\(\\)\\*\\+,;=]|:)*@)?(((\\d|[1-9]\\d|1\\d\\d|' +
            '2[0-4]\\d|25[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25' +
            '[0-5])\\.(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5])\\.' +
            '(\\d|[1-9]\\d|1\\d\\d|2[0-4]\\d|25[0-5]))|((([a-z]|\\d' +
            '|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(([a-z]|\\' +
            'd|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]|\\d|' +
            '-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])*' +
            '([a-z]|\\d|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\' +
            '.)*(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|' +
            '(([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])([a-z]' +
            '|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])' +
            '*([a-z]|[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])))\\.?)' +
            '(:\\d*)?)(\\/((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\' +
            'uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]' +
            '|:|@)+(\\/(([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\uFDCF' +
            '\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)*)' +
            '*)?)?(\\?((([a-z]|\\d|-|\\.|_|~|[\\u00A0-\\uD7FF\\uF900-\\' +
            'uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})|[!\\$&\'\\(\\)\\*\\+,;=]|' +
            ':|@)|[\\uE000-\\uF8FF]|\\/|\\?)*)?(\\#((([a-z]|\\d|-|\\.|_|~|' +
            '[\\u00A0-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF])|(%[\\da-f]{2})' +
            '|[!\\$&\'\\(\\)\\*\\+,;=]|:|@)|\\/|\\?)*)?$', 'i')
    },

    RULES: {
        acceptFiles: function(val, node, ruleValue) {
            var regex = null;

            if (isString(ruleValue)) {
                var extensions = ruleValue.replace(/\./g, '').split(/,\s*|\b\s*/);

                extensions = A.Array.map(extensions, A.Escape.regex);

                regex = getRegExp('[.](' + extensions.join('|') + ')$', 'i');
            }

            return regex && regex.test(val);
        },

        date: function(val) {
            var date = new Date(val);

            return (isDate(date) && (date !== 'Invalid Date') && !isNaN(date));
        },

        equalTo: function(val, node, ruleValue) {
            var comparator = A.one(ruleValue);

            return comparator && (trim(comparator.val()) === val);
        },

        hasValue: function(val, node) {
            var instance = this;

            if (A.FormValidator.isCheckable(node)) {
                var name = node.get('name'),
                    elements = A.all(instance.getFieldsByName(name));

                return (elements.filter(':checked').size() > 0);
            }
            else {
                return !!val;
            }
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

            if (ruleValue === true) {
                return defaults.RULES.hasValue.apply(instance, [val, node]);
            }
            else {
                return true;
            }
        }
    }
});

/**
 * A base class for `A.FormValidator`.
 *
 * @class A.FormValidator
 * @extends Base
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/form-validator/basic-markup.html
 * @include http://alloyui.com/examples/form-validator/basic.js
 */
var FormValidator = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'form-validator',

    /**
     * Static property used to define the default attribute
     * configuration for the `A.FormValidator`.
     *
     * @property ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * The widget's outermost node, used for sizing and positioning.
         *
         * @attribute boundingBox
         */
        boundingBox: {
            setter: A.one
        },

        /**
         * Container for the CSS error class.
         *
         * @attribute containerErrorClass
         * @type String
         */
        containerErrorClass: {
            value: CSS_HAS_ERROR,
            validator: isString
        },

        /**
         * Container for the CSS valid class.
         *
         * @attribute containerValidClass
         * @type String
         */
        containerValidClass: {
            value: CSS_HAS_SUCCESS,
            validator: isString
        },

        /**
         * Defines the CSS error class.
         *
         * @attribute errorClass
         * @type String
         */
        errorClass: {
            value: CSS_ERROR_FIELD,
            validator: isString
        },

        /**
         * If `true` the validation rules are extracted from the DOM.
         *
         * @attribute extractRules
         * @default true
         * @type Boolean
         */
        extractRules: {
            value: true,
            validator: isBoolean
        },

        /**
         * Container for a field.
         *
         * @attribute fieldContainer
         * @type String
         */
        fieldContainer: {
            value: '.' + CSS_FORM_GROUP
        },

        /**
         * Collection of strings used on a field.
         *
         * @attribute fieldStrings
         * @default {}
         * @type Object
         */
        fieldStrings: {
            value: {},
            validator: isObject
        },

        /**
         * The CSS class for `<label>`.
         *
         * @attribute labelCssClass
         * @default 'control-label'
         * @type String
         */
        labelCssClass: {
            validator: isString,
            value: 'control-label'
        },

        /**
         * Container for the form message.
         *
         * @attribute messageContainer
         * @default '<div role="alert"></div>'
         */
        messageContainer: {
            getter: function(val) {
                return A.Node.create(val).clone();
            },
            value: TPL_MESSAGE
        },

        /**
         * Collection of strings used to label elements of the UI.
         *
         * @attribute strings
         * @type Object
         */
        strings: {
            valueFn: function() {
                return defaults.STRINGS;
            }
        },

        /**
         * Collection of rules to validate fields.
         *
         * @attribute rules
         * @default {}
         * @type Object
         */
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

        /**
         * Defines if the text will be selected or not after validation.
         *
         * @attribute selectText
         * @default true
         * @type Boolean
         */
        selectText: {
            value: true,
            validator: isBoolean
        },

        /**
         * Defines if the validation messages will be showed or not.
         *
         * @attribute showMessages
         * @default true
         * @type Boolean
         */
        showMessages: {
            value: true,
            validator: isBoolean
        },

        /**
         * Defines if all validation messages will be showed or not.
         *
         * @attribute showAllMessages
         * @default false
         * @type Boolean
         */
        showAllMessages: {
            value: false,
            validator: isBoolean
        },

        /**
         * Defines a container for the stack errors.
         *
         * @attribute stackErrorContainer
         */
        stackErrorContainer: {
            getter: function(val) {
                return A.Node.create(val).clone();
            },
            value: TPL_STACK_ERROR
        },

        /**
         * If `true` the field will be validated on blur event.
         *
         * @attribute validateOnBlur
         * @default true
         * @type Boolean
         */
        validateOnBlur: {
            value: true,
            validator: isBoolean
        },

        /**
         * If `true` the field will be validated on input event.
         *
         * @attribute validateOnInput
         * @default false
         * @type Boolean
         */
        validateOnInput: {
            value: false,
            validator: isBoolean
        },

        /**
         * Defines the CSS valid class.
         *
         * @attribute validClass
         * @type String
         */
        validClass: {
            value: CSS_SUCCESS_FIELD,
            validator: isString
        }
    },

    /**
     * Creates custom rules from user input.
     *
     * @method _setCustomRules
     * @param object
     * @protected
     */
    _setCustomRules: function(object) {
        A.each(
            object,
            function(rule, fieldName) {
                A.config.FormValidator.RULES[fieldName] = rule.condition;
                A.config.FormValidator.STRINGS[fieldName] = rule.errorMessage;
            }
        );
    },

    /**
     * Ability to add custom validation rules.
     *
     * @method customRules
     * @param object
     * @public
     * @static
     */
    addCustomRules: function(object) {
        var instance = this;

        if (isObject(object)) {
            instance._setCustomRules(object);
        }
    },

    /**
     * Checks if a node is a checkbox or radio input.
     *
     * @method isCheckable
     * @param node
     * @private
     * @return {Boolean}
     */
    isCheckable: function(node) {
        var nodeType = node.get('type').toLowerCase();

        return (nodeType === 'checkbox' || nodeType === 'radio');
    },

    /**
     * Static property used to define which component it extends.
     *
     * @property EXTENDS
     * @type Object
     * @static
     */
    EXTENDS: A.Base,

    prototype: {

        /**
         * Construction logic executed during `A.FormValidator` instantiation.
         * Lifecycle.
         *
         * @method initializer
         * @protected
         */
        initializer: function() {
            var instance = this;

            instance.errors = {};
            instance._blurHandlers = null;
            instance._fileBlurHandlers = null;
            instance._fileInputHandlers = null;
            instance._inputHandlers = null;
            instance._rulesAlreadyExtracted = false;
            instance._stackErrorContainers = {};

            instance.bindUI();
            instance._uiSetValidateOnBlur(instance.get('validateOnBlur'));
            instance._uiSetValidateOnInput(instance.get('validateOnInput'));
        },

        /**
         * Bind the events on the `A.FormValidator` UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this,
                boundingBox = instance.get('boundingBox');

            var onceFocusHandler = boundingBox.delegate('focus', function() {
                instance._setARIARoles();
                onceFocusHandler.detach();
            }, 'input,select,textarea,button');

            instance.publish({
                errorField: {
                    defaultFn: instance._defErrorFieldFn
                },
                validField: {
                    defaultFn: instance._defValidFieldFn
                },
                validateField: {
                    defaultFn: instance._defValidateFieldFn
                }
            });

            boundingBox.on({
                reset: A.bind(instance._onFormReset, instance),
                submit: A.bind(instance._onFormSubmit, instance)
            });

            instance.after({
                extractRulesChange: instance._afterExtractRulesChange,
                validateOnBlurChange: instance._afterValidateOnBlurChange,
                validateOnInputChange: instance._afterValidateOnInputChange
            });
        },

        /**
         * Adds a validation error in the field.
         *
         * @method addFieldError
         * @param {Node} field
         * @param ruleName
         */
        addFieldError: function(field, ruleName) {
            var instance = this,
                errors = instance.errors,
                name = field.get('name');

            if (!errors[name]) {
                errors[name] = [];
            }

            errors[name].push(ruleName);
        },

        /**
         * Deletes the field from the errors property object.
         *
         * @method clearFieldError
         * @param {Node|String} field
         */
        clearFieldError: function(field) {
            var fieldName = isNode(field) ? field.get('name') : field;

            if (isString(fieldName)) {
                delete this.errors[fieldName];
            }
        },

        /**
         * Executes a function to each rule.
         *
         * @method eachRule
         * @param fn
         */
        eachRule: function(fn) {
            var instance = this;

            A.each(
                instance.get('rules'),
                function(rule, fieldName) {
                    if (isFunction(fn)) {
                        fn.apply(instance, [rule, fieldName]);
                    }
                }
            );
        },

        /**
         * Gets the ancestor of a given field.
         *
         * @method findFieldContainer
         * @param {Node} field
         * @return {Node}
         */
        findFieldContainer: function(field) {
            var instance = this,
                fieldContainer = instance.get('fieldContainer');

            if (fieldContainer) {
                return field.ancestor(fieldContainer);
            }
        },

        /**
         * Focus on the invalid field.
         *
         * @method focusInvalidField
         */
        focusInvalidField: function() {
            var instance = this,
                boundingBox = instance.get('boundingBox'),
                field = boundingBox.one('.' + CSS_ERROR_FIELD);

            if (field) {
                if (instance.get('selectText')) {
                    field.selectText();
                }

                field.focus();

                field.scrollIntoView();
            }
        },

        /**
         * Gets a field from the form.
         *
         * @method getField
         * @param {Node|String} field
         * @return {Node}
         */
        getField: function(field) {
            var instance = this;

            if (isString(field)) {
                field = instance.getFieldsByName(field);

                if (field && field.length && !field.name) {
                    field = field[0];
                }
            }

            return A.one(field);
        },

        /**
         * Gets a list of fields based on its name.
         *
         * @method getFieldsByName
         * @param fieldName
         * @return {NodeList}
         */
        getFieldsByName: function(fieldName) {
            var instance = this,
                domBoundingBox = instance.get('boundingBox').getDOM();

            return domBoundingBox.elements[fieldName];
        },

        /**
         * Gets a list of fields with errors.
         *
         * @method getFieldError
         * @param {Node} field
         * @return {String}
         */
        getFieldError: function(field) {
            var instance = this;

            return instance.errors[field.get('name')];
        },

        /**
         * Gets the stack error container of a field.
         *
         * @method getFieldStackErrorContainer
         * @param {Node} field
         * @return {Node}
         */
        getFieldStackErrorContainer: function(field) {
            var instance = this,
                name = field.get('name'),
                stackContainers = instance._stackErrorContainers;

            if (!stackContainers[name]) {
                stackContainers[name] = instance.get('stackErrorContainer');
            }

            return stackContainers[name];
        },

        /**
         * Gets the error message of a field.
         *
         * @method getFieldErrorMessage
         * @param {Node} field
         * @param rule
         * @return {String}
         */
        getFieldErrorMessage: function(field, rule) {
            var instance = this,
                fieldName = field.get('name'),
                fieldStrings = instance.get('fieldStrings')[fieldName] || {},
                fieldRules = instance.get('rules')[fieldName],
                fieldLabel = instance._findFieldLabel(field),
                strings = instance.get('strings'),
                substituteRulesMap = {};

            if (fieldLabel) {
                substituteRulesMap.field = fieldLabel;
            }

            if (rule in fieldRules) {
                var ruleValue = A.Array(fieldRules[rule]);

                A.each(
                    ruleValue,
                    function(value, index) {
                        substituteRulesMap[index] = [value].join('');
                    }
                );
            }

            var message = (fieldStrings[rule] || strings[rule] || strings.DEFAULT);

            return Lang.sub(message, substituteRulesMap);
        },

        /**
         * Returns `true` if there are errors.
         *
         * @method hasErrors
         * @return {Boolean}
         */
        hasErrors: function() {
            var instance = this;

            return !isEmpty(instance.errors);
        },

        /**
         * Highlights a field with error or success.
         *
         * @method highlight
         * @param {Node} field
         * @param valid
         */
        highlight: function(field, valid) {
            var instance = this,
                fieldContainer = instance.findFieldContainer(field);

            if (field) {
                if (this.validatable(field)) {
                    instance._highlightHelper(
                        field,
                        instance.get('errorClass'),
                        instance.get('validClass'),
                        valid
                    );    

                    if (fieldContainer) {
                        instance._highlightHelper(
                            fieldContainer,
                            instance.get('containerErrorClass'),
                            instance.get('containerValidClass'),
                            valid
                        );
                    }
                }
                else if (!field.val()) {
                    field.removeClass('errorClass');
                    field.removeAttribute('aria-invalid');
                    if (fieldContainer) {
                        fieldContainer.removeClass('containerErrorClass');
                        fieldContainer.removeAttribute('aria-invalid');
                    }
                }
            }
        },

        /**
         * Normalizes rule value.
         *
         * @method normalizeRuleValue
         * @param ruleValue
         * @param {Node} field
         */
        normalizeRuleValue: function(ruleValue, field) {
            var instance = this;

            return isFunction(ruleValue) ? ruleValue.apply(instance, [field]) : ruleValue;
        },

        /**
         * Removes the highlight of a field.
         *
         * @method unhighlight
         * @param {Node} field
         */
        unhighlight: function(field) {
            var instance = this;

            instance.highlight(field, true);
        },

        /**
         * Prints the stack error messages into a container.
         *
         * @method printStackError
         * @param {Node} field
         * @param {Node} container
         * @param {Array} errors
         */
        printStackError: function(field, container, errors) {
            var instance = this;

            if (!instance.get('showAllMessages')) {
                if (errors.indexOf('required') !== -1) {
                    errors = ['required'];
                }
                else {
                    errors = errors.slice(0, 1);
                }
            }

            container.empty();

            A.Array.each(
                errors,
                function(error) {
                    var message = instance.getFieldErrorMessage(field, error),
                        messageEl = instance.get('messageContainer').addClass(error);

                    container.append(
                        messageEl.html(message)
                    );
                }
            );
        },

        /**
         * Resets the CSS class and content of all fields.
         *
         * @method resetAllFields
         */
        resetAllFields: function() {
            var instance = this;

            instance.eachRule(
                function(rule, fieldName) {
                    instance.resetField(fieldName);
                }
            );
        },

        /**
         * Resets the CSS class and error status of a field.
         *
         * @method resetField
         * @param {Node|String} field
         */
        resetField: function(field) {
            var fieldNode,
                stackContainer;

            this.clearFieldError(field);
            fieldNode = isString(field) ? this.getField(field) : field;

            if (isNode(fieldNode)) {
                stackContainer = this.getFieldStackErrorContainer(fieldNode);
                stackContainer.remove();
                this.resetFieldCss(fieldNode);
                this.unhighlight(fieldNode);
            }
        },

        /**
         * Removes the CSS classes of a field.
         *
         * @method resetFieldCss
         * @param {Node} field
         */
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

            removeClasses(field, ['validClass', 'errorClass']);
            removeClasses(fieldContainer, ['containerValidClass', 'containerErrorClass']);
        },

        /**
         * Checks if a field can be validated or not.
         *
         * @method validatable
         * @param {Node} field
         * @return {Boolean}
         */
        validatable: function(field) {
            var instance = this,
                validatable = false,
                fieldRules = instance.get('rules')[field.get('name')];

            if (fieldRules) {
                validatable = instance.normalizeRuleValue(fieldRules.required, field) ||
                    defaults.RULES.hasValue.apply(instance, [field.val(), field]);
            }

            return !!validatable;
        },

        /**
         * Validates all fields.
         *
         * @method validate
         */
        validate: function() {
            var instance = this;

            instance.eachRule(
                function(rule, fieldName) {
                    instance.validateField(fieldName);
                }
            );

            instance.focusInvalidField();
        },

        /**
         * Validates a single field.
         *
         * @method validateField
         * @param {Node|String} field
         */
        validateField: function(field) {
            var fieldNode,
                validatable;

            this.resetField(field);
            fieldNode = isString(field) ? this.getField(field) : field;

            if (isNode(fieldNode)) {
                validatable = this.validatable(fieldNode);

                if (validatable) {
                    this.fire('validateField', {
                        validator: {
                            field: fieldNode
                        }
                    });
                }
            }
        },

        /**
         * Fires after `extractRules` attribute change.
         *
         * @method _afterExtractRulesChange
         * @param event
         * @protected
         */
        _afterExtractRulesChange: function(event) {
            var instance = this;

            instance._uiSetExtractRules(event.newVal);
        },

        /**
         * Fires after `validateOnBlur` attribute change.
         *
         * @method _afterValidateOnBlurChange
         * @param event
         * @protected
         */
        _afterValidateOnBlurChange: function(event) {
            var instance = this;

            instance._uiSetValidateOnBlur(event.newVal);
        },

        /**
         * Fires after `validateOnInput` attribute change.
         *
         * @method _afterValidateOnInputChange
         * @param event
         * @protected
         */
        _afterValidateOnInputChange: function(event) {
            var instance = this;

            instance._uiSetValidateOnInput(event.newVal);
        },

        /**
         * Defines an error field.
         *
         * @method _defErrorFieldFn
         * @param event
         * @protected
         */
        _defErrorFieldFn: function(event) {
            var instance = this,
                field,
                label,
                stackContainer,
                target,
                validator;

            label = instance.get('labelCssClass');
            validator = event.validator;
            field = validator.field;

            instance.highlight(field);

            if (instance.get('showMessages')) {
                target = field;

                stackContainer = instance.getFieldStackErrorContainer(field);

                if (A.FormValidator.isCheckable(target)) {
                    target = field.ancestor('.' + CSS_HAS_ERROR).get('lastChild');
                }

                // Use aria-describedby to provide extra details for filling input field
                var id = field.get('id') + 'Helper';

                stackContainer.set('id', id);
                field.set('aria-describedby', id);

                target.placeAfter(stackContainer);

                instance.printStackError(
                    field,
                    stackContainer,
                    validator.errors
                );
            }
        },

        /**
         * Defines a valid field.
         *
         * @method _defValidFieldFn
         * @param event
         * @protected
         */
        _defValidFieldFn: function(event) {
            var instance = this;

            var field = event.validator.field;

            instance.unhighlight(field);
        },

        /**
         * Defines the validation of a field.
         *
         * @method _defValidateFieldFn
         * @param event
         * @protected
         */
        _defValidateFieldFn: function(event) {
            var instance = this;

            var field = event.validator.field;
            var fieldRules = instance.get('rules')[field.get('name')];

            A.each(
                fieldRules,
                function(ruleValue, ruleName) {
                    var rule = defaults.RULES[ruleName];
                    var fieldValue = trim(field.val());

                    ruleValue = instance.normalizeRuleValue(ruleValue, field);

                    if (isFunction(rule) && !rule.apply(instance, [fieldValue, field, ruleValue])) {

                        instance.addFieldError(field, ruleName);
                    }
                }
            );

            var fieldErrors = instance.getFieldError(field);

            if (fieldErrors) {
                instance.fire('errorField', {
                    validator: {
                        field: field,
                        errors: fieldErrors
                    }
                });
            }
            else {
                instance.fire('validField', {
                    validator: {
                        field: field
                    }
                });
            }
        },

        /**
         * Finds the label text of a field if existing.
         *
         * @method _findFieldLabel
         * @param {Node} field
         * @return {String}
         */
        _findFieldLabel: function(field) {
            var labelCssClass = '.' + this.get('labelCssClass'),
                label = A.one('label[for=' + field.get('id') + ']') ||
                    field.ancestor().previous(labelCssClass);

            if (!label) {
                label = field.ancestor('.' + CSS_HAS_ERROR);

                if (label) {
                    label = label.one(labelCssClass);
                }
            }

            if (label) {
                return label.get('text');
            }
        },

        /**
         * Sets the error/success CSS classes based on the validation of a
         * field.
         *
         * @method _highlightHelper
         * @param {Node} field
         * @param {String} errorClass
         * @param {String} validClass
         * @param {Boolean} valid
         * @protected
         */
        _highlightHelper: function(field, errorClass, validClass, valid) {
            if (valid) {
                field.removeClass(errorClass).addClass(validClass);

                if (validClass === CSS_SUCCESS_FIELD) {
                    field.removeAttribute('aria-invalid');
                }
            }
            else {
                field.removeClass(validClass).addClass(errorClass);

                if (errorClass === CSS_ERROR_FIELD) {
                    field.set('aria-invalid', true);
                }
            }
        },

        /**
         * Extracts form rules from the DOM.
         *
         * @method _extractRulesFromMarkup
         * @param rules
         * @protected
         */
        _extractRulesFromMarkup: function(rules) {
            var instance = this,
                domBoundingBox = instance.get('boundingBox').getDOM(),
                elements = domBoundingBox.elements,
                defaultRulesKeys = AObject.keys(defaults.RULES),
                defaultRulesJoin = defaultRulesKeys.join('|'),
                regex = getRegExp('field-(' + defaultRulesJoin + ')', 'g'),
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

        /**
         * Triggers when there's an input in the field.
         *
         * @method _onFieldInput
         * @param event
         * @protected
         */
        _onFieldInput: function(event) {
            var instance = this;

            instance.validateField(event.target);
        },

        /**
         * Triggers when the form is submitted.
         *
         * @method _onFormSubmit
         * @param event
         * @protected
         */
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

                instance.fire('submitError', data);

                event.halt();
            }
            else {
                instance.fire('submit', data);
            }
        },

        /**
         * Triggers when the form is reseted.
         *
         * @method _onFormReset
         * @param event
         * @protected
         */
        _onFormReset: function() {
            var instance = this;

            instance.resetAllFields();
        },

        /**
         * Sets the aria roles.
         *
         * @method _setARIARoles
         * @protected
         */
        _setARIARoles: function() {
            var instance = this;

            instance.eachRule(
                function(rule, fieldName) {
                    var field = instance.getField(fieldName);

                    var required = instance.normalizeRuleValue(rule.required, field);

                    if (required) {
                        if (field && !field.attr('aria-required')) {
                            field.attr('aria-required', true);
                        }
                    }
                }
            );
        },

        /**
         * Sets the `extractRules` attribute on the UI.
         *
         * @method _uiSetExtractRules
         * @param val
         * @protected
         */
        _uiSetExtractRules: function(val) {
            var instance = this;
            if (val) {
                instance._extractRulesFromMarkup(instance.get('rules'));
            }
        },

        /**
         * Sets the `validateOnInput` attribute on the UI.
         *
         * @method _uiSetValidateOnInput
         * @param val
         * @protected
         */
        _uiSetValidateOnInput: function(val) {
            var instance = this,
                boundingBox = instance.get('boundingBox');

            if (val) {
                if (!instance._inputHandlers) {
                    instance._inputHandlers = boundingBox.delegate('input', instance._onFieldInput,
                        'input:not([type="file"]),select,textarea,button', instance);
                }

                if (!instance._fileInputHandlers) {
                    instance._fileInputHandlers = boundingBox.delegate('change', instance._onFieldInput,
                        'input[type="file"]', instance);
                }
            }
            else {
                if (instance._inputHandlers) {
                    instance._inputHandlers.detach();
                }

                if (instance._fileInputHandlers) {
                    instance._fileInputHandlers.detach();
                }
            }
        },

        /**
         * Sets the `validateOnBlur` attribute on the UI.
         *
         * @method _uiSetValidateOnBlur
         * @param val
         * @protected
         */
        _uiSetValidateOnBlur: function(val) {
            var instance = this,
                boundingBox = instance.get('boundingBox');

            if (val) {
                if (!instance._blurHandlers) {
                    instance._blurHandlers = boundingBox.delegate('blur', instance._onFieldInput,
                        'input:not([type="file"]),select,textarea,button', instance);
                }

                if (!instance._fileBlurHandlers) {
                    instance._fileBlurHandlers = boundingBox.delegate('change', instance._onFieldInput,
                        'input[type="file"]', instance);
                }
            }
            else {
                if (instance._blurHandlers) {
                    instance._blurHandlers.detach();
                }

                if (instance._fileBlurHandlers) {
                    instance._fileBlurHandlers.detach();
                }
            }
        }
    }
});

A.each(
    defaults.REGEX,
    function(regex, key) {
        defaults.RULES[key] = function(val) {
            return defaults.REGEX[key].test(val);
        };
    }
);

A.FormValidator = FormValidator;
