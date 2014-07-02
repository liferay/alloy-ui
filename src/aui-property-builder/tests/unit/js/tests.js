YUI.add('module-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-property-builder');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests'
    }));

    Y.Test.Runner.add(suite);


},'', { requires: [ 'test' ] });
