YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-multi-letter-char-counter');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',
        setUp: function () {
            var multiLetters = [
                null, // multi letters characters as not counted at all, we don't have any
                /cs|dz|gy|ly|ny|sz|ty|zs/gi, // double letters characters counted as one
                /dzs/gi // triple letters counted as one
            ];
            this.multipleLetterCharCounter = new Y.MultiLetterCharCounter({
                multiLetters: multiLetters,
                maxLength: 20
            });
        },
        '_getMultiLettersLength': function() {
            var word = 'zsiráf',
                expectedLength = 5,
                length = this.multipleLetterCharCounter._getMultiLettersLength(word);
            Y.Assert.areEqual(expectedLength, length, "Lenght should be: " + expectedLength);
        }
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test' ] });
