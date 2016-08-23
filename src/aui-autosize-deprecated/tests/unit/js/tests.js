YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-autosize-deprecated');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        'test text is removed from pre tag when resizing autosize element': function() {
            var preElement = document.getElementsByClassName("autosize-height-monitor")[0];

            Y.Assert.areEqual("", preElement.innerHTML);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'test'
    ]
});
