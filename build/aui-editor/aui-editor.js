AUI.add('aui-editor-tools-plugin', function(A) {
var Lang = A.Lang,

	JUSTIFY = 'justify',

	BLOCK_TAGS = {
		div: true,
		h1: true,
		h2: true,
		h3: true,
		h4: true,
		h5: true,
		h6: true,
		p: true
	},

	IGNORE_TAGS = {
		br: true
	},

	ITEM_TAGS = {
		li: true
	},

	TPL_JUSTIFY = '<div style="text-align: {0};">{1}</div>';

var EditorTools = {};

A.mix(
	A.Plugin.ExecCommand.COMMANDS,
	{
		justify: function(cmd, val) {
			var instance = this;

			var host = instance.get('host');
			var frame = host.getInstance();

			var selection = new frame.Selection();
			var items = selection.getSelected();
			var insertHtml = false;

			if (selection.isCollapsed || !items.size()) {
				var anchorTextNode = selection.anchorTextNode;

				items = [anchorTextNode];

				insertHtml = true;
			}

			items.each(
				function(item, index, collection) {
					var tagName = item.get('tagName');
					var parent = item.ancestor();

					var wrapper = null;

					if (tagName) {
						tagName = tagName.toLowerCase();
					}

					if (IGNORE_TAGS[tagName]) {
						return;
					}

					if (tagName == 'font') {
						var tempNode = item.get('parentNode');

						if (!tempNode.test('body')) {
							item = tempNode;

							tagName = item.get('tagName').toLowerCase();
						}
					}

					var parent = item.get('parentNode');

					var wrapper = null;

					if (!item.test('body') && item.getComputedStyle('textAlign') == val) {
						return;
					}

					if (BLOCK_TAGS[tagName] || item.getComputedStyle('display') == 'block') {
						wrapper = item;
					}
					else if (!parent.get('childNodes').item(1) || ITEM_TAGS[tagName]) {
						tagName = parent.get('tagName').toLowerCase();

						if (BLOCK_TAGS[tagName] || parent.getComputedStyle('display') == 'block') {
							wrapper = parent;
						}
					}
					else {
						if (insertHtml) {
							host.execCommand('inserthtml', Lang.sub(TPL_JUSTIFY, [val, frame.Selection.CURSOR]));

							selection.focusCursor(true, true);

							return;
						}
						else {
							wrapper = A.Node.create(Lang.sub(TPL_JUSTIFY, [val, '']));

							parent.insert(wrapper, item);

							wrapper.append(item);
						}
					}

					if (wrapper) {
						wrapper.setStyle('textAlign', val);
					}
				}
			);
		},

		justifycenter: function() {
			var instance = this;

			return instance.get('host').execCommand(JUSTIFY, 'center');
		},

		justifyleft: function() {
			var instance = this;

			return instance.get('host').execCommand(JUSTIFY, 'left');
		},

		justifyright: function() {
			var instance = this;

			return instance.get('host').execCommand(JUSTIFY, 'right');
		},

		subscript: function() {
			var instance = this;

			return instance.get('host').execCommand('wrap', 'sub');
		},

		superscript: function() {
			var instance = this;

			return instance.get('host').execCommand('wrap', 'sup');
		},

		wraphtml: function(cmd, val) {
			var instance = this;

			var host = instance.get('host');
			var frame = host.getInstance();

			var selection = new frame.Selection();
			var items = selection.getSelected();

			if (!selection.isCollapsed && items.size()) {
				items.each(
					function(item, index, collection) {
						var parent = item.ancestor();

						var wrapper = A.Node.create(val);

						if (wrapper.html() != '') {
							if (wrapper.html() == '{0}') {
								wrapper.html('');
							}
							else {
								instance._findInsert(wrapper);
							}
						}

						parent.insert(wrapper, item);

						wrapper.append(item);
					}
				);
			}
			else {
				host.execCommand('inserthtml', Lang.sub(val, [frame.Selection.CURSOR]));

				if (val.indexOf('{0}') != -1) {
					selection.focusCursor(true, true);
				}
			}
		},

		_findInsert: function(item) {
			var instance = this;

			var found = null;

			var childNodes = item.get('childNodes');

			childNodes.some(
				function(item, index, collection) {
					if (item.get('innerHTML') == '{0}') {
						found.html('');

						found = item;

						return true;
					}

					return instance._findInsert(item);
				}
			);

			if (found) {
				wrapper = found;

				return true;
			}

			return false;
		}
	}
);

A.Plugin.EditorTools = EditorTools;

}, '@VERSION@' ,{requires:['aui-base','editor-base']});

AUI.add('aui-editor-menu-plugin', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'editormenu',
	NAME_PLUGIN = 'editormenuplugin',

	NS_EDITORMENU = 'menu',

	CONTENT = 'content',

	CSS_MENU_CONTENT_LIST = getClassName(NAME, CONTENT, 'list'),
	CSS_MENU_CONTENT_TEXT = getClassName(NAME, CONTENT, 'text'),
	CSS_MENU_CONTENT_ITEM = getClassName(NAME, CONTENT, 'item'),

	TPL_TAG_EMPTY = '<{1}{2}>{0}</{1}>',

	TPL_MENU_CONTENT_ITEM = '<li class="' + CSS_MENU_CONTENT_ITEM + '">' + TPL_TAG_EMPTY + '</li>',
	TPL_MENU_CONTENT_LIST = '<ul class="' + CSS_MENU_CONTENT_LIST + '"></ul>',
	TPL_MENU_CONTENT_TEXT = '<li class="' + CSS_MENU_CONTENT_TEXT + '"><span>{0}</span></li>';

var EditorMenu = A.Component.create(
	{
		NAME: NAME,

		EXTENDS: A.OverlayContext,

		ATTRS: {
			headerContent: {
				value: '',
				setter: function(value) {
					var instance = this;

					instance._headerContent = value;

					return '';
				}
			},

			host: {
				value: false
			},

			items: {
				value: null
			}
		},

		prototype: {
			renderUI: function() {
				var instance = this;

				EditorMenu.superclass.renderUI.apply(instance, arguments);

				var host = instance.get('host');

				var	contentBox = instance.get('contentBox');
				var headerContent = instance._headerContent;
				var items = instance.get('items');

				var menuList = A.Node.create(TPL_MENU_CONTENT_LIST);

				A.each(
					items,
					function(item, index, collection) {
						var output = '';

						if (isString(item)) {
							output += Lang.sub(TPL_MENU_CONTENT_TEXT, [item]);
						}
						else {
							var attr = instance._generateTagAttr(item);

							output += Lang.sub(TPL_MENU_CONTENT_ITEM, [item.label, item.tag, attr]);
						}

						var node = A.Node.create(output);

						node.setData(NAME, item);

						menuList.append(node);
					}
				);

				var panel = new A.Panel(
					{
						collapsible: false,
						headerContent: headerContent,
						icons: [
							{
								icon: 'close',
								handler: {
									fn: instance.hide,
									context: instance
								}
							}
						]
					}
				).render(contentBox);

				panel.bodyNode.append(menuList);

				instance._menuList = menuList;
			},

			bindUI: function() {
				var instance = this;

				EditorMenu.superclass.bindUI.apply(instance, arguments);

				instance._menuList.delegate('click', instance._onMenuListItemClick, '.' + CSS_MENU_CONTENT_ITEM, instance);
			},

			_generateTagAttr: function(obj) {
				var instance = this;

				var buffer = [];

				var output = '';
				var attributes = obj.attributes;
				var styles = obj.styles;

				if (attributes) {
					for (var i in attributes) {
						buffer.push(' ' + i + '="' + attributes[i] + '"');
					}
				}

				if (styles) {
					buffer = [' style="'];

					for (var i in styles) {
						buffer.push(i + ': ' + styles[i] + ';');
					}

					buffer.push('"');
				}

				return buffer.join('');
			},

			_onMenuListItemClick: function(event) {
				var instance = this;

				var listItem = event.currentTarget;
				var	config = listItem.getData(NAME);

				var attr = instance._generateTagAttr(config);
				var output = Lang.sub(TPL_TAG_EMPTY, ['{0}', config.tag, attr]);

				var host = instance.get('host');

				host.execCommand('wraphtml', output);
				host.focus();

				instance.hide();
			},

			_uiSetHeight: function(val) {
				var instance = this;

				var	boundingBox = instance.get('boundingBox');
				var menuList = instance._menuList;

				boundingBox.setStyle('height', 'auto');

				menuList.setStyle('height', val);
			},

			_uiSetWidth: function(val) {
				var instance = this;

				var	boundingBox = instance.get('boundingBox');
				var menuList = instance._menuList;

				boundingBox.setStyle('width', 'auto');

				menuList.setStyle('width', val);
			}
		}
	}
);

var EditorMenuPlugin = A.Component.create(
	{
		EXTENDS: A.Plugin.Base,

		NAME: NAME_PLUGIN,

		NS: NS_EDITORMENU,

		prototype: {
			add: function(config) {
				var instance = this;

				var host = instance.get('host');

				return new EditorMenu(
					A.mix(
						{
							host: host
						},
						config
					)
				).render();
			}
		}
	}
);

A.namespace('Plugin').EditorMenu = EditorMenuPlugin;

}, '@VERSION@' ,{requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']});

AUI.add('aui-editor-toolbar-plugin', function(A) {
var Lang = A.Lang,
	isFunction = Lang.isFunction,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'editortoolbar',
	TOOLBAR_PLUGIN = 'toolbar',

	ALIGNMENT = 'alignment',
	COLOR = 'color',
	CONTENT = 'content',
	FONT = 'font',
	INDENT = 'indent',
	INPUT = 'input',
	INSERT = 'insert',
	INSERTIMAGE = 'insertimage',
	LIST = 'list',
	MOUSEOUT = 'mouseout',
	SELECT = 'select',
	SOURCE = 'source',
	STYLES = 'styles',
	SUBSCRIPT = 'subscript',
	TEXT = 'text',

	CMD_IGNORE = {
		backcolor: true,
		forecolor: true,
		format: true,
		insertimage: true,
		source: true,
		styles: true
	},

	CMD_FORMAT = [
		'b',
		'big',
		'font',
		'em',
		'i',
		'small',
		's',
		'strike',
		'strong',
		'sub',
		'sup',
		'u'
	],

	CSS_BUTTON_HOLDER = getClassName('button', 'holder'),
	CSS_FIELD_INPUT = getClassName('field', INPUT),
	CSS_FIELD_INPUT_TEXT = getClassName('field', INPUT, 'text'),
	CSS_FIELD_LABEL = getClassName('field', 'label'),
	CSS_FIELD_NUMERIC = getClassName('field', 'numeric'),
	CSS_INSERTIMAGE = getClassName(NAME, INSERTIMAGE),
	CSS_SELECT_FONTNAME = getClassName(NAME, SELECT, 'fontname'),
	CSS_SELECT_FONTSIZE = getClassName(NAME, SELECT, 'fontsize'),
	CSS_SIZE_SEPARATOR = getClassName(NAME, 'size', 'separator'),
	CSS_SOURCE_TEXTAREA = getClassName(NAME, SOURCE, 'textarea'),
	CSS_STATE_ACTIVE = getClassName('state', 'active'),
	CSS_TOOLBAR = getClassName(NAME),
	CSS_TOOLBAR_CONTENT = getClassName(NAME, CONTENT),

	TPL_INSERTIMAGE_HREF = '<a></a>',
	TPL_INSERTIMAGE_IMG = '<img />',

	TPL_SOURCE_TEXTAREA = '<textarea class="' + CSS_SOURCE_TEXTAREA + '"></textarea>',

	TPL_TOOLBAR = '<div class="' + CSS_TOOLBAR + '"><div class="' + CSS_TOOLBAR_CONTENT + '"></div></div>',

	TPL_TOOLBAR_BUTTON_HOLDER = '<div class="' + CSS_BUTTON_HOLDER + '"></div>',

	TPL_TOOLBAR_FONTNAME = '<select class="' + CSS_SELECT_FONTNAME + '">{0}</select>',

	TPL_TOOLBAR_FONTNAME_OPTION = '<option selected="selected"></option>' +
								'<option>Arial</option>' +
								'<option>Arial Black</option>' +
								'<option>Comic Sans MS</option>' +
								'<option>Courier New</option>' +
								'<option>Lucida Console</option>' +
								'<option>Tahoma</option>' +
								'<option>Times New Roman</option>' +
								'<option>Trebuchet MS</option>' +
								'<option>Verdana</option>',

	TPL_TOOLBAR_FONTSIZE = '<select class="' + CSS_SELECT_FONTSIZE + '">{0}</select>',

	TPL_TOOLBAR_FONTSIZE_OPTION = '<option selected="selected"></option>' +
								'<option value="1">10</option>' +
								'<option value="2">13</option>' +
								'<option value="3">16</option>' +
								'<option value="4">18</option>' +
								'<option value="5">24</option>' +
								'<option value="6">32</option>' +
								'<option value="7">48</option>',

	TPL_TOOLBAR_SIZE_SEPARATOR = '<span class="' + CSS_SIZE_SEPARATOR + '">x</span>';

var EditorToolbar = A.Component.create(
	{
		NAME: NAME,

		NS: TOOLBAR_PLUGIN,

		EXTENDS: A.Plugin.Base,

		ATTRS: {
			groups: {
				value: [
					{
						type: TEXT
					},
					{
						type: ALIGNMENT
					},
					{
						type: INDENT
					},
					{
						type: LIST
					}
				]
			}
		},

		prototype: {
			initializer: function() {
				var instance = this;

				var host = instance.get('host');
				var container = host.frame.get('container');
				var groups = instance.get('groups');

				var boundingBox = A.Node.create(TPL_TOOLBAR);
				var contentBox = boundingBox.one('.' + CSS_TOOLBAR_CONTENT);

				container.placeBefore(boundingBox);

				var attrs = {
					boundingBox: boundingBox,
					contentBox: contentBox
				};

				var toolbars = [];

				instance.on(
					'buttonitem:click',
					function(event) {
						var instance = this;

						var cmds = event.target.get('icon').split('-');

						if (!CMD_IGNORE[cmds[0]]) {
							instance.execCommand(cmds[0], (cmds[1] ? cmds[1] : ''));
							instance.focus();
						}
					},
					host
				);

				for (var i = 0; i < groups.length; i++) {
					var group = groups[i];
					var groupType = GROUPS[group.type];
					var toolbar;

					var children = [];

					for (var j = 0; j < groupType.children.length; j++) {
						if (!groupType.children[j].select) {
							children.push(groupType.children[j]);
						}
					}

					if (children.length > 0) {
						toolbar = new A.Toolbar(
							A.merge(
								groupType.config,
								group.toolbar,
								{
									children: children
								}
							)
						).render(contentBox);

						toolbar.addTarget(instance);

						toolbars.push(toolbar);
					}

					var generate = groupType.generate;

					if (generate && isFunction(generate.init)) {
						generate.init.call(instance, host, attrs);
					}

					for (var j = 0; j < groupType.children.length; j++) {
						var item = groupType.children[j];
						var icon = item.icon;

						if (generate && isFunction(generate[icon])) {
							var config = (group.config ? group.config[icon] : null);

							attrs.button = (item.select || !toolbar ? null : toolbar.item(j));

							generate[icon].call(instance, host, attrs, config);
						}
					}
				}

				attrs.toolbars = toolbars;
			},

			_updateToolbar: function(event, attrs) {
				var instance = this;

				if (event.changedNode) {
					var cmds = event.commands;
					var toolbars = attrs.toolbars;

					var toolbarIterator = function(item, index, collection) {
						var state = !!(cmds[item.get('icon')]);

						item.StateInteraction.set('active', state);
					};

					if (toolbars) {
						for (var i = 0; i < toolbars.length; i++) {
							toolbars[i].each(toolbarIterator);
						}
					}

					var fontName = event.fontFamily;
					var fontNameOptions = attrs._fontNameOptions;
					var fontSize = event.fontSize;
					var fontSizeOptions = attrs._fontSizeOptions;

					if (fontNameOptions) {
						fontNameOptions.item(0).set('selected', true);

						fontNameOptions.each(
							function(item, index, collection) {
								var val = item.get('value').toLowerCase();

								if (val === fontName.toLowerCase()) {
									item.set('selected', true);
								}
							}
						);
					}

					if (fontSizeOptions) {
						fontSize = fontSize.replace('px', '');

						fontSizeOptions.item(0).set('selected', true);

						fontSizeOptions.each(
							function(item, index, collection) {
								var val = item.get('value').toLowerCase();
								var txt = item.get('text');

								if (txt === fontSize) {
									item.set('selected', true);
								}
							}
						);
					}
				}
			}
		}
	}
);

EditorToolbar.generateOverlay = function(trigger, config) {
	var overlay = new A.OverlayContext(
		A.merge(
			{
				align: {
					node: trigger,
					points: [ 'tl', 'bl' ]
				},
				hideOn: 'click',
				showOn: 'click',
				trigger: trigger
			},
			config
		)
	).render();

	return overlay;
};

EditorToolbar.generateColorPicker = function(editor, attrs, config, cmd) {
	var button = attrs.button;
	var boundingBox = button.get('boundingBox');

	var colorPicker = new A.ColorPicker(
		A.merge(
			{
				align: {
					node: boundingBox,
					points: ['tl', 'bl']
				},
				trigger: boundingBox
			},
			config
		)
	);

	if (config && config.plugins) {
		for (var i = 0; i < config.plugins.length; i++) {
			colorPicker.plug(config.plugins[i], config);
		}
	}

	colorPicker.render(A.getBody());

	colorPicker.on(
		'colorChange',
		function(event) {
			var instance = this;

			var rgb = colorPicker.get('rgb');

			editor.execCommand(cmd, rgb.hex);
			editor.focus();
		}
	);
};

EditorToolbar.STRINGS = {
	ALIGN: 'Align',
	ALIGN_BLOCK: 'Block',
	ALIGN_LEFT: 'Left',
	ALIGN_INLINE: 'Inline',
	ALIGN_RIGHT: 'Right',
	BACKCOLOR: 'Background Color',
	BOLD: 'Bold',
	BORDER: 'Border',
	CREATE_LINK: 'Create Link',
	DESCRIPTION: 'Description',
	FORECOLOR: 'Foreground Color',
	IMAGE_URL: 'Image URL',
	INDENT: 'Indent',
	INSERT: 'Insert',
	INSERT_IMAGE: 'Insert Image',
	INSERT_ORDERED_LIST: 'Insert Numbered List',
	INSERT_UNORDERED_LIST: 'Insert Bulleted List',
	ITALIC: 'Italic',
	JUSTIFY_LEFT: 'Justify Left',
	JUSTIFY_CENTER: 'Justify Center',
	JUSTIFY_RIGHT: 'Justify Right',
	LINK_URL: 'Link URL',
	OPEN_IN_NEW_WINDOW: 'Open in new window',
	OUTDENT: 'Outdent',
	PADDING: 'Padding',
	REMOVE_FORMAT: 'Format Source',
	SIZE: 'Size',
	SOURCE: 'Source',
	SUBSCRIPT: 'Subscript',
	SUPERSCRIPT: 'Superscript',
	LINE_THROUGH: 'Line Through',
	UNDERLINE: 'Underline'
};

GROUPS = {};

GROUPS[ALIGNMENT] = {
	children: [
		{
			icon: 'justifyleft',
			title: EditorToolbar.STRINGS.JUSTIFY_LEFT
		},
		{
			icon: 'justifycenter',
			title: EditorToolbar.STRINGS.JUSTIFY_CENTER
		},
		{
			icon: 'justifyright',
			title: EditorToolbar.STRINGS.JUSTIFY_RIGHT
		}
	]
};

GROUPS[COLOR] = {
	children: [
		{
			icon: 'forecolor',
			title: EditorToolbar.STRINGS.FORECOLOR
		},
		{
			icon: 'backcolor',
			title: EditorToolbar.STRINGS.BACKCOLOR
		}
	],
	generate: {
		forecolor: function(editor, attrs, config) {
			var instance = this;

			EditorToolbar.generateColorPicker(editor, attrs, config, 'forecolor');
		},

		backcolor: function(editor, attrs, config) {
			var instance = this;

			EditorToolbar.generateColorPicker(editor, attrs, config, 'backcolor');
		}
	}
};

GROUPS[FONT] = {
	children: [
		{
			icon: 'fontname',
			select: true
		},
		{
			icon: 'fontsize',
			select: true
		}
	],

	generate: {
		init: function(editor, attrs) {
			var instance = this;

			var contentBox = attrs.contentBox;

			A.delegate(
				'change',
				function(event) {
					var instance = this;

					var target = event.currentTarget;
					var css = target.get('className');
					var cmd = css.substring(css.lastIndexOf('-') + 1);
					var val = target.get('value');

					editor.execCommand(cmd, val);
					editor.focus();
				},
				contentBox,
				'select'
			);

			editor.after(
				'nodeChange',
				function(event) {
					var instance = this;

					switch (event.changedType) {
						case 'keyup':
						case 'mousedown':
							instance._updateToolbar(event, attrs);
						break;
					}
				},
				instance
			);
		},

		fontname: function(editor, attrs, config) {
			var instance = this;

			var contentBox = attrs.contentBox;

			var tpl;
			var data = [TPL_TOOLBAR_FONTNAME_OPTION];

			if (config && config.optionHtml) {
				data[0] = config.optionHtml;
			}

			tpl = Lang.sub(TPL_TOOLBAR_FONTNAME, data);

			contentBox.append(tpl);

			var options = contentBox.all('.' + CSS_SELECT_FONTNAME + ' option');

			attrs._fontNameOptions = options;
		},

		fontsize: function(editor, attrs, config) {
			var instance = this;

			var contentBox = attrs.contentBox;

			var tpl;
			var data = [TPL_TOOLBAR_FONTSIZE_OPTION];

			if (config && config.optionHtml) {
				data[0] = config.optionHtml;
			}

			tpl = Lang.sub(TPL_TOOLBAR_FONTSIZE, data);

			contentBox.append(tpl);

			var options = contentBox.all('.' + CSS_SELECT_FONTSIZE + ' option');

			attrs._fontSizeOptions = options;
		}
	}
};

GROUPS[INDENT] = {
	children: [
		{
			icon: 'indent',
			title: EditorToolbar.STRINGS.INDENT
		},
		{
			icon: 'outdent',
			title: EditorToolbar.STRINGS.OUTDENT
		}
	]
};

GROUPS[INSERT] = {
	children: [
		{
			icon: 'insertimage',
			title: EditorToolbar.STRINGS.INSERT_IMAGE
		},
		{
			icon: 'createlink',
			title: EditorToolbar.STRINGS.CREATE_LINK
		}
	],
	generate: {
		insertimage: function(editor, attrs, config) {
			var instance = this;

			var button = attrs.button;
			var boundingBox = button.get('boundingBox');

			var overlay = EditorToolbar.generateOverlay(boundingBox, config);

			var contextBox = overlay.get('contentBox');

			var panel = new A.Panel(
				{
					collapsible: false,
					headerContent: EditorToolbar.STRINGS.INSERT_IMAGE,
					icons: [
						{
							icon: 'close',
							handler: {
								fn: overlay.hide,
								context: overlay
							}
						}
					]
				}
			).render(contextBox);

			contextBox = panel.bodyNode;

			if (config && config.dataBrowser) {
				config.dataBrowser.render(contextBox);
			}
			else {
				var frame = editor.getInstance();
				var iframe = editor.frame._iframe;

				var selection = null;

				var imageForm = new A.Form(
					{
						cssClass: CSS_INSERTIMAGE,
						labelAlign: 'left'
					}
				).render(contextBox);

				var borderOptions = [
					{
						labelText: 'none',
						value: ''
					}
				];

				for (var i = 1; i < 6; i++) {
					borderOptions.push(
						{
							labelText: i + 'px',
							value: i + 'px solid'
						}
					);
				}

				imageForm.add(
					[
						{
							id: 'imageURL',
							labelText: EditorToolbar.STRINGS.IMAGE_URL
						},
						{
							id: 'size',
							labelText: EditorToolbar.STRINGS.SIZE,
							type: 'hidden'
						},
						{
							id: 'width',
							labelText: false,
							cssClass: CSS_FIELD_NUMERIC
						},
						{
							id: 'height',
							labelText: false,
							cssClass: CSS_FIELD_NUMERIC
						},
						{
							id: 'padding',
							labelText: EditorToolbar.STRINGS.PADDING
						},
						new A.Select(
							{
								id: 'border',
								labelText: EditorToolbar.STRINGS.BORDER,
								options: borderOptions
							}
						),
						{
							id: 'align',
							labelText: EditorToolbar.STRINGS.ALIGN,
							type: 'hidden'
						},
						{
							id: 'description',
							labelText: EditorToolbar.STRINGS.DESCRIPTION
						},
						{
							id: 'linkURL',
							labelText: EditorToolbar.STRINGS.LINK_URL
						},
						{
							id: 'openInNewWindow',
							labelText: EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,
							type: 'checkbox'
						}
					],
					true
				);

				imageForm.getField('width').get('boundingBox').placeAfter(TPL_TOOLBAR_SIZE_SEPARATOR);

				var imageFormContentBox = imageForm.get('contentBox');
				var buttonRow = A.Node.create(TPL_TOOLBAR_BUTTON_HOLDER);

				var hrefTarget = imageForm.getField('openInNewWindow');

				var toolbar = new A.ButtonItem(
					{
						icon: 'circle-check',
						label: EditorToolbar.STRINGS.INSERT
					}
				).render(buttonRow);

				var imgSizeDetection = A.Node.create(TPL_INSERTIMAGE_IMG);

				var heightField = imageForm.getField('height');
				var widthField = imageForm.getField('width');

				imgSizeDetection.on(
					'load',
					function(event) {
						var img = event.currentTarget;

						if (!heightField.get('value') || !widthField.get('value')) {
							imageForm.set(
								'values',
								{
									height: img.get('height'),
									width: img.get('width')
								}
							);
						}
					}
				);

				imageForm.getField('imageURL').get('node').on(
					'blur',
					function(event) {
						imgSizeDetection.set('src', this.val());
					}
				);

				toolbar.on(
					'click',
					function(event) {
						var instance = this;

						var img = A.Node.create(TPL_INSERTIMAGE_IMG);

						var fieldValues = imageForm.get('fieldValues');

						var description = fieldValues.description;

						var imgAttrs = {
							src: fieldValues.imageURL,
							title: description,
							alt: description
						};

						var imgStyles = {
							border: fieldValues.border
						};

						var height = parseInt(fieldValues.height, 10);
						var width = parseInt(fieldValues.width, 10);

						if (!isNaN(height)) {
							imgAttrs.height = height;
						}

						if (!isNaN(width)) {
							imgAttrs.width = width;
						}

						var padding = parseInt(fieldValues.padding, 10);

						if (!isNaN(padding)) {
							imgStyles.padding = padding;
						}

						toolbarAlign.some(
							function(item, index, collection) {
								var instance = this;

								var active = item.StateInteraction.get('active');

								if (active) {
									imgStyles.display = '';

									switch(index) {
										case 0:
											imgAttrs.align = 'left';
										break;

										case 1:
											imgAttrs.align = '';
										break;

										case 2:
											imgAttrs.align = 'center';
											imgStyles.display = 'block';
										break;

										case 3:
											imgAttrs.align = 'right';
										break;
									}

									return true;
								}
							}
						);

						img.attr(imgAttrs);
						img.setStyles(imgStyles);

						var linkURL = fieldValues.linkURL;

						if (linkURL) {
							var href = A.Node.create(TPL_INSERTIMAGE_HREF);

							href.attr('href', linkURL);

							if (hrefTarget.get('node').get('checked')) {
								href.attr('target', '_blank');
							}

							href.append(img);

							img = href;
						}

						if (selection && selection.anchorNode) {
							selection.anchorNode.append(img);
						}

						overlay.hide();
					}
				);

				imageFormContentBox.append(buttonRow);

				var toolbarAlign = new A.Toolbar(
					{
						activeState: true,
						children: [
							{
								icon: 'align-left',
								title: EditorToolbar.STRINGS.ALIGN_LEFT
							},
							{
								icon: 'align-inline',
								title: EditorToolbar.STRINGS.ALIGN_INLINE
							},
							{
								icon: 'align-block',
								title: EditorToolbar.STRINGS.ALIGN_BLOCK
							},
							{
								icon: 'align-right',
								title: EditorToolbar.STRINGS.ALIGN_RIGHT
							}
						]
					}
				);

				toolbarAlign.after(
					'buttonitem:click',
					function(event) {
						var button = event.target;

						toolbarAlign.each(
							function(item, index, collection) {
								if (item != button) {
									item.StateInteraction.set('active', false);
								}
							}
						);
					}
				);

				toolbarAlign.render(imageForm.getField('align').get('contentBox'));

				overlay.after(
					'hide',
					function(event) {
						imageForm.resetValues();

						toolbarAlign.each(
							function(item, index, collection) {
								item.StateInteraction.set('active', false);
							}
						);

						hrefTarget.get('node').set('checked', false);
					}
				);

				iframe.on(
					MOUSEOUT,
					function(event) {
						var frame = editor.getInstance();

						selection = new frame.Selection();
					}
				);
			}
		},

		createlink: function(editor, attrs, config) {
			var instance = this;

			editor.plug(A.Plugin.CreateLinkBase);
		}
	}
};

GROUPS[LIST] = {
	children: [
		{
			icon: 'insertunorderedlist',
			title: EditorToolbar.STRINGS.INSERT_UNORDERED_LIST
		},
		{
			icon: 'insertorderedlist',
			title: EditorToolbar.STRINGS.INSERT_ORDERED_LIST
		}
	],
	generate: {
		init: function(editor) {
			var instance = this;

			editor.plug(A.Plugin.EditorLists);
		}
	}
};

GROUPS[SOURCE] = {
	children: [
		{
			icon: 'format',
			title: EditorToolbar.STRINGS.REMOVE_FORMAT
		},
		{
			icon: 'source',
			title: EditorToolbar.STRINGS.SOURCE
		}
	],
	generate: {
		format: function(editor, attrs, config) {
			var instance = this;

			var frame = editor.frame;
			var button = attrs.button;

			button.on(
				'click',
				function(event) {
					var instance = this;

					var frame = instance.getInstance();

					var selection = new frame.Selection();
					var items = selection.getSelected();

					if (!selection.isCollapsed && items.size()) {
						items.each(
							function(item, index, collection) {
								var instance = this;

								item.removeAttribute('style');

								var html = item.get('innerHTML');

								html = html.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g, '<$1>');

								for (var i = 0; i < CMD_FORMAT.length; i++) {
									var regExp = new RegExp('(<' + CMD_FORMAT[i] + '>|<\\/' + CMD_FORMAT[i] + '>)', 'ig');

									html = html.replace(regExp, '');
								}

								item.set('innerHTML', html);

								var parent = item.get('parentNode');

								if (!parent.test('body')) {
									parent.removeAttribute('style');
								}
							}
						);
					}
				},
				editor
			);
		},

		source: function(editor, attrs, config) {
			var instance = this;

			var frame = editor.frame;
			var container = frame.get('container');

			var contentBox = attrs.contentBox;
			var button = attrs.button;

			var textarea = A.Node.create(TPL_SOURCE_TEXTAREA);

			textarea.hide();

			container.append(textarea);

			button._visible = false;

			button.on(
				'click',
				function(event) {
					var buttonVisible = button._visible;

					if (buttonVisible) {
						editor.set('content', textarea.val());

						textarea.hide();
						textarea.val('');

						frame.show();
					}
					else {
						var iframe = frame._iframe;

						textarea.val(editor.getContent());

						var offsetHeight = iframe.get('offsetHeight') - textarea.getPadding('tb');

						textarea.setStyle('height', offsetHeight);

						frame.hide();

						textarea.show();
					}

					buttonVisible = !buttonVisible;

					button._visible = buttonVisible;

					contentBox.all('select').attr('disabled', buttonVisible);
					contentBox.all('button').attr('disabled', buttonVisible);

					button.get('contentBox').attr('disabled', false);
				}
			);
		}
	}
};

GROUPS[STYLES] = {
	children: [
		{
			icon: 'styles'
		}
	],
	generate: {
		styles: function(editor, attrs, config) {
			var instance = this;

			var button = attrs.button;
			var boundingBox = button.get('boundingBox');

			editor.plug(A.Plugin.EditorMenu);

			editor.menu.add(
				A.merge(
					{
						align: {
							node: boundingBox,
							points: ['tl', 'bl']
						},
						hideOn: 'click',
						showOn: 'click',
						trigger: boundingBox
					},
					config
				)
			);
		}
	}
};

GROUPS[SUBSCRIPT] = {
	children: [
		{
			icon: 'subscript',
			title: EditorToolbar.STRINGS.SUBSCRIPT
		},
		{
			icon: 'superscript',
			title: EditorToolbar.STRINGS.SUPERSCRIPT
		}
	]
};

GROUPS[TEXT] = {
	children: [
		{
			icon: 'bold',
			title: EditorToolbar.STRINGS.BOLD
		},
		{
			icon: 'italic',
			title: EditorToolbar.STRINGS.ITALIC
		},
		{
			icon: 'underline',
			title: EditorToolbar.STRINGS.UNDERLINE
		},
		{
			icon: 'strikethrough',
			title: EditorToolbar.STRINGS.LINE_THROUGH
		}
	]
};

A.namespace('Plugin').EditorToolbar = EditorToolbar;

}, '@VERSION@' ,{requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin']});

AUI.add('aui-editor-bbcode-plugin', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isString = Lang.isString,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'bbcodeplugin',
	BBCODE_PLUGIN = 'bbcode',

	QUOTE = 'quote',

	CSS_QUOTE = getClassName(QUOTE),
	CSS_QUOTE_CONTENT = getClassName(QUOTE, 'content'),
	CSS_QUOTE_TITLE = getClassName(QUOTE, 'title'),

	TPL_BBCODE_ATTRIBUTE = '\\[(({0})=([^\\]]*))\\]([\\s\\S]*?)\\[\\/{0}\\]',
	TPL_BBCODE_GENERIC = '\\[({0})\\]([\\s\\S]*?)\\[\\/{0}\\]',
	TPL_HTML_GENERIC = '<{0}(>|\\b[^>]*>)([\\s\\S]*?)</{0}>',
	TPL_HTML_STYLE =  '<(([a-z0-9]+)\\b[^>]*?style=("|\').*?{0}\\s*:\\s*([^;"\']+);?[^>]*)>([\\s\\S]*?)<(/\\2)>',
	TPL_HTML_TAGS = '(<[a-z0-9]+[^>]*>|</[a-z0-9]+>)',
	TPL_QUOTE_CONTENT = '<div class="' + CSS_QUOTE + '"><div class="' + CSS_QUOTE_CONTENT + '">',
	TPL_QUOTE_CLOSING_TAG = '</div></div>',
	TPL_QUOTE_TITLE_CONTENT = '<div class="' + CSS_QUOTE_TITLE + '">$1</div>' + TPL_QUOTE_CONTENT,
	TPL_QUOTE_WRAPPER = '<div>{0}</div>',

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
				['text-align']
			],
			regExp: TPL_HTML_STYLE,
			output: '<$1>[$4]$5[/$4]<$6>'
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
			output: '$2\n\n'
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

					instance.afterHostMethod('getContent', instance.getBBCode, instance);
					instance.get('host').on('contentChange', instance._contentChange, instance);
				},

				getBBCode: function() {
					var instance = this;

					var host = instance.get('host');

					var quote;
					var html = host.constructor.prototype.getContent.apply(host, arguments);
					var wrapper = A.Node.create(Lang.sub(TPL_QUOTE_WRAPPER, [html]));

					while (quote = wrapper.all('div.' + CSS_QUOTE)) {
						if (!quote.size()) {
							break;
						}

						quote.each(
							function(item, index, collection) {
								var content;
								var temp = item;

								do
								{
									if (temp) {
										content = temp;
									}

									temp = temp.one('div.' + CSS_QUOTE_CONTENT);
								}
								while (temp)

								var parent = content.get('parentNode');
								var title = parent.previous();

								var bbcode = '[' + QUOTE;

								if (title && title.hasClass(CSS_QUOTE_TITLE)) {
									var titleHtml = title.html();

									titleHtml = titleHtml.replace(new RegExp(TPL_HTML_TAGS, 'ig'), '');

									bbcode += '=' + (titleHtml.charAt(titleHtml.length - 1) == ':' ? titleHtml.substring(0, titleHtml.length - 1) : title.html());

									title.remove(true);
								}

								bbcode += ']' +  content.html() + '[/' + QUOTE + ']';

								parent.html(bbcode);

								parent.removeClass(QUOTE);
								parent.addClass('_' + QUOTE);
							}
						);
					}

					html = wrapper.html();

					html =  instance._parseTagExpressions(HTML_BBCODE, html);
					html = html.replace(new RegExp(TPL_HTML_TAGS, 'ig'), '');

					return new A.Do.AlterReturn(null, html);
				},

				getContentAsHtml: function() {
					var instance = this;

					var host = instance.get('host');

					var html = host.constructor.prototype.getContent.apply(host, arguments);

					return html;
				},

				_contentChange: function(event) {
					var instance = this;

					var html = event.newVal;

					html = html.replace(/\[quote=([^\]]*)\]/ig, TPL_QUOTE_CONTENT);
					html = html.replace(/\[quote\]/ig, TPL_QUOTE_TITLE_CONTENT);
					html = html.replace(/\[\/quote\]/ig, TPL_QUOTE_CLOSING_TAG);
					html = instance._parseTagExpressions(BBCODE_HTML, html);

					event.newVal = html;

					event.stopImmediatePropagation();
				},

				_parseTagExpressions: function(options, html) {
					var instance = this;

					for (var i = 0; i < options.length; i++) {
						for (var j = 0; j < options[i].convert.length; j++) {
							var tags;
							var output = options[i].output;

							if (isArray(options[i].convert[j])) {
								tags = options[i].convert[j];
							}
							else {
								tags = options[i].convert[j].tags;

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

A.namespace('Plugin').EditorBBCode = EditorBBCode;

}, '@VERSION@' ,{requires:['aui-base','editor-base']});



AUI.add('aui-editor', function(A){}, '@VERSION@' ,{skinnable:true, use:['aui-editor-tools-plugin','aui-editor-menu-plugin','aui-editor-toolbar-plugin','aui-editor-bbcode-plugin']});

