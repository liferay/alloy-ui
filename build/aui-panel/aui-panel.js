AUI.add('aui-panel', function(A) {
/**
 * The Panel Utility - Panel is a container that has specific functionality
 * and structural components that make it the good for building block for
 * application-oriented user interfaces. Panel also provides built-in
 * expandable and collapsible behavior, along with a variety of prebuilt tool
 * buttons that can be wired up to provide other customized behavior. Panels
 * can be easily dropped into any Container or layout.
 *
 * @module aui-panel
 */

var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,

	WidgetStdMod = A.WidgetStdMod,

	DOC = A.config.doc,

	BOUNDING_BOX = 'boundingBox',
	COLLAPSE = 'collapse',
	COLLAPSED = 'collapsed',
	COLLAPSIBLE = 'collapsible',
	ICON = 'icon',
	ID = 'id',
	MINUS = 'minus',
	PANEL = 'panel',
	PLUS = 'plus',
	TITLE = 'title',
	ICONS = 'icons',
	USE_ARIA = 'useARIA',
	VISIBLE = 'visible',

	EMPTY_STR = '',

	getClassName = A.getClassName,

	CSS_CLEARFIX = getClassName('helper', 'clearfix'),
	CSS_COLLAPSED = getClassName(PANEL, COLLAPSED),
	CSS_PANEL = getClassName(PANEL),
	CSS_PANEL_HD_TEXT = getClassName(PANEL, 'hd', 'text'),
	CSS_PANEL_ICONS = getClassName(PANEL, 'icons'),

	CSS_PANELS = {
		body: 'bd',
		footer: 'ft',
		header: 'hd'
	},

	NODE_BLANK_TEXT = DOC.createTextNode(''),

	TPL_HEADER_TEXT = '<span class="' + CSS_PANEL_HD_TEXT + '"></span>';

/**
 * <p><img src="assets/images/aui-panel/main.png"/></p>
 *
 * A base class for Panel, providing:
 * <ul>
 *    <li>Widget Lifecycle (initializer, renderUI, bindUI, syncUI, destructor)</li>
 *    <li>Built-in expandable and collapsible behavior</li>
 *    <li>Prebuilt tool buttons that can be wired up to provide other customized behavior</li>
 *    <li>Good for building block for application-oriented user interfaces</li>
 *    <li>Can be easily dropped into any Container or layout</li>
 * </ul>
 *
 * Quick Example:<br/>
 *
 * <pre><code>var instance = new A.Panel({
 *	collapsible: true,
 *  collapsed: true,
 *	headerContent: 'Panel 1',
 *	bodyContent: 'Content'
 * }).render();
 * </code></pre>
 *
 * Check the list of <a href="Panel.html#configattributes">Configuration Attributes</a> available for
 * Panel.
 *
 * @class Panel
 * @constructor
 * @extends Component
 * @uses WidgetStdMod
 * @param config {Object} Object literal specifying widget configuration properties.
 */
var Panel = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the Panel.
 *
 * @property Panel.ATTRS
 * @type Object
 * @static
 */
Panel.ATTRS = {
	bodyContent: {
		value: EMPTY_STR
	},

	/**
	 * Whether the panel is displayed collapsed.
	 *
	 * @attribute collapsed
	 * @default false
	 * @type boolean
	 */
	collapsed: {
		value: false,
		validator: isBoolean
	},

	/**
	 * Whether the panel is able to be collapsed.
	 *
	 * @attribute collapsible
	 * @default false
	 * @type boolean
	 */
	collapsible: {
		value: false,
		validator: isBoolean
	},

	headerContent: {
		value: EMPTY_STR
	},

	/**
	 * The title to be displayed on the Panel.
	 *
	 * @attribute title
	 * @default ''
	 * @type Boolean | String
	 */
	title: {
		value: '',
		validator: function(v) {
			return Lang.isString(v) || isBoolean(v);
		}
	},

	/**
	 * <p>Array of <a href="ButtonItem.html">ButtonItem</a> configuration objects to be displayed as icons
     * on the Panel title.</p>
	 *
	 * Example:
	 *
	 * <pre><code>icons: [ { icon: 'close', id: 'close' } ]</code></pre>
	 *
	 * For more information how to use this option see
     * <a href="ButtonItem.html">ButtonItem</a>.
	 *
	 * @attribute icons
	 * @default []
	 * @type Array
	 */
	icons: {
		value: [],
		validator: isArray
	},

	/**
	 * @attribute strings
	 * @description Collection of strings used to label elements of the Panel's UI.
	 * @default null
	 * @type Object
	 */
	strings: {
		value: {
			toggle: 'Toggle collapse'
		}
	},

	/**
	 * True if Panel should use ARIA plugin
	 *
	 * @attribute useARIA
	 * @default true
	 * @type Boolean
	 */
	useARIA: {
		value: true
	}
};

Panel.prototype = {
	/**
	 * Construction logic executed during Panel instantiation. Lifecycle.
	 *
	 * @method initializer
	 * @protected
	 */
	initializer: function(config) {
		var instance = this;

		instance.after('collapsedChange', instance._afterCollapsedChange);
		instance.after('render', instance._afterPanelRender);
		instance.after('titleChange', instance._afterTitleChange);
	},

	/**
     * Refreshes the rendered UI, based on Widget State
     *
     * @method syncUI
     * @protected
     *
     */
	syncUI: function() {
		var instance = this;

		if (instance.get(USE_ARIA)) {
			instance.plug(A.Plugin.Aria, {
				after: {
					processAttribute: function(event) {
						var instance = this;

						var host = instance.get('host');

						if (event.aria.attrName == COLLAPSED) {
							var collapsed = host.get(COLLAPSED);

							if (host.icons) {
								var icons = host.icons;
								var collapseItem = icons.item(COLLAPSE);

								if (collapseItem) {
									instance.setAttribute(
										'pressed',
										collapsed,
										collapseItem.get(BOUNDING_BOX)
									);
								}
							}

							instance.setAttribute(
								'hidden',
								 collapsed,
								 host.bodyNode
							);

							event.halt();
						}
					}
				},
				attributes: {
					collapsed: 'hidden'
				}
			});
		}
	},

	/**
	 * Collapse the panel setting the
     * <a href="Panel.html#config_collapsed">collapsed</a> attribute to
     * <code>true</code>.
	 *
	 * @method collapse
	 */
	collapse: function() {
		var instance = this;

		instance.set(COLLAPSED, true);
	},

	/**
	 * Expand the panel setting the
     * <a href="Panel.html#config_collapsed">collapsed</a> attribute to
     * <code>false</code>.
	 *
	 * @method expand
	 */
	expand: function() {
		var instance = this;

		instance.set(COLLAPSED, false);
	},

	/**
	 * Toggle the visibility of the Panel toggling the value of the
     * <a href="Widget.html#config_visible">visible</a> attribute.
	 *
	 * @method toggle
	 */
	toggle: function() {
		var instance = this;

		instance.set(
			VISIBLE,
			!instance.get(VISIBLE)
		);
	},

	/**
	 * Toggle the <a href="Panel.html#config_collapsed">collapsed</a> value.
     * Expanding and collapsing the Panel.
	 *
	 * @method toggleCollapse
	 */
	toggleCollapse: function() {
		var instance = this;

		if (instance.get(COLLAPSED)) {
			instance.expand();
		}
		else {
			instance.collapse();
		}
	},

	/**
	 * Add css classes neede for the Panel in the passed <code>section</code>.
	 *
	 * @method _addPanelClass
	 * @param {String} section <a href="WidgetStdMod.html">WidgetStdMod</a> section (i.e., body, header, footer).
	 * @protected
	 */
	_addPanelClass: function(section) {
		var instance = this;

		var sectionNode = instance[section + 'Node'];

		if (sectionNode) {
			var rootCssClass = CSS_PANELS[section];
			var cssClassMod = getClassName(PANEL, rootCssClass);

			// using instance.name to add the correct component name
			// when Panel is used to build another component using A.build
			var instanceName = instance.name;
			var cssClass = getClassName(instanceName, rootCssClass);

			sectionNode.addClass(cssClassMod);
			sectionNode.addClass(cssClass);
		}
	},

	/**
	 * Render the <a href="Panel.html#config_icons">icons</a>.
	 *
	 * @method _renderIconButtons
	 * @protected
	 */
	_renderIconButtons: function() {
		var instance = this;
		var icons = instance.get(ICONS);

		if (instance.get(COLLAPSIBLE)) {
			var icon = instance.get(COLLAPSED) ? PLUS : MINUS;

			icons.unshift(
				{
					icon: icon,
					id: COLLAPSE,
					handler: {
						fn: instance.toggleCollapse,
						context: instance
					},
					title: instance.get('strings').toggle
				}
			);
		}

		instance.icons = new A.Toolbar(
			{
				children: icons
			}
		)
		.render(instance.headerNode);

		var toolbarBoundingBox = instance.icons.get(BOUNDING_BOX);

		toolbarBoundingBox.addClass(CSS_PANEL_ICONS);

		instance.setStdModContent(WidgetStdMod.HEADER, toolbarBoundingBox, WidgetStdMod.BEFORE);
	},

	/**
	 * Render the Panel header text with the value of
     * <a href="Panel.html#config_title">title</a>.
	 *
	 * @method _renderHeaderText
	 * @protected
	 */
	_renderHeaderText: function() {
		var instance = this;

		/**
		 * Stores the created node for the header of the Panel.
		 *
		 * @property headerTextNode
		 * @type Node
		 * @protected
		 */
		instance.headerTextNode = A.Node.create(TPL_HEADER_TEXT).addClass(CSS_PANEL_HD_TEXT);

		if (!instance.get(TITLE)) {
			instance.set(TITLE, instance.headerNode.html());
		}

		instance.setStdModContent(WidgetStdMod.HEADER, EMPTY_STR);

		instance._syncTitleUI();
	},

	/**
	 * Sync the UI for the collapsed status (i.e., icons, height etc).
	 *
	 * @method _syncCollapsedUI
	 * @protected
	 */
	_syncCollapsedUI: function() {
		var instance = this;

		if (instance.get(COLLAPSIBLE)) {
			var bodyNode = instance.bodyNode;
			var boundingBox = instance.get(BOUNDING_BOX);
			var collapsed = instance.get(COLLAPSED);

			if (instance.icons) {
				var icons = instance.icons;
				var collapseItem = icons.item(COLLAPSE);

				if (collapseItem) {
					collapseItem.set(
						ICON,
						collapsed ? PLUS : MINUS
					);
				}
			}

			if (collapsed) {
				bodyNode.hide();
				boundingBox.addClass(CSS_COLLAPSED);
			}
			else {
				bodyNode.show();
				boundingBox.removeClass(CSS_COLLAPSED);
			}
		}
	},

	/**
	 * Sync the
     * <a href="Panel.html#property_headerTextNode">headerTextNode</a> with the
     * value of the <a href="Panel.html#config_title">title</a>.
	 *
	 * @method _syncTitleUI
	 * @protected
	 */
	_syncTitleUI: function() {
		var instance = this;

		var headerTextNode = instance.headerTextNode;

		var title = instance.get(TITLE);

		headerTextNode.html(title);

		instance.setStdModContent(WidgetStdMod.HEADER, headerTextNode, WidgetStdMod.BEFORE);
	},

	/**
	 * Fires after the value of
     * <a href="Panel.html#config_collapsed">collapsed</a> change.
	 *
	 * @method _afterCollapsedChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterCollapsedChange: function(event) {
		var instance = this;

		instance._syncCollapsedUI();
	},

	/**
	 * Fires after render phase.
	 *
	 * @method _afterPanelRender
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterPanelRender: function(event) {
		var instance = this;

		instance.headerNode.addClass(CSS_CLEARFIX);

		instance._addPanelClass('body');
		instance._addPanelClass('footer');
		instance._addPanelClass('header');

		instance._renderHeaderText();
		instance._renderIconButtons();

		instance.get('contentBox').setAttribute('role', 'tablist');

		instance._syncCollapsedUI();

		instance._setDefaultARIAValues();
	},

	/**
	 * Fires after the value of
     * <a href="Panel.html#config_title">title</a> change.
	 *
	 * @method _afterTitleChange
	 * @param {EventFacade} event
	 * @protected
	 */
	_afterTitleChange: function(event) {
		var instance = this;

		instance._syncTitleUI();
	},

	/**
	 * Set default ARIA roles and attributes.
	 * @method _setDefaultARIAValues
	 * @protected
	 */
	_setDefaultARIAValues: function() {
		var instance = this;

		if (!instance.get(USE_ARIA)) {
			return;
		}

		var headerNode = instance.headerNode;

		var headerNodeId = headerNode.generateID();

		var bodyNode = instance.bodyNode;

		var bodyNodeId = bodyNode.generateID();

		var ariaRoles = [
			{
				name: 'tab',
				node: headerNode
			},
			{
				name: 'tabpanel',
				node: bodyNode
			}
		];

		instance.aria.setRoles(ariaRoles);

		var ariaAttributes = [
			{
				name: 'controls',
				value: bodyNodeId,
				node: headerNode
			},
			{
				name: 'labelledby',
				value: headerNodeId,
				node: bodyNode
			},
			{
				name: 'describedby',
				value: headerNodeId,
				node: bodyNode
			}
		];

		if (instance.icons) {
			var collapseItem = instance.icons.item(COLLAPSE);

			if (collapseItem) {
				ariaAttributes.push(
					{
						name: 'controls',
						value: bodyNodeId,
						node: collapseItem.get(BOUNDING_BOX)
					}
				);
			}
		}

		instance.aria.setAttributes(ariaAttributes);
	}
}

A.Panel = A.Component.build(PANEL, A.Component, [A.WidgetStdMod, Panel]);

}, '@VERSION@' ,{requires:['aui-component','widget-stdmod','aui-toolbar','aui-aria'], skinnable:true});
