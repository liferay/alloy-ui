YUI.add('aui-button-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-button'),
        searchButtonCancel;

    function assertPosition(input) {
        var inputRegion = input.get('region'),
            iconClose = input.next('.btn-search-cancel'),
            iconCloseRegion = iconClose.get('region'),

            xpos = inputRegion.right -
                iconCloseRegion.width +
                searchButtonCancel.get('gutter.0'),

            ypos = inputRegion.top +
                inputRegion.height / 2 -
                iconCloseRegion.height / 2 +
                searchButtonCancel.get('gutter.1');

        Y.Assert.areSame(
            iconClose.getY(), ypos, 'Y-Position of input and search-btn-cancel should be the same.');
        Y.Assert.areSame(
            iconClose.getX(), xpos, 'X-Position of input and search-btn-cancel should be the same.');
    }

    function fillInput(input) {
        input.focus().val('This is a test!');
        input.simulate('click');

        // FIXME: Simulating click, run via Yeti on FF (not if run manually on FF) does not trigger input event listener.
        // We will invoke it manually in this case.
        if (Y.UA.gecko) {
            searchButtonCancel._syncButtonUI(input);
        }
    }

    suite.add(new Y.Test.Case({
        name: 'Search Button Cancel',

        '#1: Focusing first input should position .btn-search-cancel on the right.': function() {
            var test = this,
                inputNode = Y.all('input.clearable').item(0);

            searchButtonCancel = new Y.ButtonSearchCancel({
                trigger: '.clearable'
            });

            inputNode.once('click', function() {
                setTimeout(function() {
                    test.resume(function() {
                        assertPosition(inputNode);
                    });
                }, 800);
            });

            Y.soon(function() {
                fillInput(inputNode);
            });

            test.wait(1000);
        },

        '#2: Focusing second input should position .btn-search-cancel on the right.': function() {
            var test = this,
                inputNode = Y.all('input.clearable').item(1);

            searchButtonCancel = new Y.ButtonSearchCancel({
                trigger: '.clearable'
            });

            inputNode.once('click', function() {
                setTimeout(function() {
                    test.resume(function() {
                        assertPosition(inputNode);
                    });
                }, 800);
            });

            Y.soon(function() {
                fillInput(inputNode);
            });

            test.wait(1000);
        },

        '#3: .btn-search-cancel should be positioned correctly when input is moved by removing from dom and placing in a different area': function() {
            searchButtonCancel = new Y.ButtonSearchCancel({
                trigger: '.clearable'
            });

            Y.one('#search-btn-cancel-heading').insert(
                Y.one('#search-btn-cancel-demo'), 'before');

            Y.all('input.clearable').each(function(input) {
                assertPosition(input);
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-button', 'aui-button-search-cancel', 'aui-node', 'node-event-simulate', 'test']
});
