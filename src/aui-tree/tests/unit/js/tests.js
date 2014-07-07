YUI.add('aui-tree-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-tree');

    var createNewTreeView = function() {
        return new Y.TreeView({
            children: [
                {
                    children: [
                        {
                            id: 'one-one'
                        },
                        {
                            id: 'one-two'
                        },
                        {
                            id: 'one-three'
                        },
                        {
                            id: 'one-four'
                        }
                    ],
                    id: 'one'
                },
                {
                    id: 'two'
                },
                {
                    id: 'three'
                }
            ]
        });
    };

    suite.add(new Y.Test.Case({
        name: 'Tree View',

        'TreeView constructor should work without a config object': function() {
            var treeView = new Y.TreeView();

            Y.Assert.isInstanceOf(Y.TreeView, treeView, 'treeView should be an instance of Y.TreeView.');
        },

        'TreeNode constructor should work without a config object': function() {
            var treeNode = new Y.TreeNode();

            Y.Assert.isInstanceOf(Y.TreeNode, treeNode, 'treeNode should be an instance of Y.TreeNode.');
        },

        'getNodeById() should return a valid TreeNode': function() {
            var childNode,
                tree;

            tree = createNewTreeView();

            childNode = tree.getNodeById('one');

            Y.Assert.isInstanceOf(Y.TreeNode, childNode, 'childNode should be an instance of Y.TreeNode.');
        },

        'getNodeById() should not return a valid TreeNode': function() {
            var childNode,
                tree;

            tree = createNewTreeView();

            childNode = tree.getNodeById('bogey');

            Y.Assert.isUndefined(childNode, 'childNode should be undefined.');
        },

        'TreeNode should have children': function() {
            var tree,
                node;

            tree = createNewTreeView();

            node = tree.getNodeById('one');

            Y.Assert.areSame(4, node.childrenLength, 'node.childrenLength should return 4.');
        },

        'TreeNode should not have children': function() {
            var tree,
                node;

            tree = createNewTreeView();

            node = tree.getNodeById('two');

            Y.Assert.areSame(0, node.childrenLength, 'node.childrenLength should return 0.');
        },

        'appendChild() should register the TreeNode in the Parent TreeNode and Owner TreeView index attribute': function() {
            var childTreeNode,
                rootTreeNode,
                rootTreeNodeIndex,
                treeView,
                treeViewIndex;

            treeView = new Y.TreeView();

            childTreeNode = new Y.TreeNode({
                id: 'child'
            });

            rootTreeNode = new Y.TreeNode({
                id: 'root'
            });

            treeView.appendChild(rootTreeNode);
            rootTreeNode.appendChild(childTreeNode);

            treeViewIndex = treeView.get('index');
            rootTreeNodeIndex = rootTreeNode.get('index');

            Y.Assert.isTrue(
                treeViewIndex.hasOwnProperty('root'),
                'treeViewIndex object should have a \'root\' property');
            Y.Assert.isTrue(
                treeViewIndex.hasOwnProperty('child'),
                'treeViewIndex object should have a \'child\' property');
            Y.Assert.isTrue(
                rootTreeNodeIndex.hasOwnProperty('child'),
                'rootTreeNodeIndex object should have a \'child\' property');
        },

        'removeChild() should remove child TreeNode': function() {
            var node,
                tree;

            tree = createNewTreeView();

            node = tree.getNodeById('two');

            tree.removeChild(node);

            Y.Assert.areSame(2, tree.getChildrenLength(), 'rootNode should have 2 children.');

            node = tree.getNodeById('two');

            Y.Assert.isUndefined(node, 'node should be undefined.');

            Y.Assert.areSame('three', tree.getChildren()[1].get('id'), 'Second node id should be `three`.');
        },

        'removeChild() should not remove child TreeNode': function() {
            var node,
                tree;

            tree = createNewTreeView();

            node = tree.getNodeById('bogey');

            tree.removeChild(node);

            Y.Assert.areSame(3, tree.getChildrenLength(), 'rootNode should have 3 children');

            Y.Assert.areSame('three', tree.getChildren()[2].get('id'), 'second node id should be `three`');
        },

        'isRegistered() should find TreeNode': function() {
            var node,
                tree;

            tree = createNewTreeView();

            node = tree.getNodeById('two');

            Y.Assert.isTrue(tree.isRegistered(node), 'TreeNode should be registered in TreeView');
        },

        'isRegistered() should find child TreeNode': function() {
            var childTreeNode,
                rootTreeNode,
                treeView;

            treeView = new Y.TreeView();

            childTreeNode = new Y.TreeNode({
                id: 'child'
            });

            rootTreeNode = new Y.TreeNode({
                id: 'root'
            });

            treeView.appendChild(rootTreeNode);
            rootTreeNode.appendChild(childTreeNode);

            Y.Assert.isTrue(
                treeView.isRegistered(childTreeNode),
                'childTreeNode should be registered in treeView');
            Y.Assert.isTrue(
                rootTreeNode.isRegistered(childTreeNode),
                'childTreeNode should be registered in Parent rootTreeNode');
        },

        'isRegistered() should not find TreeNode': function() {
            var node,
                tree;

            tree = createNewTreeView();

            node = new Y.TreeNode();

            Y.Assert.isFalse(tree.isRegistered(node), 'TreeNode should be registered in TreeView');
        },

        'TreeNodeRadio should only have one treeNode selected': function() {
            var childTreeNode,
                rootTreeNode,
                treeView;

            treeView = new Y.TreeView();

            childTreeNode = new Y.TreeNodeRadio({
                id: 'one'
            });

            rootTreeNode = new Y.TreeNodeRadio({
                id: 'root'
            });

            treeView.appendChild(rootTreeNode);
            rootTreeNode.appendChild(childTreeNode);

            rootTreeNode.check();

            Y.Assert.isTrue(
                rootTreeNode.isChecked(),
                'rootTreeNode should be checked.');

            Y.Assert.isFalse(
                childTreeNode.isChecked(),
                'childTreeNode should not be checked.');
        },

        'TreeNodeTask should select all child treeNode': function() {
            var childTreeNode,
                rootTreeNode,
                treeView;

            treeView = new Y.TreeView();

            childTreeNode = new Y.TreeNodeTask({
                id: 'one'
            });

            rootTreeNode = new Y.TreeNodeTask({
                id: 'root'
            });

            treeView.appendChild(rootTreeNode);
            rootTreeNode.appendChild(childTreeNode);

            rootTreeNode.check();

            Y.Assert.isTrue(
                rootTreeNode.isChecked(),
                'rootTreeNode should be checked.');

            Y.Assert.isTrue(
                childTreeNode.isChecked(),
                'childTreeNode should be checked.');
        },

        // Tests: AUI-1138
        'TreeNodeTask should add a state for when one of its children is unchecked': function() {
            var childTreeNode,
                rootTreeNode,
                treeView;

            treeView = new Y.TreeView();

            childTreeNode = new Y.TreeNodeTask({
                id: 'one'
            });

            rootTreeNode = new Y.TreeNodeTask({
                id: 'root'
            });

            treeView.appendChild(rootTreeNode);
            rootTreeNode.appendChild(childTreeNode);

            rootTreeNode.check();
            childTreeNode.uncheck();

            var rootTreeNodeCB = rootTreeNode.get('contentBox');

            Y.Assert.isTrue(
                rootTreeNodeCB.hasClass('tree-node-child-unchecked'),
                'rootTreeNode has an unchecked child.');

            childTreeNode.check();

            Y.Assert.isFalse(
                rootTreeNodeCB.hasClass('tree-node-child-unchecked'),
                'rootTreeNode does not have unchecked child.');
        },

        // Tests: AUI-1141
        'TreeNodeView created from HTML Markup should display glyphicon-minus when expanded': function() {
            var test = this;
            var treeViewComponent = Y.one('#createFromHTMLMarkupTest').clone().appendTo(document.body);

            var treeView = new Y.TreeView({
                boundingBox: treeViewComponent,
                contentBox: treeViewComponent.one('> ul'),
                type: 'normal'
            }).render();

            var children = treeView.getChildren(true);
            var lazyRenderTimeout = children.length * 50;

            setTimeout(function() {
                test.resume(function() {
                    Y.each(children, function(node) {
                        if (node.get('rendered') && !node.get('leaf')) {
                            var hitArea = node.get('hitAreaEl');

                            hitArea.simulate('click');

                            Y.Assert.isTrue(hitArea.hasClass('glyphicon-minus'), hitArea +
                                ' does not have class glyphicon-minus');
                        }
                    }, true);
                });

                treeViewComponent.remove();
            }, lazyRenderTimeout);

            test.wait(lazyRenderTimeout);
        },

        'TreeNodeView created from HTML Markup should display glyphicon-plus when collapsed': function() {
            var test = this;
            var treeViewComponent = Y.one('#createFromHTMLMarkupTest').clone().appendTo(document.body);

            var treeView = new Y.TreeView({
                boundingBox: treeViewComponent,
                contentBox: treeViewComponent.one('> ul'),
                type: 'normal'
            }).render();

            var children = treeView.getChildren(true);
            var lazyRenderTimeout = children.length * 50;

            setTimeout(function() {
                test.resume(function() {
                    Y.each(children, function(node) {
                        if (node.get('rendered') && !node.get('leaf')) {
                            var hitArea = node.get('hitAreaEl');

                            Y.Assert.isTrue(hitArea.hasClass('glyphicon-plus'), hitArea +
                                ' does not have class glyphicon-plus');
                        }
                    }, true);
                });

                treeViewComponent.remove();
            }, lazyRenderTimeout);

            test.wait(lazyRenderTimeout);
        },

        // Tests: AUI-1156
        'Display \'Load More Results\' link for TreeNodes': function() {
            var childTreeNode,
                hitAreaNodeList,
                paginatorLink,
                rootHitArea,
                rootTreeNode,
                rootTreeNodeBB,
                treeView;

            treeView = new Y.TreeView();

            childTreeNode = [
                {
                    id: 'child-one',
                    io: 'assets/pages.html',
                    label: 'child-one',
                    paginator: {
                        limit: 3,
                        offsetParam: 'start',
                        start: 0,
                        total: 6
                    },
                    type: 'io'
                },
                {
                    label: 'child-two'
                },
                {
                    label: 'child-three'
                },
                {
                    label: 'child-four'
                }
            ];

            rootTreeNode = new Y.TreeNode({
                children: childTreeNode,
                id: 'root-one',
                label: 'root-one'
            });

            treeView.appendChild(rootTreeNode);

            treeView.render();

            rootTreeNodeBB = rootTreeNode.get('boundingBox');

            rootHitArea = rootTreeNodeBB.one('.tree-hitarea');

            rootHitArea.simulate('click');

            hitAreaNodeList = rootTreeNodeBB.all('.tree-hitarea');

            Y.Assert.areEqual(2, hitAreaNodeList.size(), 'There must be two hit-area elements');

            /*
             * We can Mock the AJAX request here, but this is not what we want to test. We want to test
             * if paginator link will appear, so we will invoke the success handler directly here,
             * assumming that server returned correct response. Clicking on hit area was proved to work above.
             */
            rootTreeNode.get('children')[0].ioSuccessHandler(null, null, {
                responseText: '[{"label": "subchild-one","leaf": true,"type": "node"},' +
                    '{"label": "subchild-two","leaf": true,"type": "node"},' +
                    '{"label": "subchild-three","leaf": true, "type": "node"}]'
            });

            paginatorLink = rootTreeNodeBB.one('a');

            Y.Assert.isTrue(
                paginatorLink.hasClass('tree-node-paginator'),
                'childTreeNode has a paginator link');
        },

        // Tests: AUI-1450
        'TreeView should update getChildrenLength after clicking \'Load More\' link': function() {
            var oldChildrenLength,
                test = this,
                treeView;

            treeView = new Y.TreeView({
                children: [
                    {
                        id: 'one'
                    },
                    {
                        id: 'two'
                    },
                    {
                        id: 'three'
                    }
                ],
                io: 'assets/pages.html',
                paginator: {
                    limit: 3,
                    offsetParam: 'start',
                    start: 0,
                    total: 5
                },
                type: 'io'
            }).render();

            oldChildrenLength = treeView.getChildrenLength();

            treeView.after('ioRequestSuccess', function() {
                test.resume(function() {
                    Y.Assert.isTrue(treeView.getChildrenLength() !== oldChildrenLength);
                });
            });

            treeView.get('boundingBox').treeViewBB.one('.tree-node-paginator').simulate('click');

            test.wait();
        },

        'TreeView should not show more nodes than what\'s defined in paginator.total': function() {
            var paginator,
                test = this,
                treeView;

            treeView = new Y.TreeView({
                children: [
                    {
                        id: 'one'
                    },
                    {
                        id: 'two'
                    },
                    {
                        id: 'three'
                    }
                ],
                io: 'assets/pages.html',
                paginator: {
                    limit: 3,
                    offsetParam: 'start',
                    start: 0,
                    total: 5
                },
                type: 'io'
            }).render();

            paginator = treeView.get('paginator');

            treeView.after('ioRequestSuccess', function() {
                test.resume(function() {
                    Y.Assert.isTrue(treeView.getChildrenLength() <= paginator.total);
                });
            });

            treeView.get('boundingBox').treeViewBB.one('.tree-node-paginator').simulate('click');

            test.wait();
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-tree', 'node-event-simulate', 'test']
});
