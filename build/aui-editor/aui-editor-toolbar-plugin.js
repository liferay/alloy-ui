AUI.add('aui-editor-toolbar-plugin', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isFunction = Lang.isFunction,

	getClassName = A.getClassName,

	NAME = 'editortoolbar',
	TOOLBAR_PLUGIN = 'toolbar',

	ALIGNMENT = 'alignment',
	ALIGN_LEFT = 'align-left',
	ALIGN_INLINE = 'align-inline',
	ALIGN_BLOCK = 'align-block',
	ALIGN_RIGHT = 'align-right',
	COLOR = 'color',
	CONTENT = 'content',
	FONT = 'font',
	INDENT = 'indent',
	INPUT = 'input',
	INSERT = 'insert',
	INSERTIMAGE = 'insertimage',
	INSERTLINK = 'insertlink',
	LIST = 'list',
	SELECT = 'select',
	SOURCE = 'source',
	STYLES = 'styles',
	SUBSCRIPT = 'subscript',
	TEXT = 'text',

	ICON_CHECK = 'circle-check',
	ICON_CLOSE = 'close',

	CMD_IGNORE = {
		backcolor: true,
		forecolor: true,
		format: true,
		insertimage: true,
		insertlink: true,
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
	CSS_ALIGN_NODE = getClassName(NAME, 'align', 'node'),
	CSS_INSERTIMAGE = getClassName(NAME, INSERTIMAGE),
	CSS_INSERTLINK = getClassName(NAME, INSERTLINK),
	CSS_SELECT_FONTNAME = getClassName(NAME, SELECT, 'fontname'),
	CSS_SELECT_FONTSIZE = getClassName(NAME, SELECT, 'fontsize'),
	CSS_SIZE_SEPARATOR = getClassName(NAME, 'size', 'separator'),
	CSS_SOURCE_TEXTAREA = getClassName(NAME, SOURCE, 'textarea'),
	CSS_STATE_ACTIVE = getClassName('state', 'active'),
	CSS_TOOLBAR = getClassName(NAME),
	CSS_TOOLBAR_CONTENT = getClassName(NAME, CONTENT),

	TPL_ALIGN_NODE = '<div class="' + CSS_ALIGN_NODE + '"></div>',
	TPL_INSERTIMAGE_HREF = '<a></a>',
	TPL_INSERTIMAGE_IMG = '<img />',
	TPL_INSERTLINK = '<a href="{0}"{2}>{1}</a>',

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
			append: {
				value: null
			},
			groups: {
				value: [
					{
						type: FONT
					},
					{
						type: TEXT
					},
					{
						type: COLOR
					},
					{
						type: ALIGNMENT
					},
					{
						type: INDENT
					},
					{
						type: LIST
					},
					{
						type: INSERT
					},
					{
						type: SOURCE
					}
				]
			}
		},

		_alignNode: null,

		prototype: {
			initializer: function() {
				var instance = this;

				var alignNode = A.Node.create(TPL_ALIGN_NODE);
				var append = instance.get('append');
				var boundingBox = A.Node.create(TPL_TOOLBAR);
				var contentBox = boundingBox.one('.' + CSS_TOOLBAR_CONTENT);
				var groups = instance.get('groups');

				var host = instance.get('host');
				var container = host.frame.get('container');

				container.placeBefore(boundingBox);

				instance._boundingBox = boundingBox;
				instance._contentBox = contentBox;

				alignNode.hide();
				A.getBody().append(alignNode);
				instance._alignNode = alignNode;

				var toolbars = [];

				if (append != null && isArray(append)) {
					var appendLength = append.length;

					for (var i = 0; i < appendLength; i++) {
						var item = append[i];

						if (item.index != null) {
							var index = instance._isGroupIncluded('type', groups, item.type);

							if (index != -1) {
								groups.splice(index, 1);
							}

							groups.splice(Math.min(item.index, groups.length), 0, item);
						}
						else {
							groups.push(item);
						}
					}
				}

				for (i = 0; i < groups.length; i++) {
					var group = groups[i];
					var groupType = GROUPS[group.type] || group;
					var buttons = [];

					if (isArray(group.include)) {
						var groupLength = group.include.length;

						for (var j = 0; j < groupLength; j++) {
							index = instance._isGroupIncluded('icon', groupType.children, group.include[j]);

							if (index != -1) {
								buttons.push(groupType.children[index]);
							}
						}
					}
					else {
						buttons = groupType.children;
					}

					var toolbar = instance._addGroup(group, groupType, buttons);

					if (toolbar) {
						toolbars.push(toolbar);
					}
				}

				instance._toolbars = toolbars;

				contentBox.delegate(
					'click',
					function(event) {
						var instance = this;

						var node = A.Widget.getByNode(event.currentTarget);

						if (node) {
							var cmds = node.get('icon').split('-');

							if (!CMD_IGNORE[cmds[0]]) {
								instance.execCommand(cmds[0], (cmds[1] ? cmds[1] : ''));
								instance.focus();
							}
						}
					},
					'button',
					host
				);
			},

			addGroup: function(group) {
				var instance = this;

				var groupType = GROUPS[group.type] || group;

				instance._addGroup(group, groupType);
			},

			addGroupType: function(type, data) {
				var instance = this;

				if (!GROUPS[type]) {
					GROUPS[type] = data;
				}
			},

			_addGroup: function(group, groupType, buttons) {
				var instance = this;

				var insert = (buttons == null && group.index != null);
				buttons = buttons || groupType.children;

				if (isArray(buttons)) {
					var host = instance.get('host');
					var contentBox = instance._contentBox;
					var children = [];
					var toolbar;

					var attrs = {
						boundingBox: instance._boundingBox,
						contentBox: contentBox
					};

					for (var i = 0; i < buttons.length; i++) {
						var button = buttons[i];

						if (!button.select) {
							var title = YUI.AUI.defaults.EditorToolbar.STRINGS[button._titleKey];

							button.title = (title != null ? title : EditorToolbarStrings[button._titleKey]);

							children.push(button);
						}
					}

					if (children.length) {
						toolbar = new A.Toolbar(
							A.merge(
								groupType.config,
								group.toolbar,
								{
									children: children
								}
							)
						).render(contentBox);
					}

					var generate = groupType.generate;

					if (generate && isFunction(generate.init)) {
						generate.init.call(instance, host, attrs);
					}

					children = (children.length ? children : buttons);

					for (i = 0; i < children.length; i++) {
						var item = children[i];
						var icon = item.icon;

						if (generate && isFunction(generate[icon])) {
							var config = (group.config ? group.config[icon] : null);

							attrs.button = (item.select || !toolbar ? null : toolbar.item(i));

							generate[icon].call(instance, host, attrs, config);
						}
					}

					if (insert) {
						var nodes = contentBox.get('childNodes');
						var nodesLength = nodes.size();
						var index = group.index;

						if (index < nodesLength - 1) {
							contentBox.insert(nodes.item(nodesLength - 1), nodes.item(index));
						}
					}

					return toolbar;
				}

				return null;
			},

			_isGroupIncluded: function(name, children, type) {
				var instance = this;

				for (var i = 0; i < children.length; i++) {
					if (children[i][name] == type) {
						return i;
					}
				}

				return -1;
			},

			_openOverlayToAlignNode: function(overlay, iframe, iframeNode) {
				var instance = this;

				var docScrollX = iframeNode.get('docScrollX');
				var docScrollY = iframeNode.get('docScrollY');
				var xy = iframe.getXY();
				var xyNode = iframeNode.getXY();

				xy = [xy[0] + xyNode[0] - docScrollX, xy[1] + xyNode[1] - docScrollY];

				var alignNode = instance._alignNode;

				alignNode.setStyle('width', iframeNode.get('offsetWidth'));
				alignNode.setStyle('height', iframeNode.get('offsetHeight'));
				alignNode.setXY(xy);

				alignNode.show();

				overlay.set(
					'align',
					{
						node: alignNode,
						points: [ 'tl', 'bc' ]
					}
				);

				overlay.show();
			},

			_updateToolbar: function(event, attrs) {
				var instance = this;

				if (event.changedNode) {
					var cmds = event.commands;
					var toolbars = instance.toolbars;

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

function selectFontCommand(event) {
	var instance = this;

	var target = event.currentTarget;
	var css = target.get('className');
	var cmd = css.substring(css.lastIndexOf('-') + 1);
	var val = target.get('value');

	instance.execCommand(cmd, val);
	instance.focus();
}

EditorToolbar.generateOverlay = function(trigger, config, panel) {
	var overlay = new A['OverlayContext' + (panel ? 'Panel' : '')] (
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

var EditorToolbarStrings = {
	ALIGN: 'Align',
	ALIGN_BLOCK: 'Block',
	ALIGN_LEFT: 'Left',
	ALIGN_INLINE: 'Inline',
	ALIGN_RIGHT: 'Right',
	BACKCOLOR: 'Background Color',
	BOLD: 'Bold',
	BORDER: 'Border',
	DESCRIPTION: 'Description',
	EDIT_IMAGE: 'Edit Image',
	EDIT_LINK: 'Edit Link',
	FORECOLOR: 'Foreground Color',
	IMAGE_URL: 'Image URL',
	INDENT: 'Indent',
	INSERT: 'Insert',
	INSERT_IMAGE: 'Insert Image',
	INSERT_LINK: 'Insert Link',
	INSERT_ORDERED_LIST: 'Insert Numbered List',
	INSERT_UNORDERED_LIST: 'Insert Bulleted List',
	ITALIC: 'Italic',
	JUSTIFY_LEFT: 'Justify Left',
	JUSTIFY_CENTER: 'Justify Center',
	JUSTIFY_RIGHT: 'Justify Right',
	LINE_THROUGH: 'Line Through',
	LINK_URL: 'Link URL',
	OPEN_IN_NEW_WINDOW: 'Open in new window',
	OUTDENT: 'Outdent',
	PADDING: 'Padding',
	REMOVE_FORMAT: 'Format Source',
	SAVE: 'Save',
	SIZE: 'Size',
	SOURCE: 'Source',
	SUBSCRIPT: 'Subscript',
	SUPERSCRIPT: 'Superscript',
	STYLES: 'Styles',
	UNDERLINE: 'Underline'
};

if (!YUI.AUI.defaults.EditorToolbar) {
	YUI.AUI.defaults.EditorToolbar = {
		STRINGS: {}
	};
}

A.mix(YUI.AUI.defaults.EditorToolbar.STRINGS, EditorToolbarStrings);

var GROUPS = {};

GROUPS[ALIGNMENT] = {
	children: [
		{
			icon: 'justifyleft',
			_titleKey: 'JUSTIFY_LEFT'
		},
		{
			icon: 'justifycenter',
			_titleKey: 'JUSTIFY_CENTER'
		},
		{
			icon: 'justifyright',
			_titleKey: 'JUSTIFY_RIGHT'
		}
	]
};

GROUPS[COLOR] = {
	children: [
		{
			icon: 'forecolor',
			_titleKey: 'FORECOLOR'
		},
		{
			icon: 'backcolor',
			_titleKey: 'BACKCOLOR'
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

			var node;
			var data = [TPL_TOOLBAR_FONTNAME_OPTION];

			if (config && config.optionHtml) {
				data[0] = config.optionHtml;
			}

			node = A.Node.create(Lang.sub(TPL_TOOLBAR_FONTNAME, data));

			contentBox.append(node);

			node.on(
				'change',
				selectFontCommand,
				editor
			);

			var options = contentBox.all('.' + CSS_SELECT_FONTNAME + ' option');

			attrs._fontNameOptions = options;

			return node;
		},

		fontsize: function(editor, attrs, config) {
			var instance = this;

			var contentBox = attrs.contentBox;

			var node;
			var data = [TPL_TOOLBAR_FONTSIZE_OPTION];

			if (config && config.optionHtml) {
				data[0] = config.optionHtml;
			}

			node = A.Node.create(Lang.sub(TPL_TOOLBAR_FONTSIZE, data));

			contentBox.append(node);

			node.on(
				'change',
				selectFontCommand,
				editor
			);

			var options = contentBox.all('.' + CSS_SELECT_FONTSIZE + ' option');

			attrs._fontSizeOptions = options;

			return node;
		}
	}
};

GROUPS[INDENT] = {
	children: [
		{
			icon: 'indent',
			_titleKey: 'INDENT'
		},
		{
			icon: 'outdent',
			_titleKey: 'OUTDENT'
		}
	]
};

GROUPS[INSERT] = {
	children: [
		{
			icon: 'insertimage',
			_titleKey: 'INSERT_IMAGE'
		},
		{
			icon: 'insertlink',
			_titleKey: 'INSERT_LINK'
		}
	],
	generate: {
		insertimage: function(editor, attrs, config) {
			var instance = this;

			var button = attrs.button;
			var boundingBox = button.get('boundingBox');

			var overlay = EditorToolbar.generateOverlay(boundingBox, config, true);

			var contextBox = overlay.get('contentBox');

			var panel = new A.Panel(
				{
					collapsible: false,
					title: YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE,
					icons: [
						{
							icon: ICON_CLOSE,
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
				var editNode;
				var selection;

				var imageForm = new A.Form(
					{
						cssClass: CSS_INSERTIMAGE,
						labelAlign: 'left'
					}
				).render(contextBox);

				var borderOptions = [
					{
						labelText: 'none',
						value: 'none'
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
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.IMAGE_URL
						},
						{
							id: 'size',
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.SIZE,
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
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.PADDING
						},
						new A.Select(
							{
								id: 'border',
								labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.BORDER,
								options: borderOptions
							}
						),
						{
							id: 'align',
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN,
							type: 'hidden'
						},
						{
							id: 'description',
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION
						},
						{
							id: 'linkURL',
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL
						},
						{
							id: 'openInNewWindow',
							labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,
							type: 'checkbox'
						}
					],
					true
				);

				imageForm.getField('width').get('boundingBox').placeAfter(TPL_TOOLBAR_SIZE_SEPARATOR);

				var imageFormContentBox = imageForm.get('contentBox');
				var buttonRow = A.Node.create(TPL_TOOLBAR_BUTTON_HOLDER);

				var hrefTarget = imageForm.getField('openInNewWindow');

				var insertButton = new A.ButtonItem(
					{
						icon: ICON_CHECK,
						label: YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT
					}
				).render(buttonRow);

				insertButton.on(
					'click',
					function(event) {
						var instance = this;

						var href;
						var img;
						var parent;

						if (editNode) {
							img = editNode;
							parent = editNode.get('parentNode');

							if (parent.get('tagName').toLowerCase() == 'a') {
								href = parent;
							}
						}
						else {
							img = A.Node.create(TPL_INSERTIMAGE_IMG);
						}

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

								return false;
							}
						);

						img.setAttrs(imgAttrs);
						img.setStyles(imgStyles);

						var linkURL = fieldValues.linkURL;

						if (linkURL) {
							if (!href) {
								href = A.Node.create(TPL_INSERTIMAGE_HREF);

								if (editNode) {
									parent.insert(href, editNode);
								}

								href.append(img);
							}

							href.setAttribute('href', linkURL);
							href.setAttribute('target', (hrefTarget.get('node').get('checked') ? '_blank' : ''));

							img = href;
						}
						else {
							if (editNode && href) {
								parent.insert(editNode, href);

								href.remove(true);
							}
						}

						if (!editNode && selection && selection.anchorNode) {
							selection.anchorNode.append(img);
						}

						overlay.hide();
					}
				);
				
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

				imageFormContentBox.append(buttonRow);

				var toolbarAlign = new A.Toolbar(
					{
						activeState: true,
						children: [
							{
								icon: ALIGN_LEFT,
								title: YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_LEFT
							},
							{
								icon: ALIGN_INLINE,
								title: YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_INLINE
							},
							{
								icon: ALIGN_BLOCK,
								title: YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_BLOCK
							},
							{
								icon: ALIGN_RIGHT,
								title: YUI.AUI.defaults.EditorToolbar.STRINGS.ALIGN_RIGHT
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

				overlay.on(
					'show',
					function(event) {
						if (!selection || !selection.anchorNode) {
							var frame = editor.getInstance();

							editor.focus();

							selection = new frame.Selection();
						}
					}
				);

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

						panel.set('title', YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_IMAGE);
						insertButton.set('label', YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);

						instance._alignNode.hide();

						overlay.set(
							'align',
							{
								node: boundingBox,
								points: [ 'tl', 'bl' ]
							}
						);

						editNode = null;
					}
				);

				editor.on(
					'toolbar:ready',
					function() {
						var iframe = editor.frame._iframe;
						var frame = editor.getInstance();

						iframe.on(
							'mouseout',
							function(event) {
								selection = new frame.Selection();
							}
						);

						frame.one('body').delegate(
							'click',
							A.bind(function(event) {
								var instance = this;

								if (editNode != event.currentTarget) {
									var img = event.currentTarget;

									var parent = img.get('parentNode');
									var borderWidth = img.getStyle('borderWidth');
									var padding = img.getStyle('padding');
									var linkTag = (parent.get('tagName').toLowerCase() == 'a');

									imageForm.set(
										'values',
										{
											border: (borderWidth ? borderWidth + ' solid' : ''),
											description: img.get('alt'),
											height: img.get('height'),
											imageURL: img.get('src'),
											linkURL: (linkTag ? parent.get('href') : ''),
											width: img.get('width'),
											padding: (padding ? parseInt(padding) : '')
										}
									);

									var index = 1;

									switch (img.getAttribute('align')) {
										case 'left':
											index = 0;
										break;
										case 'center':
											index = 2;
										break;
										case 'right':
											index = 3;
										break;
									}

									toolbarAlign.item(index).StateInteraction.set('active', true);

									hrefTarget.get('node').attr('checked', (linkTag && parent.getAttribute('target') == '_blank'));

									panel.set('title', YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_IMAGE);
									insertButton.set('label', YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);

									editNode = img;

									instance._openOverlayToAlignNode(overlay, iframe, img);
								}
							}, instance),
							'img'
						);
					}
				);
			}
		},

		insertlink: function(editor, attrs, config) {
			var instance = this;

			var button = attrs.button;
			var boundingBox = button.get('boundingBox');

			var overlay = EditorToolbar.generateOverlay(boundingBox, config, true);
			var contextBox = overlay.get('contentBox');

			var panel = new A.Panel(
				{
					collapsible: false,
					title: YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT_LINK,
					icons: [
						{
							icon: ICON_CLOSE,
							handler: {
								fn: overlay.hide,
								context: overlay
							}
						}
					]
				}
			).render(contextBox);

			contextBox = panel.bodyNode;

			var iframe = editor.frame._iframe;
			var editNode;
			var selection;

			var linkForm = new A.Form(
				{
					cssClass: CSS_INSERTLINK,
					labelAlign: 'left'
				}
			).render(contextBox);

			linkForm.add(
				[
					{
						id: 'description',
						labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.DESCRIPTION
					},
					{
						id: 'linkURL',
						labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.LINK_URL
					},
					{
						id: 'openInNewWindow',
						labelText: YUI.AUI.defaults.EditorToolbar.STRINGS.OPEN_IN_NEW_WINDOW,
						type: 'checkbox'
					}
				],
				true
			);

			var linkFormContentBox = linkForm.get('contentBox');
			var buttonRow = A.Node.create(TPL_TOOLBAR_BUTTON_HOLDER);

			var hrefTarget = linkForm.getField('openInNewWindow');

			var insertButton = new A.ButtonItem(
				{
					icon: ICON_CHECK,
					label: YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT
				}
			).render(buttonRow);

			insertButton.on(
				'click',
				function(event) {
					var instance = this;

					var fieldValues = linkForm.get('fieldValues');

					if (editNode) {
						editNode.setAttribute('href', fieldValues.linkURL);
						editNode.set('innerHTML', fieldValues.description);

						if (hrefTarget.get('node').get('checked')) {
							editNode.setAttribute('target', '_blank');
						}
						else {
							editNode.setAttribute('target', '');
						}
					}
					else {
						editor.execCommand('inserthtml', Lang.sub(TPL_INSERTLINK, [fieldValues.linkURL, fieldValues.description, (hrefTarget.get('node').get('checked') ? ' target="_blank"' : '')]));
					}

					overlay.hide();
				}
			);

			linkFormContentBox.append(buttonRow);

			overlay.after(
				'hide',
				function(event) {
					linkForm.resetValues();

					hrefTarget.get('node').set('checked', false);

					panel.set('title', YUI.AUI.defaults.EditorToolbar.STRINGS.CREATE_LINK);
					insertButton.set('label', YUI.AUI.defaults.EditorToolbar.STRINGS.INSERT);

					instance._alignNode.hide();

					overlay.set(
						'align',
						{
							node: boundingBox,
							points: [ 'tl', 'bl' ]
						}
					);

					editNode = null;
				}
			);

			editor.on(
				'toolbar:ready',
				function() {
					var frame = editor.getInstance();

					frame.one('body').delegate(
						'click',
						A.bind(function(event) {
							var instance = this;

							if (editNode != event.currentTarget) {
								var link = event.currentTarget;

								if (!link.one('img')) {
									var parent = link.get('parentNode');

									linkForm.set(
										'values',
										{
											description: link.get('innerHTML'),
											linkURL: link.getAttribute('href')
										}
									);

									hrefTarget.get('node').attr('checked', (link.getAttribute('target') == '_blank'));

									panel.set('title', YUI.AUI.defaults.EditorToolbar.STRINGS.EDIT_LINK);
									insertButton.set('label', YUI.AUI.defaults.EditorToolbar.STRINGS.SAVE);

									editNode = link;

									instance._openOverlayToAlignNode(overlay, iframe, link);
								}
							}
						}, instance),
						'a'
					);
				}
			);
		}
	}
};

GROUPS[LIST] = {
	children: [
		{
			icon: 'insertunorderedlist',
			_titleKey: 'INSERT_UNORDERED_LIST'
		},
		{
			icon: 'insertorderedlist',
			_titleKey: 'INSERT_ORDERED_LIST'
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
			_titleKey: 'REMOVE_FORMAT'
		},
		{
			icon: 'source',
			_titleKey: 'SOURCE'
		}
	],
	generate: {
		format: function(editor, attrs, config) {
			var instance = this;

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

			var contentBox = attrs.contentBox;
			var button = attrs.button;
			var frame;

			var textarea = A.Node.create(TPL_SOURCE_TEXTAREA);

			editor.on(
				'toolbar:ready',
				function() {
					var instance = this;

					var frame = editor.frame;
					var container = frame.get('container');

					textarea.hide();

					container.append(textarea);
				}
			);

			button._visible = false;

			button.on(
				'click',
				function(event) {
					var instance = this;

					var frame = editor.frame;
					var buttonVisible = button._visible;

					if (buttonVisible) {
						instance.set('content', textarea.val());

						textarea.hide();
						textarea.val('');

						frame.show();
					}
					else {
						var iframe = frame._iframe;

						textarea.val(instance.getContent());

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
				},
				editor
			);
		}
	}
};

GROUPS[STYLES] = {
	children: [
		{
			icon: 'styles',
			_titleKey: 'STYLES'
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
			_titleKey: 'SUBSCRIPT'
		},
		{
			icon: 'superscript',
			_titleKey: 'SUPERSCRIPT'
		}
	]
};

GROUPS[TEXT] = {
	children: [
		{
			icon: 'bold',
			_titleKey: 'BOLD'
		},
		{
			icon: 'italic',
			_titleKey: 'ITALIC'
		},
		{
			icon: 'underline',
			_titleKey: 'UNDERLINE'
		},
		{
			icon: 'strikethrough',
			_titleKey: 'LINE_THROUGH'
		}
	]
};

A.namespace('Plugin').EditorToolbar = EditorToolbar;

}, '@VERSION@' ,{requires:['aui-base','aui-button-item','aui-color-picker','aui-editor-menu-plugin','aui-editor-tools-plugin','aui-form-select','aui-overlay-context-panel','aui-panel','aui-toolbar','createlink-base','editor-lists','editor-base','plugin']});
