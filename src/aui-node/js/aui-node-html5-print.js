(function(win, doc, elemsArr, elemsArrLen, elems, isIE) {
	if (!isIE || isIE >= 9) {
		return;
	}

	var ELEM_REG_EXP = new RegExp('(^|\\s)('+elems+')', 'gi'), 
		TAG_REG_EXP = new RegExp('<(\/*)('+elems+')', 'gi'),
		RULE_REG_EXP = new RegExp('(^|[^\\n]*?\\s)('+elems+')([^\\n]*)({[\\n\\w\\W]*?})', 'gi'),
		DOC_FRAG = doc.createDocumentFragment(),
		HTML = doc.documentElement,
		HEAD = HTML.firstChild,
		BODY_ELEM = doc.createElement('body'),
		STYLE_ELEM = doc.createElement('style');

	var body;

	function shim(doc) {
		var a = -1;

		while (++a < elemsArrLen) {
			doc.createElement(elemsArr[a]);
		}
	}

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

	HEAD.insertBefore(STYLE_ELEM, HEAD.firstChild);

	STYLE_ELEM.media = 'print';

	win.attachEvent(
		'onbeforeprint',
		function() {
			var a = -1;
			var b;
			var cssText = getCSS(doc.styleSheets, 'all');
			var cssTextArr = [];
			var nodeList;
			var nodeListLen;
			var rule;

			body = body || doc.body;

			while ((rule = RULE_REG_EXP.exec(cssText)) != null) {
				cssTextArr.push((rule[1]+rule[2]+rule[3]).replace(ELEM_REG_EXP, '$1.iepp_$2')+rule[4]);
			}

			STYLE_ELEM.styleSheet.cssText = cssTextArr.join('\n');

			while (++a < elemsArrLen) {
				nodeList = doc.getElementsByTagName(elemsArr[a]),

				nodeListLen = nodeList.length,

				b = -1;

				while (++b < nodeListLen) {
					if (nodeList[b].className.indexOf('iepp_') < 0) {
						nodeList[b].className += ' iepp_'+elemsArr[a];
					}
				}
			}

			DOC_FRAG.appendChild(body);
			HTML.appendChild(BODY_ELEM);

			BODY_ELEM.className = body.className;

			BODY_ELEM.innerHTML = body.innerHTML.replace(TAG_REG_EXP, '<$1font');
		}
	);

	win.attachEvent(
		'onafterprint',
		function() {
			BODY_ELEM.innerHTML = '';

			HTML.removeChild(BODY_ELEM);
			HTML.appendChild(body);

			STYLE_ELEM.styleSheet.cssText = '';
		}
	);
})(A.config.win, A.config.doc, YUI.AUI.HTML5_ELEMENTS, YUI.AUI.HTML5_ELEMENTS.length, YUI.AUI.HTML5_ELEMENTS.join('|'), A.UA.ie);