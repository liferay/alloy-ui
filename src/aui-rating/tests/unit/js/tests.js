YUI.add('aui-rating-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Rating Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-rating'),
        rating,
        selectedValue = 1.9,
        roundedValue = Math.round(selectedValue);

    rating = new Y.Rating({
        boundingBox: '#ratinginput'
    }).render();

    var ratingRounded = new Y.Rating({
        boundingBox: '#ratinginput2',
        defaultSelected: selectedValue,
        disabled: true
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
            var item = Y.one('.glyphicon-star-empty');

            Y.Test.Assert.isFalse(item.hasClass('glyphicon-star'),
                'The first item shouldn\'t be not selected');

            item.simulate('keypress', {
                keyCode: 13
            });

            Y.Test.Assert.isTrue(item.hasClass('glyphicon-star'), 'The first item should be selected');
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for rounding floats
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'RoundingFloats',

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        // Tests: AUI-1250
        'check that a float passed to defaultSelected is rounded': function() {
            Y.Test.Assert.areEqual(roundedValue, ratingRounded.get('elements').filter('.glyphicon-star').size(),
                'The number of selected items should be ' + roundedValue);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-rating', 'node-event-simulate', 'test']
});
