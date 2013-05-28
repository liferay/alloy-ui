/**
 * The Selector Utility.
 *
 * @module aui-selector
 */

var Lang = A.Lang,
	isString = Lang.isString,

	SELECTOR = A.Selector,

	getClassName = A.getClassName,

	CSS_HIDE = A.getClassName('hide'),
	REGEX_HIDDEN_CLASSNAMES = new RegExp(CSS_HIDE);

	SELECTOR._isNodeHidden = function(node) {
		var width = node.offsetWidth;
		var height = node.offsetHeight;
		var ignore = node.nodeName.toLowerCase() == 'tr';
		var className = node.className;
		var nodeStyle = node.style;

		var hidden = false;

		if (!ignore) {
			if (width == 0 && height == 0) {
				hidden = true;
			}
			else if (width > 0 && height > 0) {
				hidden = false;
			}
		}

		hidden = hidden || (nodeStyle.display == 'none' || nodeStyle.visibility == 'hidden') || REGEX_HIDDEN_CLASSNAMES.test(className);

		return hidden;
	};

	var testNodeType = function(type) {
		return function(node) {
			return node.type == type;
		};
	};

	/**
	 * Augment the <a href="Selector.html">YUI3 Selector</a> with more util methods.
	 *
	 * @class A.Selector
	 * @uses Selector
	 * @constructor
	 */
	A.mix(
		SELECTOR.pseudos,
		{
			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method button
			 * @param node
			 */
			button: function(node) {
				return node.type === 'button' || node.nodeName.toLowerCase() === 'button';
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method checkbox
			 */
			checkbox: testNodeType('checkbox'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method checked
			 * @param node
			 */
			checked: function(node) {
				return node.checked === true;
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method disabled
			 * @param node
			 */
			disabled: function(node) {
				return node.disabled === true;
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method empty
			 * @param node
			 */
			empty: function(node) {
				return !node.firstChild;
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method enabled
			 * @param node
			 */
			enabled: function(node) {
				return node.disabled === false && node.type !== 'hidden';
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method file
			 */
			file: testNodeType('file'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method header
			 * @param node
			 */
			header: function(node) {
				return /h\d/i.test(node.nodeName);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method hidden
			 * @param node
			 */
			hidden: function(node) {
				return SELECTOR._isNodeHidden(node);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method image
			 */
			image: testNodeType('image'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method input
			 * @param node
			 */
			input: function(node) {
				return /input|select|textarea|button/i.test(node.nodeName);
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method parent
			 * @param node
			 */
			parent: function(node) {
				return !!node.firstChild;
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method password
			 */
			password: testNodeType('password'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method radio
			 */
			radio: testNodeType('radio'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method reset
			 */
			reset: testNodeType('reset'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method selected
			 * @param node
			 */
			selected: function(node) {
				node.parentNode.selectedIndex;
				return node.selected === true;
			},

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method submit
			 */
			submit: testNodeType('submit'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method text
			 */
			text: testNodeType('text'),

			/**
			 * TODO. Wanna help? Please send a Pull Request.
			 *
			 * @method visible
			 * @param node
			 */
			visible: function(node) {
				return !SELECTOR._isNodeHidden(node);
			}
		}
	);