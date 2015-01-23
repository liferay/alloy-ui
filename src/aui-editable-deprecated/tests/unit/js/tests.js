YUI.add('aui-editable-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-editable-deprecated');

    var editable = new Y.Editable({
        node: '#editable'
    });

    suite.add(new Y.Test.Case({
        name: 'Editable Tests',

        'editable should be available on click': function() {
            var editableWrapper = Y.one('#editable'),
                isEditable;

            editableWrapper.simulate('click');

            isEditable = Y.one('.editable');

            Y.Assert.areSame(editable.get('boundingBox'), isEditable);
        },

        'editable should be hidden on window resize': function() {
            var editableWrapper = Y.one('#editable');

            editableWrapper.simulate('click');

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                editable._afterFocusedChangeEditable();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }

            this.wait(function() {
                Y.Assert.isTrue(
                    editable.get('boundingBox').hasClass('editable-hidden'),
                    'editable should be hidden on window resize'
                );
            }, Y.config.windowResizeDelay || 100);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-editable-deprecated', 'node-base', 'node-event-simulate', 'test']
});