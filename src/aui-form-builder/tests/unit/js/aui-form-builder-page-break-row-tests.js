YUI.add('aui-form-builder-page-break-row-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-page-break-row');

    suite.add(new Y.Test.Case({
        name: 'Form Builder Page Break Row Tests',

        'should render index': function() {
            var row = new Y.FormBuilderPageBreakRow({
                index: 10
            });

            console.log('here', row.get('node'));
            Y.Assert.areEqual('10', row.get('node').one('.form-builder-page-break-index').get('text'));
        },

        'should update index': function() {
            var row = new Y.FormBuilderPageBreakRow({
                index: 10
            });
            row.set('index', 20);

            Y.Assert.areEqual('20', row.get('node').one('.form-builder-page-break-index').get('text'));
        },

        'should render quantity': function() {
            var row = new Y.FormBuilderPageBreakRow({
                quantity: 10
            });

            Y.Assert.areEqual('10', row.get('node').one('.form-builder-page-break-quantity').get('text'));
        },

        'should update quantity': function() {
            var row = new Y.FormBuilderPageBreakRow({
                quantity: 10
            });
            row.set('quantity', 20);

            Y.Assert.areEqual('20', row.get('node').one('.form-builder-page-break-quantity').get('text'));
        },

        'should make first page break unmovable': function() {
            var row = new Y.FormBuilderPageBreakRow({
                index: 1,
                quantity: 2
            });

            Y.Assert.isFalse(row.get('movable'));

            row.set('index', 2);
            Y.Assert.isTrue(row.get('movable'));

            row.set('index', 3);
            Y.Assert.isTrue(row.get('movable'));

            row.set('index', 1);
            Y.Assert.isFalse(row.get('movable'));
        },

        'should make first page break unremovable': function() {
            var row = new Y.FormBuilderPageBreakRow({
                index: 1,
                quantity: 2
            });

            Y.Assert.isFalse(row.get('removable'));

            row.set('index', 2);
            Y.Assert.isTrue(row.get('removable'));

            row.set('index', 3);
            Y.Assert.isTrue(row.get('removable'));

            row.set('index', 1);
            Y.Assert.isFalse(row.get('removable'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['aui-form-builder-page-break-row', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
