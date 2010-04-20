AUI.add('aui-node-html5-print', function(A) {
/*@cc_on@if(@_jscript_version<9)
(function (window, document) {

var documentElement = document.documentElement,
	documentFragment = document.createDocumentFragment(),
	html5Stylesheet = {},
	html5Elements = AUI.HTML5_ELEMENTS.join('|'),
	elementsCache = [],
	a = -1,
	firstChild = 'firstChild',
	createElement = 'createElement';

function appendStylesheet (media, cssText) {
	if (html5Stylesheet[media]) {
		html5Stylesheet[media].styleSheet.cssText += cssText;
	}
	else {
		var head = documentElement[firstChild],
			style = document[createElement]('style');

		style.media = media;
		head.insertBefore(style, head[firstChild]);
		html5Stylesheet[media] = style;
		appendStylesheet(media, cssText);
	}
}

function parseStyleSheetList (styleSheetList, media) {
	var cssRuleList,
		selectorText,
		selectorTextMatch = new RegExp('\\b(' + html5Elements + ')\\b(?!.*[;}])', 'gi'),
		selectorTextReplace = function (m) {
			return '.iepp_' + m;
		},
		a = -1;

	while (++a < styleSheetList.length) {
		media = styleSheetList[a].media || media;

		parseStyleSheetList(styleSheetList[a].imports, media);

		appendStylesheet(media, styleSheetList[a].cssText.replace(selectorTextMatch, selectorTextReplace));
	}
}

function onBeforePrint () {
	var head = documentElement[firstChild],
		element,
		elements = document.getElementsByTagName('*'),
		elementCache,
		elementName,
		elementMatch = new RegExp('^' + html5Elements + '$', 'i'),
		elementReplace,
		elementReplaced,
		a = -1;

	while (++a < elements.length) {
		if ((element = elements[a]) && (elementName = element.nodeName.match(elementMatch))) {
			elementReplace = new RegExp('^\\s*<' + elementName + '(.*)\\/' + elementName + '>\\s*$', 'i');

			documentFragment.innerHTML = element.outerHTML.replace(/\r|\n/g, ' ').replace(elementReplace, (element.currentStyle.display == 'block') ? '<div$1/div>' : '<span$1/span>');

			elementReplaced = documentFragment.childNodes[0];
			elementReplaced.className += ' iepp_' + elementName;

			elementCache = elementsCache[elementsCache.length] = [element, elementReplaced];

			element.parentNode.replaceChild(elementCache[1], elementCache[0]);
		}
	}

	parseStyleSheetList(document.styleSheets, 'all');
}

function onAfterPrint () {
	var a = -1,
		b;

	while (++a < elementsCache.length) {
		elementsCache[a][1].parentNode.replaceChild(elementsCache[a][0], elementsCache[a][1]);
	}

	for (b in html5Stylesheet) {
		documentElement[firstChild].removeChild(html5Stylesheet[b]);
	}

	html5Stylesheet = {};
	elementsCache = [];
}

while (++a < HTML5_ELEMENTS.length) {
	document[createElement](HTML5_ELEMENTS[a]);
	documentFragment[createElement](HTML5_ELEMENTS[a]);
}

documentFragment = documentFragment.appendChild(document[createElement]('div'));

window.attachEvent('onbeforeprint', onBeforePrint);
window.attachEvent('onafterprint', onAfterPrint);

}(A.config.win, A.config.doc));
@end@*/

}, '@VERSION@' ,{requires:['aui-node-html5']});
