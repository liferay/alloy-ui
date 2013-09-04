YUI.add('module-tests', function(Y) {

    function areLikelySameDate(date1, date2) {
        return date2 &&
                date1.getFullYear() === date2.getFullYear() &&
                date1.getMonth() === date2.getMonth() &&
                date1.getDate() === date2.getDate() &&
                date1.getHours() === date2.getHours() &&
                date1.getMinutes() === date2.getMinutes() &&
                date1.getSeconds() === date2.getSeconds();
    }

    function testMask(mask, opt_text, opt_date) {
        var parsedDate;

        opt_date = opt_date || new Date(2013, 0, 1, 15, 5, 10);
        opt_text = opt_text || Y.Date.format(opt_date, { format: mask });

        parsedDate = Y.Date.parse(mask, opt_text, new Date(+opt_date));

        Y.Assert.isTrue(
            areLikelySameDate(opt_date, parsedDate),
            mask + ' [' + opt_text + ', ' + opt_date + ', ' + parsedDate + ' ]');
    }

    function testParse(mask, input, expected, message) {
        var actual = Y.Date.parse(mask, input);

        Y.Assert.areEqual(expected, actual, message);
    }

    var suite = new Y.Test.Suite('aui-datatype-date-parse');

    suite.add(new Y.Test.Case({
        name: 'Y.Date.parse',

        'test hour parsing Hk': function() {
            testMask('%H');
            testMask('%H%M%S');
            testMask('%H %M %S');
            testMask('%H:%M:%S');
            testMask('foo %H:%M:%S %p bar');
            testMask('%k');
            testMask('%k%M%S');
            testMask('%k %M %S');
            testMask('%k:%M:%S');
            testMask('foo %k:%M:%S %p bar');

            testMask('%k:%M:%S%z');
            testMask('%k:%M:%S%Z');
            testMask('%k:%M:%S %z');
            testMask('%k:%M:%S %Z');
        },

        'test hour parsing Il': function() {
            testMask('%I%P');
            testMask('%I %P');
            testMask('%I%p');
            testMask('%I %p');
            testMask('%I%M%S%P');
            testMask('%I:%M:%S %P');
            testMask('%I:%M:%S%P');
            testMask('%I%M%S%p');
            testMask('%I:%M:%S %p');
            testMask('%I:%M:%S%p');
            testMask('foo %I:%M:%S %P bar');
            testMask('foo %I:%M:%S %p bar');

            testMask('%l%P');
            testMask('%l %P');
            testMask('%l%p');
            testMask('%l %p');
            testMask('%l%M%S%P');
            testMask('%l:%M:%S %P');
            testMask('%l:%M:%S%P');
            testMask('%l%M%S%p');
            testMask('%l:%M:%S %p');
            testMask('%l:%M:%S%p');
            testMask('foo %l:%M:%S %P bar');
            testMask('foo %l:%M:%S %p bar');

            testMask('%I%M%S%P%z');
            testMask('%I%M%S%P%Z');
            testMask('%I:%M:%S %P %z');
            testMask('%I:%M:%S %P %Z');
        },

        'test am/pm': function() {
            testMask('%I:%M %P', '12:00 AM', new Date(2013, 04, 10, 0, 0, 0));
            testMask('%I:%M %P', '01:00 AM', new Date(2013, 04, 10, 1, 0, 0));
            testMask('%I:%M %P', '12:00 PM', new Date(2013, 04, 10, 12, 0, 0));
            testMask('%I:%M %P', '01:00 PM', new Date(2013, 04, 10, 13, 0, 0));
            testMask('%l:%M %P', '1:00 PM', new Date(2013, 04, 10, 13, 0, 0));
        },

        'test year': function() {
            testMask('%Y', '1970', new Date(1970, 04, 10));
            testMask('%Y', '2000', new Date(2000, 04, 10));
            testMask('%Y', '2001', new Date(2001, 04, 10));
            testMask('%y', '01', new Date(2001, 04, 10));
            testMask('%d/%m/%Y', '10/05/2000', new Date(2000, 04, 10));
            testMask('%d/%m/%Y', '10/05/-2000', new Date(-2000, 04, 10));
            testMask('%d/%m/%y', '10/05/10', new Date(2010, 04, 10));
            testMask('%d/%m/%y', '10/05/-10', new Date(-2010, 04, 10));
            testMask('%d/%m/%y', '10/05/00', new Date(2000, 04, 10));
        },

        'test aggregates': function() {
            testMask('%c');
            testMask('%D');
            testMask('%F');
            testMask('%r');
            testMask('%R');
            testMask('%T');
            testMask('%x');
            testMask('%X');
        },

        'test strict dates': function() {
            testMask('%d/%m/%Y');
            testMask('%e/%m/%Y');
            testMask('%m/%e/%Y');
            testMask('%m/%e/%Y');
            testMask('%d-%m-%Y');
            testMask('%e-%m-%Y');
            testMask('%m-%e-%Y');
            testMask('%m-%e-%Y');
        },

        'test user input': function() {
            testMask('%d/%m/%Y', '10/11/2005', new Date(2005, 10, 10));
            testMask('%d/%m/%Y', '10 / 11 / 2005', new Date(2005, 10, 10));
            testMask('foo %d/%m/%Y', 'foo 10/11/2005 bar', new Date(2005, 10, 10));
            testMask('%c', 'Tue, Jan 01, 2013 3:05:10 PM BRT', new Date(2013, 0, 01, 15, 05, 10));
            testMask('%a, %b %d, %Y %H:%M:%S %p %Z', 'Tue, Jan 01, 2013 15:05:10 BRT', new Date(2013, 0, 01, 15, 05, 10));
        },

        /*
         * @tests AUI-978
         */
        'test invalid input': function() {
            testParse('%d', 'test', false, 'The false value is expected when Date parser fails to complete.');
            testParse('%d/%m/%Y', '', false, 'The false value is expected when Date parser fails to complete.');
            testParse('%d ', 'test 10', false, 'The false value is expected when Date parser fails to complete.');
        }
    }));

    Y.Test.Runner.add(suite);

},'', { requires: [ 'aui-datatype-date-parse', 'intl', 'test' ] });
