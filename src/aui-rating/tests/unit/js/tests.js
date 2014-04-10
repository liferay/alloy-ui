YUI.add('module-tests', function(Y) {

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
    // Test Case for rounding floats
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'RoundingFloats',

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        // Tests: AUI-1250
        'check that a float passed to defaultSelected is rounded': function() {
            var instance = this;

            Y.Test.Assert.areEqual(roundedValue, ratingRounded.get('elements').filter('.icon-star').size(), 'The number of selected items should be ' + roundedValue);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-rating', 'test']
});
