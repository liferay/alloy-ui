YUI.add('aui-base-tests', function(Y) {

    var escapedEntities = ['&amp;', '&lt;', '&gt;', '&#034;', '&#039;', '&#047;', '&#096;'],
        nl2brStrings = [
            'lorem-ipsum-dolor\r\n, lorem-ipsum!',
            'lorem?\r',
            'lorem ipsum dolor\n lorem-ipsum dolor.',
            'Lorem ipsum\n\r lorem-ipsum-dolor-sit-amet \r dolor.'
        ],
        nl2brStringsOutput = [
            'lorem-ipsum-dolor<br />, lorem-ipsum!',
            'lorem?\r',
            'lorem ipsum dolor<br /> lorem-ipsum dolor.',
            'Lorem ipsum<br />\r lorem-ipsum-dolor-sit-amet \r dolor.'
        ],
        numbersToPad = [1, 10, 2.5, 6.789, 123.4, 3000.3102, .5, .10001, 500000.0],
        symbolEntities = ['&','<','>','"','\'','/','`'],
        uncamelizedStrings = [
            'lorem-ipsum-dolor-sit-amet',
            'LorEm-Ipsum-dolor-sit-AMET',
            'Lorem-Ipsum-doLOR. sit-amet +1',
            'lorem-ipsum-dolor-sit-amet, LOREM-ipsum-D&OLOR',
            'Lorem-ipsum-dolor-sit-amet. lorem-ipsum-dolor-sit-amet, lorem-Ipsum-Dolor-Sit-Amet',
        ];

    var Assert = Y.Assert,
        suite = new Y.Test.Suite('aui-base');

    suite.add(new Y.Test.Case({

        getPrecisionPrePostDecimal: function(number) {
            var split = number.toString().split('.');

            return {
                pre: split[0].length,
                post: split[1] ? split[1].length : 0
            };
        },

        'should unescape symbols as HTML entities': function() {
            var escaped = [];

            for (var i = 0; i < symbolEntities.length; i++) {
                escaped.push(Y.Lang.String.unescapeHTML(symbolEntities[i]));
            }

            for (var j = 0; j < escapedEntities.length; j++) {
                Assert.areEqual(escaped[i], escapedEntities[i]);
            }
        },

        'should escape HTML entities as symbols': function() {
            var symbols = [];

            for (var i = 0; i < escapedEntities.length; i++) {
                symbols.push(Y.Lang.String.unescapeHTML(escapedEntities[i]));
            }

            for (var j = 0; j < symbolEntities.length; j++) {
                Assert.areEqual(symbols[i], symbolEntities[i]);
            }
        },

        'should camelize strings correctly': function() {
            for (var i = 0; i < uncamelizedStrings.length; i++) {
                var toBeCamelized = uncamelizedStrings[i],
                    camelized = Y.Lang.String.camelize(toBeCamelized),
                    capitalIndices = [],
                    character = null,
                    dashCount = 0;

                //find the dash and capitalized indicies
                for(var j = 0; j < toBeCamelized.length; j++) {
                    character = toBeCamelized[j];

                    if (character === '-') {
                        capitalIndices.push(j - dashCount);

                        dashCount++;
                    }
                    else if (character.toUpperCase() === character) {
                        capitalIndices.push(j - dashCount);
                    }
                }

                //ensure the result is camelized
                for (var k = 0; k < camelized.length; k++) {
                    character = camelized[k];

                    if (capitalIndices.indexOf(k) === -1) {
                        Assert.areSame(character.toLowerCase(), character);
                    }
                    else {
                        Assert.areSame(character.toUpperCase(), character);
                    }
                }
            }
        },

        'should pad numbers correctly': function() {
            for (var i = 0; i < numbersToPad.length; i++) {
                var toBePadded = numbersToPad[i],
                    toBePaddedLengths = this.getPrecisionPrePostDecimal(toBePadded),
                    length = null,
                    padded = null,
                    paddedLengths = null
                    precision = null;

                for (var j = 0; j < 20; j++) {
                    length = Math.max(toBePaddedLengths.post, j);
                    precision = Math.max(toBePaddedLengths.pre, j);
                    padded = Y.Lang.String.padNumber(toBePadded, precision, length);
                    paddedLengths = this.getPrecisionPrePostDecimal(padded);

                    Assert.isTrue(Y.Lang.isString(padded));
                    Assert.isTrue(Y.Lang.isNumber(parseFloat(toBePadded)));
                    Assert.areEqual(toBePadded, parseFloat(padded));
                    Assert.areEqual(paddedLengths.pre, precision);
                    Assert.areEqual(paddedLengths.post, length);
                }
            }
        },

        'should convert new lines("\\n" & "\\r") to line breaks("<br />")': function() {
            for (var i = 0; i < nl2brStrings.length; i++) {
                Assert.areEqual(Y.Lang.String.nl2br(nl2brStrings[i]),  nl2brStringsOutput[i]);
            }
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-base']
});
