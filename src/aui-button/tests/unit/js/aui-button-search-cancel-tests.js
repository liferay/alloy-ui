YUI.add('aui-button-search-cancel-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-button-search-cancel'),
        searchButtonCancel;

    suite.add(new Y.Test.Case({
        name: 'Search Button Cancel',

        setUp: function() {
            if (searchButtonCancel) {
                searchButtonCancel.destroy();
            }

            searchButtonCancel = new Y.ButtonSearchCancel({
                trigger: '.clearable'
            });
        },

        tearDown: function() {
            searchButtonCancel && searchButtonCancel.destroy();
        },

        _assertPosition: function(input) {
            var inputRegion = input.get('region'),
                iconClose = input.previous('.btn-search-cancel'),

                xpos = inputRegion.right -
                    searchButtonCancel.get('iconWidth') +
                    searchButtonCancel.get('gutter.0'),

                ypos = inputRegion.top +
                    inputRegion.height / 2 -
                    searchButtonCancel.get('iconHeight') / 2 +
                    searchButtonCancel.get('gutter.1');

            Y.Assert.areSame(
                Math.round(iconClose.getY()), Math.round(ypos),
                'Y-Position of input and search-btn-cancel should be the same.'
            );

            Y.Assert.areSame(
                iconClose.getX(),
                xpos,
                'X-Position of input and search-btn-cancel should be the same.'
            );

            input.simulate('blur');
        },

        _fillInput: function(input) {
            input.val('This is a test!');

            // TODO: Remove this when yeti is fixed to stop stealing focus from the test.
            searchButtonCancel._syncButtonUI(input);
        },

        'Focusing first input should position .btn-search-cancel on the right.': function() {
            var instance = this,
                inputNode = Y.all('input.clearable').item(0);

            setTimeout(function() {
                instance.resume(function() {
                    instance._assertPosition(inputNode);
                });
            }, 800);

            Y.soon(function() {
                instance._fillInput(inputNode);
            });

            instance.wait(1000);
        },

        'Focusing second input should position .btn-search-cancel on the right.': function() {
            var instance = this,
                inputNode = Y.all('input.clearable').item(1);

            setTimeout(function() {
                instance.resume(function() {
                    instance._assertPosition(inputNode);
                });
            }, 800);

            Y.soon(function() {
                instance._fillInput(inputNode);
            });

            instance.wait(1000);
        },

        'should update position on resize from .btn-search-cancel on windown resize': function() {
            Y.one('.form-control').setStyle('position', 'relative');
            Y.one('.form-control').setStyle('top', '20px');

            if (Y.UA.ie === 8) {
                // Can't simulate a resize on IE8's window object, so
                // calling the function directly here.
                searchButtonCancel._onWindowResize();
            }
            else {
                Y.one(Y.config.win).simulate('resize');
            }
        },

        '.btn-search-cancel should be positioned correctly when input is moved by removing from dom and placing in a different area': function() {
            var instance = this;

            Y.one('#search-btn-cancel-heading').insert(
                Y.one('#search-btn-cancel-demo'), 'before');

            Y.all('input.clearable').each(function(input) {
                // TODO: Remove this when yeti is fixed to stop stealing focus from the test.
                searchButtonCancel._syncButtonUI(input);

                instance._assertPosition(input);
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-button-search-cancel', 'aui-node', 'node-event-simulate', 'test']
});
