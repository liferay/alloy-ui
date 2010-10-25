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
	CSS_FIELD_LABEL = getClassName('field', 'label'),
	CSS_FIELD_LABEL_SECONDARY = getClassName('field', 'label', 'secondary'),
	CSS_FIELD_INPUT = getClassName('field', INPUT),
	CSS_FIELD_INPUT_TEXT = getClassName('field', INPUT, 'text'),
	CSS_FIELD_INPUT_NUMERIC = getClassName('field', INPUT, 'numeric'),
	CSS_SELECT_FONTNAME = getClassName(NAME, SELECT, 'fontname'),
	CSS_SELECT_FONTSIZE = getClassName(NAME, SELECT, 'fontsize'),
	CSS_SOURCE_TEXTAREA = getClassName(NAME, SOURCE, 'textarea'),
	CSS_STATE_ACTIVE = getClassName('state', 'active'),
	CSS_TOOLBAR = getClassName(NAME),
	CSS_TOOLBAR_CONTENT = getClassName(NAME, CONTENT),
	CSS_INSERTIMAGE_CONTENT = getClassName(NAME, INSERTIMAGE, CONTENT),
	CSS_INSERTIMAGE_CONTENT_TARGET = getClassName(NAME, INSERTIMAGE, CONTENT, 'target'),
	CSS_INSERTIMAGE_CONTENT_ALIGN = getClassName(NAME, INSERTIMAGE, CONTENT, 'align'),

	TPL_INSERTIMAGE_BORDER = '<select>' +
								 '<option value="">none</option>' +
								 '<option value="1px solid">1px</option>' +
								 '<option value="2px solid">2px</option>' +
								 '<option value="3px solid">3px</option>' +
								 '<option value="4px solid">4px</option>' +
								 '<option value="5px solid">5px</option>' +
							 '</select>',
	TPL_INSERTIMAGE_HREF = '<a></a>',
	TPL_INSERTIMAGE_IMG = '<img />',
	TPL_INSERTIMAGE_INPUT_NUMERIC = '<input type="text" class="' + CSS_FIELD_INPUT + ' ' + CSS_FIELD_INPUT_TEXT + ' ' + CSS_FIELD_INPUT_NUMERIC + '" />',

	TPL_SOURCE_TEXTAREA = '<textarea class="' + CSS_SOURCE_TEXTAREA + '"></textarea>',
	TPL_TOOLBAR = '<div class="' + CSS_TOOLBAR + '"><div class="' + CSS_TOOLBAR_CONTENT + '"></div></div>',
	TPL_TOOLBAR_FONTNAME = '<select class="' + CSS_SELECT_FONTNAME + '">{0}</select>',
	TPL_TOOLBAR_FONTNAME_OPTION =	'<option selected="selected"></option>' +
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
	TPL_TOOLBAR_FONTSIZE_OPTION =	'<option selected="selected"></option>' +
									'<option value="1">10</option>' +
									'<option value="2">13</option>' +
									'<option value="3">16</option>' +
									'<option value="4">18</option>' +
									'<option value="5">24</option>' +
									'<option value="6">32</option>' +
									'<option value="7">48</option>';

	function generateInput(title) {
		return generateLabel(title) + '<input type="text" class="' + CSS_FIELD_INPUT + ' ' + CSS_FIELD_INPUT_TEXT + '" />';
	}

	function generateLabel(title, css) {
		return '<label class="' + CSS_FIELD_LABEL + (css ? ' ' + css : '') + '">' + title + '</label>';
	}

	function generateInsertImage(config) {
		var html = '<div class="' + CSS_INSERTIMAGE_CONTENT + '">' +
						'<ul>' +
							'<li>' + generateInput(EditorToolbarPlugin.STRINGS.IMAGE_URL) + '</li>' +
							'<li>' + generateLabel(EditorToolbarPlugin.STRINGS.SIZE) + TPL_INSERTIMAGE_INPUT_NUMERIC + '<span>x</span>' + TPL_INSERTIMAGE_INPUT_NUMERIC + '</li>' +
							'<li>' +
								generateLabel(EditorToolbarPlugin.STRINGS.PADDING) + TPL_INSERTIMAGE_INPUT_NUMERIC +
								generateLabel(EditorToolbarPlugin.STRINGS.BORDER, CSS_FIELD_LABEL_SECONDARY) + TPL_INSERTIMAGE_BORDER +
							'</li>';
		if (!config.hideAlign) {
			html += 		'<li>' +
								generateLabel(EditorToolbarPlugin.STRINGS.ALIGN) +
								'<div class="' + CSS_INSERTIMAGE_CONTENT_ALIGN + '"></div>' +
							'</li>';
		}

		html += 			'<li>' + generateInput(EditorToolbarPlugin.STRINGS.DESCRIPTION) + '</li>' +
							'<li>' + generateInput(EditorToolbarPlugin.STRINGS.LINK_URL) + '</li>' +
						'</ul>' +
						'<span class="' + CSS_INSERTIMAGE_CONTENT_TARGET + '"><input type="checkbox" /><label>' + EditorToolbarPlugin.STRINGS.OPEN_IN_NEW_WINDOW + '</label></span>' +
						'<div class="' + CSS_BUTTON_HOLDER + '"></div>' +
					'</div>';

		return html;
	}

	function generateOverlay(boundingBox, config) {
		var overlay = new A.OverlayContext(
			A.merge(
				{
					trigger: boundingBox,
					showOn: 'click',
					hideOn: 'click',
					align: {
						node: boundingBox,
						points: [ 'tl', 'bl' ]
					}
				},
				config
			)
		).render();

		return overlay;
	}

	function generateColorPicker(editor, attrs, config, cmd) {
		var button = attrs.button;
		var boundingBox = button.get('boundingBox');

		var colorPicker = new A.ColorPicker(
			A.merge(
				{
					trigger: boundingBox,
					align: {
						node: boundingBox,
						points: [ 'tl', 'bl' ]
					}
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
	}

var EditorToolbarPlugin = A.Component.create(
		{
			NAME: NAME,

			NS: TOOLBAR_PLUGIN,

			EXTENDS: A.Plugin.Base,

			ATTRS: {
				groups: {
					value: [
						{ type: TEXT },
						{ type: ALIGNMENT },
						{ type: INDENT },
						{ type: LIST }
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

					for (var i = 0; i < groups.length; i++) {
						var group = groups[i];
						var groupType = GROUPS[group.type];

						var children = [];

						for (var j = 0; j < groupType.children.length; j++) {
							if (!groupType.children[j].select) {
								children.push(groupType.children[j]);
							}
						}

						if (children.length > 0) {
							var toolbar = new A.Toolbar(
								A.merge(
									groupType.config,
									group.toolbar,
									{
										children: children
									}
								)
							).render(contentBox);

							toolbar.on(
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

							toolbars.push(toolbar);
						}

						var generate = groupType.generate;

						if (generate && isFunction(generate.init)) {
							generate.init.call(instance, host, attrs);
						}

						for (var j = 0; j < groupType.children.length; j++) {
							var icon = groupType.children[j].icon;

							if (generate && isFunction(generate[icon])) {
								var config = (group.config ? group.config[icon] : null);

								attrs.button = (generate[icon].select ? null : toolbar.item(j));

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

						if (toolbars) {
							for (var i = 0; i < toolbars.length; i++) {
								toolbars[i].each(
									function(node) {
										var state = false;

										if (cmds[node.get('icon')]) {
											state = true;
										}

										node.StateInteraction.set('active', state);
									}
								);
							}
						}

						var fontName = event.fontFamily;
						var fontNameOptions = attrs._fontNameOptions;
						var fontSize = event.fontSize;
						var fontSizeOptions = attrs._fontSizeOptions;

						if (fontNameOptions) {
							fontNameOptions.item(0).set('selected', true);

							fontNameOptions.each(
								function(node) {
									var val = node.get('value').toLowerCase();

									if (val === fontName.toLowerCase()) {
										node.set('selected', true);
									}
								}
							);
						}

						if (fontSizeOptions) {
							fontSize = fontSize.replace('px', '');

							fontSizeOptions.item(0).set('selected', true);

							fontSizeOptions.each(
								function(node) {
									var val = node.get('value').toLowerCase();
									var txt = node.get('text');

									if (txt === fontSize) {
										node.set('selected', true);
									}
								}
							);
						}
					}
				}
			}
		}
	);

EditorToolbarPlugin.STRINGS = {
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

GROUPS = [];

GROUPS[ALIGNMENT] = {
	children: [
		{ icon: 'justifyleft', title: EditorToolbarPlugin.STRINGS.JUSTIFY_LEFT },
		{ icon: 'justifycenter', title: EditorToolbarPlugin.STRINGS.JUSTIFY_CENTER },
		{ icon: 'justifyright', title: EditorToolbarPlugin.STRINGS.JUSTIFY_RIGHT }
	]
};

GROUPS[COLOR] = {
	children: [
		{ icon: 'forecolor', title: EditorToolbarPlugin.STRINGS.FORECOLOR },
		{ icon: 'backcolor', title: EditorToolbarPlugin.STRINGS.BACKCOLOR }
	],
	generate: {
		forecolor: function(editor, attrs, config) {
			var instance = this;

			generateColorPicker(editor, attrs, config, 'forecolor');
		},

		backcolor: function(editor, attrs, config) {
			var instance = this;

			generateColorPicker(editor, attrs, config, 'backcolor');
		}
	}
},

GROUPS[FONT] = {
	children: [
		{ icon: 'fontname', select: true },
		{ icon: 'fontsize', select: true }
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

			var tpl = null;

			if (config && config.optionHtml) {
				tpl = Lang.sub(TPL_TOOLBAR_FONTNAME, [config.optionHtml]);
			}
			else {
				tpl = Lang.sub(TPL_TOOLBAR_FONTNAME, [TPL_TOOLBAR_FONTNAME_OPTION]);
			}

			contentBox.append(tpl);

			var options = contentBox.all('.' + CSS_SELECT_FONTNAME + ' option');

			attrs._fontNameOptions = options;
		},

		fontsize: function(editor, attrs, config) {
			var instance = this;

			var contentBox = attrs.contentBox;

			var tpl = null;

			if (config && config.optionHtml) {
				tpl = Lang.sub(TPL_TOOLBAR_FONTSIZE, [config.optionHtml]);
			}
			else {
				tpl = Lang.sub(TPL_TOOLBAR_FONTSIZE, [TPL_TOOLBAR_FONTSIZE_OPTION]);
			}

			contentBox.append(tpl);

			var options = contentBox.all('.' + CSS_SELECT_FONTSIZE + ' option');

			attrs._fontSizeOptions = options;
		}
	}
};

GROUPS[INDENT] = {
	children: [
		{ icon: 'indent', title: EditorToolbarPlugin.STRINGS.INDENT },
		{ icon: 'outdent', title: EditorToolbarPlugin.STRINGS.OUTDENT }
	]
};

GROUPS[INSERT] = {
	children: [
		{ icon: 'insertimage', title: EditorToolbarPlugin.STRINGS.INSERT_IMAGE },
		{ icon: 'createlink', title: EditorToolbarPlugin.STRINGS.CREATE_LINK }
	],
	generate: {
		insertimage: function(editor, attrs, config) {
			var instance = this;

			var button = attrs.button;
			var boundingBox = button.get('boundingBox');

			var overlay = generateOverlay(boundingBox, config);

			var contextBox = overlay.get('contentBox');

			var panel = new A.Panel(
				{
					collapsible: false,
					headerContent: EditorToolbarPlugin.STRINGS.INSERT_IMAGE,
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

				var html = generateInsertImage(config);

				var imageForm = A.Node.create(html);

				contextBox.append(imageForm);

				var hrefTarget = imageForm.one('.' + CSS_INSERTIMAGE_CONTENT_TARGET + ' input');

				var toolbar = new A.Toolbar(
					{
						children: [
							{
								icon: 'circle-check',
								label: EditorToolbarPlugin.STRINGS.INSERT
							}
						]
					}
				);

				toolbar.item(0).on(
					'click',
					function(event) {
						var instance = this;

						var href = A.Node.create(TPL_INSERTIMAGE_HREF);
						var img = A.Node.create(TPL_INSERTIMAGE_IMG);

						var url = null;

						imageForm.all('input').each(
							function(node, index) {
								switch(index) {
									case 0:
										img.attr('src', node.val());

										break;

									case 1:
										var width = parseInt(node.val());

										if (!isNaN(width)) {
											img.attr('width', width);
										}

										break;

									case 2:
										var height = parseInt(node.val());

										if (!isNaN(height)) {
											img.attr('height', height);
										}

										break;

									case 3:
										var padding = parseInt(node.val());

										if (!isNaN(padding)) {
											img.setStyle('padding', padding + 'px');
										}

										break;

									case 4:
										img.attr('title', node.val());
										img.attr('alt', node.val());

										break;

									case 5:
										url = node.val();

										break;
								}
							}
						);

						imageForm.all('select').each(
							function(node, index) {
								switch(index) {
									case 0:
										img.setStyle('border', node.val());

										break;
								}
							}
						);

						if (toolbarAlign) {
							toolbarAlign.some(
								function(node, index) {
									var instance = this;

									var active = node.StateInteraction.get('active');

									if (active) {
										img.setStyle('display', '');

										switch(index) {
											case 0:
												img.attr('align', 'left');

												break;

											case 1:
												img.attr('align', '');

												break;

											case 2:
												img.attr('align', 'center');
												img.setStyle('display', 'block');

												break;

											case 3:
												img.attr('align', 'right');

												break;
										}

										return true;
									}
								}
							);
						}

						if (url != null) {
							href.attr('href', url);

							if (hrefTarget.attr('checked')) {
								href.attr('target', '_blank');
							}

							href.append(img);

							img = href;
						}

						if (selection && selection.anchorNode) {
							selection.anchorNode.append(img)
						}

						overlay.hide();
					},
					instance
				);

				toolbar.render(imageForm.one('.' + CSS_BUTTON_HOLDER));

				var toolbarAlign = null;

				if (!config.hideAlign) {
					toolbarAlign = new A.Toolbar(
							{
								activeState: true,
								children: [
									{
										icon: 'align-left',
										title: EditorToolbarPlugin.STRINGS.ALIGN_LEFT
									},
									{
										icon: 'align-inline',
										title: EditorToolbarPlugin.STRINGS.ALIGN_INLINE
									},
									{
										icon: 'align-block',
										title: EditorToolbarPlugin.STRINGS.ALIGN_BLOCK
									},
									{
										icon: 'align-right',
										title: EditorToolbarPlugin.STRINGS.ALIGN_RIGHT
									}
								]
							}
						);

					toolbarAlign.on(
						'buttonitem:click',
						function(event) {
							var instance = this;

							var button = event.target;

							instance.each(
								function(node) {
									var instance = this;

									if (node != button) {
										node.StateInteraction.set('active', false);
									}
								}
							);
						}
					);

					toolbarAlign.render(imageForm.one('.' + CSS_INSERTIMAGE_CONTENT_ALIGN));
				}

				overlay.on(
					'hide',
					function(event) {
						var instance = this;

						instance.all('input').each(
							function(node) {
								var instance = this;

								node.val('');
							}
						);

						instance.all('select').each(
							function(node) {
								var instance = this;

								node.attr('selectedIndex', 0);
							}
						);

						if (toolbarAlign) {
							toolbarAlign.each(
								function(node) {
									var instance = this;

									node.StateInteraction.set('active', false);
								}
							);
						}

						hrefTarget.attr('checked', false);
					},
					imageForm
				);

				iframe.on(
					MOUSEOUT,
					function(event) {
						var instance = this;

						var frame = instance.getInstance();

						selection = new frame.Selection();
					},
					editor
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
		{ icon: 'insertunorderedlist', title: EditorToolbarPlugin.STRINGS.INSERT_UNORDERED_LIST },
		{ icon: 'insertorderedlist', title: EditorToolbarPlugin.STRINGS.INSERT_ORDERED_LIST }
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
		{ icon: 'format', title: EditorToolbarPlugin.STRINGS.REMOVE_FORMAT },
		{ icon: 'source', title: EditorToolbarPlugin.STRINGS.SOURCE }
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
							function(node) {
								var instance = this;

								node.removeAttribute('style');

								var html = node.get('innerHTML');

								html = html.replace(/<([a-zA-Z0-9]*)\b[^>]*>/g, '<$1>');

								for (var i = 0; i < CMD_FORMAT.length; i++) {
									var regExp = new RegExp('(<' + CMD_FORMAT[i] + '>|<\\/' + CMD_FORMAT[i] + '>)', 'ig');

									html = html.replace(regExp, '');
								}

								node.set('innerHTML', html);

								var parent = node.get('parentNode');

								if (parent && !parent.test('body')) {
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
					var instance = this;

					if (button._visible) {
						editor.set('content', textarea.val());

						textarea.hide();
						textarea.val('');

						frame.show();
					}
					else {
						var iframe = frame._iframe;

						textarea.val(editor.getContent());

						var offsetHeight = (
								iframe.get('offsetHeight') -
								parseInt(textarea.getComputedStyle('paddingTop')) -
								parseInt(textarea.getComputedStyle('paddingBottom'))
							);

						textarea.setStyle('height', offsetHeight + 'px');

						frame.hide();

						textarea.show();
					}

					button._visible = !button._visible;

					contentBox.all('select').attr('disabled', button._visible);
					contentBox.all('button').attr('disabled', button._visible);

					button.get('contentBox').attr('disabled', false);
				},
				editor
			);
		}
	}
};

GROUPS[STYLES] = {
	children: [
		{ icon: 'styles' }
	],
	generate: {
		styles: function(editor, attrs, config) {
			var instance = this;

			var button = attrs.button;
			var boundingBox = button.get('boundingBox');

			editor.plug(A.Plugin.EditorMenuPlugin);

			editor.menu.add(
				A.merge(
					{
						trigger: boundingBox,
						showOn: 'click',
						hideOn: 'click',
						align: {
							node: boundingBox,
							points: [ 'tl', 'bl' ]
						}
					},
					config
				)
			);
		}
	}
};

GROUPS[SUBSCRIPT] = {
	children: [
		{ icon: 'subscript', title: EditorToolbarPlugin.STRINGS.SUBSCRIPT },
		{ icon: 'superscript', title: EditorToolbarPlugin.STRINGS.SUPERSCRIPT }
	]
};

GROUPS[TEXT] = {
	children: [
		{ icon: 'bold', title: EditorToolbarPlugin.STRINGS.BOLD },
		{ icon: 'italic', title: EditorToolbarPlugin.STRINGS.ITALIC },
		{ icon: 'underline', title: EditorToolbarPlugin.STRINGS.UNDERLINE },
		{ icon: 'strikethrough', title: EditorToolbarPlugin.STRINGS.LINE_THROUGH }
	]
};

A.namespace('Plugin').EditorToolbarPlugin = EditorToolbarPlugin;