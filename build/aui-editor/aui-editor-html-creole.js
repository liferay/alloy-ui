AUI.add('aui-editor-html-creole', function(A) {
var Lang = A.Lang;

var NEW_LINE = '\n';

var TAG_BOLD = '**';
var TAG_EMPHASIZE = '//';
var TAG_ORDERED_LIST = 'ol';
var TAG_ORDEREDLIST_ITEM = '#';
var TAG_PARAGRAPH = 'p';
var TAG_PRE = 'pre';
var TAG_UNORDERED_LIST = 'ul';
var TAG_UNORDEREDLIST_ITEM = '*';

var REGEX_HEADER = /^h([1-6])$/i;
var REGEX_LASTCHAR_NEWLINE = /(\r?\n\s*)$/;
var REGEX_NOT_WHITESPACE = /[^\t\n\r ]/;

var SPACE = ' ';

var HTML2CreoleConvertor = A.Component.create(
	{
		NAME: 'domparsercreole',

		ATTRS: {
			data: {
				value: null,
				validator: Lang.isString
			}
		},

		EXTENDS: A.Base,

		prototype: {
			_endResult: null,

			_inPRE: false,

			_ulLevel: 0,

			initializer: function() {

			},

			convert: function(data) {
				var instance = this;

				if (data) {
					this.set('data', data);
				} else {
					data = this.get('data');
				}

				var node = A.config.doc.createElement('div');
				node.innerHTML = data;

				instance._handle(node);

				var endResult = instance._endResult.join('');

				instance._endResult = null;

				return endResult;
			},

			_isAllWS: function(node) {
				return node.isElementContentWhitespace || !(REGEX_NOT_WHITESPACE.test(node.data));
			},

			_isDataAvailable: function() {
				var instance = this;

				return instance._endResult && instance._endResult.length;
			},

			_isIgnorable: function(node) {
				var instance = this;

				var nodeType = node.nodeType;

				return (node.isElementContentWhitespace || nodeType == 8) ||
					((nodeType == 3) && instance._isAllWS(node));
			},

			_isLastItemNewLine: function(node) {
				var instance = this;

				var endResult = instance._endResult;

				return (endResult && REGEX_LASTCHAR_NEWLINE.test(endResult.slice(-1)));
			},

			_handle: function(node) {
				var instance = this;

				var child, children, data, i, listTagsIn, listTagsOut,
					length, stylesTagsIn, stylesTagsOut, pushTagList;

				if (!Lang.isArray(instance._endResult)) {
					instance._endResult = [];
				}

				children = node.childNodes;
				pushTagList = instance._pushTagList;
				length = children.length;

				for (i = 0; i < length; i++) {
					listTagsIn = [];
					listTagsOut = [];

					stylesTagsIn = [];
					stylesTagsOut = [];

					child = children[i];

					if (instance._isIgnorable(child) && !instance._inPRE) {
						continue;
					}

					instance._handleElementStart(child, listTagsIn, listTagsOut);
					instance._handleStyles(child, stylesTagsIn, stylesTagsOut);

					pushTagList.call(instance, listTagsIn);
					pushTagList.call(instance, stylesTagsIn);

					instance._handle(child);

					instance._handleElementEnd(child, listTagsIn, listTagsOut);

					pushTagList.call(instance, stylesTagsOut.reverse());
					pushTagList.call(instance, listTagsOut);
				}

				data = node.data;

				instance._handleData(data, node);
			},

			_handleData: function(data, element) {
				var instance = this;

				if (Lang.isValue(data)) {
					instance._endResult.push(data);
				}
			},

			_handleElementStart: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				var tagName = element.tagName;
				var params;

				if (tagName) {
					tagName = tagName.toLowerCase();

					if (tagName == TAG_PARAGRAPH) {
						instance._handleParagraph(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'br') {
						instance._handleBreak(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'a') {
						instance._handleLink(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'strong' || tagName == 'b') {
						instance._handleStrong(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'em' || tagName == 'i') {
						instance._handleEm(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'img') {
						instance._handleImage(element, listTagsIn, listTagsOut);
					}
					else if (tagName == TAG_UNORDERED_LIST) {
						instance._handleUnorderedList(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'li') {
						instance._handleListItem(element, listTagsIn, listTagsOut);
					}
					else if (tagName == TAG_ORDERED_LIST) {
						instance._handleOrderedList(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'hr') {
						instance._handleHr(element, listTagsIn, listTagsOut);
					}
					else if (tagName == TAG_PRE) {
						instance._handlePre(element, listTagsIn, listTagsOut);
					}
					else if ((params = REGEX_HEADER.exec(tagName))) {
						instance._handleHeader(element, listTagsIn, listTagsOut, params);
					}
					else if (tagName == 'th') {
						instance._handleTableHeader(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'tr') {
						instance._handleTableRow(element, listTagsIn, listTagsOut);
					}
					else if (tagName == 'td') {
						instance._handleTableCell(element, listTagsIn, listTagsOut);
					}
				}
			},

			_handleElementEnd: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				var tagName = element.tagName;

				if (tagName) {
					tagName = tagName.toLowerCase();
				}

				if (tagName == TAG_PARAGRAPH) {
					if (!instance._isLastItemNewLine()) {
						instance._endResult.push(NEW_LINE);
					}
				}
				else if (tagName == TAG_UNORDERED_LIST || tagName == TAG_ORDERED_LIST) {
					instance._ulLevel -= 1;

					if (!instance._isLastItemNewLine()) {
						instance._endResult.push(NEW_LINE);
					}
				}
				else if (tagName == TAG_PRE) {
					if (!instance._isLastItemNewLine()) {
						instance._endResult.push(NEW_LINE);
					}

					instance._inPRE = false;
				}
				else if (tagName == 'table') {
					listTagsOut.push(NEW_LINE);
				}
			},

			_handleBreak: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				if (instance._inPRE) {
					listTagsIn.push(NEW_LINE);
				}
				else {
					listTagsIn.push('\\\\');
				}
			},

			_handleEm: function(element, listTagsIn, listTagsOut) {
				listTagsIn.push(TAG_EMPHASIZE);
				listTagsOut.push(TAG_EMPHASIZE);
			},

			_handleHeader: function(element, listTagsIn, listTagsOut, params) {
				var instance = this;

				var res = new Array(parseInt(params[1], 10) + 1);
				res = res.join('=');

				if (instance._isDataAvailable() && !instance._isLastItemNewLine()) {
					listTagsIn.push(NEW_LINE);
				}

				listTagsIn.push(res, SPACE);
				listTagsOut.push(SPACE, res, NEW_LINE);
			},

			_handleHr: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				if (instance._isDataAvailable() && !instance._isLastItemNewLine()) {
					listTagsIn.push(NEW_LINE);
				}

				listTagsIn.push('----', NEW_LINE);
			},

			_handleImage: function(element, listTagsIn, listTagsOut) {
				var attrAlt = element.alt;
				var attrSrc = element.src;

				listTagsIn.push('{{', attrSrc);

				if (attrAlt) {
					listTagsIn.push('|', attrAlt);
				}

				listTagsOut.push('}}');
			},

			_handleLink: function(element, listTagsIn, listTagsOut) {
				var hrefAttribute = element.href;

				listTagsIn.push('[[', hrefAttribute, '|');

				listTagsOut.push(']]');
			},

			_handleListItem: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				var parentNode = element.parentNode;
				var tagName = parentNode.tagName.toLowerCase();
				var listItemTag = (tagName === TAG_UNORDERED_LIST) ?
					TAG_UNORDEREDLIST_ITEM : TAG_ORDEREDLIST_ITEM;

				var res = new Array(instance._ulLevel + 1);
				res = res.join(listItemTag);

				if (instance._isDataAvailable() && !instance._isLastItemNewLine()){
					listTagsIn.push(NEW_LINE);
				}

				listTagsIn.push(res, SPACE);
			},

			_handleOrderedList: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				instance._ulLevel += 1;
			},

			_handleParagraph: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				if (instance._isDataAvailable()) {
					var newLinesAtEnd = REGEX_LASTCHAR_NEWLINE.exec(instance._endResult.slice(-2).join(''));
					var count = newLinesAtEnd ? newLinesAtEnd[1].length : 0;

					while (count++ < 2) {
						listTagsIn.push(NEW_LINE);
					}
				}

				listTagsOut.push(NEW_LINE);
			},

			_handlePre: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				instance._inPRE = true;

				var endResult = instance._endResult;
				var data = element.innerHTML;

				if (instance._isDataAvailable() && !instance._isLastItemNewLine()) {
					endResult.push(NEW_LINE);
				}

				listTagsIn.push('{{{', NEW_LINE);

				listTagsOut.push('}}}', NEW_LINE);
			},

			_handleStrong: function(element, listTagsIn, listTagsOut) {
				listTagsIn.push(TAG_BOLD);
				listTagsOut.push(TAG_BOLD);
			},

			_handleStyles: function(element, stylesTagsIn, stylesTagsOut) {
				var style = element.style;

				if (style) {
					if (style.fontWeight.toLowerCase() == 'bold') {
						stylesTagsIn.push(TAG_BOLD);
						stylesTagsOut.push(TAG_BOLD);
					}

					if (style.fontStyle.toLowerCase() == 'italic') {
						stylesTagsIn.push(TAG_EMPHASIZE);
						stylesTagsOut.push(TAG_EMPHASIZE);
					}
				}
			},

			_handleTableCell: function(element, listTagsIn, listTagsOut) {
				listTagsIn.push('|');
			},

			_handleTableHeader: function(element, listTagsIn, listTagsOut) {
				listTagsIn.push('|', '=');
			},

			_handleTableRow: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				if (instance._isDataAvailable()) {
					listTagsIn.push(NEW_LINE);
				}

				listTagsOut.push('|');
			},

			_handleUnorderedList: function(element, listTagsIn, listTagsOut) {
				var instance = this;

				instance._ulLevel += 1;
			},

			_pushTagList: function(tagsList) {
				var instance = this;

				var endResult, i, length, tag;

				endResult = instance._endResult;
				length = tagsList.length;

				for (i = 0; i < length; i++) {
					tag = tagsList[i];

					endResult.push(tag);
				}
			}
		}
	}
);

A.HTML2CreoleConvertor = HTML2CreoleConvertor;

}, '@VERSION@' ,{requires:['aui-editor-base']});
