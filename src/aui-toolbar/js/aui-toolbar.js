/**
 * The Toolbar Component
 *
 * @module aui-toolbar
 */

var Lang = A.Lang,
    isArray = Lang.isArray,
    isString = Lang.isString,
    isFunction = Lang.isFunction,

    BOUNDING_BOX = 'boundingBox',
    BTN = 'btn',
    BUTTON = 'button',
    CHECKBOX = 'checkbox',
    CHILDREN = 'children',
    CLICK = 'click',
    CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
    ENCLOSING_WIDGET_INITIALIZED = 'enclosingWidgetInitialized',
    FOCUS = 'focus',
    GROUP = 'group',
    ID = 'id',
    MOUSEMOVE = 'mousemove',
    NORMAL = 'normal',
    RADIO = 'radio',
    TITLE = 'title',
    TOOLBAR = 'toolbar',
    TOOLBAR_RENDERER = 'toolbarRenderer',
    VERTICAL = 'vertical',

    _DOT = '.',
    _SPACE = ' ',

    getCN = A.getClassName,

    CSS_BTN = getCN(BTN),
    CSS_BTN_GROUP = getCN(BTN, GROUP),
    CSS_BTN_GROUP_CHECKBOX = getCN(BTN, GROUP, CHECKBOX),
    CSS_BTN_GROUP_RADIO = getCN(BTN, GROUP, RADIO),
    CSS_BTN_GROUP_VERTICAL = getCN(BTN, GROUP, VERTICAL);

/**
 * A base class for Toolbar.
 *
 * Check the [live demo](http://alloyui.com/examples/toolbar/).
 *
 * @class A.Toolbar
 * @extends A.Component
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
A.Toolbar = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property Toolbar.NAME
     * @type String
     * @static
     */
    NAME: TOOLBAR,

    /**
     * Static property used to define the default attribute
     * configuration for the Toolbar.
     *
     * @property Toolbar.ATTRS
     * @type Object
     * @static
     */
    ATTRS: {

        /**
         * A list of child elements.
         *
         * @attribute children
         * @type Array
         */
        children: {
            validator: isArray
        },

        /**
         * Define a new <code>ToolbarRenderer</code>.
         *
         * @attribute toolbarRenderer
         * @value A.ToolbarRenderer
         */
        toolbarRenderer: {
            valueFn: function() {
                return new A.ToolbarRenderer();
            }
        }
    },

    /**
     * Static property used to define the UI attributes.
     *
     * @property Toolbar.UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: [CHILDREN],

    /**
     * Check if type is supported.
     *
     * @method A.Toolbar.isSupportedWidget
     * @param o
     * @static
     */
    isSupportedWidget: function(o) {
        return  A.instanceOf(o, A.Button) ||
                A.instanceOf(o, A.ToggleButton) ||
                A.instanceOf(o, A.ButtonGroup);
    },

    prototype: {

        /**
         * Static property provide a content template.
         *
         * @property CONTENT_TEMPLATE
         * @default null
         * @static
         */
        CONTENT_TEMPLATE: null,

        /**
         * Static property provide a group of templates.
         *
         * @property TEMPLATES
         * @type Object
         * @static
         */
        TEMPLATES: {
            button: '<button class="aui-btn">{content}</button>',
            icon:   '<i class="{cssClass}"></i>',
            group:  '<div class="aui-btn-group {cssClass}"></div>'
        },

        /**
         * Bind the events on the Toolbar UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            boundingBox.delegate([CLICK, MOUSEMOVE, FOCUS], instance._onUserInitInteraction, _DOT+CSS_BTN, instance);
        },

        /**
         * Insert children on Toolbar.
         *
         * @method add
         * @param children
         * @param where
         */
        add: function(children, where) {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX),
                toolbarRenderer = instance.get(TOOLBAR_RENDERER);

            boundingBox.insert(toolbarRenderer.render(A.Array(children)), where);
        },

        /**
         * Clear children from Toolbar.
         *
         * @method clear
         */
        clear: function() {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            boundingBox.get(CHILDREN).remove();
        },

        /**
         * Find the first ancestor node that is a widget bounding box.
         *
         * @method getEnclosingWidget
         * @param seed
         */
        getEnclosingWidget: function(seed) {
            if (A.instanceOf(seed, A.EventFacade)) {
                seed = seed.domEvent ? seed.domEvent.target : seed.target;
            }
            return A.Widget.getByNode(seed);
        },

        /**
         * Get a certain item based on its index.
         *
         * @method item
         * @param index
         */
        item: function(index) {
            var instance = this,
                seed = instance.get(BOUNDING_BOX).get(CHILDREN).item(index),
                widget;

            instance._initEnclosingWidgetIfNeeded(seed);

            widget = instance.getEnclosingWidget(seed);

            if (A.Toolbar.isSupportedWidget(widget)) {
                return widget;
            }

            return seed;
        },

        /**
         * Remove children from Toolbar.
         *
         * @method remove
         * @param where
         */
        remove: function(where) {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            return boundingBox.get(CHILDREN).item(where).remove();
        },

        /**
         * Fire on user's first interaction.
         *
         * @method _onUserInitInteraction
         * @param event
         * @protected
         */
        _onUserInitInteraction: function(event) {
            var instance = this,
                currentTarget = event.currentTarget;

            instance._initEnclosingWidgetIfNeeded(currentTarget);
        },

        /**
         * Init enclosing widget if needed.
         *
         * @method _initEnclosingWidgetIfNeeded
         * @param seed
         * @protected
         */
        _initEnclosingWidgetIfNeeded: function(seed) {
            if (!seed || seed.getData(ENCLOSING_WIDGET_INITIALIZED)) {
                return;
            }
            seed.setData(ENCLOSING_WIDGET_INITIALIZED, true);

            var enclosingWidget = A.Widget.getByNode(seed),
                isAlreadyButton = A.instanceOf(enclosingWidget, A.Button),
                isAlreadyButtonGroup = A.instanceOf(enclosingWidget, A.ButtonGroup);

            if (isAlreadyButton || isAlreadyButtonGroup) {
                return;
            }

            var buttonNode = seed.ancestor(_DOT+CSS_BTN, true);
            if (buttonNode) {
                // Initialize button first since it can be outside a group
                if (A.Button.hasWidgetLazyConstructorData(seed)) {
                    new A.Button(A.Button.getWidgetLazyConstructorFromNodeData(seed));
                    A.Button.setWidgetLazyConstructorNodeData(seed, null);
                }
                else {
                    seed.plug(A.Plugin.Button);
                }
            }

            var groupNode = seed.ancestor(_DOT+CSS_BTN_GROUP, true);
            if (groupNode) {
                var type;
                if (groupNode.hasClass(CSS_BTN_GROUP_CHECKBOX)) {
                    type = CHECKBOX;
                }
                else if (groupNode.hasClass(CSS_BTN_GROUP_RADIO)) {
                    type = RADIO;
                }

                if (type) {
                    new A.ButtonGroup({
                        boundingBox: groupNode,
                        type: type,
                        render: true
                    });
                }
            }
        },

        /**
         * Set <code>children</code> attribute on the UI.
         *
         * @method _uiSetChildren
         * @param val
         * @protected
         */
        _uiSetChildren: function(val) {
            var instance = this;

            if (!val) {
                return;
            }

            instance.clear();

            instance.add(val);
        }
    }
});

/**
 * A base class for ToolbarRenderer.
 *
 * Check the [live demo](http://alloyui.com/examples/toolbar/).
 *
 * @class A.ToolbarRenderer
 * @param config {Object} Object literal specifying widget configuration properties.
 * @constructor
 */
var ToolbarRenderer = function() {};

ToolbarRenderer.prototype = {

    /**
     * Static property provides a set of templates.
     *
     * @property ToolbarRenderer.TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        button: A.Button.prototype.TEMPLATE,
        group:  '<div class="' + CSS_BTN_GROUP + ' {cssClass}"></div>',
        icon:   '<i class="{cssClass}" />'
    },

    /**
     * Static property used to define how
     * things are going to be rendered.
     *
     * @property ToolbarRenderer.RENDERER
     * @type Object
     * @static
     */
    RENDERER: {

        /**
         * Define how a button should be rendered.
         *
         * @method button
         * @param childRenderHints
         */
        button: function(childRenderHints) {
            var instance = this,
                value = childRenderHints.value,
                type = value.domType || BUTTON,
                cssClass,
                buttonNode;

            if (A.instanceOf(value, A.Button) ||
                A.instanceOf(value, A.ToggleButton)) {

                return value.get(BOUNDING_BOX);
            }

            // Add node reference support
            buttonNode = A.one(value.boundingBox || value.srcNode);
            if (buttonNode) {
                // IE6- fails when setting type on created input elements, try to
                // silently fails when that happens.
                try {
                    // Add type support
                    buttonNode.setAttribute('type', type);
                }
                catch(err) {}
            }
            else {
                buttonNode = A.Node.create(
                    A.ButtonExt.getTypedButtonTemplate(
                        instance.TEMPLATES.button, type));
            }

            // Add cssClass support
            cssClass = [ CSS_BTN, value.cssClass ];
            if (value.primary) {
                cssClass.push(A.ButtonCore.CLASS_NAMES.PRIMARY);
            }
            buttonNode.addClass(cssClass.join(_SPACE));

            // Add id support
            if (value.id) {
                buttonNode.setAttribute(ID, value.id);
            }

            // Add label support
            if (value.label) {
                buttonNode.append(value.label);
            }

            // Add icon support
            if (value.icon) {
                var iconContent = Lang.sub(instance.TEMPLATES.icon, {
                        cssClass: value.icon
                    });

                A.Button.syncIconUI(buttonNode, iconContent, value.iconAlign);
            }

            // Add title support
            if (value.title) {
                buttonNode.attr(TITLE, value.title);
            }

            A.Button.setWidgetLazyConstructorNodeData(buttonNode, value);
            return buttonNode;
        },

        /**
         * Define how a group should be rendered.
         *
         * @method group
         * @param childRenderHints
         */
        group: function(childRenderHints) {
            var instance = this,
                value = childRenderHints.value,
                groupType = childRenderHints.groupType,
                orientation = childRenderHints.orientation,
                cssClass = [];

            if (A.instanceOf(value, A.ButtonGroup)) {
                return value.get(BOUNDING_BOX);
            }

            if (groupType === CHECKBOX) {
                cssClass.push(CSS_BTN_GROUP_CHECKBOX);
            }
            else if (groupType === RADIO) {
                cssClass.push(CSS_BTN_GROUP_RADIO);
            }

            if (orientation === VERTICAL) {
                cssClass.push(CSS_BTN_GROUP_VERTICAL);
            }

            var groupNode = A.Node.create(
                    Lang.sub(instance.TEMPLATES.group, { cssClass: cssClass.join(_SPACE) }));

            A.Array.each(value, function(child, index) {
                var childNode = instance.renderNode(child);

                groupNode.appendChild(childNode);

                // If it is already a supported widget type, do not set lazy
                // constructor for further initialization.
                if (!A.Toolbar.isSupportedWidget(child)) {
                    A.Button.setWidgetLazyConstructorNodeData(childNode, value[index]);
                }
            });
            return groupNode;
        }
    },

    /**
     * Render children in a document fragment.
     *
     * @method render
     * @param children
     */
    render: function(children) {
        var instance = this;

        if (!children) {
            return;
        }
        var docFrag = A.one(A.config.doc).invoke(CREATE_DOCUMENT_FRAGMENT);
        A.Array.each(children, function(child) {
            docFrag.appendChild(instance.renderNode(child));
        });
        return docFrag;
    },

    /**
     * Render node.
     *
     * @method renderNode
     * @param child
     */
    renderNode: function(child) {
        var instance = this,
            childRenderHints,
            renderer;

        if (A.Toolbar.isSupportedWidget(child)) {
            return child.render().get(BOUNDING_BOX);
        }

        childRenderHints = instance._getChildRenderHints(child);
        renderer = instance.RENDERER[childRenderHints.renderer];

        if (isFunction(renderer)) {
            return renderer.call(instance, childRenderHints);
        }
    },

    /**
     * Get child render hints.
     *
     * @method _getChildRenderHints
     * @param child
     * @return Object
     * @protected
     */
    _getChildRenderHints: function(child) {
        var groupType = null,
            orientation = NORMAL,
            renderer;

        if (A.instanceOf(child, A.Button)) {
            renderer = BUTTON;
        }
        else if (A.instanceOf(child, A.ButtonGroup)) {
            renderer = GROUP;
        }
        else if (isArray(child)) {
            renderer = GROUP;
            groupType = isString(child[0]) ? child.shift() : null;
            orientation = isString(child[0]) ? child.shift() : NORMAL;
        }
        else {
            renderer = BUTTON;
        }
        return {
            groupType: groupType,
            orientation: orientation,
            renderer: renderer,
            value: child
        };
    }
};

A.ToolbarRenderer = ToolbarRenderer;