/**
 * The Toolbar Component
 *
 * @module aui-toolbar
 */

var isFunction = A.Lang.isFunction,
    CSS_BTN = A.getClassName('btn'),
    CSS_BTN_DEFAULT = A.getClassName('btn', 'default'),
    CSS_BTN_GROUP = A.getClassName('btn', 'group'),
    CSS_BTN_GROUP_CHECKBOX = A.getClassName('btn', 'group', 'checkbox'),
    CSS_BTN_GROUP_RADIO = A.getClassName('btn', 'group', 'radio'),
    CSS_BTN_GROUP_VERTICAL = A.getClassName('btn', 'group', 'vertical'),
    CSS_BTN_TOOLBAR = A.getClassName('btn', 'toolbar', 'button');

/**
 * A base class for Toolbar.
 *
 * Check the [live demo](http://alloyui.com/examples/toolbar/).
 *
 * @class A.Toolbar
 * @extends A.Component
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 * @include http://alloyui.com/examples/toolbar/basic-markup.html
 * @include http://alloyui.com/examples/toolbar/basic.js
 */
A.Toolbar = A.Component.create({

    /**
     * Static property provides a string to identify the class.
     *
     * @property NAME
     * @type String
     * @static
     */
    NAME: 'btn-toolbar',

    /**
     * Static property used to define the default attribute
     * configuration for the Toolbar.
     *
     * @property ATTRS
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
            validator: A.Lang.isArray
        },

        /**
         * Define a new `ToolbarRenderer`.
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
     * @property UI_ATTRS
     * @type Array
     * @static
     */
    UI_ATTRS: ['children'],

    /**
     * Check if type is supported.
     *
     * @method A.Toolbar.isSupportedWidget
     * @param o
     * @static
     */
    isSupportedWidget: function(o) {
        return A.instanceOf(o, A.Button) ||
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
            icon: '<span class="{cssClass}"></span>',
            group: '<div class="aui-btn-group {cssClass}"></div>'
        },

        /**
         * Bind the events on the Toolbar UI. Lifecycle.
         *
         * @method bindUI
         * @protected
         */
        bindUI: function() {
            var boundingBox = this.get('boundingBox');

            boundingBox.delegate(
                ['click', 'mousemove', 'focus'], this._onUserInitInteraction, '.' + CSS_BTN_TOOLBAR + ', .' + CSS_BTN,
                this);
        },

        /**
         * Insert children on Toolbar.
         *
         * @method add
         * @param children
         * @param where
         */
        add: function(children, where) {
            var boundingBox = this.get('boundingBox'),
                toolbarRenderer = this.get('toolbarRenderer');

            boundingBox.insert(toolbarRenderer.render(A.Array(children)), where);
        },

        /**
         * Clear children from Toolbar.
         *
         * @method clear
         */
        clear: function() {
            var boundingBox = this.get('boundingBox');

            boundingBox.get('children').remove();
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
            var seed = this.get('boundingBox').get('children').item(index),
                widget;

            this._initEnclosingWidgetIfNeeded(seed);

            widget = this.getEnclosingWidget(seed);

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
            var boundingBox = this.get('boundingBox');

            return boundingBox.get('children').item(where).remove();
        },

        /**
         * Init enclosing widget if needed.
         *
         * @method _initEnclosingWidgetIfNeeded
         * @param seed
         * @protected
         */
        _initEnclosingWidgetIfNeeded: function(seed, event) {
            var buttonNode,
                enclosingWidget,
                isAlreadyButton,
                isAlreadyButtonGroup,
                groupNode,
                type;

            if (!seed || seed.getData('enclosingWidgetInitialized')) {
                return;
            }

            seed.setData('enclosingWidgetInitialized', true);

            enclosingWidget = A.Widget.getByNode(seed),
            isAlreadyButton = A.instanceOf(enclosingWidget, A.Button),
            isAlreadyButtonGroup = A.instanceOf(enclosingWidget, A.ButtonGroup);

            if (isAlreadyButton || isAlreadyButtonGroup) {
                return;
            }

            buttonNode = seed.ancestor('.' + CSS_BTN_TOOLBAR + ', .' + CSS_BTN, true);

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

            groupNode = seed.ancestor('.' + CSS_BTN_GROUP + ', ' + CSS_BTN_GROUP_VERTICAL, true);
            if (groupNode) {
                if (groupNode.hasClass(CSS_BTN_GROUP_CHECKBOX)) {
                    type = 'checkbox';
                }
                else if (groupNode.hasClass(CSS_BTN_GROUP_RADIO)) {
                    type = 'radio';
                }

                if (type) {
                    new A.ButtonGroup({
                        boundingBox: groupNode,
                        type: type,
                        render: true
                    });
                }
            }

            if (event && (event.type === 'focus')) {
                seed.focus();
            }
        },

        /**
         * Fire on user's first interaction.
         *
         * @method _onUserInitInteraction
         * @param event
         * @protected
         */
        _onUserInitInteraction: function(event) {
            var currentTarget = event.currentTarget;

            this._initEnclosingWidgetIfNeeded(currentTarget, event);
        },

        /**
         * Set `children` attribute on the UI.
         *
         * @method _uiSetChildren
         * @param val
         * @protected
         */
        _uiSetChildren: function(val) {
            if (!val) {
                return;
            }

            this.clear();

            this.add(val);
        }
    }
});

/**
 * A base class for ToolbarRenderer.
 *
 * Check the [live demo](http://alloyui.com/examples/toolbar/).
 *
 * @class A.ToolbarRenderer
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
var ToolbarRenderer = function() {};

ToolbarRenderer.prototype = {

    /**
     * Static property provides a set of templates.
     *
     * @property TEMPLATES
     * @type Object
     * @static
     */
    TEMPLATES: {
        button: A.Button.prototype.TEMPLATE,
        group: '<div class="{cssClass}"></div>',
        icon: '<span class="{cssClass}"></span>'
    },

    /**
     * Static property used to define how
     * things are going to be rendered.
     *
     * @property RENDERER
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
            var buttonInstance,
                buttonNode,
                cssClass,
                iconContent,
                type,
                value = childRenderHints.value;

            type = value.domType || 'button';

            if (A.instanceOf(value, A.Button) ||
                A.instanceOf(value, A.ToggleButton)) {

                return value.get('boundingBox');
            }

            if (A.UA.mobile && A.UA.touchEnabled) {
                buttonInstance = new A.Button(value).render();

                // Add title support
                if (value.title) {
                    buttonInstance.get('boundingBox').setAttribute('title', value.title);
                }

                return buttonInstance.get('boundingBox');
            }

            // Add node reference support
            buttonNode = A.one(value.boundingBox || value.srcNode);
            if (buttonNode) {
                // IE6- fails when setting type on created input elements, try
                // to silently fails when that happens.
                try {
                    // Add type support
                    buttonNode.setAttribute('type', type);
                }
                catch (err) {}
            }
            else {
                buttonNode = A.Node.create(
                    A.ButtonExt.getTypedButtonTemplate(
                        this.TEMPLATES.button, type));
            }

            // Add cssClass support
            cssClass = [CSS_BTN_TOOLBAR, value.cssClass];

            if (!value.discardDefaultButtonCssClasses) {
                cssClass.push(CSS_BTN, CSS_BTN_DEFAULT);
            }

            buttonNode.addClass(cssClass.join(' '));

            // Add id support
            if (value.id) {
                buttonNode.setAttribute('id', value.id);
            }

            // Add labelHTML support because the label attribuite is sanitized on A.Button class
            if (value.labelHTML) {
                buttonNode.append(value.labelHTML);
            }

            // Add label support
            if (value.label) {
                buttonNode.append(value.label);
            }

            // Add icon support
            if (value.icon) {
                iconContent = A.Lang.sub(this.TEMPLATES.icon, {
                    cssClass: value.icon
                });

                A.Button.syncIconUI(buttonNode, iconContent, value.iconAlign);
            }

            // Add title support
            if (value.title) {
                buttonNode.setAttribute('title', value.title);
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
            var childNode,
                instance = this,
                value = childRenderHints.value,
                groupNode,
                groupType = childRenderHints.groupType,
                orientation = childRenderHints.orientation,
                cssClass = [];

            if (A.instanceOf(value, A.ButtonGroup)) {
                return value.get('boundingBox');
            }

            if (groupType === 'checkbox') {
                cssClass.push(CSS_BTN_GROUP_CHECKBOX);
            }
            else if (groupType === 'radio') {
                cssClass.push(CSS_BTN_GROUP_RADIO);
            }

            if (orientation === 'vertical') {
                cssClass.push(CSS_BTN_GROUP_VERTICAL);
            }
            else {
                cssClass.push(CSS_BTN_GROUP);
            }

            groupNode = A.Node.create(
                A.Lang.sub(instance.TEMPLATES.group, {
                    cssClass: cssClass.join(' ')
                }));

            A.Array.each(value, function(child, index) {
                childNode = instance.renderNode(child);

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
        var docFrag,
            instance = this;

        if (!children) {
            return;
        }
        docFrag = A.one(A.config.doc).invoke('createDocumentFragment');
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
        var childRenderHints,
            renderer;

        if (A.Toolbar.isSupportedWidget(child)) {
            return child.render().get('boundingBox');
        }

        childRenderHints = this._getChildRenderHints(child);
        renderer = this.RENDERER[childRenderHints.renderer];

        if (isFunction(renderer)) {
            return renderer.call(this, childRenderHints);
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
            orientation = 'normal',
            renderer;

        if (A.instanceOf(child, A.Button)) {
            renderer = 'button';
        }
        else if (A.instanceOf(child, A.ButtonGroup)) {
            renderer = 'group';
        }
        else if (A.Lang.isArray(child)) {
            renderer = 'group';
            groupType = A.Lang.isString(child[0]) ? child.shift() : null;
            orientation = A.Lang.isString(child[0]) ? child.shift() : 'normal';
        }
        else {
            renderer = 'button';
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
