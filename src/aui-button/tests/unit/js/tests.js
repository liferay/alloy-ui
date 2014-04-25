YUI.add('aui-button-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-button'),
        searchButtonCancel;

    function assertPosition(input) {
        var inputRegion = input.get('region'),
            iconClose = input.next('.btn-search-cancel'),
            iconCloseRegion = iconClose.get('region'),

            xpos = inputRegion.right -
                searchButtonCancel.get('iconWidth') +
                searchButtonCancel.get('gutter.0'),

            ypos = inputRegion.top +
                inputRegion.height / 2 -
                searchButtonCancel.get('iconHeight') / 2 +
                searchButtonCancel.get('gutter.1');

        Y.Assert.areSame(
            Math.round(iconClose.getY()), Math.round(ypos), 'Y-Position of input and search-btn-cancel should be the same.');
        Y.Assert.areSame(
            iconClose.getX(), xpos, 'X-Position of input and search-btn-cancel should be the same.');
    }

    function fillInput(input) {
        input.val('This is a test!');

        // TODO: Remove this when yeti is fixed to stop stealing focus from the test.
        searchButtonCancel._syncButtonUI(input);
    }

    suite.add(new Y.Test.Case({
        name: 'Search Button Cancel',

        '#1: Focusing first input should position .btn-search-cancel on the right.': function() {
            var test = this,
                inputNode = Y.all('input.clearable').item(0);

            searchButtonCancel = new Y.ButtonSearchCancel({
                trigger: '.clearable'
            });

            setTimeout(function() {
                test.resume(function() {
                    assertPosition(inputNode);
                });
            }, 800);

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

            setTimeout(function() {
                test.resume(function() {
                    assertPosition(inputNode);
                });
            }, 800);

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
