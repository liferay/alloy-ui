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
    MOUSEMOVE = 'mousemove',
    NORMAL = 'normal',
    RADIO = 'radio',
    RENDERED = 'rendered',
    TOOLBAR = 'toolbar',
    TOOLBAR_RENDERER = 'toolbarRenderer',
    VERTICAL = 'vertical',

    _DOT = '.',
    _EMPTY = '',
    _SPACE = ' ',

    getCN = A.getClassName,

    CSS_BTN = getCN(BTN),
    CSS_BTN_GROUP = getCN(BTN, GROUP),
    CSS_BTN_GROUP_CHECKBOX = getCN(BTN, GROUP, CHECKBOX),
    CSS_BTN_GROUP_RADIO = getCN(BTN, GROUP, RADIO),
    CSS_BTN_GROUP_VERTICAL = getCN(BTN, GROUP, VERTICAL);

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
            button: '<button class="aui-btn">{content}</button>',
            icon: '<i class="{cssClass}"></i>',
            group: '<div class="aui-btn-group {cssClass}"></div>'
        },

        bindUI: function() {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            boundingBox.delegate([CLICK, MOUSEMOVE, FOCUS], instance._onUserInitInteraction, _DOT+CSS_BTN, instance);
        },

        add: function(children, where) {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX),
                toolbarRenderer = instance.get(TOOLBAR_RENDERER);

            boundingBox.insert(toolbarRenderer.render(A.Array(children)), where);
        },

        clear: function() {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            boundingBox.get(CHILDREN).remove();
        },

        getEnclosingWidget: function(seed) {
            if (A.instanceOf(seed, A.EventFacade)) {
                seed = seed.domEvent ? seed.domEvent.target : seed.target;
            }
            return A.Widget.getByNode(seed);
        },

        item: function(index) {
            var instance = this,
                seed = instance.get(BOUNDING_BOX).get(CHILDREN).item(index);

            instance._initEnclosingWidgetIfNeeded(seed);

            return instance.getEnclosingWidget(seed);
        },

        remove: function(where) {
            var instance = this,
                boundingBox = instance.get(BOUNDING_BOX);

            return boundingBox.get(CHILDREN).item(where).remove();
        },

        _onUserInitInteraction: function(event) {
            var instance = this,
                currentTarget = event.currentTarget;

            instance._initEnclosingWidgetIfNeeded(currentTarget);
        },

        _initEnclosingWidgetIfNeeded: function(seed) {
            var instance = this;

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

var ToolbarRenderer = function() {};

ToolbarRenderer.prototype = {
    TEMPLATES: {
        button: A.Button.prototype.TEMPLATE,
        group: '<div class="' + CSS_BTN_GROUP + ' {cssClass}"></div>',
        icon: '<i class="{cssClass}" />'
    },

    RENDERER: {
        button: function(childRenderHints) {
            var instance = this,
                value = childRenderHints.value,
                cssClass,
                buttonNode;

            if (A.instanceOf(value, A.Button)) {
                return value.get(BOUNDING_BOX);
            }

            // Add node reference support
            buttonNode = A.one(value.boundingBox || value.srcNode);
            if (!buttonNode) {
                buttonNode = A.Node.create(instance.TEMPLATES.button);
            }

            // Add cssClass support
            cssClass = [ CSS_BTN, value.cssClass ];
            if (value.primary) {
                cssClass.push(A.ButtonCore.CLASS_NAMES.PRIMARY);
            }
            buttonNode.addClass(cssClass.join(_SPACE));

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

            A.Button.setWidgetLazyConstructorNodeData(buttonNode, value);
            return buttonNode;
        },

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
                A.Button.setWidgetLazyConstructorNodeData(childNode, value[index]);
            });
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
            docFrag.appendChild(instance.renderNode(child));
        });
        return docFrag;
    },

    renderNode: function(child) {
        var instance = this,
            childRenderHints = instance._getChildRenderHints(child),
            renderer = instance.RENDERER[childRenderHints.renderer];

        if (isFunction(renderer)) {
            return renderer.call(instance, childRenderHints);
        }
    },

    _getChildRenderHints: function(child) {
        var instance = this,
            groupType = null,
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