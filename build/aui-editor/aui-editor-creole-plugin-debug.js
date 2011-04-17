AUI.add('aui-editor-creole-plugin', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,

	getClassName = A.getClassName,

	NAME = 'creoleplugin',
	CREOLE_PLUGIN = 'creole',

	REGEX_BOLD = /<(\/?)strong>/gi,
	REGEX_ITALIC = /<(\/?)em>/gi,

	SPAN_TAG_END = '</span>';

if (!YUI.AUI.defaults.EditorToolbar) {
	YUI.AUI.defaults.EditorToolbar = {
		STRINGS: {}
	};
}

var EditorCreoleCode = A.Component.create(
	{
		NAME: NAME,

		NS: CREOLE_PLUGIN,

		EXTENDS: A.Plugin.Base,

		ATTRS: {
			interwiki: {
				value: {
					WikiCreole: 'http://www.wikicreole.org/wiki/',
					Wikipedia: 'http://en.wikipedia.org/wiki/'
				}
			},

			host: {
				value: false
			},

			linkFormat: {
				value: ''
			},

			strict: {
				value: false
			}
		},

		prototype: {
			html2creole: null,

			initializer: function() {
				var instance = this;

				this._creole = new A.CreoleParser({
					forIE: A.UA.os === 'windows',
					interwiki: this.get('interwiki'),
					linkFormat: this.get('linkFormat'),
					strict: this.get('strict')
				});

				var host = instance.get('host');

				instance.afterHostMethod('getContent', instance.getCreoleCode, instance);
				host.on('contentChange', instance._contentChange, instance);
			},

			_convertHTML2Creole: function(data) {
				var instance = this;

				if (!instance.html2creole) {
					instance.html2creole = new A.HTML2CreoleConvertor({
						data: data
					});
				} else {
					instance.html2creole.set('data', data);
				}

				return instance.html2creole.convert();
			},

			getCreoleCode: function() {
				var instance = this;

				var content = A.Do.originalRetVal;

				content = instance._convertHTML2Creole(content);

				return new A.Do.AlterReturn(null, content);
			},

			getContentAsHtml: function() {
				var instance = this;

				var host = instance.get('host');

				return host.constructor.prototype.getContent.apply(host, arguments);
			},

			setContentAsCreoleCode: function(creoleCode) {
				var instance = this;

				var host = instance.get('host');

				host.set('content', creoleCode);
			},

			_contentChange: function(event) {
				var instance = this;

				event.newVal = instance._parseCreoleCode(event.newVal);

				event.stopImmediatePropagation();
			},

			_normalizeParsedData: function(data){
				var instance = this;

				if (A.UA.gecko) {
					data = instance._normalizeParsedDataGecko(data);
				}
				else if (A.UA.webkit) {
					data = instance._normalizeParsedDataWebKit(data);
				}

				return data;
			},

			_normalizeParsedDataGecko: function(data) {
				// Mozilla stores text which is both bold and italic in one span element.
				// For simplicity we will ignore that for now and we will create always two span elements.
				data = data.replace(REGEX_BOLD, function(str, p1, offset, s) {
					if (!p1) {
						return '<span style="font-weight:bold;">';
					}
					else {
						return SPAN_TAG_END;
					}
				});

				data = data.replace(REGEX_ITALIC, function(str, p1, offset, s) {
					if (!p1) {
						return '<span style="font-style:italic;">';
					}
					else {
						return SPAN_TAG_END;
					}
				});

				return data;
			},

			_normalizeParsedDataWebKit: function(data) {
				data = data.replace(REGEX_BOLD, '<$1b>');
				data = data.replace(REGEX_ITALIC, '<$1i>');

				return data;
			},

			_parseCreoleCode: function(creoleCode) {
				var instance = this;

				var div = A.config.doc.createElement('div');

				instance._creole.parse(div, creoleCode);

				var data = div.innerHTML;

				data = instance._normalizeParsedData(data);

				return data;
			}
		}
	}
);

A.namespace('Plugin').EditorCreoleCode = EditorCreoleCode;

}, '@VERSION@' ,{requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']});
