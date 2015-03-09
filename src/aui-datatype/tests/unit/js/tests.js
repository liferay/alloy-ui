YUI.add('aui-datatype-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-datatype');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        'should count the number of days between two dates': function() {
            var d1 = new Date(),
                d2 = Y.DataType.DateMath.add(d1, Y.DataType.DateMath.DAY, 5);

            Y.Assert.areEqual(
                5,
                Y.DataType.DateMath.countDays(d1, d2),
                'It should count five days between dates'
            );
        },

        'should count if latter date is given first': function() {
            var d1 = new Date(),
                d2 = Y.DataType.DateMath.add(d1, Y.DataType.DateMath.DAY, 5);

            Y.Assert.areEqual(
                5,
                Y.DataType.DateMath.countDays(d2, d1),
                'It should count five days between dates'
            );
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-datatype', 'test']
});
