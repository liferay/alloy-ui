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
        },

        'should count if a DST shift potentially happens': function() {
            var d1 = new Date(2016, 0, 1, 0, 0, 1),
                d2 = new Date(2016, 6, 1, 23, 59, 59);

            Y.Assert.areEqual(
                31+29+31+30+31+30,
                Y.DataType.DateMath.countDays(d2, d1),
                'It should count 182 days between dates'
            );
        },

        'should behave even with dates very far from each other': function() {
            var d1 =  new Date(1970, 0, 1),
                d2 = new Date(200000, 0, 1);

            Y.Assert.areEqual(
                72328972,
                Y.DataType.DateMath.countDays(d2, d1),
                'It should count 72328972 days between dates'
            );
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-datatype', 'test']
});
