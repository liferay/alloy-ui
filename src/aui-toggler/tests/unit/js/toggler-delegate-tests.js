YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-toggler-delegate'),
        togglerDelegate,

        togglerContainer = Y.one('#toggler-container'),

        originalMarkup = togglerContainer.getHTML(),

        CSS_CONTENT_SELECTOR = '.content',
        CSS_HEADER_SELECTOR = '.header',

        STR_CLICK = 'click',
        STR_CONTENT = 'content',
        STR_HEADER_EVENT_HANDLER = 'headerEventHandler',
        STR_KEYDOWN = 'keydown',
        STR_LEVEL = 'level',
        STR_ON_ANIMATING_CHANGE = '_onAnimatingChange',
        STR_TOGGLER = 'toggler';

    suite.add(new Y.Test.Case({

        name: 'TogglerDelegate.destructor',

        setUp: function() {
            var instance = this;

            if (togglerDelegate) {
                togglerDelegate.destroy();
            }

            togglerContainer.setHTML(originalMarkup);

            togglerDelegate = new Y.TogglerDelegate(
                {
                    content: CSS_CONTENT_SELECTOR,
                    header: CSS_HEADER_SELECTOR
                }
            );

            instance.displacedHandlers = [
                Y.Do.before(instance._spyOn(STR_HEADER_EVENT_HANDLER), togglerDelegate, STR_HEADER_EVENT_HANDLER),
                Y.Do.before(instance._spyOn(STR_ON_ANIMATING_CHANGE), togglerDelegate, STR_ON_ANIMATING_CHANGE)
            ]
        },

        tearDown: function() {
            togglerDelegate.destroy();

            togglerDelegate = null;
        },

        _spyOn: function(method) {
            var instance = this;

            return function(event) {
                if (!instance.calls) {
                    instance.calls = {};
                }

                if (!instance.calls[method]) {
                    instance.calls[method] = 1;
                } else {
                    instance.calls[method]++;
                }
            }
        },

        _toHaveBeenCalled: function(method) {
            return (this.calls && this.calls[method] !== undefined);
        },

        _toNotHaveBeenCalled: function(method) {
            return (!this.calls || !this.calls[method]);
        },

        /**
         * Checks that TogglerDelegate properly cleans headerEventHandler
         * listeners after being destroyed
         *
         * @tests AUI-939
         */
        'Test detached headerEventHandler': function() {
            var instance = this;

            togglerDelegate.destroy();

            Y.one(CSS_HEADER_SELECTOR).simulate(STR_CLICK);
            Y.one(CSS_HEADER_SELECTOR).simulate(STR_KEYDOWN);

            Y.Assert.isTrue(instance._toNotHaveBeenCalled(STR_HEADER_EVENT_HANDLER), '_onAnimatingChange handler should be cleaned and not called after destroyed');
        },

        /**
         * Checks that TogglerDelegate properly cleans _onAnimatingChange
         * listeners after being destroyed
         *
         * @tests AUI-939
         */
        'Test detached _onAnimatingChange': function() {
            var instance = this;

            // Force the creation of the togglers
            togglerDelegate.createAll();

            var toggler = togglerDelegate.items[0];

            togglerDelegate.destroy();

            // Simulate the dispatch of animatingChange
            toggler.set('animating', true);

            Y.Assert.isTrue(instance._toNotHaveBeenCalled(STR_ON_ANIMATING_CHANGE), '_onAnimatingChange handler should be cleaned and not called after destroyed');
        },

        /**
         * Checks that TogglerDelegate properly cleans all toggler
         * references after being destroyed
         *
         * @tests AUI-939
         */
        'Test removed toggler references': function() {
            var instance = this;

            // Force the creation of the togglers
            togglerDelegate.createAll();

            togglerDelegate.destroy();

            Y.assert(togglerDelegate.items.length === 0, 'Toggler references in TogglerDelegate:items should be cleaned after destroyed');
        }

    }));

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

            togglerContainer.setHTML(originalMarkup);

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
            var instance = this;

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
