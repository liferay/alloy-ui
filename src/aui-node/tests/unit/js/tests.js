YUI.add('module-tests', function(Y) {

	var suite = new Y.Test.Suite('aui-node');

	var CSS_HIDE = 'hide';

	var NODE_TPL = '<div {cssClass} style="{display}; height: 50px; width: 50px; position: absolute; top: 0; left: 0;"></div>';

	var createNewNode = function(visible) {
		var node = Y.Node.create(
			Y.Lang.sub(
				NODE_TPL,
				{
					cssClass: visible ? '' : 'class="' + CSS_HIDE + '"',
					display: visible ? '' : 'display: none'
				}
			)
		);

		node.appendTo(document.body);

		return node;
	};

	suite.add(new Y.Test.Case({
		name: 'Node',

		'Node.hide unanimated': function() {
			var node = createNewNode(true);

			node.hide();

			Y.Assert.areSame(true, node.hasClass(CSS_HIDE));
			Y.Assert.areSame('none', node.getStyle('display'));
		},

		'Node.hide animated': function() {
			var node = createNewNode(true);

			node.hide(true);

			this.wait(function() {
				Y.Assert.areSame(true, node.hasClass(CSS_HIDE));
				Y.Assert.areSame('none', node.getStyle('display'));
			}, 1000);
		},

		'Node.show unanimated': function() {
			var node = createNewNode(false);

			node.show();

			Y.Assert.areSame(false, node.hasClass(CSS_HIDE));
			Y.Assert.areNotSame('none', node.getStyle('display'));
		},

		'Node.show animated': function() {
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
