YUI.add('aui-editable-deprecated-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-editable-deprecated');

    suite.add(new Y.Test.Case({
        name: 'Editable Tests',

        setUp: function() {
            Y.one('#logger').append('<div id="editable">Testing</div>');
            this.editable = Y.one('#editable');
            this.editableInstance = new Y.Editable({node: this.editable});
        },

        tearDown: function() {
            this.editableInstance.destroy();
            this.editable.remove();
        },

        'editable should open on click': function() {
            this.editable.simulate('click');
            this.editableOpen = Y.one('.editable');
            Y.Assert.isObject(this.editableOpen);
        },

        'editable should be hidden on window resize': function() {
            this.editable.simulate('click');
            Y.getWin().simulate('resize');
            this.editableHidden = Y.one('.editable-hidden');
            Y.Assert.isObject(this.editableHidden);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-editable-deprecated', 'node-base', 'node-event-simulate', 'test']
});