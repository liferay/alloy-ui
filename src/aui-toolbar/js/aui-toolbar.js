var Lang = A.Lang,
    isArray = Lang.isArray,
    isString = Lang.isString,
    isFunction = Lang.isFunction,

    CHECKBOX = 'checkbox',
    GROUP = 'group',
    BUTTON = 'button',
    RENDERED = 'rendered',
    MOUSEDOWN = 'mousedown',
    TOOLBAR = 'toolbar',
    TOOLBAR_RENDERER = 'toolbarRenderer',
    BOUNDING_BOX = 'boundingBox',
    CREATE_DOCUMENT_FRAGMENT = 'createDocumentFragment',
    BTN = 'btn',
    CHILDREN = 'children',
    RADIO = 'radio',
    CONSTRUCTOR = 'constructor',

    _DOT = '.',
    _EMPTY = '',

    getCN = A.getClassName,

    CSS_BTN = getCN(BTN),
    CSS_BTN_GROUP = getCN(BTN, GROUP),
    CSS_BTN_GROUP_CHECKBOX = getCN(BTN, GROUP, CHECKBOX),
    CSS_BTN_GROUP_RADIO = getCN(BTN, GROUP, RADIO);

A.Toolbar = A.Component.create({
    NAME: TOOLBAR,

    ATTRS: {
        children: {
            validator: isArray
        },

        toolbarRenderer: {
            valueFn: function() {
                return new A.ToolbarRenderer();
            }
        }
    },

    UI_ATTRS: [CHILDREN],

    prototype: {
        CONTENT_TEMPLATE: null,
        TEMPLATES: {
            button: '<button class="aui-btn {cssClass}">{content}</button>',
            icon: '<i class="{cssClass}"></i>',
            group: '<div class="aui-btn-group {cssClass}"></div>'
        },

        bindUI: function() {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            boundingBox.delegate(MOUSEDOWN, instance._onItemMouseDown, _DOT+CSS_BTN, instance);
        },

        renderUI: function() {
            var instance = this;

            instance._renderChildrenUI();
        },

        getEnclosingWidget: function(seed) {
            if (A.instanceOf(seed, A.EventFacade)) {
                seed = seed.domEvent ? seed.domEvent.target : seed.target;
            }
            return A.Widget.getByNode(seed);
        },

        _onItemMouseDown: function(event) {
            var instance = this,
                currentTarget = event.currentTarget;

            instance._initEnclosingWidgetIfNeeded(currentTarget);
        },

        _initEnclosingWidgetIfNeeded: function(seed) {
            var instance = this,
                enclosingWidget = A.Widget.getByNode(seed),
                isAlreadyButton = A.instanceOf(enclosingWidget, A.Button),
                isAlreadyButtonGroup = A.instanceOf(enclosingWidget, A.ButtonGroup);

            if (isAlreadyButton || isAlreadyButtonGroup) {
                return;
            }

            var groupNode = seed.ancestor(_DOT+CSS_BTN_GROUP);
            if (groupNode) {
                var type;
                if (groupNode.hasClass(CSS_BTN_GROUP_CHECKBOX)) {
                    type = 'checkbox';
                }
                else if (groupNode.hasClass(CSS_BTN_GROUP_RADIO)) {
                    type = 'radio';
                }
                if (type) {
                    new A.ButtonGroup(instance._makeNodeConstructor(groupNode));
                }
            }
            else {
                new A.Button(instance._makeNodeConstructor(seed));
            }
        },

        _renderChildrenUI: function() {
            var instance = this,
                children = instance.get(CHILDREN),
                boundingBox = instance.get(BOUNDING_BOX);

            if (children) {
                var toolbarRenderer = instance.get(TOOLBAR_RENDERER);
                boundingBox.setContent(toolbarRenderer.render(children));
            }
        },

        _uiSetChildren: function(val) {
            var instance = this;

            if (!val || !instance.get(RENDERED)) {
                return;
            }

            instance._renderChildrenUI();
        },

        _makeNodeConstructor: function(node) {
            var instance = this,
                config = node.getData('constructor') || {};

            config.boundingBox = node;
            config.render = true;
            return config;
        }
    }
});

var ToolbarRenderer = function() {};

ToolbarRenderer.prototype = {
    TEMPLATES: {
        button: '<button class="aui-btn {cssClass}"></button>',
        group: '<div class="aui-btn-group {cssClass}"></div>',
        icon: '<i class="{cssClass}"></i>'
    },

    RENDERER: {
        button: function(childRenderHints) {
            var instance = this,
                value = childRenderHints.value;

            if (A.instanceOf(value, A.Button)) {
                return value.get(BOUNDING_BOX);
            }

            var buttonNode = A.Node.create(
                Lang.sub(instance.TEMPLATES.button, {
                    cssClass: value.cssClass || _EMPTY
                })
            );
            if (value.icon) {
                buttonNode.appendChild(
                    Lang.sub(instance.TEMPLATES.icon, { cssClass: value.icon }));
            }
            if (value.label) {
                buttonNode.appendChild(value.label);
            }
            buttonNode.setData(CONSTRUCTOR, value);
            return buttonNode;
        },

        group: function(childRenderHints) {
            var instance = this,
                value = childRenderHints.value,
                groupType = childRenderHints.groupType,
                cssClass;

            if (A.instanceOf(value, A.ButtonGroup)) {
                return value.get(BOUNDING_BOX);
            }

            if (groupType === CHECKBOX) {
                cssClass = CSS_BTN_GROUP_CHECKBOX;
            }
            else if (groupType === RADIO) {
                cssClass = CSS_BTN_GROUP_RADIO;
            }
            else {
                cssClass = _EMPTY;
            }

            var groupNode = A.Node.create(
                    Lang.sub(instance.TEMPLATES.group, { cssClass: cssClass }));

            A.Array.each(value, function(child) {
                groupNode.appendChild(instance._renderChild(child));
            });
            groupNode.setData(CONSTRUCTOR, value);
            return groupNode;
        }
    },

    render: function(children) {
        var instance = this;

        if (!children) {
            return;
        }
        var docFrag = A.one(A.config.doc).invoke(CREATE_DOCUMENT_FRAGMENT);
        A.Array.each(children, function(child) {
            docFrag.appendChild(instance._renderChild(child));
        });
        return docFrag;
    },

    _getChildRenderHints: function(child) {
        var instance = this,
            groupType = null,
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
        }
        else {
            renderer = BUTTON;
        }
        return {
            groupType: groupType,
            renderer: renderer,
            value: child
        };
    },

    _renderChild: function(child) {
        var instance = this,
            childRenderHints = instance._getChildRenderHints(child),
            renderer = instance.RENDERER[childRenderHints.renderer];

        if (isFunction(renderer)) {
            return renderer.call(instance, childRenderHints);
        }
    }
};

A.ToolbarRenderer = ToolbarRenderer;