var IE = A.UA.ie;

if (!IE || IE >= 9) {
	return;
}

var WIN = A.config.win,
	DOC = A.config.doc,

	CSS_PRINTFIX = 'aui-printfix',
	CSS_PRINTFIX_PREFIX = 'aui-printfix-',

	GLOBAL_AUI = YUI.AUI,

	html5shiv = GLOBAL_AUI.html5shiv,

	HTML = DOC.documentElement,

	HTML5_ELEMENTS = GLOBAL_AUI.HTML5_ELEMENTS,
	HTML5_ELEMENTS_LENGTH = HTML5_ELEMENTS.length,
	HTML5_ELEMENTS_LIST = HTML5_ELEMENTS.join('|'),

	REGEX_CLONE_NODE_CLEANUP = new RegExp('<(/?):(' + HTML5_ELEMENTS_LIST + ')', 'gi'),
	REGEX_ELEMENTS = new RegExp('(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

	REGEX_PRINT_MEDIA = /print|all/,

	REGEX_RULE = new RegExp('(^|[^\\n{}]*?\\s)(' + HTML5_ELEMENTS_LIST + ').*?{([^}]*)}', 'gim'),
	REGEX_TAG = new RegExp('<(\/*)(' + HTML5_ELEMENTS_LIST + ')', 'gi'),

	SELECTOR_REPLACE_RULE = '.' + CSS_PRINTFIX_PREFIX + '$1',

	STR_ALL = 'all',
	STR_BLANK = ' ',
	STR_EMPTY = '',

	TAG_REPLACE_ORIGINAL = '<$1$2',
	TAG_REPLACE_FONT = '<$1font';

	html5shiv(DOC);

var PrintFix = function() {
	WIN.attachEvent(
		'onbeforeprint',
		function() {
			PrintFix.onBeforePrint();
		}
	);

	WIN.attachEvent(
		'onafterprint',
		function() {
			PrintFix.onAfterPrint();
		}
	);
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
			var cssRules = instance.getCSS(DOC.styleSheets, STR_ALL);

			styleSheet.styleSheet.cssText = instance.parseCSS(cssRules);

			instance.writeHTML();
		},

		getCSS: function(styleSheets, mediaType) {
			var instance = this;

			var css = STR_EMPTY;

			if (styleSheets + STR_EMPTY !== undefined) {
				var i = -1;
				var length = styleSheets.length;
				var buffer = [];
				var styleSheet;

				while (++i < length) {
					styleSheet = styleSheets[i];

					if (styleSheet.disabled) {
						continue;
					}

					mediaType = styleSheet.mediaType || mediaType;

					if (REGEX_PRINT_MEDIA.test(mediaType)) {
						buffer.push(instance.getCSS(styleSheet.imports, mediaType), styleSheet.cssText);
					}

					mediaType = STR_ALL;
				}

				css = buffer.join(STR_EMPTY);
			}

			return css;
		},

		parseCSS: function(cssText) {
			var instance = this;

			var css = STR_EMPTY;
			var rule;

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

						node.className =  buffer.join(STR_BLANK);
					}
				}
			}

			var docFrag = instance._getDocFrag();
			var bodyClone = instance._getBodyClone();

			docFrag.appendChild(bodyEl);
			HTML.appendChild(bodyClone);

			bodyClone.className = bodyEl.className;
			bodyClone.id = bodyEl.id;

			var bodyHTML = bodyEl.cloneNode(true).innerHTML;

			bodyHTML = bodyHTML.replace(REGEX_CLONE_NODE_CLEANUP, TAG_REPLACE_ORIGINAL).replace(REGEX_TAG, TAG_REPLACE_FONT);

			bodyClone.innerHTML = bodyHTML;
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