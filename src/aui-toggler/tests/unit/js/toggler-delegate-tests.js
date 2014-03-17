YUI.add('aui-toggler-delegate-tests', function(Y) {

    //--------------------------------------------------------------------------
    // TogglerDelegate Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-toggler-delegate'),

        togglerDelegate,
        togglerContainer = Y.one('#toggler-container'),
        defaultMarkup = togglerContainer.getHTML(),

        _SELECTOR_CSS_CONTENT = '.content',
        _SELECTOR_CSS_HEADER = '.header';

    //--------------------------------------------------------------------------
    // Test Case for TogglerDelegate.destructor
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'TogglerDelegate.destructor',

        setUp: function() {
            if (togglerDelegate) {
                togglerDelegate.destroy();
            }

            togglerContainer.setHTML(defaultMarkup);

            togglerDelegate = new Y.TogglerDelegate({
                content: _SELECTOR_CSS_CONTENT,
                header: _SELECTOR_CSS_HEADER
            });
        },

        tearDown: function() {
            togglerDelegate.destroy();

            togglerDelegate = null;
        },

        _wrapMockFn: function(mockFn, mockErrors) {
            var instance = this;

            return function() {
                try {
                    mockFn.apply(instance);
                }
                catch (err) {
                    mockErrors.push(err.message);
                }
            };
        },

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        /*
         * Checks that TogglerDelegate properly cleans headerEventHandler
         * listeners after being destroyed
         *
         * Tests: AUI-939
         */
        'detached headerEventHandler': function() {
            var instance = this,
                mock = new Y.Mock(),
                mockErrors = [];

            Y.Mock.expect(
                mock, {
                    method: 'headerEventHandler',
                    callCount: 0
                }
            );

            // Workaround for https://github.com/yui/yui3/issues/1421
            var mockWrapper = instance._wrapMockFn(mock.headerEventHandler, mockErrors);

            Y.Do.before(mockWrapper, togglerDelegate, 'headerEventHandler');

            togglerDelegate.destroy();

            Y.one(_SELECTOR_CSS_HEADER).simulate('click');
            Y.one(_SELECTOR_CSS_HEADER).simulate('keydown');

            Y.Mock.verify(mock);

            Y.Assert.areEqual(mockErrors.length, 0,
                'headerEventHandler handlers should be cleaned and not called after destroyed');
        },

        /*
         * Checks that TogglerDelegate properly cleans _onAnimatingChange
         * listeners after being destroyed
         *
         * Tests: AUI-939
         */
        'detached _onAnimatingChange': function() {
            var instance = this,
                mock = new Y.Mock(),
                mockErrors = [],
                toggler;

            Y.Mock.expect(
                mock, {
                    method: '_onAnimatingChange',
                    callCount: 0
                }
            );

            // Workaround for https://github.com/yui/yui3/issues/1421
            var mockWrapper = instance._wrapMockFn(mock._onAnimatingChange, mockErrors);

            Y.Do.before(mockWrapper, togglerDelegate, '_onAnimatingChange');

            // Force the creation of the togglers
            togglerDelegate.createAll();

            toggler = togglerDelegate.items[0];

            togglerDelegate.destroy();

            // Simulate the dispatch of animatingChange
            toggler.set('animating', true);

            Y.Mock.verify(mock);

            Y.Assert.areEqual(mockErrors.length, 0,
                '_onAnimatingChange handler should be cleaned and not called after destroyed');
        },

        /*
         * Checks that TogglerDelegate properly cleans all toggler
         * references after being destroyed
         *
         * Tests: AUI-939
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
                    var itemContent = item.getData('toggler').get('content');

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
                var content = parent.getData('toggler').get('content');

                header = content.one('[data-level="' + parent.getData('level') + '_' + child + '"]');
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

        /*
         * Checks if the path to the node is fully expanded. A path to a node
         * should typically include all its toggler-content ancestors.
         *
         * Tests: AUI-938
         */
        'test node path visibility': function() {
            var instance = this,
                deeplyNestedNode,
                headerNode,
                nestedNode;

            // Expand root node (header_0)
            headerNode = instance._getHeader();
            headerNode.simulate('click');
            instance._assertHeaderExpandedPath(headerNode);

            // Expand first nested child (header_0_0)
            nestedNode = instance._getHeader(headerNode, 0);
            nestedNode.simulate('click');
            instance._assertHeaderExpandedPath(nestedNode);

            // Expand second nested child (header_0_1)
            nestedNode = instance._getHeader(headerNode, 1);
            nestedNode.simulate('click');
            instance._assertHeaderExpandedPath(nestedNode);

            // Expand third child inside the second nested child (header_0_1_2)
            deeplyNestedNode = instance._getHeader(nestedNode, 2);
            deeplyNestedNode.simulate('click');
            instance._assertHeaderExpandedPath(deeplyNestedNode);

            // Expand first child inside the second nested child (header_0_1_0)
            deeplyNestedNode = instance._getHeader(nestedNode, 0);
            deeplyNestedNode.simulate('click');
            instance._assertHeaderExpandedPath(deeplyNestedNode);
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-toggler-delegate', 'node-event-simulate', 'test']
});
