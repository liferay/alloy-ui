YUI.add('aui-rating-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Rating Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-rating'),
        rating;

    rating = new Y.Rating({
        boundingBox: '#ratinginput'
    }).render();

    //--------------------------------------------------------------------------
    // Test Case for keypress
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'KeyPress',

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        // Tests: AUI-1132
        'check that pressing enter selects an item': function() {
            var item = Y.one('.icon-star-empty');

            Y.Test.Assert.isFalse(item.hasClass('icon-star'), 'The first item shouldn\'t be not selected');

            item.simulate('keypress', {
                keyCode: 13
            });

            Y.Test.Assert.isTrue(item.hasClass('icon-star'), 'The first item should be selected');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-rating', 'node-event-simulate', 'test']
});
