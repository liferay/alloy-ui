AUI.add('aui-editor-menu-plugin', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,

	getClassName = A.ClassNameManager.getClassName,

	NAME = 'editormenu',
	NAME_PLUGIN = 'editormenuplugin',
	EDITORMENU_PLUGIN = 'menu',

	CONTENT = 'content',

	CSS_MENU_CONTENT_LIST = getClassName(NAME, CONTENT, 'list'),
	CSS_MENU_CONTENT_TEXT = getClassName(NAME, CONTENT, 'text'),
	CSS_MENU_CONTENT_ITEM = getClassName(NAME, CONTENT, 'item'),

	TPL_TAG_EMPTY = '<{1}{2}>{0}</{1}>',
	TPL_MENU_CONTENT_LIST = '<ul class="' + CSS_MENU_CONTENT_LIST + '"></ul>',
	TPL_MENU_CONTENT_TEXT = '<li class="' + CSS_MENU_CONTENT_TEXT + '"><span>{0}</span></li>',
	TPL_MENU_CONTENT_ITEM = '<li class="' + CSS_MENU_CONTENT_ITEM + '">' + TPL_TAG_EMPTY + '</li>';

	function generateTagAttr(config) {
		var output = '';

		if (config.attributes) {
			for (var i in config.attributes) {
				output += ' ' + i + '="' + config.attributes[i] + '"';
			}
		}

		if (config.styles) {
			output = ' style="';

			for (var i in config.styles) {
				output += i + ': ' + config.styles[i] + ';';
			}

			output += '"';
		}

		return output;
	}

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

					var	contentBox = instance.get('contentBox'),
						headerContent = instance._headerContent,
						items = instance.get('items');

					var menuList = A.Node.create(TPL_MENU_CONTENT_LIST);

					A.each(
						items,
						function(config) {
							var output = '';

							if (isString(config)) {
								output += Lang.sub(TPL_MENU_CONTENT_TEXT, [config]);
							}
							else {
								var attr = generateTagAttr(config);

								output += Lang.sub(TPL_MENU_CONTENT_ITEM, [config.label, config.tag, attr]);
							}

							var item = A.Node.create(output);
							item.setData(NAME, config);

							menuList.append(item);
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

					var host = instance.get('host');

					var menuList = instance._menuList;

					menuList.delegate(
						'click',
						function(event) {
							var instance = this;

							var item = event.currentTarget,
								config = item.getData(NAME);

							var attr = generateTagAttr(config),
								output = Lang.sub(TPL_TAG_EMPTY, ['{0}', config.tag, attr]);

							host.execCommand('wraphtml', output);
							host.focus();

							instance.hide();
						},
						'.' + CSS_MENU_CONTENT_ITEM,
						instance
					);
				},

				_uiSetHeight: function(val) {
					var instance = this;

					var	boundingBox = instance.get('boundingBox'),
						menuList = instance._menuList;

					boundingBox.setStyle('height', 'auto');

					menuList.setStyle('height', val);
				},

				_uiSetWidth: function(val) {
					var instance = this;
					
					var	boundingBox = instance.get('boundingBox'),
						menuList = instance._menuList;

					boundingBox.setStyle('width', 'auto');

					menuList.setStyle('width', val);
				}
			}
		}
	);

var EditorMenuPlugin = A.Component.create(
		{
			NAME: NAME_PLUGIN,

			NS: EDITORMENU_PLUGIN,

			EXTENDS: A.Plugin.Base,

			ATTRS: {
				host: {
					value: false
				}
			},

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

A.namespace('Plugin').EditorMenuPlugin = EditorMenuPlugin;

}, '@VERSION@' ,{requires:['aui-base','editor-base','aui-overlay-context','aui-panel','aui-editor-tools-plugin']});
