AUI.add('aui-editor-creole-plugin', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'creoleplugin',
	CREOLE_PLUGIN = 'creole',

	TPL_HTML_ELEMENTS = '(<[a-z][a-z0-9]*[^>]*>|</[a-z][a-z0-9]*>)',

	REGEX_HTML_ELEMENTS = new RegExp(TPL_HTML_ELEMENTS, 'gi');

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

				content = content.replace(REGEX_HTML_ELEMENTS, '');

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

			_parseCreoleCode: function(creoleCode) {
				var instance = this;

				var div = A.config.doc.createElement('div');

				instance._creole.parse(div, creoleCode);

				var data = div.innerHTML;

				return data;
			}
		}
	}
);

A.namespace('Plugin').EditorCreoleCode = EditorCreoleCode;

}, '@VERSION@' ,{requires:['aui-base','editor-base','aui-editor-html-creole','aui-editor-creole-parser']});
