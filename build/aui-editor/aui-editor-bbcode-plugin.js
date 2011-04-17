AUI.add('aui-editor-bbcode-plugin', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,

	getClassName = A.getClassName,

	NAME = 'bbcodeplugin',
	BBCODE_PLUGIN = 'bbcode',

	QUOTE = 'quote',

	CSS_QUOTE = QUOTE,
	CSS_QUOTE_CONTENT = CSS_QUOTE + '-content',
	CSS_QUOTE_TITLE = CSS_QUOTE + '-title',

	TPL_BBCODE_ATTRIBUTE = '\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]',
	TPL_BBCODE_GENERIC = '\\[({0})\\]([\\s\\S]*?)\\[\\/{0}\\]',
	TPL_HTML_GENERIC = '<{0}(>|\\b[^>]*>)([\\s\\S]*?)</{0}>',
	TPL_HTML_STYLE =  '<(([a-z0-9]+)\\b[^>]*?style=("|\').*?{0}\\s*:\\s*([^;"\']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>',
	TPL_HTML_TAGS = '(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)',
	TPL_QUOTE_CONTENT = '<div class="' + CSS_QUOTE + '"><div class="' + CSS_QUOTE_CONTENT + '">',
	TPL_QUOTE_CLOSING_TAG = '</div></div>',
	TPL_QUOTE_TITLE_CONTENT = '<div class="' + CSS_QUOTE_TITLE + '">$1</div>' + TPL_QUOTE_CONTENT,

	REGEX_HTML_TAGS = new RegExp(TPL_HTML_TAGS, 'gi'),

	HTML_BBCODE = [
		{
			convert: [
				['br']
			],
			regExp: '<{0}[^>]*>',
			output: '\n'
		},
		{
			convert: [
				['&nbsp;']
			],
			regExp: '{0}',
			output: ' '
		},
		{
			convert: [
				{
					tags: ['font-family'],
					source: ['font']
				},
				{
					tags: ['font-size'],
					source: ['size']
				},
				{
					tags: ['[^a-z-]*color'],
					source: ['color']
				}
			],
			regExp: TPL_HTML_STYLE,
			output: '<$1>[{0}=$4]$5[/{0}]<$6>'
		},
		{
			convert: [
				{
					tags: ['font-style'],
					source: ['i']
				},
				{
					tags: ['font-weight'],
					source: ['b']
				}
			],
			regExp: TPL_HTML_STYLE,
			output: '<$1>[{0}]$5[/{0}]<$6>'
		},
		{
			convert: [
				['text-decoration']
			],
			regExp: TPL_HTML_STYLE,
			output: function() {
				var tags = '';

				var attr = arguments[4].toLowerCase();

				if (attr.indexOf('underline') != -1) {
					tags += '[u]';
				}
				else if (attr.indexOf('line-through') != -1) {
					tags += '[s]';
				}

				if (tags != '') {
					return '<' + arguments[1] + '>' + tags + arguments[5] + tags.replace('[', '[/') + '<' + arguments[6] + '>';
				}

				return arguments[0];
			}
		},
		{
			convert: [
				['margin-left']
			],
			regExp: TPL_HTML_STYLE,
			output: function() {
				var html = '';
				var width = parseInt(arguments[3], 10);

				if (!isNaN(width)) {
					var total = Math.floor(width / 40);

					for (var i = 0; i < total; i++) {
						html += '[indent]';
					}
				}

				html = html + arguments[5] + html.replace(/\[/g, '[/');

				return '<' + arguments[1] + '>' + html + '<' + arguments[6] + '>';
			}
		},
		{
			convert: [
				{
					tags: ['font', 'size'],
					source: ['size']
				},
				{
					tags: ['font', 'face'],
					source: ['font']
				}
			],
			regExp: '(<{0}\\b[^>]*{1}=("|\')([^"\']+)("|\')[^>]*>)([\\s\\S]*?)(</{0}>)',
			output: '$1[{0}=$3]$5[/{0}]$6'
		},
		{
			convert: [
				['text-align']
			],
			regExp: TPL_HTML_STYLE,
			output: '<$1>[$4]$5[/$4]<$6>'
		},
   		{
			convert: [
				['quote']
			],
			regExp: '<div\\b[^>]*class=("|\')([^"\']*?)_' + CSS_QUOTE + '[^"\']*("|\')[^>]*>([\\s\\S]*?)</div>',
			output: '$4'
		},
		{
			convert: [
				['span']
			],
			regExp: TPL_HTML_GENERIC,
			output: '$2'
		},
		{
			convert: [
				['blockquote']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[indent]$2[/indent]'
		},
		{
			convert: [
				['b'],
				['strong']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[b]$2[/b]'
		},
		{
			convert: [
				['i'],
				['em']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[i]$2[/i]'
		},
		{
			convert: [
				['u']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[u]$2[/u]'
		},
		{
			convert: [
				['s'],
				['strike']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[s]$2[/s]'
		},
		{
			convert: [
				['img']
			],
			regExp: '(<a[^>]*>)?<{0}\\b[^>]*src=("|\')([^"\']+)("|\')[^>]*>(</a>)?',
			output: '[img]$3[/img]'
		},
		{
			convert: [
				['a']
			],
			regExp: '<{0}\\b[^>]*href=("|\')mailto:([^"\']+)("|\')[^>]*>([\\s\\S]*?)</{0}>',
			output: '[email=$2]$4[/email]'
		},
		{
			convert: [
				['a']
			],
			regExp: '<{0}\\b[^>]*href=("|\')([^"\']+)("|\')[^>]*>([\\s\\S]*?)</{0}>',
			output: '[url=$2]$4[/url]'
		},
		{
			convert: [
				['center']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[center]$2[/center]'
		},
		{
			convert: [
				['ul']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[list]$2[/list]'
		},
		{
			convert: [
				['ol']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[list=1]$2[/list]'
		},
		{
			convert: [
				['li']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[*]$2'
		},
		{
			convert: [
				['code']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[code]$2[/code]'
		},
		{
			convert: [
				['div']
			],
			regExp: TPL_HTML_GENERIC,
			output: '$2\n'
		},
		{
			convert: [
				['h1'],
				['h2'],
				['h3'],
				['h4'],
				['h5'],
				['h6']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[b]$2[/b]\n'
		},
		{
			convert: [
				['p']
			],
			regExp: TPL_HTML_GENERIC,
			output: '\n$2\n'
		},
		{
			convert: [
				{
					tags: ['list', 'left|center|right'],
					source: ['list']
				}
			],
			regExp: '(\\[{0}[^\\]]*\\])\\s*\\[({1})\\]([\\s\\S]*?)\\[/\\2\\]\\s*\\[/{0}\\]',
			output: '[$2]$1$3[/{0}][/$2]'
		}
	],

	BBCODE_HTML = [
		{
			convert: [
				{
					tags: ['b'],
					source: ['b']
				},
				{
					tags: ['i'],
					source: ['i']
				},
				{
					tags: ['u'],
					source: ['u']
				},
				{
					tags: ['s'],
					source: ['s']
				},
				{
					tags: ['code'],
					source: ['code']
				}
			],
			regExp: TPL_BBCODE_GENERIC,
			output: '<{0}>$2</{0}>'
		},
		{
			convert: [
				{
					tags: ['color'],
					source: ['color']
				}
			],
			regExp: TPL_BBCODE_ATTRIBUTE,
			output: '<span style="{0}: $3;">$4</span>'
		},
		{
			convert: [
				{
					tags: ['font'],
					source: ['face']
				},
				{
					tags: ['size'],
					source: ['size']
				}
			],
			regExp: TPL_BBCODE_ATTRIBUTE,
			output: '<font {0}="$3">$4</font>'
		},
		{
			convert: [
				['img']
			],
			regExp: TPL_BBCODE_GENERIC,
			output: '<img src="$2" alt="" />'
		},
		{
			convert: [
				{
					tags: ['email'],
					source: ['mailto:']
				},
				{
					tags: ['url'],
					source: ['']
				}
			],
			regExp: TPL_BBCODE_ATTRIBUTE,
			output: '<a href="{0}$3">$4</a>'
		},
		{
			convert: [
				['list']
			],
			regExp: '\\[({0}(=1)?)]([\\s\\S]*?)\\[\\/{0}\\]',
			output: function() {
				var html = '';

				if (arguments[1] == 'list=1') {
					html += '<ol>';
				}
				else {
					html += '<ul>';
				}

				var li = Lang.trim(arguments[3]).split('[*]');

				for (var i = 1; i < li.length; i++) {
					html += '<li>' + li[i] + '</li>';
				}

				if (arguments[1] == 'list=1') {
					html += '</ol>';
				}
				else {
					html += '</ul>';
				}

				return html;
			}
		},
		{
			convert: [
				{
					tags: ['indent'],
					source: ['blockquote']
				}
			],
			regExp: TPL_BBCODE_GENERIC,
			output: '<{0}>$2</{0}>'
		},
		{
			convert: [
				['left'],
				['center'],
				['right']
			],
			regExp: TPL_BBCODE_GENERIC + '\n?',
			output: '<div style="text-align: $1;">$2</div>'
		},
		{
			convert: [
				['\n']
			],
			regExp: '{0}',
			output: '<br />'
		}
	];

var GROUPS = {};

GROUPS[QUOTE] = {
	children: [
		{
			icon: 'quote',
			_titleKey: 'QUOTE'
		}
	]
};

A.mix(
	A.Plugin.ExecCommand.COMMANDS,
	{
		quote: function(cmd, val) {
			var instance = this;

			var host = instance.get('host');

			var output = TPL_QUOTE_CONTENT + '{0}' + TPL_QUOTE_CLOSING_TAG;

			host.execCommand('wraphtml', output);
			host.focus();
		}
	}
);

if (!YUI.AUI.defaults.EditorToolbar) {
	YUI.AUI.defaults.EditorToolbar = {
		STRINGS: {}
	};
}

A.mix(
	YUI.AUI.defaults.EditorToolbar.STRINGS,
	{
		QUOTE: 'Quote'
	}
);

var EditorBBCode = A.Component.create(
	{
		NAME: NAME,

		NS: BBCODE_PLUGIN,

		EXTENDS: A.Plugin.Base,

		ATTRS: {
			host: {
				value: false
			}
		},

		prototype: {
			initializer: function() {
				var instance = this;

				var host = instance.get('host');

				host.addGroupType(QUOTE, GROUPS[QUOTE]);

				instance.afterHostMethod('getContent', instance.getBBCode, instance);
				host.on('contentChange', instance._contentChange, instance);
			},

			getBBCode: function() {
				var instance = this;

				var host = instance.get('host');
				var frame = host.getInstance();

				var wrapper = frame.one('body').cloneNode(true);
				var quote;

				var quoteIterator = function(item, index, collection) {
					var content;
					var temp = item;

					do {
						if (temp) {
							content = temp;
						}

						temp = temp.one('div.' + CSS_QUOTE_CONTENT);
					}
					while (temp);

					var parent = content.get('parentNode');

					if (parent.hasClass(QUOTE)) {
						var title = parent.previous();

						var bbcode = '[' + QUOTE;

						if (title && title.hasClass(CSS_QUOTE_TITLE)) {
							var titleHtml = title.get('innerHTML');

							titleHtml = titleHtml.replace(REGEX_HTML_TAGS, '');

							bbcode += '=' + (titleHtml.charAt(titleHtml.length - 1) == ':' ? titleHtml.substring(0, titleHtml.length - 1) : title.get('innerHTML'));

							title.remove(true);
						}

						bbcode += ']' +  content.get('innerHTML') + '[/' + QUOTE + ']\n';

						parent.set('innerHTML', bbcode);

						parent.removeClass(QUOTE);
						parent.addClass('_' + QUOTE);
					}
				};

				while (quote = wrapper.all('div.' + CSS_QUOTE)) {
					if (!quote.size()) {
						break;
					}

					quote.each(quoteIterator);
				}

				html = wrapper.get('innerHTML');

				html =  instance._parseTagExpressions(HTML_BBCODE, html);

				html = html.replace(REGEX_HTML_TAGS, '');

				return new A.Do.AlterReturn(null, html);
			},

			getContentAsHtml: function() {
				var instance = this;

				var host = instance.get('host');

				return host.constructor.prototype.getContent.apply(host, arguments);
			},

			setContentAsBBCode: function(bbcode) {
				var instance = this;

				var host = instance.get('host');

				host.set('content', bbcode);
			},

			_contentChange: function(event) {
				var instance = this;

				event.newVal = instance._parseBBCode(event.newVal);

				event.stopImmediatePropagation();
			},

			_parseBBCode: function(bbcode) {
				var instance = this;

				var html = bbcode;

				html = html.replace(/\[quote=([^\]]*)\]/gi, TPL_QUOTE_TITLE_CONTENT);
				html = html.replace(/\[quote\]/gi, TPL_QUOTE_CONTENT);
				html = html.replace(/\[\/quote\]\n?/gi, TPL_QUOTE_CLOSING_TAG);

				html = instance._parseTagExpressions(BBCODE_HTML, html);

				return html;
			},

			_parseTagExpressions: function(options, html) {
				var instance = this;

				var option;
				var convert;
				var convertItem;
				var convertLength;
				var tags;

				for (var i = 0; i < options.length; i++) {
					option = options[i];
					convert = option.convert;
					convertLength = convert.length;

					for (var j = 0; j < convertLength; j++) {
						var output = option.output;

						convertItem = convert[j];

						if (isArray(convertItem)) {
							tags = convertItem;
						}
						else {
							tags = convertItem.tags;

							if (isString(output)) {
								output = Lang.sub(output, convertItem.source);
							}
						}

						var regExp = Lang.sub(option.regExp, tags);

						html = html.replace(new RegExp(regExp, 'gi'), output);
					}
				}

				return html;
			}
		}
	}
);

A.namespace('Plugin').EditorBBCode = EditorBBCode;

}, '@VERSION@' ,{requires:['aui-base','editor-base']});
