YUI.add('aui-form-builder-field-type-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-field-type');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Field Type Unit Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createFormBuilder({});
        },

        tearDown: function() {
            this._fieldType && this._fieldType.destroy();
        },

        createFormBuilder: function(config) {
            this._fieldType = new Y.FormBuilderFieldType(config);
            this._container.append(this._fieldType.get('node'));
        },

        'should have a default configuration object': function () {
            var fieldType = this._fieldType,
                testValue = 'test';

            fieldType.set('defaultConfig', {test: testValue});
            Y.Assert.areEqual(fieldType.get('defaultConfig').test, 'test');
        },

        'should be disabled': function () {
            var fieldType = this._fieldType;

            fieldType.destroy();

            fieldType = new Y.FormBuilderFieldType({disabled: true});
            Y.Assert.isTrue(fieldType.get('disabled'));

            fieldType.set('disabled', false);
            Y.Assert.isFalse(fieldType.get('disabled'));

            fieldType.set('disabled', true);
            Y.Assert.isTrue(fieldType.get('disabled'));
        },

        'should set an icon': function () {
            var iconTest = 'icon-test',
                icon = 'icon';

            this._fieldType.set('icon', iconTest);
            Y.Assert.isTrue(Y.one('.field-type-icon').hasClass(iconTest));

            this._fieldType.set('icon', 'icon');
            Y.Assert.isFalse(Y.one('.field-type-icon').hasClass(iconTest));
            Y.Assert.isTrue(Y.one('.field-type-icon').hasClass(icon));
        },

        'should not set an icon': function () {
            var iconTest = 'icon-test';

            Y.one('.field-type-icon').remove(true);
            this._fieldType.set('icon', iconTest);
            Y.Assert.isNull(Y.one('.field-type-icon'));
        },

        'should set a label': function () {
            var label = 'label-test';

            this._fieldType.set('label', label);
            Y.Assert.areEqual(Y.one('.field-type-label').getHTML(), label);
        },

        'should not set a label': function () {
            var label = 'label-test';

            Y.one('.field-type-label').remove(true);
            this._fieldType.set('label', label);
            Y.Assert.isNull(Y.one('.field-type-label'));
        },

        'should set unique value': function () {
            Y.Assert.isFalse(this._fieldType.get('unique'));

            this._fieldType.set('unique', true);
            Y.Assert.isTrue(this._fieldType.get('unique'));

            this._fieldType.set('unique', false);
            Y.Assert.isFalse(this._fieldType.get('unique'));
        },

        'should add class on mouse over': function () {
            var iconTest = 'icon-test',
                label = 'label-test';

            this._fieldType.set('icon', iconTest);
            this._fieldType.set('label', label);

            Y.Assert.isFalse(Y.one('.field-type-label').hasClass('field-type-label-mouse-over'));
            Y.Assert.isFalse(Y.one('.field-type-icon').hasClass('field-type-icon-mouse-over'));

            Y.one('.field-type').simulate('mouseover');

            Y.Assert.isTrue(Y.one('.field-type-label').hasClass('field-type-label-mouse-over'));
            Y.Assert.isTrue(Y.one('.field-type-icon').hasClass('field-type-icon-mouse-over'));
        },

        'should remove class on mouse out': function () {
            var iconTest = 'icon-test',
                label = 'label-test';

            this._fieldType.set('icon', iconTest);
            this._fieldType.set('label', label);
            Y.one('.field-type').simulate('mouseover');

            Y.Assert.isTrue(Y.one('.field-type-label').hasClass('field-type-label-mouse-over'));
            Y.Assert.isTrue(Y.one('.field-type-icon').hasClass('field-type-icon-mouse-over'));

            Y.one('.field-type').simulate('mouseout');
            this._fieldType._onMouseLeave();

            Y.Assert.isFalse(Y.one('.field-type-label').hasClass('field-type-label-mouse-over'));
            Y.Assert.isFalse(Y.one('.field-type-icon').hasClass('field-type-icon-mouse-over'));
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-form-builder-field-type', 'node-event-simulate', 'test'],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
