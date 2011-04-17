AUI.add('aui-editor-menu-plugin', function(A) {
var Lang = A.Lang,
	isString = Lang.isString,

	getClassName = A.getClassName,

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
