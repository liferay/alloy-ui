var WIN = A.config.win,
	DOC = A.config.doc,
	HEAD = DOC.documentElement.firstChild,
	ELEMENTS = AUI.HTML5_ELEMENTS.join('|'),
	PROTECT = [],

	getClassName = A.ClassNameManager.getClassName,

	getReplaceRE = A.cached(
		function(node_name) {
			return new RegExp('^\\s*<' + node_name + '(.*)\\/' + node_name + '>\\s*$', 'i');
		}
	),

	CSS_PREFIX = getClassName('print'),
	CSS_PREFIX_SELECTOR = '.' + CSS_PREFIX,

	SELECTOR_MATCH = new RegExp('\\b(' + ELEMENTS + ')\\b', 'gi'),

	SELECTOR_REPLACE = function (match) {
		return CSS_PREFIX_SELECTOR + match;
	};

if (A.UA.ie) {
	A.HTML5.print = {
	_parseSheets: function (stylesheets) {
		var instance = this;

		var a = -1,
			b,
			declarationBlock,
			imports,
			length = stylesheets.length,
			rlength,
			rules,
			selectors;

		while (++a < length) {
			imports = stylesheets[a].imports;
			rules = stylesheets[a].rules;
			b = -1;

			if (imports.length) {
				instance._parseSheets(imports);
			}

			rlength = rules.length;

			while (++b < rlength) {
				selectors = rules[b].selectorText;
				declarationBlock = rules[b].style.cssText;

				if (selectors.match(SELECTOR_MATCH)) {
					instance._stylesheet.styleSheet.addRule(selectors.replace(SELECTOR_MATCH, SELECTOR_REPLACE), declarationBlock);
				}
			}
		}
	},

	shim: function () {
		var instance = this;

		var	div = DOC.createElement('div');

		A.HTML5._fragHTML5Shived.appendChild(div);

		instance._fragment = div;

		WIN.attachEvent('onbeforeprint', A.bind(instance.addSafeHTML, instance));
		WIN.attachEvent('onafterprint', A.bind(instance.removeSafeHTML, instance));
	},

	addSafeCSS: function () {
		var instance = this;

		var safeStylesheet = DOC.createElement('style');
		var stylesheets = DOC.styleSheets;

		HEAD.insertBefore(safeStylesheet, HEAD.firstChild);

		instance._stylesheet = safeStylesheet;

		instance._parseSheets(stylesheets);
	},

	removeSafeCSS: function () {
		HEAD.removeChild(this._stylesheet);
	},

	addSafeHTML: function () {
		var instance = this;

		var els = DOC.getElementsByTagName('*');

		var node_match = new RegExp('^' + ELEMENTS + '$', 'i');

		var	i = -1,
			node_name,
			node_replace,
			node_safe,
			protect,
			safe_element;

		instance.addSafeCSS();

		while (++i < els.length) {
			node_name = els[i].nodeName.match(node_match);

			if (node_name) {
				node_replace = getReplaceRE(node_name);
				node_safe = (els[i].currentStyle.display == 'block') ? 'div' : 'span';

				instance._fragment.innerHTML = els[i].outerHTML.replace(/\r|\n/g, ' ').replace(node_replace, '<' + node_safe + '$1/' + node_safe + '>');

				safe_element = instance._fragment.childNodes[0];

				safe_element.className += ' ' + CSS_PREFIX + node_name;

				protect = PROTECT[PROTECT.length] = {
					before: els[i],
					after: instance._fragment.childNodes[0]
				};

				els[i].parentNode.replaceChild(protect.after, protect.before);
			}
		}
	},

	removeSafeHTML: function () {
		var instance = this;

		var	els = PROTECT;
		var	i = -1;

		instance.removeSafeCSS();

		var length = els.length;

		while (++i < length) {
			els[i].after.parentNode.replaceChild(els[i].before, els[i].after);
		}

		PROTECT = [];
	}
};

A.HTML5.print.shim();

}