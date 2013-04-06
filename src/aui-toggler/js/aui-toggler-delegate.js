var Lang = A.Lang,
    isBoolean = Lang.isBoolean,
    isObject = Lang.isObject,
    isString = Lang.isString,

    AArray = A.Array,

    DOC = A.config.doc,

    Toggler = A.Toggler,

    DASH = '-',
    DOT = '.',
    EMPTY_STR = '',
    SPACE = ' ',

    ANIMATED = 'animated',
    CLICK = 'click',
    CLOSE_ALL_ON_EXPAND = 'closeAllOnExpand',
    COLLAPSED = 'collapsed',
    CONTAINER = 'container',
    CONTENT = 'content',
    CUBIC_BEZIER = 'cubic-bezier',
    EXPANDED = 'expanded',
    FIRST_CHILD = 'firstChild',
    HEADER = 'header',
    KEYDOWN = 'keydown',
    LINEAR = 'linear',
    TOGGLER = 'toggler',
    TOGGLER_ANIMATING_CHANGE = 'toggler:animatingChange',
    TOGGLER_DELEGATE = 'toggler-delegate',
    TRANSITION = 'transition',
    WRAPPER = 'wrapper',

    getCN = A.getClassName,

    CSS_TOGGLER_CONTENT_WRAPPER = getCN(TOGGLER, CONTENT, WRAPPER),
    CSS_TOGGLER_HEADER_COLLAPSED = getCN(TOGGLER, HEADER, COLLAPSED),
    CSS_TOGGLER_HEADER_EXPANDED = getCN(TOGGLER, HEADER, EXPANDED);

var TogglerDelegate = A.Component.create({
    NAME: TOGGLER_DELEGATE,

    ATTRS: {

        animated: {
            validator: isBoolean,
            value: false,
            writeOnce: true
        },

        closeAllOnExpand: {
            validator: isBoolean,
            value: false
        },

        container: {
            setter: A.one,
            value: DOC
        },

        content: {
            validator: isString
        },

        expanded: {
            validator: isBoolean,
            value: true
        },

        header: {
            validator: isString
        },

        transition: {
            validator: isObject,
            value: {
                duration: 0.4,
                easing: CUBIC_BEZIER
            }
        }

    },

    EXTENDS: A.Base,

    prototype: {

        items: null,

        initializer: function() {
            var instance = this;

            instance.bindUI();
            instance.renderUI();
        },

        renderUI: function() {
            var instance = this;

            if (instance.get(CLOSE_ALL_ON_EXPAND)) {
                instance.items = [];

                instance.get(CONTAINER).all(instance.get(HEADER)).each(function(header) {
                    instance.items.push(
                        instance._create(header)
                    );
                });
            }
        },

        bindUI: function() {
            var instance = this;
            var container = instance.get(CONTAINER);
            var header = instance.get(HEADER);

            instance.on(TOGGLER_ANIMATING_CHANGE, A.bind(instance._onAnimatingChange, instance));

            container.delegate([CLICK, KEYDOWN], A.bind(instance.headerEventHandler, instance), header);
        },

        findContentNode: function(header) {
            var instance = this;
            var content = instance.get(CONTENT);

            var contentNode = header.next(content) || header.one(content);

            if (!contentNode) {
                var wrapper = header.next(DOT + CSS_TOGGLER_CONTENT_WRAPPER);

                if (wrapper) {
                    contentNode = wrapper.get(FIRST_CHILD);
                }
            }

            return contentNode;
        },

        headerEventHandler: function(event) {
            var instance = this;

            if (instance.animating) {
                return false;
            }

            var target = event.currentTarget;
            var toggler = target.getData(TOGGLER) || instance._create(target);

            if (Toggler.headerEventHandler(event, toggler) && instance.get(CLOSE_ALL_ON_EXPAND)) {
                AArray.each(
                    instance.items,
                    function(item, index, collection) {
                        if (item !== toggler && item.get(EXPANDED)) {
                            item.collapse();
                        }
                    }
                );
            }
        },

        _create: function(header) {
            var instance = this,
                expanded = instance.get(EXPANDED);

            // Prioritize markup information to decide whether it's expanded or not
            if (header.hasClass(CSS_TOGGLER_HEADER_EXPANDED)) {
                expanded = true;
            }
            else if (header.hasClass(CSS_TOGGLER_HEADER_COLLAPSED)) {
                expanded = false;
            }

            var toggler = new Toggler({
                animated: instance.get(ANIMATED),
                bindDOMEvents: false,
                bubbleTargets: [ instance ],
                content: instance.findContentNode(header),
                expanded: expanded,
                header: header,
                transition: instance.get(TRANSITION)
            });

            return toggler;
        },

        _onAnimatingChange: function(event) {
            var instance = this;

            instance.animating = event.newVal;
        }

    }
});

A.TogglerDelegate = TogglerDelegate;