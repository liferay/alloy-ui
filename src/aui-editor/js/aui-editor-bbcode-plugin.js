var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'bbcodeplugin',
	UBB_PLUGIN = 'bbcode',

	QUOTE = 'quote',

	CSS_QUOTE = getClassName(QUOTE),
	CSS_QUOTE_CONTENT = getClassName(QUOTE, 'content'),
	CSS_QUOTE_TITLE = getClassName(QUOTE, 'title'),

	TPL_HTML_GENERIC = '<{0}[^>]*>([\\s\\S]*?)</{0}>',
	TPL_HTML_STYLE =  '<(([a-z0-9]+)\\b[^>]*?style=("|\')[^:]*{0}\\s*:\\s*([^;"\']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>',
	TPL_HTML_TAGS = '(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)',
	TPL_QUOTE_CONTENT = '<div class="quote"><div class="quote-content">',
	TPL_QUOTE_TITLE_CONTENT = '<div class="quote-title">$1</div><div class="quote"><div class="quote-content">',
	TPL_QUOTE_CLOSING_TAG = '</div></div>',
	TPL_UBB_ATTRIBUTE = '\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]',
	TPL_UBB_GENERIC = '\\[({0}[^\\[]*)\\]([\\s\\S]*?)\\[\\/{0}\\]',

	HTML_UBB = [
		{
			convert: [
				['br']
			],
			regExp: '<{0}[^>]*>',
			output: '\n'
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
				['text-align']
			],
			regExp: TPL_HTML_STYLE,
			output: '<$1>[$4]$5[/$4]<$6>'
		},
		{
			convert: [
				['margin-left']
			],
			regExp: TPL_HTML_STYLE,
			output: function() {
				var html = '';
				var width = parseInt(arguments[3]);

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
				['blockquote']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[indent]$1[/indent]'
		},
		{
			convert: [
				['b'],
				['strong']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[b]$1[/b]'
		},
		{
			convert: [
				['i'],
				['em']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[i]$1[/i]'
		},
		{
			convert: [
				['u']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[u]$1[/u]'
		},
		{
			convert: [
				['s'],
				['strike']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[s]$1[/s]'
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
			output: '[center]$1[/center]'
		},
		{
			convert: [
				['ul']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[list]$1[/list]'
		},
		{
			convert: [
				['ol']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[list=1]$1[/list]'
		},
		{
			convert: [
				['li']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[*]$1'
		},
		{
			convert: [
				['code']
			],
			regExp: TPL_HTML_GENERIC,
			output: '[code]$1[/code]'
		},
		{
			convert: [
				['quote']
			],
			regExp: '<div\\b[^>]*class=("|\')_' + CSS_QUOTE + '\s*[^"\']*("|\')[^>]*>([\\s\\S]*?)</div>',
			output: '$3'
		},
		{
			convert: [
				['div']
			],
			regExp: TPL_HTML_GENERIC,
			output: '$1\n'
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
			output: '[b]$1[/b]\n'
		},
		{
			convert: [
				['p']
			],
			regExp: TPL_HTML_GENERIC,
			output: '$1\n\n'
		}
	],

	UBB_HTML = [
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
					tags: ['indent'],
					source: ['blockquote']
				},
				{
					tags: ['code'],
					source: ['code']
				}
			],
			regExp: TPL_UBB_GENERIC,
			output: '<{0}>$2</{0}>'
		},
		{
			convert: [
				['list']
			],
			regExp: TPL_UBB_GENERIC,
			output: function() {
				var html = '';

				if (arguments[1] == 'list=1') {
					html += '<ol>';
				}
				else {
					html += '<ul>';
				}

				var li = Lang.trim(arguments[2]).split('[*]');

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
					tags: ['font'],
					source: ['face']
				},
				{
					tags: ['size'],
					source: ['size']
				}
			],
			regExp: TPL_UBB_ATTRIBUTE,
			output: '<font {0}="$3">$4</font>'
		},
		{
			convert: [
				{
					tags: ['color'],
					source: ['color']
				}
			],
			regExp: TPL_UBB_ATTRIBUTE,
			output: '<span style="{0}: $3;">$4</span>'
		},
		{
			convert: [
				['img']
			],
			regExp: TPL_UBB_GENERIC,
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
			regExp: TPL_UBB_ATTRIBUTE,
			output: '<a href="{0}$3">$4</a>'
		},
		{
			convert: [
				['left'],
				['center'],
				['right']
			],
			regExp: TPL_UBB_GENERIC + '\n?',
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

var BBCodePlugin = A.Component.create(
		{
			NAME: NAME,

			NS: UBB_PLUGIN,

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

					instance.afterHostMethod('getContent', instance.getBBCode, instance);
					host.on('contentChange', instance._contentChange, instance);
				},

				getBBCode: function() {
					var instance = this;

					var host = instance.get('host');

					var html = '';

					html = host.constructor.prototype.getContent.apply(host, arguments);

					var wrapper = A.Node.create('<div>' + html + '</div>');

					var quote = null;

					while (quote = wrapper.all('div.' + CSS_QUOTE)) {
						if (!quote.size()) {
							break;
						}

						quote.each(
							function(node) {
								var instance = this;

								var content = null;
								var temp = node;

								do
								{
									if (temp) {
										content = temp;
									}

									temp = temp.one('div.' + CSS_QUOTE_CONTENT);
								}
								while (temp != null)

								var parent = content.get('parentNode');
								var title = parent.previous();

								var ubb = '[' + QUOTE;

								if (title && title.hasClass(CSS_QUOTE_TITLE)) {
									var titleHtml = title.html();

									titleHtml = titleHtml.replace(new RegExp(TPL_HTML_TAGS, 'ig'), '');

									ubb += '=' + (titleHtml.charAt(titleHtml.length - 1) == ':' ? titleHtml.substring(0, titleHtml.length - 1) : title.html());

									title.remove(true);
								}

								ubb += ']' +  content.html() + '[/' + QUOTE + ']';

								parent.html(ubb);

								parent.removeClass(QUOTE);
								parent.addClass('_' + QUOTE);
							},
							instance
						);
					}

					html = wrapper.html();

					html =  instance._parseTagExpressions(HTML_UBB, html);

					html = html.replace(new RegExp(TPL_HTML_TAGS, 'ig'), '');

					return new A.Do.AlterReturn(null, html);
				},

				getContentAsHtml: function() {
					var instance = this;

					var host = instance.get('host');

					var html = '';

					html = host.constructor.prototype.getContent.apply(host, arguments);

					return html;
				},

				_contentChange: function(event) {
					var instance = this;

					var host = instance.get('host');

					var html = event.newVal;

					html = html.replace(/\[quote=([^\]]*)\]/ig, TPL_QUOTE_CONTENT);
					html = html.replace(/\[quote\]/ig, TPL_QUOTE_TITLE_CONTENT);
					html = html.replace(/\[\/quote\]/ig, TPL_QUOTE_CLOSING_TAG);

					html = instance._parseTagExpressions(UBB_HTML, html);

					event.newVal = html;

					event.halt();
				},

				_parseTagExpressions: function(options, html) {
					var instance = this;

					for (var i = 0; i < options.length; i++) {
						for (var j = 0; j < options[i].convert.length; j++) {
							var tags = null;
							var output = options[i].output;

							if (isArray(options[i].convert[j])) {
								tags = options[i].convert[j]
							}
							else {
								tags = options[i].convert[j].tags

								if (isString(options[i].output)) {
									output = Lang.sub(options[i].output, options[i].convert[j].source);
								}
							}

							var regExp = Lang.sub(options[i].regExp, tags);

							html = html.replace(new RegExp(regExp, 'ig'), output);
						}
					}

					return html;
				}
			}
		}
	);

A.namespace('Plugin').BBCodePlugin = BBCodePlugin;