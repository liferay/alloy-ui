YUI.add('aui-base-tests', function(Y) {

    var caseStrings = ['liferay', 'Liferay', 'cAPITAL', 'Capital', 'word-dash', 'Word-dash'],
        caseStringsUpper = [
            'YIELDING GREAT GIVEN',
            'WATERS WHEREIN CREATURE OVER',
            'DARKNESS BEHOLD FOWL LIKENESS UPON',
            'GREEN. THE BEHOLD LIKENESS FISH',
            'MOVED RULE HEAVEN'
        ],
        caseStringsLower = [
            'yielding great given',
            'waters wherein creature over',
            'darkness behold fowl likeness upon',
            'green. the behold likeness fish',
            'moved rule heaven'
        ],
        containStrings = ['alongstring', 'a-different-string', 'anotherstring123'],
        definedStrings = [
            '',
            '',
            'defined'
        ],
        definitionStrings = [
            ,
            '',
            'defined'
        ],
        endsWithStrings = [
            'lorem-ipsum',
            'lorem ipsum',
            'loremipsumdolor',
            'lorem'
        ],
        endsWithStringsSuffixes = [
            'ipsum',
            ' ipsum',
            'dolor',
            'm'
        ],
        entityCharacters = [
            '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '-', '.', '/', '0', '1', '2', '3', '4', '5',
            '6', '7', '8', '9', ':', ';', '<', '=', '>', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', '\\', ']', '^', '_',
            '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~'
        ],
        entityNames = [
            '', '', '', '', '', '&amp;', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            '&lt;', '', '&gt;', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '', '', '', '', ''
        ],
        entityNumbers = [
            '&#33;', '&#34;', '&#35;', '&#36;', '&#37;', '&#38;', '&#39;', '&#40;', '&#41;', '&#42;', '&#43;', '&#44;',
            '&#45;', '&#46;', '&#47;', '&#48;', '&#49;', '&#50;', '&#51;', '&#52;', '&#53;', '&#54;', '&#55;', '&#56;',
            '&#57;', '&#58;', '&#59;', '&#60;', '&#61;', '&#62;', '&#63;', '&#64;', '&#65;', '&#66;', '&#67;', '&#68;',
            '&#69;', '&#70;', '&#71;', '&#72;', '&#73;', '&#74;', '&#75;', '&#76;', '&#77;', '&#78;', '&#79;', '&#80;',
            '&#81;', '&#82;', '&#83;', '&#84;', '&#85;', '&#86;', '&#87;', '&#88;', '&#89;', '&#90;', '&#91;', '&#92;',
            '&#93;', '&#94;', '&#95;', '&#96;', '&#97;', '&#98;', '&#99;', '&#100;', '&#101;', '&#102;', '&#103;', '&#104;',
            '&#105;', '&#106;', '&#107;', '&#108;', '&#109;', '&#110;', '&#111;', '&#112;', '&#113;', '&#114;', '&#115;',
            '&#116;', '&#117;', '&#118;', '&#119;', '&#120;', '&#121;', '&#122;', '&#123;', '&#124;', '&#125;', '&#126;'
        ],
        escapedEntities = ['&amp;', '&lt;', '&gt;', '&#034;', '&#039;', '&#047;', '&#096;'],
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
        numbersToPad = [1, 10, 2.5, 6.789, 123.4, 3000.3102, 0.5, 0.10001, 500000.0],
        pluralizedStrings = [
            'apples',
            'fish',
            'mailmen',
            'octopi'
        ],
        precisionNumberLower = 1.123456789,
        prefixedStrings = [
            'blacksmith',
            'goldsmith',
            'john smith',
            'smithereens',
            'swordsmith',
            'wordsmith'
        ],
        prefixLessStrings = [
            'smith',
            'smith',
            'smith',
            'ereens',
            'smith',
            'smith'
        ],
        prefixStrings = [
            'black',
            'gold',
            'john ',
            'smith',
            'sword',
            'word'
        ],
        regExCharacters = ['(', ')', '^', '$', '.', '*', '?', '/', '+', '|', '[', ']', '\\'],
        removalTestStrings = [
            'broccoli roccoli brocoli broc coli brocoli.',
            'carrots carrot carrotscarrot carrotcarrot',
            'not tomatoes,tomato?',
            '.potato potatoes potahto plobflaybo',
            'vegetables'
        ],
        removalSubstrings = [
            'broccoli',
            'carrot',
            'tomato',
            'potato',
            'vege'
        ],
        removedStrings = [
            ' roccoli brocoli broc coli brocoli.',
            's  s ',
            'not es,?',
            '. es potahto plobflaybo',
            'tables'
        ],
        repeatedString = 'word',
        scriptStrings = [
            '<p>I am <script>alert("not");</script>hungry</p>',
            '"<s<script></script>cript>alert("Difficult test")</script>"")',
            '</script><script>',
            '<script>alert("not")</script>'
        ],
        singleRemovedStrings = [
            ' roccoli brocoli broc coli brocoli.',
            's carrot carrotscarrot carrotcarrot',
            'not es,tomato?',
            '. potatoes potahto plobflaybo',
            'tables'
        ],
        singularStrings = [
            'apple',
            'fish',
            'mailman',
            'octopus'
        ],
        strippedScriptStrings = [
            '<p>I am hungry</p>',
            '"<script>alert("Difficult test")</script>"")',
            '</script><script>',
            ''
        ],
        subbableStrings = [
            'Apple',
            'Grape',
            'Honeydew',
            'Pineapple',
            'Watermelon'
        ],
        subbedStrings = [
            'A',
            'pe',
            'Honeydew',
            'ineapp',
            'melon'
        ],
        subValues = [
            0, 1,
            3, 5,
            0, 8,
            1, 6,
            5, 9
        ],
        symbolEntities = ['&','<','>','"','\'','/','`'],
        taggedStrings = [
            '<p>Knock knock.</p> <a href="#question">Who\'s there?</a>',
            '<span>Git.</span>',
            '<p>Git-who?</ br>',
            '<a<a>></a> <a href="#">Sorry, "who" is not a git command - did you mean "show"?</a><li></li>'
        ],
        taglessStrings = [
            'Knock knock. Who\'s there?',
            'Git.',
            'Git-who?',
            '> Sorry, "who" is not a git command - did you mean "show"?'
        ],
        uncamelizedStrings = [
            'lorem-ipsum-dolor-sit-amet',
            'LorEm-Ipsum-dolor-sit-AMET',
            'Lorem-Ipsum-doLOR. sit-amet +1',
            'lorem-ipsum-dolor-sit-amet, LOREM-ipsum-D&OLOR',
            'Lorem-ipsum-dolor-sit-amet. lorem-ipsum-dolor-sit-amet, lorem-Ipsum-Dolor-Sit-Amet'
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
                for (var j = 0; j < toBeCamelized.length; j++) {
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

                    if (Y.Array.indexOf(capitalIndices, k) === -1) {
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
                    paddedLengths = null,
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
        },

        'should escape regular expressions correctly': function() {
            for (var i = 0; i < regExCharacters.length; i++) {
                Assert.areEqual(Y.Lang.String.escapeRegEx(regExCharacters[i]), '\\'.concat(regExCharacters[i]));
            }
        },

        'should check for ending suffix correctly': function() {
            for (var i = 0; i < endsWithStrings.length; i++) {
                Assert.isTrue(Y.Lang.String.endsWith(endsWithStrings[i], endsWithStringsSuffixes[i]));
            }
        },

        'should pluralize known words correctly': function() {
            for (var i = 0; i < singularStrings.length; i++) {
                Assert.areEqual(Y.Lang.String.pluralize(0, singularStrings[i], pluralizedStrings[i]), '0 '.concat(pluralizedStrings[i]));
                Assert.areEqual(Y.Lang.String.pluralize(1, singularStrings[i], pluralizedStrings[i]), '1 '.concat(singularStrings[i]));
                Assert.areEqual(Y.Lang.String.pluralize(2, singularStrings[i], pluralizedStrings[i]), '2 '.concat(pluralizedStrings[i]));
                Assert.areEqual(Y.Lang.String.pluralize(3, singularStrings[i], pluralizedStrings[i]), '3 '.concat(pluralizedStrings[i]));
                Assert.areEqual(Y.Lang.String.pluralize(4, singularStrings[i], pluralizedStrings[i]), '4 '.concat(pluralizedStrings[i]));
            }
        },

        'should prefix a string with a given string (does not work if the prefix is already appended) correctly': function() {
            var prefixStringsLength = prefixStrings.length;

            Assert.isTrue((prefixStringsLength === prefixLessStrings.length) && (prefixStringsLength === prefixedStrings.length));

            for (var i = 0; i < prefixStringsLength; i++) {
                Assert.areEqual(Y.Lang.String.prefix(prefixStrings[i], prefixLessStrings[i]), prefixedStrings[i]);
            }
        },

        'should default to string correctly': function () {
            Assert.areEqual('default', Y.Lang.String.defaultValue('', 'default'));
            Assert.areEqual('', Y.Lang.String.defaultValue('', undefined));
            Assert.areEqual('default', Y.Lang.String.defaultValue(undefined, 'default'));
            Assert.areNotEqual(undefined, Y.Lang.String.defaultValue('string', undefined));
            Assert.areNotEqual('default', Y.Lang.String.defaultValue('string', 'default'));
        },

        'should search strings correctly': function () {
            for (var i = 0; i < containStrings.length; i++) {
                var testString = containStrings[i],
                    testSubString = testString.substring(0, testString.length - 3);

                Assert.isTrue(Y.Lang.String.contains(testString, testSubString));
                Assert.isFalse(Y.Lang.String.contains(testString, 'abcdefghijkl'));
            }
        },

        'should capitalize words correctly': function () {
            for (var i = 0; i < caseStrings.length; i+=2) {
                var actual = caseStrings[i],
                    expected = caseStrings[i+1];

                Assert.areNotEqual(expected, actual);
                Assert.areEqual(expected, Y.Lang.String.capitalize(actual));
            }
        },

        'should unescape HTML entities correctly': function() {
            var entityCharactersLength = entityCharacters.length,
                entityName;

            Assert.isTrue((entityCharactersLength === entityNumbers.length) && (entityCharacters.length === entityNames.length));

            for (var i = 0; i < entityCharactersLength; i++) {
                Assert.areEqual(Y.Lang.String._unescapeEntitiesUsingDom(entityNumbers[i]), entityCharacters[i]);
                Assert.areEqual(Y.Lang.String.unescapeEntities(entityNumbers[i]), entityCharacters[i]);

                entityName = entityNames[i];

                if (entityName !== '') {
                    Assert.areEqual(Y.Lang.String._unescapeEntitiesUsingDom(entityName), entityCharacters[i]);
                    Assert.areEqual(Y.Lang.String.unescapeEntities(entityName), entityCharacters[i]);
                }
            }
        },

        'should define undefined values correctly': function() {
            var definitionStringsLength = definitionStrings.length;

            Assert.areEqual(definitionStringsLength, definedStrings.length);

            for (var i = 0; i < definitionStringsLength; i++) {
                Assert.areEqual(Y.Lang.String.undef(definitionStrings[i]), definedStrings[i]);
            }
        },

        'should return a substring correctly': function() {
            var subbableStringsLength = subbableStrings.length;

            Assert.isTrue(subbableStringsLength === (subValues.length / 2));
            Assert.isTrue(subbableStringsLength === subbedStrings.length);

            for (var i = 0; i < subbableStringsLength; i++) {
                Assert.areEqual(
                    Y.Lang.String.substr(subbableStrings[i], subValues[i * 2], subValues[(i * 2) + 1]),
                    subbedStrings[i]
                );
            }
        },

        'should strip tags correctly': function() {
           var taggedStringsLength = taggedStrings.length;

           Assert.areEqual(taggedStringsLength, taglessStrings.length);

           for (var i = 0; i < taggedStringsLength; i++) {
               Assert.areEqual(Y.Lang.String.stripTags(taggedStrings[i]), taglessStrings[i]);
           }
       },

        'should strip scripts correctly': function() {
            var scriptStringsLength = scriptStrings.length;

            Assert.areEqual(scriptStringsLength, strippedScriptStrings.length);

            for (var i = 0; i < scriptStringsLength; i++) {
                Assert.areEqual(Y.Lang.String.stripScripts(scriptStrings[i]), strippedScriptStrings[i]);
            }
        },

        'should return whether or not a string starts with a specified prefix correctly': function() {
            var prefixedStringsLength = prefixedStrings.length;

            Assert.isTrue(prefixedStringsLength === prefixStrings.length);
            Assert.isTrue(prefixedStringsLength === prefixLessStrings.length);

            for (var i = 0; i < prefixedStringsLength; i++) {
                Assert.isTrue(Y.Lang.String.startsWith(prefixedStrings[i], prefixStrings[i]));
                Assert.isTrue(!Y.Lang.String.startsWith(prefixedStrings[i], prefixLessStrings[i]));
            }
        },

        'should round numbers to the specified precision correctly': function() {
            var numArray = precisionNumberLower + '',
                numLength = numArray.length,
                numOffset;

            for (var i = 2; i < numLength; i++) {
                numOffset = (numLength - i);
                numArray = (Y.Lang.String.round(precisionNumberLower, numOffset) + '');

                if ((numOffset < 9) && (numOffset > 3)) {
                    Assert.areEqual((numOffset + 1), numArray[(numArray.length - 1)]);
                }
                else {
                    Assert.areEqual(numOffset, numArray[(numArray.length - 1)]);
                }
            }
        },

        'should remove all matched strings correctly': function() {
            var unremovedStringLength = removalTestStrings.length;

            Assert.isTrue(unremovedStringLength === removalSubstrings.length);
            Assert.isTrue(unremovedStringLength === removedStrings.length);

            for (var i = 0; i < unremovedStringLength; i++) {
                Assert.areEqual(Y.Lang.String.removeAll(removalTestStrings[i], removalSubstrings[i]), removedStrings[i]);
            }
        },

        'should return a repeated string correctly': function() {
            var testString = '';

            for (var i = 0; i < 100; i++) {
                Assert.areEqual(Y.Lang.String.repeat(repeatedString, i), testString);

                testString = testString.concat(repeatedString);
            }
        },

        'should remove matched strings correctly': function() {
            var unremovedStringLength = removalTestStrings.length;

            Assert.isTrue(unremovedStringLength === removalSubstrings.length);
            Assert.isTrue(unremovedStringLength === removedStrings.length);

            for (var i = 0; i < unremovedStringLength; i++) {
                Assert.areEqual(Y.Lang.String.removeAll(removalTestStrings[i], removalSubstrings[i]), removedStrings[i]);

                Assert.areEqual(Y.Lang.String.remove(removalTestStrings[i], removalSubstrings[i], true), removedStrings[i]);
                Assert.areEqual(Y.Lang.String.remove(removalTestStrings[i], removalSubstrings[i], false), singleRemovedStrings[i]);
            }
        },

        'should truncate long strings consistently': function() {
            var actual = Y.Lang.String.truncate('myteststring', 5, 'end'),
                expected = 'my...';

            Assert.areEqual(expected, actual);

            actual = Y.Lang.String.truncate('myteststring', 5, 'start');
            expected = '...ng';

            Assert.areEqual(expected, actual);

            actual = Y.Lang.String.truncate('myteststring', 8, 'middle');
            expected = 'myt...ng';

            Assert.areEqual(expected, actual);

            actual = Y.Lang.String.truncate('myteststring', 9, 'middle');
            expected = 'myt...ing';

            Assert.areEqual(expected, actual);

            actual = Y.Lang.String.truncate('string', 9, 'middle');
            expected = 'string';

            Assert.areEqual(expected, actual);

            actual = Y.Lang.String.truncate('string', 2, 'middle');
            expected = '...';

            Assert.areEqual(expected, actual);
        },

        'should convert case to upper': function() {
            for (var i = 0; i < caseStringsLower.length; i++) {
                Assert.areEqual(Y.Lang.String.toUpperCase(caseStringsLower[i]), caseStringsUpper[i]);
            }
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-base']
});
