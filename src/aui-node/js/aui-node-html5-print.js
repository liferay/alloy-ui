(function(win, doc, elemsArr, elemsArrLen, elems, isIE) {
	if (!isIE || isIE >= 9) {
		return;
	}

	var DOC_FRAG = doc.createDocumentFragment(),
		EL_BODY = doc.createElement('body'),
		EL_STYLE = doc.createElement('style'),

		HTML = doc.documentElement,
		HEAD = HTML.firstChild,

		REGEX_ELEM = new RegExp('(^|\\s)(' + elems + ')', 'gi'),
		REGEX_RULE = new RegExp('(^|[^\\n]*?\\s)(' + elems + ')([^\\n]*)({[\\n\\w\\W]*?})', 'gi'),
		REGEX_TAG = new RegExp('<(\/*)(' + elems + ')', 'gi');

	var body;

	var shim = YUI.AUI.html5shiv;

	function getCSS(styleSheetList, mediaType) {
		var a = -1;
		var len = styleSheetList.length;
		var styleSheet;
		var cssTextArr = [];

		while (++a < len) {
			styleSheet = styleSheetList[a];

			if ((mediaType = styleSheet.media || mediaType) != 'screen') {
				cssTextArr.push(getCSS(styleSheet.imports, mediaType), styleSheet.cssText);
			}
		}

		return cssTextArr.join('');
	}

	shim(doc);
	shim(DOC_FRAG);

	HEAD.insertBefore(EL_STYLE, HEAD.firstChild);

	EL_STYLE.media = 'print';

	win.attachEvent(
		'onbeforeprint',
		function() {
			var a = -1;
			var b;
			var cssText = getCSS(doc.styleSheets, 'all');
			var cssTextArr = [];
			var elem;
			var node;
			var nodeList;
			var nodeListLen;
			var rule;

			body = body || doc.body;

			while ((rule = REGEX_RULE.exec(cssText)) != null) {
				cssTextArr.push((rule[1] + rule[2] + rule[3]).replace(REGEX_ELEM, '$1.iepp_$2') + rule[4]);
			}

			EL_STYLE.styleSheet.cssText = cssTextArr.join('\n');

			while (++a < elemsArrLen) {
				elem = elemsArr[a];
				nodeList = doc.getElementsByTagName(elem);

				nodeListLen = nodeList.length;

				b = -1;

				while (++b < nodeListLen) {
					node = nodeList[b];

					if (node.className.indexOf('iepp_') < 0) {
						node.className += ' iepp_' + elem;
					}
				}
			}

			DOC_FRAG.appendChild(body);
			HTML.appendChild(EL_BODY);

			EL_BODY.className = body.className;

			EL_BODY.innerHTML = body.innerHTML.replace(REGEX_TAG, '<$1font');
		}
	);

	win.attachEvent(
		'onafterprint',
		function() {
			EL_BODY.innerHTML = '';

			HTML.removeChild(EL_BODY);
			HTML.appendChild(body);

			EL_STYLE.styleSheet.cssText = '';
		}
	);
})(A.config.win, A.config.doc, YUI.AUI.HTML5_ELEMENTS, YUI.AUI.HTML5_ELEMENTS.length, YUI.AUI.HTML5_ELEMENTS.join('|'), A.UA.ie);