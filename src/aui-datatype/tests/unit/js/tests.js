YUI.add('aui-datatype-tests', function(Y) {

    var today = new Date();
    var JANUARY_1 = Y.DataType.DateMath.getJan1(today.getFullYear());
    var JULY_1 = Y.DataType.DateMath.getDate(today.getFullYear(), 6, 1);
    var NO_DST_OFFSET = (JANUARY_1.getTimezoneOffset() === JULY_1.getTimezoneOffset());

    var suite = new Y.Test.Suite('aui-datatype');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        _should: {
            ignore: {
                'should count if the first date is not under DST and the second is': NO_DST_OFFSET,
                'should count if the first date is under DST and the second is not': NO_DST_OFFSET
            }
        },

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

        'should count if the first date is not under DST and the second is': function() {
            var d1 = new Date(2016, 0, 1),
                d2 = new Date(2016, 6, 1);

            Y.Assert.areEqual(
                31+29+31+30+31+30,
                Y.DataType.DateMath.countDays(d2, d1),
                'It should count 182 days between dates'
            );
        },

        'should count if the first date is under DST and the second is not': function() {
            var d1 = new Date(2016, 6, 1),
                d2 = new Date(2017, 0, 1);

            Y.Assert.areEqual(
                31+31+30+31+30+31,
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
        },

        'should return the midnight time for a date': function() {
            var date = new Date(2016, 1, 2, 15, 19),
                midnight;

            midnight = Y.DataType.DateMath.toMidnight(date);

            Y.Assert.areEqual(2016, midnight.getFullYear());
            Y.Assert.areEqual(1, midnight.getMonth());
            Y.Assert.areEqual(2, midnight.getDate());
            Y.Assert.areEqual(0, midnight.getHours());
            Y.Assert.areEqual(0, midnight.getMinutes());
        },

        'should not change argument when calling toMidnight': function() {
            var date = new Date(2016, 1, 2, 15, 35),
                midnight;

            midnight = Y.DataType.DateMath.toMidnight(date);

            Y.Assert.areEqual(2016, date.getFullYear());
            Y.Assert.areEqual(1, date.getMonth());
            Y.Assert.areEqual(2, date.getDate());
            Y.Assert.areEqual(15, date.getHours());
            Y.Assert.areEqual(35, date.getMinutes());
        },

        'should return the last time for a date': function() {
            var date = new Date(2016, 1, 2, 15, 19),
                lastHour;

            lastHour = Y.DataType.DateMath.toLastHour(date);

            Y.Assert.areEqual(2016, lastHour.getFullYear());
            Y.Assert.areEqual(1, lastHour.getMonth());
            Y.Assert.areEqual(2, lastHour.getDate());
            Y.Assert.areEqual(23, lastHour.getHours());
            Y.Assert.areEqual(59, lastHour.getMinutes());
        },

        'should not change argument when calling toLastHour': function() {
            var date = new Date(2016, 1, 2, 15, 35),
                lastHour;

            lastHour = Y.DataType.DateMath.toLastHour(date);

            Y.Assert.areEqual(2016, date.getFullYear());
            Y.Assert.areEqual(1, date.getMonth());
            Y.Assert.areEqual(2, date.getDate());
            Y.Assert.areEqual(15, date.getHours());
            Y.Assert.areEqual(35, date.getMinutes());
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-datatype', 'test']
});
