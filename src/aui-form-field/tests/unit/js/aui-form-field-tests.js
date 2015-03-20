YUI.add('aui-form-field-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field');

    suite.add(new Y.Test.Case({
        name: 'Form Field Tests',

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should return field content': function() {
            this._field = new Y.FormField();

            Y.Assert.isNotNull(this._field.get('content'));
            Y.Assert.isTrue(this._field.get('content').hasClass('form-field'));
        },

        'should only allow array of fields as the nestedFields attribute': function() {
            this._field = new Y.FormField();

            Y.Assert.areEqual(0, this._field.get('nestedFields').length);

            this._field.set('nestedFields', 1);
            Y.Assert.areEqual(0, this._field.get('nestedFields').length);

            this._field.set('nestedFields', [1, 2]);
            Y.Assert.areEqual(0, this._field.get('nestedFields').length);

            this._field.set('nestedFields', [1, new Y.FormField()]);
            Y.Assert.areEqual(0, this._field.get('nestedFields').length);

            this._field.set('nestedFields', [new Y.FormField(), new Y.FormField()]);
            Y.Assert.areEqual(2, this._field.get('nestedFields').length);
        },

        'should render nested fields inside content': function() {
            this._field = new Y.FormField({
                nestedFields: [new Y.FormField(), new Y.FormField()]
            });

            Y.Assert.areEqual(2, this._field.get('content').all('.form-field').size());

            this._field.set('nestedFields', [new Y.FormField()]);
            Y.Assert.areEqual(1, this._field.get('content').all('.form-field').size());
        },

        'should remove nested fields': function() {
            var nestedField = new Y.FormField();

            this._field = new Y.FormField({
                nestedFields: [nestedField, new Y.FormField()]
            });
            Y.one('#container').append(this._field.get('content'));

            this._field.removeNestedField(nestedField);
            Y.Assert.areEqual(1, this._field.get('nestedFields').length);
            Y.Assert.areEqual(1, this._field.get('content').all('.form-field').size());

            this._field.removeNestedField(new Y.FormField());
            Y.Assert.areEqual(1, this._field.get('nestedFields').length);
            Y.Assert.areEqual(1, this._field.get('content').all('.form-field').size());
        },

        'should add nested fields': function() {
            var nestedField = new Y.FormField();

            this._field = new Y.FormField({
                nestedFields: [new Y.FormField(), new Y.FormField()]
            });
            Y.one('#container').append(this._field.get('content'));

            this._field.addNestedField(1, nestedField);
            Y.Assert.areEqual(3, this._field.get('nestedFields').length);
            Y.Assert.areSame(nestedField, this._field.get('nestedFields')[1]);
        },

        'should render title and help text': function() {
            var helpNode,
                titleNode;

            this._field = new Y.FormField({
                help: 'Help 1',
                title: 'Title 1'
            });
            helpNode = this._field.get('content').one('.form-field-help');
            titleNode = this._field.get('content').one('.form-field-title');

            Y.Assert.areEqual('Help 1', helpNode.get('text'));
            Y.Assert.areEqual('Title 1', titleNode.get('text'));
        },

        'should render title and help text when they are updated': function() {
            var helpNode,
                titleNode;

            this._field = new Y.FormField({
                help: 'Help 1',
                title: 'Title 1'
            });

            this._field.set('help', 'Help 2');
            this._field.set('title', 'Title 2');

            helpNode = this._field.get('content').one('.form-field-help');
            titleNode = this._field.get('content').one('.form-field-title');

            Y.Assert.areEqual('Help 2', helpNode.get('text'));
            Y.Assert.areEqual('Title 2', titleNode.get('text'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field', 'test']});
