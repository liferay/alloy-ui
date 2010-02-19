AUI.add('aui-form-manager', function(A) {
/**********************************************************************
 * <p>FormManager provides support for initializing a form, pre-validating
 * user input, and displaying messages returned by the server.</p>
 *
 * <p><strong>Required Markup Structure</strong></p>
 *
 * <p>Each element (or tighly coupled set of elements) must be contained by
 * an element that has the CSS class <code>formmgr-row</code>.  Within each
 * row, validation messages are displayed inside the container with CSS
 * class <code>formmgr-message-text</code>.
 *
 * <p>When a message is displayed inside a row, the CSS class
 * <code>formmgr-has{type}</code> is placed on the row container and the
 * containing fieldset (if any), where <code>{type}</code> is the message
 * type passed to <code>displayMessage()</code>.</p>
 *
 * <p><strong>Initializing the Form</strong></p>
 *
 * <p>Default values can be either encoded in the markup or passed to the
 * FormManager constructor via <code>config.default_value_map</code>.  (The
 * former method is obviously better for progressive enhancement.)  The
 * values passed to the constructor override the values encoded in the
 * markup.</p>
 *
 * <p><code>prepareForm()</code> must be called before the form is
 * displayed.  To initialize focus to the first element in a form, call
 * <code>initFocus()</code>.  If the form is in an overlay, you can delay
 * these calls until just before showing the overlay.</p>
 *
 * <p>The default values passed to the constructor are inserted by
 * <code>populateForm()</code>.  (This is automatically called by
 * <code>prepareForm()</code>.)</p>
 *
 * <p><strong>Displaying Messages</strong></p>
 *
 * <p>To display a message for a single form row, call
 * <code>displayMessage()</code>.  To display a message for the form in
 * general, call <code>displayFormMessage()</code>.  These functions can be
 * used for initializing the error display when the page loads, for
 * displaying the results of pre-validation, and for displaying the results
 * of submitting a form via XHR.</p>
 *
 * <p><strong>Specifying Validations</strong></p>
 *
 * <p>The following classes can be applied to a form element for
 * pre-validation:</p>
 *
 *	<dl>
 *	<dt><code>aui-required</code></dt>
 *		<dd>Value must not be empty.</dd>
 *
 *	<dt><code>aui-length:[x,y]</code></dt>
 *		<dd>String must be at least x characters and at most y characters.
 *		At least one of x and y must be specified.</dd>
 *
 *	<dt><code>aui-integer:[x,y]</code></dt>
 *		<dd>The integer value must be at least x and at most y.
 *		x and y are both optional.</dd>
 *
 *	<dt><code>aui-decimal:[x,y]</code></dt>
 *		<dd>The decimal value must be at least x and at most y.  Exponents are
 *		not allowed.  x and y are both optional.</dd>
 *	</dl>
 *
 * <p>If we ever need to allow exponents, we can use aui-float.</p>
 *
 * <p>The following functions allow additional pre-validation to be
 * attached to individual form elements:</p>
 *
 * <dl>
 * <dt><code>setRegex()</code></dt>
 *		<dd>Sets the regular expression that must match in order for the value
 *		to be acceptable.</dd>
 *
 * <dt><code>setFunction()</code></dt>
 *		<dd>Sets the function that must return true in order for the value to
 *		be acceptable.  The function is called in the scope of the Form
 *		object with the arguments:  the form and the element.</dd>
 * </dl>
 *
 * <p><code>setErrorMessages()</code> specifies the error message to be
 * displayed when a pre-validation check fails.</p>
 *
 * <p>Functions are expected to call <code>displayMessage()</code>
 * directly.</p>
 *
 * <p>More complex pre-validations can be added by overriding
 * <code>postValidateForm()</code>, described below.</p>
 *
 * <p>Derived classes may also override the following functions:</p>
 *
 * <dl>
 * <dt><code>prePrepareForm</code>(arguments passed to prepareForm)</dt>
 *		<dd>Called before filling in default values for the form elements.
 *		Return false to cancel dialog.</dd>
 *
 * <dt><code>postPrepareForm</code>(arguments passed to prepareForm)</dt>
 *		<dd>Called after filling in default values for the form elements.</dd>
 *
 * <dt><code>postValidateForm</code>(form)</dt>
 *		<dd>Called after performing the basic pre-validations.  Returns
 *		true if the form contents are acceptable.  Reports error if there
 *		is a problem.</dd>
 * </dl>
 *
 * @module gallery-formmgr
 * @class FormManager
 * @constructor
 * @param form_name {String} The name attribute of the HTML form.
 * @param config {Object} Configuration.
 *		<code>status_node</code> is an optional element in which to display
 *		overall status.  <code>default_value_map</code> is an optional
 *		mapping of form element names to default values.  Default values
 *		encoded in the markup will be merged into this map, but values
 *		passed to the constructor will take precedence.
 */

function FormManager(
	/* string */	form_name,
	/* object */	config)		// {status_node, default_value_map}
{
	if (arguments.length === 0)	// derived class prototype
	{
		return;
	}

	if (!config)
	{
		config = {};
	}

	this.form_name   = form_name;
	this.status_node = A.one(config.status_node);
	this.enabled     = true;

	// default values for form elements

	this.default_value_map = config.default_value_map;

	// pre-validation methods

	this.validation =
	{
		fn:    {},	// function for validating each element id
		regex: {}	// regex for validating each element id
	};

	// error messages

	this.validation_msgs = {};		// message list, keyed on type, for each element id

	this.has_messages = false;
	this.has_errors   = false;

	// buttons -- disabled during submission

	this.button_list      = [];
	this.user_button_list = [];

	// file uploading is nasty

	this.has_file_inputs = false;
}

// CSS class pattern bookends

var class_re_prefix = '(?:^|\\s)(?:';
var class_re_suffix = ')(?:\\s|$)';

// pre-validation classes

var required_class    = 'aui-required';
var length_class_re   = /(?:^|\s+)aui-length:\[([0-9]+)?,([1-9][0-9]*)?\](?:\s+|$)/;
var integer_class_re  = /(?:^|\s+)aui-integer(?::\[([-+]?[0-9]+)?,([-+]?[0-9]+)?\])?(?:\s+|$)/;
var decimal_class_re  = /(?:^|\s+)aui-decimal(?::\[([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?,([-+]?(?:[0-9]+\.?|[0-9]+\.[0-9]+|\.[0-9]+))?\])?(?:\s+|$)/;

/**
 * Regular expression used to determine if a value is an integer.
 * This can be localized, e.g., allow for thousands separator.
 *
 * @config A.FormManager.integer_value_re
 * @type {RegExp}
 * @static
 */
FormManager.integer_value_re = /^[-+]?[0-9]+$/;

/**
 * Regular expression used to determine if a value is a decimal number.
 * This can be localized, e.g., use the correct decimal separator.
 *
 * @config A.FormManager.decimal_value_re
 * @type {RegExp}
 * @static
 */
FormManager.decimal_value_re = /^[-+]?(?:[0-9]+\.?|[0-9]*\.[0-9]+)$/;

/**
 * The CSS class which marks each row of the form.  Typically, each element
 * (or a very tightly coupled set of elements) is placed in a separate row.
 *
 * @property A.FormManager.row_marker_class
 * @type {String}
 */
FormManager.row_marker_class = 'aui-field';

/**
 * The CSS class which marks the container for the status message within a
 * row of the form.
 *
 * @property A.FormManager.status_marker_class
 * @type {String}
 */
FormManager.status_marker_class = 'aui-message-holder';

/**
 * The CSS class placed on <code>status_node</code> when it is empty.
 *
 * @property A.FormManager.status_none_class
 * @type {String}
 */
FormManager.status_none_class = 'aui-helper-hidden';

/**
 * The CSS class placed on <code>status_node</code> when
 * <code>displayFormMessage()</code> is called with
 * <code>error=false</code>.
 *
 * @property A.FormManager.status_success_class
 * @type {String}
 */
FormManager.status_success_class = 'aui-status-success';

/**
 * The CSS class placed on <code>status_node</code> when
 * <code>displayFormMessage()</code> is called with
 * <code>error=true</code>.
 *
 * @property A.FormManager.status_failure_class
 * @type {String}
 */
FormManager.status_failure_class = 'aui-status-failure';

/**
 * The prefix for all CSS classes placed on a form row when pre-validation
 * fails.  The full CSS class is formed by appending the value from
 * <code>A.FormManager.status_order</code>.
 *
 * @property A.FormManager.row_status_prefix
 * @type {String}
 */
FormManager.row_status_prefix = 'aui-has-';

var status_pattern     = FormManager.status_success_class+'|'+FormManager.status_failure_class;
var row_status_pattern = FormManager.row_status_prefix + '([^\\s]+)';
var row_status_regex   = new RegExp(class_re_prefix + row_status_pattern + class_re_suffix);

/**
 * <p>Map of localizable strings used by pre-validation.</p>
 *
 * <dl>
 * <dt><code>validation_error</code></dt>
 * <dd>Displayed in <code>status_node</code> by <code>notifyErrors()</code> when pre-validation fails.</dd>
 * <dt><code>required_string</code></dt>
 * <dd>Displayed when <code>aui-required</code> fails on an input field.</dd>
 * <dt><code>required_menu</code></dt>
 * <dd>Displayed when <code>aui-required</code> fails on a select element.</dd>
 * <dt><code>length_too_short</code>, <code>length_too_long</code>, <code>length_out_of_range</code></dt>
 * <dd>Displayed when <code>aui-length</code> fails on an input field.</dd>
 * <dt><code>integer</code>, <code>integer_too_small</code>, <code>integer_too_large</code>, <code>integer_out_of_range</code></dt>
 * <dd>Displayed when <code>aui-integer</code> fails on an input field.</dd>
 * <dt><code>decimal</code>, <code>decimal_too_small</code>, <code>decimal_too_large</code>, <code>decimal_out_of_range</code></dt>
 * <dd>Displayed when <code>aui-decimal</code> fails on an input field.</dd>
 * </dl>
 *
 * @config A.FormManager.Strings
 * @type {Object}
 * @static
 */
FormManager.Strings =
{
	validation_error:     'Correct errors in the highlighted fields before continuing.',

	required_string:      'This field requires a value.',
	required_menu:        'This field is required. Choose a value from the pull-down list.',

	length_too_short:     'Enter text that is at least {min} characters or longer.',
	length_too_long:      'Enter text that is up to {max} characters long.',
	length_out_of_range:  'Enter text that is {min} to {max} characters long.',

	integer:              'Enter a whole number (no decimal point).',
	integer_too_small:    'Enter a number that is {min} or higher (no decimal point).',
	integer_too_large:    'Enter a number that is {max} or lower (no decimal point).',
	integer_out_of_range: 'Enter a number between or including {min} and {max} (no decimal point).',

	decimal:              'Enter a number.',
	decimal_too_small:    'Enter a number that is {min} or higher.',
	decimal_too_large:    'Enter a number that is {max} or lower.',
	decimal_out_of_range: 'Enter a number between or including {min} and {max}.'
};

/**
 * <p>Names of supported status values, highest precedence first.  Default:
 * <code>[ 'error', 'warn', 'success', 'info' ]</code></p>
 *
 * <p>This is static because it links to CSS rules that define the
 * appearance of each status type:  .formmgr-has{status}</p>
 *
 * @config A.FormManager.status_order
 * @type {Array}
 * @static
 */
FormManager.status_order =
[
	'error',
	'warn',
	'success',
	'info'
];

/**
 * Get the precedence of the given status name.
 *
 * @method A.FormManager.getStatusPrecedence
 * @static
 * @param status {String} The name of the status value.
 * @return {int} The position in the <code>status_order</code> array.
 */
FormManager.getStatusPrecedence = function(
	/* string */	status)
{
	for (var i=0; i<FormManager.status_order.length; i++)
	{
		if (status == FormManager.status_order[i])
		{
			return i;
		}
	}

	return FormManager.status_order.length;
};

/**
 * Compare two status values.
 *
 * @method A.FormManager.statusTakesPrecendence
 * @static
 * @param orig_status {String} The name of the original status value.
 * @param new_status {String} The name of the new status value.
 * @return {boolean} <code>true</code> if <code>new_status</code> takes precedence over <code>orig_status</code>
 */
FormManager.statusTakesPrecendence = function(
	/* string */	orig_status,
	/* string */	new_status)
{
	return (!orig_status || FormManager.getStatusPrecedence(new_status) < FormManager.getStatusPrecedence(orig_status));
};

/**
 * Get the status of the given fieldset or form row.
 *
 * @method A.FormManager.getElementStatus
 * @static
 * @param e {String|Object} The descriptor or DOM element.
 * @return {mixed} The status (String) or <code>false</code>.
 */
FormManager.getElementStatus = function(
	/* string/object */	e)
{
	var m = A.one(e).get('className').match(row_status_regex);
	if (m && m.length)
	{
		return m[1];
	}
	else
	{
		return false;
	}
};

function getId(
	/* string/Node/object */	e)
{
	if (A.Lang.isString(e))
	{
		return e.replace(/^#/, '');
	}
	else if (e instanceof A.Node)
	{
		return e.get('id');
	}
	else
	{
		return e.id;
	}
}

function hasLimit(
	/* string */	s)
{
	return (!A.Lang.isUndefined(s) && s.length > 0);
}

function populateForm1()
{
	var collect_buttons = (this.button_list.length === 0);

	for (var i=0; i<this.form.elements.length; i++)
	{
		var e = this.form.elements[i];

		var type = (e.type ? e.type.toLowerCase() : null);
		if (collect_buttons &&
			(type == 'submit' || type == 'reset' || type == 'button'))
		{
			this.button_list.push(e);
		}

		if (!e.name)
		{
			continue;
		}

		var name = e.tagName.toLowerCase();

		var v = this.default_value_map[ e.name ];
		if (name == 'input' && type == 'file')
		{
			e.value = '';
		}
		else if (A.Lang.isUndefined(v))
		{
			// save value for next time

			if (name == 'input' &&
				(type == 'password' || type == 'text'))
			{
				this.default_value_map[ e.name ] = e.value;
			}
			else if (name == 'input' && type == 'checkbox')
			{
				this.default_value_map[ e.name ] = (e.checked ? e.value : '');
			}
			else if (name == 'input' && type == 'radio')
			{
				var rb = this.form[ e.name ];	// null if dynamically generated in IE
				if (rb && !rb.length)
				{
					this.default_value_map[ e.name ] = rb.value;
				}
				else if (rb)
				{
					this.default_value_map[ e.name ] = rb[0].value;

					for (var j=0; j<rb.length; j++)
					{
						if (rb[j].checked)
						{
							this.default_value_map[ e.name ] = rb[j].value;
							break;
						}
					}
				}
			}
			else if ((name == 'select' && type == 'select-one') ||
					 name == 'textarea')
			{
				this.default_value_map[ e.name ] = e.value;
			}
		}
		else if (name == 'input' &&
				 (type == 'password' || type == 'text'))
		{
			e.value = v;
		}
		else if (name == 'input' &&
				 (type == 'checkbox' || type == 'radio'))
		{
			e.checked = (e.value == v);
		}
		else if (name == 'select' && type == 'select-one')
		{
			e.value = v;
			if (e.selectedIndex >= 0 &&
				e.options[ e.selectedIndex ].value !== v.toString())
			{
				e.selectedIndex = -1;
			}
		}
		else if (name == 'textarea')
		{
			e.value = v;
		}
	}
}

FormManager.prototype =
{
	/* *********************************************************************
	 * Access functions.
	 */

	/**
	 * @return {DOM} The form DOM element.
	 */
	getForm: function()
	{
		if (!this.form)
		{
			this.form = document.forms[ this.form_name ];
		}
		return this.form;
	},

	/**
	 * @return {boolean} <code>true</code> if the form contains file inputs.  These require special treatment when submitting via XHR.
	 */
	hasFileInputs: function()
	{
		return this.has_file_inputs;
	},

	/**
	 * Set the default values for all form elements.
	 *
	 * @param default_value_map {Object} Mapping of form element names to values.
	 */
	setDefaultValues: function(
		/* object */	default_value_map)
	{
		this.default_value_map = default_value_map;
	},

	/**
	 * Set the default values for a single form element.
	 *
	 * @param field_name {String} The form element name.
	 * @param default_value {String|Int|Float} The default value.
	 */
	setDefaultValue: function(
		/* string*/		field_name,
		/* string */	default_value)
	{
		this.default_value_map[ field_name ] = default_value;
	},

	/**
	 * Store the current form values in <code>default_value_map</code>.
	 */
	saveCurrentValuesAsDefault: function()
	{
		this.default_value_map = {};
		this.button_list       = [];
		populateForm1.call(this);
	},

	/* *********************************************************************
	 * Validation control
	 */

	/**
	 * Set the validation function for a form element.
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param f {Function|String|Object}
	 *		The function to call after basic validations succeed.  If this
	 *		is a String, it is resolved in the scope of the FormManager
	 *		object.  If this is an object, it must be <code>{fn:,
	 *		scope:}</code>.  The function will then be invoked in the
	 *		specified scope.
	 */
	setFunction: function(
		/* string */				id,
		/* function/string/obj */	f)
	{
		this.validation.fn[ getId(id) ] = f;
	},

	/**
	 * <p>Set the regular expression used to validate the field value.</p>
	 *
	 * <p><strong>Since there is no default message for failed regular
	 * expression validation, this function will complain if you have not
	 * already called <code>setErrorMessages()</code> or
	 * <code>addErrorMessage</code> to specify an error message.</strong></p>
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param regex {String|RegExp} The regular expression to use
	 * @param flags {String} If regex is a String, these are the flags used to construct a RegExp.
	 */
	setRegex: function(
		/* string */		id,
		/* string/RegExp */	regex,
		/* string */		flags)		// ignored if regex is RegExp object
	{
		id = getId(id);

		if (A.Lang.isString(regex))
		{
			this.validation.regex[id] = new RegExp(regex, flags);
		}
		else
		{
			this.validation.regex[id] = regex;
		}

		if (!this.validation_msgs[id] || !this.validation_msgs[id].regex)
		{
		}
	},

	/**
	 * <p>Set the error messages for a form element.  This can be used to
	 * override the default messages for individual elements</p>
	 *
	 * <p>The valid error types are:</p>
	 *	<dl>
	 *	<dt><code>required</code></dt>
	 *	<dt><code>min_length</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>max_length</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>integer</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>decimal</code></dt>
	 *		<dd><code>{min}</code> and <code>{max}</code> are replaced</dd>
	 *	<dt><code>regex</code></dt>
	 *		<dd>This <string>must</strong> be set for elements which validate with regular expressions.</dd>
	 *	</dl>
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param map {Object} Map of error types to error messages.
	 */
	setErrorMessages: function(
		/* string */	id,
		/* object */	map)
	{
		this.validation_msgs[ getId(id) ] = map;
	},

	/**
	 * Set one particular error message for a form element.
	 *
	 * @param id {String|Object} The selector for the element or the element itself
	 * @param error_type {String} The error message type.  Refer to setErrorMessages() for details.
	 * @param msg {String} The error message
	 */
	addErrorMessage: function(
		/* string */	id,
		/* string */	error_type,
		/* string */	msg)
	{
		id = getId(id);
		if (!this.validation_msgs[id])
		{
			this.validation_msgs[id] = {};
		}
		this.validation_msgs[id][error_type] = msg;
	},

	/**
	 * Reset all values in the form to the defaults specified in the markup.
	 */
	clearForm: function()
	{
		this.clearMessages();
		this.form.reset();
		this.postPopulateForm();
	},

	/**
	 * Reset all values in the form to the defaults passed to the constructor.
	 */
	populateForm: function()
	{
		if (!this.default_value_map)
		{
			this.default_value_map = {};
		}

		this.clearMessages();

		populateForm1.call(this);

		// let derived class adjust

		this.postPopulateForm();
	},

	/**
	 * Hook for performing additional actions after
	 * <code>populateForm()</code> completes.
	 */
	postPopulateForm: function()
	{
	},

	/**
	 * Check if form values have been modified.
	 *
	 * @return {boolean} <code>false</code> if all form elements have the default values passed to the constructor
	 */
	isChanged: function()
	{
		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			if (!e.name)
			{
				continue;
			}

			var type = (e.type ? e.type.toLowerCase() : null);
			var name = e.tagName.toLowerCase();
			var v    = this.default_value_map[ e.name ];
			if (v === null || typeof v === 'undefined')
			{
				v = "";
			}

			if (name == 'input' && type == 'file')
			{
				if (e.value)
				{
					return true;
				}
			}
			else if (name == 'input' &&
					 (type == 'password' || type == 'text' || type == 'file'))
			{
				if (e.value != v)
				{
					return true;
				}
			}
			else if (name == 'input' &&
					 (type == 'checkbox' || type == 'radio'))
			{
				var checked = (e.value == v);
				if ((checked && !e.checked) || (!checked && e.checked))
				{
					return true;
				}
			}
			else if ((name == 'select' && type == 'select-one') ||
					 name == 'textarea')
			{
				if (e.value != v)
				{
					return true;
				}
			}
		}

		return false;
	},

	/**
	 * Prepare the form for display.
	 *
	 * @return {boolean} <code>true</code> if both pre & post hooks are happy
	 */
	prepareForm: function()
	{
		this.getForm();

		if (!this.prePrepareForm.apply(this, arguments))
		{
			return false;
		}

		// clear all errors

		this.clearMessages();

		// fill in starting values

		this.populateForm();

		return this.postPrepareForm.apply(this, arguments);
	},

	/**
	 * Hook called before <code>prepareForm()</code> executes.
	 *
	 * @return {boolean} <code>false</code> cancels <code>prepareForm()</code>.
	 */
	prePrepareForm: function()
	{
		return true;
	},

	/**
	 * Hook called after <code>prepareForm()</code> executes.
	 *
	 * @return {boolean} Return value from this function is returned by <code>prepareForm()</code>.
	 */
	postPrepareForm: function()
	{
		return true;
	},

	/**
	 * Set focus to first input field.  If a page contains multiple forms,
	 * only call this for one of them.
	 */
	initFocus: function()
	{
		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			if (e.disabled || e.offsetHeight === 0)
			{
				continue;
			}

			var name = e.tagName.toLowerCase();
			var type = (e.type ? e.type.toLowerCase() : null);

			if ((name == 'input' &&
				 (type == 'file' || type == 'password' || type == 'text')) ||
				name == 'textarea')
			{
				try
				{
					e.focus();
				}
				catch (ex)
				{
					// no way to determine in IE if this will fail
				}
				e.select();
				break;
			}
		}
	},

	/**
	 * Validate the form.
	 */
	validateForm: function()
	{
		this.clearMessages();
		var status = true;

		this.has_file_inputs = false;

		var e = this.form.elements;
		for (var i=0; i<e.length; i++)
		{
			if (e[i].type && e[i].type.toLowerCase() == 'file')
			{
				this.has_file_inputs = true;
			}
			else if (e[i].type && e[i].type.toLowerCase() == 'select-multiple')
			{
				// don't change the value
			}
			else if (e[i].value)
			{
				e[i].value = A.Lang.trim(e[i].value);
			}
		}

		for (i=0; i<e.length; i++)
		{
			var e_id     = e[i].id;
			var msg_list = this.validation_msgs[e_id];

			var required = A.one(e[i]).hasClass(required_class);
			if (required && e[i].value === '')
			{
				var msg = null;
				if (msg_list && msg_list.required)
				{
					msg = msg_list.required;
				}
				else if (e[i].tagName.toLowerCase() == 'select')
				{
					msg = FormManager.Strings.required_menu;
				}
				else
				{
					msg = FormManager.Strings.required_string;
				}
				this.displayMessage(e[i], msg, 'error');
				status = false;
				continue;
			}
			else if (!required && e[i].value === '')
			{
				continue;
			}

			if (e[i].className)
			{
				var m = e[i].className.match(length_class_re);
				if (m && m.length)
				{
					var msg     = null;
					var has_min = (hasLimit(m[1]) && m[1] !== '0');
					if (has_min && hasLimit(m[2]))
					{
						msg = FormManager.Strings.length_out_of_range;
					}
					else if (has_min)
					{
						msg = FormManager.Strings.length_too_short;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.length_too_long;
					}

					if (hasLimit(m[1]) &&
						hasLimit(m[2]) &&
						parseInt(m[1], 10) > parseInt(m[2], 10))
					{
					}

					if (e[i].value && hasLimit(m[1]) &&
						e[i].value.length < parseInt(m[1], 10))
					{
						if (msg_list && msg_list.min_length)
						{
							msg = msg_list.min_length;
						}
						msg = A.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
					if (e[i].value && hasLimit(m[2]) &&
						e[i].value.length > parseInt(m[2], 10))
					{
						if (msg_list && msg_list.max_length)
						{
							msg = msg_list.max_length;
						}
						msg = A.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}

				var m = e[i].className.match(integer_class_re);
				if (m && m.length)
				{
					var msg = null;
					if (msg_list && msg_list.integer)
					{
						msg = msg_list.integer;
					}
					else if (hasLimit(m[1]) &&
							 hasLimit(m[2]))
					{
						if (parseInt(m[1], 10) > parseInt(m[2], 10))
						{
						}

						msg = FormManager.Strings.integer_out_of_range;
					}
					else if (hasLimit(m[1]))
					{
						msg = FormManager.Strings.integer_too_small;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.integer_too_large;
					}
					else
					{
						msg = FormManager.Strings.integer;
					}
					msg = A.substitute(msg, {min: parseInt(m[1], 10), max: parseInt(m[2], 10)});

					var value = parseInt(e[i].value, 10);
					if (e[i].value &&
						(!FormManager.integer_value_re.test(e[i].value) ||
						 (hasLimit(m[1]) && value < parseInt(m[1], 10)) ||
						 (hasLimit(m[2]) && value > parseInt(m[2], 10))))
					{
						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}

				var m = e[i].className.match(decimal_class_re);
				if (m && m.length)
				{
					var msg = null;
					if (msg_list && msg_list.decimal)
					{
						msg = msg_list.decimal;
					}
					else if (hasLimit(m[1]) &&
							 hasLimit(m[2]))
					{
						if (parseFloat(m[1]) > parseFloat(m[2]))
						{
						}

						msg = FormManager.Strings.decimal_out_of_range;
					}
					else if (hasLimit(m[1]))
					{
						msg = FormManager.Strings.decimal_too_small;
					}
					else if (hasLimit(m[2]))
					{
						msg = FormManager.Strings.decimal_too_large;
					}
					else
					{
						msg = FormManager.Strings.decimal;
					}
					msg = A.substitute(msg, {min: parseFloat(m[1], 10), max: parseFloat(m[2], 10)});

					var value = parseFloat(e[i].value);
					if (e[i].value &&
						(!FormManager.decimal_value_re.test(e[i].value) ||
						 (hasLimit(m[1]) && value < parseFloat(m[1])) ||
						 (hasLimit(m[2]) && value > parseFloat(m[2]))))
					{
						this.displayMessage(e[i], msg, 'error');
						status = false;
						continue;
					}
				}
			}

			if (this.validation.regex[e_id] &&
				!this.validation.regex[e_id].test(e[i].value))
			{
				this.displayMessage(e[i], msg_list ? msg_list.regex : null, 'error');
				status = false;
				continue;
			}

			var f     = this.validation.fn[e_id];
			var scope = this;
			if (A.Lang.isFunction(f))
			{
				// use it
			}
			else if (A.Lang.isString(f))
			{
				f = scope[f];
			}
			else if (f && f.scope)
			{
				scope = f.scope;
				f     = (A.Lang.isString(f.fn) ? scope[f.fn] : f.fn);
			}
			else
			{
				f = null;
			}

			if (f && !f.call(scope, this.form, A.one(e[i])))
			{
				status = false;
				continue;
			}
		}

		if (!this.postValidateForm(this.form))
		{
			status = false;
		}

		if (!status)
		{
			this.notifyErrors();
		}

		return status;
	},

	/**
	 * Hook called at the end of <code>validateForm()</code>.  This is the
	 * best place to put holistic validations that touch multiple form
	 * elements.
	 *
	 * @return {boolean} <code>false</code> if validation fails
	 */
	postValidateForm: function(
		/* DOM element */	form)
	{
		return true;
	},

	/* *********************************************************************
	 * Buttons can be disabled during submission.
	 */

	/**
	 * Register a button that can be disabled.  Buttons contained within
	 * the form DOM element are automatically registered.
	 *
	 * @param el {String|Object} The selector for the element or the element itself
	 */
	registerButton: function(
		/* string/object */ el)
	{
		var info =
		{
			e: A.one(el)
		};

		this.user_button_list.push(info);
	},

	/**
	 * Enable all the registered buttons.
	 */
	enableForm: function()
	{
		this.setFormEnabled(true);
	},

	/**
	 * Disable all the registered buttons.
	 */
	disableForm: function()
	{
		this.setFormEnabled(false);
	},

	/**
	 * Set the enabled state all the registered buttons.
	 *
	 * @param enabled {boolean} <code>true</code> to enable the form, <code>false</code> to disable the form
	 */
	setFormEnabled: function(
		/* boolean */	enabled)
	{
		this.enabled = enabled;

		var disabled = ! enabled;
		for (var i=0; i<this.button_list.length; i++)
		{
			this.button_list[i].disabled = disabled;
		}

		for (i=0; i<this.user_button_list.length; i++)
		{
			var info = this.user_button_list[i];
			info.e.set('disabled', disabled);
		}
	},

	/* *********************************************************************
	 * Message display
	 */

	/**
	 * @return {boolean} <code>true</code> if there are any messages displayed, of any type
	 */
	hasMessages: function()
	{
		return this.has_messages;
	},

	/**
	 * @return {boolean} <code>true</code> if there are any error messages displayed
	 */
	hasErrors: function()
	{
		return this.has_errors;
	},

	/**
	 * Get the message type displayed for the row containing the specified element.
	 *
	 * @param e {String|Object} The selector for the element or the element itself
	 * @return {mixed} The status (String) or <code>false</code>.
	 */
	getRowStatus: function(
		/* id/object */	e)
	{
		var p = A.one(e).ancestor('.'+FormManager.row_marker_class);
		return FormManager.getElementStatus(p);
	},

	/**
	 * Clear all messages in <code>status_node</code> and the form rows.
	 */
	clearMessages: function()
	{
		this.has_messages = false;
		this.has_errors   = false;

		if (this.status_node)
		{
			this.status_node.set('innerHTML', '');
			this.status_node.replaceClass(status_pattern, FormManager.status_none_class);
		}

		for (var i=0; i<this.form.elements.length; i++)
		{
			var e = this.form.elements[i];
			var p = A.one(e).ancestor('.'+FormManager.row_marker_class);
			if (p && p.hasClass(row_status_pattern))
			{
				p.all('.'+FormManager.status_marker_class).set('innerHTML', '');
				p.removeClass(row_status_pattern);
			}
		}

		A.one(this.form).all('fieldset').removeClass(row_status_pattern);
	},

	/**
	 * Display a message for the form row containing the specified element.
	 * The message will only be displayed if no message with a higher
	 * precedence is already visible. (see A.FormManager.status_order)
	 *
	 * @param e {String|Object} The selector for the element or the element itself
	 * @param msg {String} The message
	 * @param type {String} The message type (see A.FormManager.status_order)
	 * @param scroll {boolean} <code>true</code> if the form row should be scrolled into view
	 */
	displayMessage: function(
		/* id/object */	e,
		/* string */	msg,
		/* string */	type,
		/* boolean */	scroll)
	{
		if (A.Lang.isUndefined(scroll))
		{
			scroll = true;
		}

		e     = A.one(e);
		var p = e.ancestor('.'+FormManager.row_marker_class);
		if (p && FormManager.statusTakesPrecendence(FormManager.getElementStatus(p), type))
		{
			if (msg)
			{
				p.all('.'+FormManager.status_marker_class).set('innerHTML', msg);
			}

			p.removeClass(row_status_pattern);
			p.addClass(FormManager.row_status_prefix + type);

			var fieldset = e.ancestor('fieldset');
			if (fieldset && FormManager.statusTakesPrecendence(FormManager.getElementStatus(fieldset), type))
			{
				fieldset.removeClass(row_status_pattern);
				fieldset.addClass(FormManager.row_status_prefix + type);
			}

			if (!this.has_messages && scroll && e.get('offsetHeight') > 0)
			{
				p.scrollIntoView();
				try
				{
					e.focus();
				}
				catch (ex)
				{
					// no way to determine in IE if this will fail
				}
			}

			this.has_messages = true;
			if (type == 'error')
			{
				this.has_errors = true;
			}
		}
	},

	/**
	 * Displays a generic message in <code>status_node</code> stating that
	 * the form data failed to validate.  Override this if you want to get
	 * fancy.
	 */
	notifyErrors: function()
	{
		this.displayFormMessage(FormManager.Strings.validation_error, true, false);
	},

	/**
	 * Display a message in <code>status_node</code>.
	 *
	 * @param msg {String} The message
	 * @param error {boolean} <code>true</code> if the message is an error
	 * @param scroll {boolean} <code>true</code> if <code>status_node</code> should be scrolled into view
	 */
	displayFormMessage: function(
		/* string */	msg,
		/* boolean */	error,
		/* boolean */	scroll)
	{
		if (A.Lang.isUndefined(scroll))
		{
			scroll = true;
		}

		if (this.status_node)
		{
			if (!this.status_node.innerHTML)
			{
				this.status_node.replaceClass(
					FormManager.status_none_class,
					(error ? FormManager.status_failure_class :
							 FormManager.status_success_class));
				this.status_node.set('innerHTML', msg);
			}

			if (scroll)
			{
				this.status_node.scrollIntoView();
			}
		}
		else
		{
		}
	}
};

A.FormManager = FormManager;

}, '@VERSION@' ,{skinnable:false, requires:['aui-base','substitute']});
