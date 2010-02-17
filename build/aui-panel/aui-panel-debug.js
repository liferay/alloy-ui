AUI.add('aui-panel', function(A) {
var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,

	BOUNDING_BOX = 'boundingBox',
	COLLAPSE = 'collapse',
	COLLAPSED = 'collapsed',
	COLLAPSIBLE = 'collapsible',
	ICON = 'icon',
	MINUS = 'minus',
	PANEL = 'panel',
	PLUS = 'plus',
	TITLE = 'title',
	TOOLS = 'tools',
	VISIBLE = 'visible',

	getClassName = A.ClassNameManager.getClassName,

	CSS_CLEARFIX = getClassName('helper', 'clearfix'),
	CSS_COLLAPSED = getClassName(PANEL, COLLAPSED),
	CSS_PANEL = getClassName(PANEL),
	CSS_PANEL_HD_TEXT = getClassName(PANEL, 'hd', 'text'),
	CSS_PANEL_TOOLSET = getClassName(PANEL, 'toolset'),

	CSS_PANELS = {
		body: 'bd',
		footer: 'ft',
		header: 'hd'
	},

	NODE_BLANK_TEXT = document.createTextNode(''),

	TPL_HEADER_TEXT = '<span class="' + CSS_PANEL_HD_TEXT + '"></span>';

var Panel = function() {};

Panel.ATTRS = {
	collapsed: {
		value: false,
		validator: isBoolean
	},

	collapsible: {
		value: false,
		validator: isBoolean
	},

	title: {
		value: '',
		validator: function(v) {
			return Lang.isString(v) || isBoolean(v);
		}
	},

	tools: {
		value: [],
		validator: isArray
	}
};

Panel.prototype = {
	/*
	* Lifecycle
	*/
	initializer: function(config) {
		var instance = this;

		if (!config.bodyContent) {
			instance.set('bodyContent', NODE_BLANK_TEXT);
		}

		if (!config.headerContent) {
			instance.set('headerContent', NODE_BLANK_TEXT);
		}

		instance.after('collapsedChange', instance._afterCollapsedChange);
		instance.after('render', instance._afterPanelRender);
		instance.after('titleChange', instance._afterTitleChange);
	},

	/*
	* Methods
	*/
	collapse: function() {
		var instance = this;

		instance.set(COLLAPSED, true);
	},

	expand: function() {
		var instance = this;

		instance.set(COLLAPSED, false);
	},

	toggle: function() {
		var instance = this;

		instance.set(
			VISIBLE,
			!instance.get(VISIBLE)
		);
	},

	toggleCollapse: function() {
		var instance = this;

		if (instance.get(COLLAPSED)) {
			instance.expand();
		}
		else {
			instance.collapse();
		}
	},

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

	_renderToolItems: function() {
		var instance = this;
		var tools = instance.get(TOOLS);

		if (instance.get(COLLAPSIBLE)) {
			var icon = instance.get(COLLAPSED) ? PLUS : MINUS;

			tools.unshift(
				{
					icon: icon,
					id: COLLAPSE,
					handler: {
						fn: instance.toggleCollapse,
						context: instance
					}
				}
			);
		}

		instance.toolset = new A.ToolSet(
			{
				tools: tools
			}
		)
		.render(instance.headerNode);

		instance.toolset.get(BOUNDING_BOX).addClass(CSS_PANEL_TOOLSET);
	},

	_renderHeaderText: function() {
		var instance = this;
		var headerNode = instance.headerNode;
		var headerTextNode = A.Node.create(TPL_HEADER_TEXT);
		var html = headerNode.html();

		headerNode.empty();

		headerTextNode.addClass(CSS_PANEL_HD_TEXT);

		headerNode.prepend(headerTextNode);

		instance.headerTextNode = headerTextNode;

		if (!instance.get(TITLE)) {
			instance.set(TITLE, html);
		}

		instance._syncTitleUI();
	},

	_syncCollapsedUI: function() {
		var instance = this;

		if (instance.get(COLLAPSIBLE)) {
			var bodyNode = instance.bodyNode;
			var boundingBox = instance.get(BOUNDING_BOX);
			var collapsed = instance.get(COLLAPSED);

			if (instance.toolset) {
				var toolset = instance.toolset;
				var collapseItem = toolset.tools.item(COLLAPSE);

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

	_syncTitleUI: function() {
		var instance = this;
		var title = instance.get(TITLE);

		instance.headerTextNode.html(title);
	},

	/*
	* Listeners
	*/
	_afterCollapsedChange: function(event) {
		var instance = this;

		instance._syncCollapsedUI();
	},

	_afterPanelRender: function(event) {
		var instance = this;

		instance.headerNode.addClass(CSS_CLEARFIX);

		instance._addPanelClass('body');
		instance._addPanelClass('footer');
		instance._addPanelClass('header');

		instance._renderHeaderText();
		instance._renderToolItems();

		instance._syncCollapsedUI();
	},

	_afterTitleChange: function(event) {
		var instance = this;

		instance._syncTitleUI();
	}
}

A.Panel = A.Base.build(PANEL, A.Component, [Panel, A.WidgetStdMod]);

}, '@VERSION@' ,{requires:['aui-component','widget-stdmod','aui-tool-set'], skinnable:true});
