YUI.add('module-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Node Tests
    //--------------------------------------------------------------------------

	var suite = new Y.Test.Suite('aui-node');

	var CSS_HIDE = 'hide';

	var NODE_TPL = '<div {cssClass} style="{display}; height: 50px; width: 50px; position: absolute; top: 0; left: 0;"></div>';

	var createNewNode = function(visible) {
		var node = Y.Node.create(
			Y.Lang.sub(NODE_TPL, {
				cssClass: visible ? '' : 'class="' + CSS_HIDE + '"',
				display: visible ? '' : 'display: none'
			})
		);

		node.appendTo(document.body);

		return node;
	};

    //--------------------------------------------------------------------------
    // Test Case Node
    //--------------------------------------------------------------------------

	suite.add(new Y.Test.Case({
		name: 'Node',

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

		'hide unanimated': function() {
			var node = createNewNode(true);

			node.hide();

			Y.Assert.areSame(true, node.hasClass(CSS_HIDE));
			Y.Assert.areSame('none', node.getStyle('display'));
		},

		'hide animated': function() {
			var node = createNewNode(true);

			node.hide(true);

			this.wait(function() {
				Y.Assert.areSame(true, node.hasClass(CSS_HIDE));
				Y.Assert.areSame('none', node.getStyle('display'));
			}, 1000);
		},

		'show unanimated': function() {
			var node = createNewNode(false);

			node.show();

			Y.Assert.areSame(false, node.hasClass(CSS_HIDE));
			Y.Assert.areNotSame('none', node.getStyle('display'));
		},

		'show animated': function() {
			var node = createNewNode(false);

			node.show(true);

			this.wait(function() {
				Y.Assert.areSame(false, node.hasClass(CSS_HIDE));
				Y.Assert.areNotSame('none', node.getStyle('display'));
			}, 1000);
		}
	}));

	Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-node', 'test', 'transition' ] });
