YUI.add('aui-button-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-button');

    suite.add(new Y.Test.Case({
        name: 'Search Button Cancel',

        '#1: Focusing first input should position .btn-search-cancel on the right.': function() {
            var test = this,
                inputNode = Y.one('input.clearable'),
                searchButtonCancel = new Y.ButtonSearchCancel({
                    trigger: '.clearable'
                });

            inputNode.once('click', function(event) {
                setTimeout(function() {
                    test.resume(function() {
                        var xpos = event.target.get('region').right - event.target.next('.btn-search-cancel').get('region').width + searchButtonCancel.get('gutter')[0];

                        var ypos = event.target.get('region').top + event.target.get('region').height / 2 - event.target.next('.btn-search-cancel').get('region').height / 2 + searchButtonCancel.get('gutter')[1];

                        Y.Assert.areSame(event.target.next('.btn-search-cancel').getY(), ypos, 'Y-Position of input and search-btn-cancel should be the same.');

                        Y.Assert.areSame(event.target.next('.btn-search-cancel').getX(), xpos, 'X-Position of input and search-btn-cancel should be the same.');
                    });
                }, 800);
            });

            setTimeout(function() {
                inputNode.focus().val('This is a test!');
                inputNode.simulate('click');
            }, 0);

            test.wait(1000);
        },

        '#2: Focusing second input should position .btn-search-cancel on the right.': function() {
            var test = this,
                inputNode2 = Y.one('input.clearable').next('.clearable'),
                searchButtonCancel = new Y.ButtonSearchCancel({
                    trigger: '.clearable'
                });

            inputNode2.once('click', function(event) {
                setTimeout(function() {
                    test.resume(function() {
                        var xpos = event.target.get('region').right - event.target.next('.btn-search-cancel').get('region').width + searchButtonCancel.get('gutter')[0];

                        var ypos = event.target.get('region').top + event.target.get('region').height / 2 - event.target.next('.btn-search-cancel').get('region').height / 2 + searchButtonCancel.get('gutter')[1];

                        Y.Assert.areSame(event.target.next('.btn-search-cancel').getY(), ypos, 'Y-Position of input and search-btn-cancel should be the same.');

                        Y.Assert.areSame(event.target.next('.btn-search-cancel').getX(), xpos, 'X-Position of input and search-btn-cancel should be the same.');
                    });
                }, 800);
            });

            setTimeout(function() {
                inputNode2.focus().val('This is another test!');
                inputNode2.simulate('click');
            }, 0);

            test.wait(1000);
        },

        '#3: .btn-search-cancel should be positioned correctly when input is moved by removing from dom and placing in a different area': function() {
            var searchBtnCancelDemo = Y.one('#search-btn-cancel-demo'),
                searchBtnCancelDemoParent = searchBtnCancelDemo.ancestor(),
                searchButtonCancel = new Y.ButtonSearchCancel({
                    trigger: '.clearable'
                });

            searchBtnCancelDemoParent.removeChild(Y.one('#search-btn-cancel-demo'));
            searchBtnCancelDemoParent.one('.search-btn-cancel-heading').insert(searchBtnCancelDemo, 'before');

            Y.each(Y.all('input.clearable'), function(input) {
                var xpos = input.get('region').right - input.next('.btn-search-cancel').get('region').width + searchButtonCancel.get('gutter')[0];

                var ypos = input.get('region').top + input.get('region').height / 2 - input.next('.btn-search-cancel').get('region').height / 2 + searchButtonCancel.get('gutter')[1];

                Y.Assert.areSame(input.next('.btn-search-cancel').getY(), ypos, 'Y-Position of input and search-btn-cancel should be the same.');

                Y.Assert.areSame(input.next('.btn-search-cancel').getX(), xpos, 'X-Position of input and search-btn-cancel should be the same.');
            });
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-button', 'aui-button-search-cancel', 'node-event-simulate', 'test']
});
