AUI.add('aui-node-html5-print', function(A) {
var CONFIG = A.config,
	DOC = CONFIG.doc,
	WIN = CONFIG.win,
	UA = A.UA,
	IE = UA.ie,

	isShivDisabled = function() {
		return WIN.AUI_HTML5_IE === false;
	};

if (!IE || IE >= 9 || isShivDisabled()) {
	return;
}

var BUFFER_CSS_TEXT = [],

	CSS_PRINTFIX = 'aui-printfix',
	CSS_PRINTFIX_PREFIX = 'aui-printfix-',

	LOCATION = WIN.location,

	DOMAIN = LOCATION.protocol + '//' + LOCATION.host,

	GLOBAL_AUI = YUI.AUI,

	HTML = DOC.documentElement,

	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,
	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,
	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),

	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS_FAST = new RegExp('\\b(' + HTML5_ELEMENTS_LIST + ')\\b', 'i'),

	REGEX_PRINT_MEDIA = /print|all/,

	REGEX_RULE = new RegExp('(^|[^\\n{}]*?\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),
	REGEX_TAG = new RegExp('<(\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',

	STR_ALL = 'all',
	STR_BLANK = ' ',
	STR_EMPTY = '',

	STR_BRACKET_OPEN = '{',
	STR_BRACKET_CLOSE = '}',

	STR_CHECKBOX = 'checkbox',
	STR_CHECKED = 'checked',
	STR_HTTPS = 'https',
	STR_IFRAME = 'IFRAME',
	STR_INPUT = 'INPUT',
	STR_OPTION = 'OPTION',
	STR_RADIO = 'radio',
	STR_SELECTED = 'selected',
	STR_STAR = '*',
	STR_URL = 'url(',
	STR_URL_DOMAIN = STR_URL + DOMAIN,

	TAG_REPLACE_ORIGINAL = '<$1$2',
	TAG_REPLACE_FONT = '<$1font';

var html5shiv = GLOBAL_AUI.html5shiv,
	// Yes, IE does this wackiness; converting an object
	// to a string should never result in undefined, but
	// IE's styleSheet object sometimes becomes inaccessible
	// after trying to print the second time
	isStylesheetDefined = function(obj) {
		return obj && (obj + STR_EMPTY !== undefined);
	},

	toggleNode = function(node, origNode, prop) {
		var state = origNode[prop];

		if (state) {
			node.setAttribute(prop, state);
		}
		else {
			node.removeAttribute(prop);
		}
	};

	html5shiv(DOC);

var PrintFix = function() {
	var afterPrint = function() {
		if (isShivDisabled()) {
			destroy();
		}
		else {
			PrintFix.onAfterPrint();
		}
	};

	var beforePrint = function() {
		if (isShivDisabled()) {
			destroy();
		}
		else {
			PrintFix.onBeforePrint();
		}
	};

	var destroy = function() {
		WIN.detachEvent('onafterprint', afterPrint);
		WIN.detachEvent('onbeforeprint', beforePrint);
	};

	var init = function() {
		WIN.attachEvent('onafterprint', afterPrint);
		WIN.attachEvent('onbeforeprint', beforePrint);
	};

	init();

	PrintFix.destroy = destroy;
	PrintFix.init = init;
};

A.mix(
	PrintFix,
	{
		onAfterPrint: function() {
			var instance = this;

			instance.restoreHTML();

			var styleSheet = instance._getStyleSheet();

			styleSheet.styleSheet.cssText = STR_EMPTY;
		},

		onBeforePrint: function() {
			var instance = this;

			var styleSheet = instance._getStyleSheet();
			var cssRules = instance._getAllCSSText();

			styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);

			instance.writeHTML();
		},

		parseCSS: function(cssText) {
			var instance = this;

			var css = STR_EMPTY;
			var rules = cssText.match(REGEX_RULE);

			if (rules) {
				css = rules.join('\n').replace(REGEX_ELEMENTS, SELECTOR_REPLACE_RULE);
			}

			return css;
		},

		restoreHTML: function() {
			var instance = this;

			var bodyClone = instance._getBodyClone();
			var bodyEl = instance._getBodyEl();

			var newNodes = bodyClone.getElementsByTagName(STR_IFRAME);
			var originalNodes = bodyEl.getElementsByTagName(STR_IFRAME);

			var length = originalNodes.length;

			// Moving IFRAME nodes back to their original position
			if (length == newNodes.length) {
				while (length--) {
					var newNode = newNodes[length];
					var originalNode = originalNodes[length];

					originalNode.swapNode(newNode);
				}
			}

			bodyClone.innerHTML = STR_EMPTY;

			HTML.removeChild(bodyClone);
			HTML.appendChild(bodyEl);
		},

		writeHTML: function() {
			var instance = this;

			var i = -1;
			var j;

			var bodyEl = instance._getBodyEl();

			var html5Element;

			var cssClass;

			var nodeList;
			var nodeListLength;
			var node;
			var buffer = [];

			while (++i < HTML5_ELEMENTS_LENGTH) {
				html5Element = HTML5_ELEMENTS[i];

				nodeList = DOC.getElementsByTagName(html5Element);
				nodeListLength = nodeList.length;

				j = -1;

				while (++j < nodeListLength) {
					node = nodeList[j];

					cssClass = node.className;

					if (cssClass.indexOf(CSS_PRINTFIX_PREFIX) == -1) {
						buffer[0] = CSS_PRINTFIX_PREFIX + html5Element;
						buffer[1] = cssClass;

						node.className = buffer.join(STR_BLANK);
					}
				}
			}

			var docFrag = instance._getDocFrag();
			var bodyClone = instance._getBodyClone();

			docFrag.appendChild(bodyEl);
			HTML.appendChild(bodyClone);

			bodyClone.className = bodyEl.className;
			bodyClone.id = bodyEl.id;

			var originalNodes = bodyEl.getElementsByTagName(STR_STAR);
			var length = originalNodes.length;

			// IE will throw a mixed content warning when using https
			// and calling clone node if the body contains elements with
			// an inline background-image style that is relative to the domain.
			if (UA.secure) {
				var bodyElStyle = bodyEl.style;

				var elStyle;
				var backgroundImage;

				bodyElStyle.display = 'none';

				for (i = 0; i < length; i++) {
					elStyle = originalNodes[i].style;

					backgroundImage = elStyle.backgroundImage;

					if (backgroundImage &&
						backgroundImage.indexOf(STR_URL) > -1 &&
						backgroundImage.indexOf(STR_HTTPS) == -1) {

						elStyle.backgroundImage = backgroundImage.replace(STR_URL, STR_URL_DOMAIN);
					}
				}

				bodyElStyle.display = STR_EMPTY;
			}

			var bodyElClone = bodyEl.cloneNode(true);

			var newNodes = bodyElClone.getElementsByTagName(STR_STAR);

			if (length == newNodes.length) {
				while (length--) {
					var newNode = newNodes[length];
					var newNodeName = newNode.nodeName;

					if (newNodeName == STR_INPUT || newNodeName == STR_OPTION || newNodeName == STR_IFRAME) {
						var originalNode = originalNodes[length];
						var originalNodeName = originalNode.nodeName;

						if (originalNodeName == newNodeName) {
							var prop = null;

							if (newNodeName == STR_OPTION) {
								prop = STR_SELECTED;
							}
							else if (newNodeName == STR_INPUT && (newNode.type == STR_CHECKBOX || newNode.type == STR_RADIO)) {
								prop = STR_CHECKED;
							}
							else if (newNodeName == STR_IFRAME) {
								newNode.src = STR_EMPTY;
							}

							if (prop !== null) {
								toggleNode(newNode, originalNode, prop);
							}
						}
					}
				}
			}

			var bodyHTML = bodyElClone.innerHTML;

			bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);

			bodyClone.innerHTML = bodyHTML;

			// Post processing the DOM in order to move IFRAME nodes

			newNodes = bodyClone.getElementsByTagName(STR_IFRAME);
			originalNodes = bodyEl.getElementsByTagName(STR_IFRAME);

			length = originalNodes.length;

			if (length == newNodes.length) {
				while (length--) {
					var newNode = newNodes[length];
					var originalNode = originalNodes[length];

					// According to quirksmode.org, swapNode is supported on all major IE versions
					originalNode.swapNode(newNode);
				}
			}
		},

		_getAllCSSText: function() {
			var instance = this;

			var buffer = [];
			var styleSheets = instance._getAllStyleSheets(DOC.styleSheets, STR_ALL);
			var rule;
			var cssText;

			for (var i = 0; styleSheet = styleSheets[i]; i++) {
				var rules = styleSheet.rules;

				if (rules && rules.length) {
					for (var j = 0, ruleLength = rules.length; j < ruleLength; j++) {
						rule = rules[j];

						if (!rule.href) {
							cssText = instance._getCSSTextFromRule(rule);

							buffer.push(cssText);
						}
					}
				}
			}

			return buffer.join(STR_BLANK);
		},

		_getCSSTextFromRule: function(rule) {
			var instance = this;

			var cssText = STR_EMPTY;

			var ruleStyle = rule.style;
			var ruleCSSText;
			var ruleSelectorText;

			if (ruleStyle && (ruleCSSText = ruleStyle.cssText) && (ruleSelectorText = rule.selectorText) && REGEX_ELEMENTS_FAST.test(ruleSelectorText)) {
				BUFFER_CSS_TEXT.length = 0;

				BUFFER_CSS_TEXT.push(ruleSelectorText, STR_BRACKET_OPEN, ruleCSSText, STR_BRACKET_CLOSE);

				cssText = BUFFER_CSS_TEXT.join(STR_BLANK);
			}

			return cssText;
		},

		_getAllStyleSheets: function(styleSheet, mediaType, level, buffer) {
			var instance = this;

			level = level || 1;

			buffer = buffer || [];

			var i;

			if (isStylesheetDefined(styleSheet)) {
				var imports = styleSheet.imports;

				mediaType = styleSheet.mediaType || mediaType;

				if (REGEX_PRINT_MEDIA.test(mediaType)) {
					var length;

					// IE can crash when trying to access imports more than 3 levels deep
					if (level <= 3 && isStylesheetDefined(imports) && imports.length) {
						for (i = 0, length = imports.length; i < length; i++) {
							instance._getAllStyleSheets(imports[i], mediaType, level + 1, buffer);
						}
					}
					else if (styleSheet.length) {
						for (i = 0, length = styleSheet.length; i < length; i++) {
							instance._getAllStyleSheets(styleSheet[i], mediaType, level, buffer);
						}
					}
					else {
						var rules = styleSheet.rules;
						var ruleStyleSheet;

						if (rules && rules.length) {
							for (i = 0, length = rules.length; i < length; i++) {
								ruleStyleSheet = rules[i].styleSheet;

								if (ruleStyleSheet) {
									instance._getAllStyleSheets(ruleStyleSheet, mediaType, level, buffer);
								}
							}
						}
					}

					if (!styleSheet.disabled && styleSheet.rules) {
						buffer.push(styleSheet);
					}
				}
			}

			mediaType = STR_ALL;

			return buffer;
		},

		_getBodyEl: function() {
			var instance = this;

			var bodyEl = instance._bodyEl;

			if (!bodyEl) {
				bodyEl = DOC.body;

				instance._bodyEl = bodyEl;
			}

			return bodyEl;
		},

		_getBodyClone: function() {
			var instance = this;

			var bodyClone = instance._bodyClone;

			if (!bodyClone) {
				bodyClone = DOC.createElement('body');

				instance._bodyClone = bodyClone;
			}

			return bodyClone;
		},

		_getDocFrag: function() {
			var instance = this;

			var docFrag = instance._docFrag;

			if (!docFrag) {
				docFrag = DOC.createDocumentFragment();

				html5shiv(docFrag);

				instance._docFrag = docFrag;
			}

			return docFrag;
		},

		_getStyleSheet: function() {
			var instance = this;

			var styleSheet = instance._styleSheet;

			if (!styleSheet) {
				styleSheet = DOC.createElement('style');

				var head = DOC.documentElement.firstChild;

				head.insertBefore(styleSheet, head.firstChild);

				styleSheet.media = 'print';
				styleSheet.className = CSS_PRINTFIX;

				instance._styleSheet = styleSheet;
			}

			return styleSheet;
		}
	}
);

A.namespace('HTML5').PrintFix = PrintFix;

PrintFix();

}, '@VERSION@' ,{requires:['aui-node-html5']});
