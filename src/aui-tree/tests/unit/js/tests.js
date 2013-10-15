YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-tree');

    suite.add(new Y.Test.Case({
        name: 'Tree View',

        'TreeView constructor should work without a config object': function() {
            var treeView = new Y.TreeView();

            Y.Assert.isInstanceOf(Y.TreeView, treeView, 'treeView should be an instance of Y.TreeView.');
        },

        'TreeNode constructor should work without a config object': function() {
            var treeNode = new Y.TreeNode();

            Y.Assert.isInstanceOf(Y.TreeNode, treeNode, 'treeNode should be an instance of Y.TreeNode.');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-tree', 'test']
});
