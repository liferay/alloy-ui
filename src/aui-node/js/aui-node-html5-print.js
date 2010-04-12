var WIN = window,
	DOC = document;

if (A.UA.ie) {
	A.HTML5.print = {
	_elements: AUI.HTML5_ELEMENTS.join('|'),

	_protect: [],

	_parseSheets: function (stylesheets) {
		var instance = this,
			imports,
			rules,
			selectors,
			selectorsMatch = new RegExp('\\b(' + instance._elements + ')\\b', 'gi'),
			selectorsReplace = function (m) {
				return '.iepp_' + m;
			},
			declarationBlock,
			a = -1,
			b;

		while (++a < stylesheets.length) {
			imports = stylesheets[a].imports;
			rules = stylesheets[a].rules;
			b = -1;

			if (imports.length) {
				instance._parseSheets(imports);
			}

			while (++b < rules.length) {
				selectors = rules[b].selectorText;
				declarationBlock = rules[b].style.cssText;

				if (selectors.match(selectorsMatch)) {
					instance._stylesheet.styleSheet.addRule(selectors.replace(selectorsMatch, selectorsReplace), declarationBlock);
				}
			}
		}
	},

	shim: function () {
		var instance = this,
			div = DOC.createElement('div');

		A.HTML5._fragHTML5Shived.appendChild(div);

		instance._fragment = div;

		WIN.attachEvent('onbeforeprint', A.bind(instance.addSafeHTML, instance));

		WIN.attachEvent('onafterprint', A.bind(instance.removeSafeHTML, instance));
	},

	addSafeCSS: function () {
		var instance = this,
			head = DOC.documentElement.firstChild,
			safeStylesheet = DOC.createElement('style'),
			stylesheets = DOC.styleSheets;

		head.insertBefore(safeStylesheet, head.firstChild);

		instance._stylesheet = safeStylesheet;

		instance._parseSheets(stylesheets);
	},

	removeSafeCSS: function () {
		DOC.documentElement.firstChild.removeChild(this._stylesheet);
	},

	addSafeHTML: function () {
		var instance = this,
			els = DOC.getElementsByTagName('*'),
			node_match = new RegExp('^' + instance._elements + '$', 'i'),
			node_name,
			node_replace,
			node_safe,
			safe_element,
			protect,
			i = -1;

		instance.addSafeCSS();

		while (++i < els.length) {
			node_name = els[i].nodeName.match(node_match);

			if (node_name) {
				node_replace = new RegExp('^\\s*<' + node_name + '(.*)\\/' + node_name + '>\\s*$', 'i');
				node_safe = (els[i].currentStyle.display == 'block') ? 'div' : 'span'; 

				instance._fragment.innerHTML = els[i].outerHTML.replace(/\r|\n/g, ' ').replace(node_replace, '<' + node_safe + '$1/' + node_safe + '>');

				safe_element = instance._fragment.childNodes[0];

				safe_element.className += ' iepp_' + node_name;

				protect = instance._protect[instance._protect.length] = {
					before: els[i],
					after: instance._fragment.childNodes[0]
				};

				els[i].parentNode.replaceChild(protect.after, protect.before);
			}
		}
	},

	removeSafeHTML: function () {
		var instance = this,
			els = instance._protect,
			i = -1;

		instance.removeSafeCSS();

		while (++i < els.length) {
			els[i].after.parentNode.replaceChild(els[i].before, els[i].after);
		}

		instance._protect = [];
	}
};

A.HTML5.print.shim();

}