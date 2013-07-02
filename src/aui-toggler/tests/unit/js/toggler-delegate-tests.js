YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-toggler-delegate'),
        togglerDelegate,

        CSS_CONTENT_SELECTOR = '.content',
        CSS_HEADER_SELECTOR = '.header',

        STR_CLICK = 'click',
        STR_CONTENT = 'content',
        STR_LEVEL = 'level',
        STR_TOGGLER = 'toggler';

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

            Y.all(CSS_HEADER_SELECTOR).each(
                function(item, index, collection) {
                    if (item !== node) {
                        var itemContent = item.getData(STR_TOGGLER).get(STR_CONTENT);

                        if (itemContent.contains(node)) {
                            instance._assertHeaderExpanded(item);
                        } else {
                            instance._assertHeaderCollapsed(item);
                        }
                    }
                }
            );
        },

        _getHeader: function(parent, child) {
            var instance = this,
                header;

            if (!parent) {
                header = Y.one(CSS_HEADER_SELECTOR);
            } else {
                var content = parent.getData(STR_TOGGLER).get(STR_CONTENT);

                header = content.one('[data-level="'+ parent.getData(STR_LEVEL) + '_' + child +'"]');
            }

            return header;
        },

        setUp: function() {
            if (togglerDelegate) {
                togglerDelegate.destroy();
            }

            togglerDelegate = new Y.TogglerDelegate(
                {
                    closeAllOnExpand: true,
                    content: CSS_CONTENT_SELECTOR,
                    expanded: false,
                    header: CSS_HEADER_SELECTOR
                }
            );
        },

        tearDown: function() {
            togglerDelegate.destroy();

            togglerDelegate = null;
        },

        /**
         * Checks if the path to the node is fully expanded. A path to a node
         * should typically include all its toggler-content ancestors.
         *
         * @tests AUI-938
         */
        'Test node path visibility': function() {
            var instance = this;;

            // Expand root node (header_0)
            var headerNode = instance._getHeader();
            headerNode.simulate(STR_CLICK);
            instance._assertHeaderExpandedPath(headerNode);

            // Expand first nested child (header_0_0)
            nestedNode = instance._getHeader(headerNode, 0);
            nestedNode.simulate(STR_CLICK);
            instance._assertHeaderExpandedPath(nestedNode);

            // Expand second nested child (header_0_1)
            var nestedNode = instance._getHeader(headerNode, 1);
            nestedNode.simulate(STR_CLICK);
            instance._assertHeaderExpandedPath(nestedNode);

            // Expand third child inside the second nested child (header_0_1_2)
            var deeplyNestedNode = instance._getHeader(nestedNode, 2);
            deeplyNestedNode.simulate(STR_CLICK);
            instance._assertHeaderExpandedPath(deeplyNestedNode);

            // Expand first child inside the second nested child (header_0_1_0)
            deeplyNestedNode = instance._getHeader(nestedNode, 0);
            deeplyNestedNode.simulate(STR_CLICK);
            instance._assertHeaderExpandedPath(deeplyNestedNode);
        }

    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-toggler-delegate', 'node-event-simulate', 'test' ] });
