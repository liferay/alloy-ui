YUI.add('module-tests', function(Y) {

    //--------------------------------------------------------------------------
    // TogglerDelegate Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-toggler-delegate'),

        togglerDelegate,
        togglerContainer = Y.one('#toggler-container'),
        defaultMarkup = togglerContainer.getHTML(),

        _SELECTOR_CSS_CONTENT = '.content',
        _SELECTOR_CSS_HEADER = '.header',

        CLICK = 'click',
        CONTENT = 'content',
        HEADER_EVENT_HANDLER = 'headerEventHandler',
        KEYDOWN = 'keydown',
        LEVEL = 'level',
        ON_ANIMATING_CHANGE = '_onAnimatingChange',
        TOGGLER = 'toggler';

    //--------------------------------------------------------------------------
    // Test Case for TogglerDelegate.destructor
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'TogglerDelegate.destructor',

        setUp: function() {
            var instance = this;

            if (togglerDelegate) {
                togglerDelegate.destroy();
            }

            togglerContainer.setHTML(defaultMarkup);

            togglerDelegate = new Y.TogglerDelegate({
                content: _SELECTOR_CSS_CONTENT,
                header: _SELECTOR_CSS_HEADER
            });

            instance.displacedHandlers = [
                Y.Do.before(instance._observe(HEADER_EVENT_HANDLER), togglerDelegate, HEADER_EVENT_HANDLER),
                Y.Do.before(instance._observe(ON_ANIMATING_CHANGE), togglerDelegate, ON_ANIMATING_CHANGE)
            ];
        },

        tearDown: function() {
            togglerDelegate.destroy();

            togglerDelegate = null;
        },

        _notCalled: function(method) {
            var instance = this;

            return (!instance._calls || !instance._calls[method]);
        },

        _observe: function(method) {
            var instance = this;

            return function() {
                if (!instance._calls) {
                    instance._calls = {};
                }

                if (!instance._calls[method]) {
                    instance._calls[method] = 1;
                }
                else {
                    instance._calls[method]++;
                }
            };
        },

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        /**
         * Checks that TogglerDelegate properly cleans headerEventHandler
         * listeners after being destroyed
         *
         * @tests AUI-939
         */
        'detached headerEventHandler': function() {
            var instance = this;

            togglerDelegate.destroy();

            Y.one(_SELECTOR_CSS_HEADER).simulate(CLICK);
            Y.one(_SELECTOR_CSS_HEADER).simulate(KEYDOWN);

            Y.Assert.isTrue(
                instance._notCalled(HEADER_EVENT_HANDLER),
                '_onAnimatingChange handler should be cleaned and not called after destroyed');
        },

        /**
         * Checks that TogglerDelegate properly cleans _onAnimatingChange
         * listeners after being destroyed
         *
         * @tests AUI-939
         */
        'detached _onAnimatingChange': function() {
            var instance = this,
                toggler;

            // Force the creation of the togglers
            togglerDelegate.createAll();

            toggler = togglerDelegate.items[0];

            togglerDelegate.destroy();

            // Simulate the dispatch of animatingChange
            toggler.set('animating', true);

            Y.Assert.isTrue(
                instance._notCalled(ON_ANIMATING_CHANGE),
                '_onAnimatingChange handler should be cleaned and not called after destroyed');
        },

        /**
         * Checks that TogglerDelegate properly cleans all toggler
         * references after being destroyed
         *
         * @tests AUI-939
         */
        'removed toggler references': function() {
            // Force the creation of the togglers
            togglerDelegate.createAll();

            togglerDelegate.destroy();

            Y.assert(
                (togglerDelegate.items === null),
                'toggler references in TogglerDelegate:items should be cleaned after destroyed');
        }

    }));

    //--------------------------------------------------------------------------
    // Test Case for TogglerDelegate:closeAllOnExpand
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'TogglerDelegate:closeAllOnExpand',

        _assertHeaderCollapsed: function(node) {
            Y.Assert.isTrue(node.hasClass('toggler-header-collapsed'));
        },

        _assertHeaderExpanded: function(node) {
            Y.Assert.isTrue(node.hasClass('toggler-header-expanded'));
        },

        _assertHeaderExpandedPath: function(node) {
            var instance = this;

            instance._assertHeaderExpanded(node);

            Y.all(_SELECTOR_CSS_HEADER).each(function(item) {
                if (item !== node) {
                    var itemContent = item.getData(TOGGLER).get(CONTENT);

                    if (itemContent.contains(node)) {
                        instance._assertHeaderExpanded(item);
                    }
                    else {
                        instance._assertHeaderCollapsed(item);
                    }
                }
            });
        },

        _getHeader: function(parent, child) {
            var header;

            if (!parent) {
                header = Y.one(_SELECTOR_CSS_HEADER);
            }
            else {
                var content = parent.getData(TOGGLER).get(CONTENT);

                header = content.one('[data-level="' + parent.getData(LEVEL) + '_' + child + '"]');
            }

            return header;
        },

        setUp: function() {
            if (togglerDelegate) {
                togglerDelegate.destroy();
            }

            togglerContainer.setHTML(defaultMarkup);

            togglerDelegate = new Y.TogglerDelegate({
                closeAllOnExpand: true,
                content: _SELECTOR_CSS_CONTENT,
                expanded: false,
                header: _SELECTOR_CSS_HEADER
            });
        },

        tearDown: function() {
            togglerDelegate.destroy();

            togglerDelegate = null;
        },

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        /**
         * Checks if the path to the node is fully expanded. A path to a node
         * should typically include all its toggler-content ancestors.
         *
         * @tests AUI-938
         */
        'test node path visibility': function() {
            var instance = this,
                deeplyNestedNode,
                headerNode,
                nestedNode;

            // Expand root node (header_0)
            headerNode = instance._getHeader();
            headerNode.simulate(CLICK);
            instance._assertHeaderExpandedPath(headerNode);

            // Expand first nested child (header_0_0)
            nestedNode = instance._getHeader(headerNode, 0);
            nestedNode.simulate(CLICK);
            instance._assertHeaderExpandedPath(nestedNode);

            // Expand second nested child (header_0_1)
            nestedNode = instance._getHeader(headerNode, 1);
            nestedNode.simulate(CLICK);
            instance._assertHeaderExpandedPath(nestedNode);

            // Expand third child inside the second nested child (header_0_1_2)
            deeplyNestedNode = instance._getHeader(nestedNode, 2);
            deeplyNestedNode.simulate(CLICK);
            instance._assertHeaderExpandedPath(deeplyNestedNode);

            // Expand first child inside the second nested child (header_0_1_0)
            deeplyNestedNode = instance._getHeader(nestedNode, 0);
            deeplyNestedNode.simulate(CLICK);
            instance._assertHeaderExpandedPath(deeplyNestedNode);
        }

    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-toggler-delegate', 'node-event-simulate', 'test' ] });
