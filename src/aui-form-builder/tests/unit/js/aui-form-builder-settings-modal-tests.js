YUI.add('aui-form-builder-settings-modal-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-settings-modal');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Settings Modal Unit Tests',

        setUp: function() {
            this._modal = new Y.FormBuilderSettingsModal();
        },

        tearDown: function() {
            this._modal.destroy();
        },

        /**
         * Simulates a `valuechange` event for the given input.
         *
         * @method _simulateInputChange
         * @param {Node} input The input node to simulate the event for.
         * @param {String} text The text that should be set as the input's final value.
         * @param {Function} callback The function to be called when the simulation is
         *   done.
         * @protected
         */
        _simulateInputChange: function(input, text, callback) {
            input.simulate('keydown');
            input.set('value', text);
            input.simulate('keydown');

            this.wait(callback, Y.ValueChange.POLL_INTERVAL);
        },

        'should not render modal when first created': function() {
            Y.Assert.isNull(Y.one('.form-builder-field-settings'));
        },

        'should show modal': function() {
            var node;

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');

            node = Y.one('.form-builder-field-settings');
            Y.Assert.isNotNull(node);
            Y.Assert.areNotEqual('none', node.getStyle('display'));
        },

        'should toggle modal components on toggle content': function() {
            this._modal.show(new Y.FormBuilderFieldText(), 'Text');

            Y.Assert.isTrue(Y.one('.form-builder-field-settings-small-screen-header-back').hasClass('hide'));
            Y.Assert.isFalse(Y.one('.form-builder-field-settings-small-screen-header-close').hasClass('hide'));

            Y.one('.form-builder-field-settings-panel-advanced-button').simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-field-settings-small-screen-header-back').hasClass('hide'));
            Y.Assert.isTrue(Y.one('.form-builder-field-settings-small-screen-header-close').hasClass('hidden'));

            Y.one('.form-builder-field-settings-small-screen-header-back').simulate('click');
            Y.Assert.isTrue(Y.one('.form-builder-field-settings-small-screen-header-back').hasClass('hide'));
            Y.Assert.isFalse(Y.one('.form-builder-field-settings-small-screen-header-close').hasClass('hide'));
        },

        'should not create multiple modals with multiple calls to "show"': function() {
            this._modal.show(new Y.FormBuilderFieldText(), 'Text');
            this._modal.show(new Y.FormBuilderFieldText(), 'Text');

            Y.Assert.areEqual(1, Y.all('.form-builder-field-settings').size());
        },

        'should hide modal': function() {
            var node;

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');
            this._modal.hide();

            node = Y.one('.form-builder-field-settings');
            Y.Assert.isNotNull(node);
            Y.Assert.areEqual('none', node.getStyle('display'));
        },

        'should fire event when modal is hidden': function() {
            var mock = Y.Mock();

            Y.Mock.expect(mock, {
                args: [Y.Mock.Value.Object],
                callCount: 1,
                method: 'listener'
            });

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');
            this._modal.on('hide', mock.listener);
            this._modal.hide();

            Y.Mock.verify(mock);
        },

        'should ignore call to hide modal before it\'s created': function() {
            var mock = Y.Mock();

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'listener'
            });

            this._modal.on('hide', mock.listener);
            this._modal.hide();

            Y.Assert.isNull(Y.one('.form-builder-field-settings'));
            Y.Mock.verify(mock);
        },

        'should hide modal when cancel button is clicked': function() {
            var node;

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');

            node = Y.one('.form-builder-field-settings');
            node.one('.form-builder-field-settings-cancel').simulate('mousemove');
            node.one('.form-builder-field-settings-cancel').simulate('click');
            Y.Assert.areEqual('none', node.getStyle('display'));
        },

        'should hide modal when close button is clicked': function() {
            var header,
                node;

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');

            node = Y.one('.form-builder-field-settings');
            node.one('.close').simulate('mousemove');
            node.one('.close').simulate('click');
            Y.Assert.areEqual('none', node.getStyle('display'));

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');
            Y.Assert.areEqual('block', node.getStyle('display'));

            header = Y.one('.form-builder-field-settings-small-screen-header');
            header.one('.form-builder-field-settings-small-screen-header-close').simulate('mousemove');
            header.one('.form-builder-field-settings-small-screen-header-close').simulate('click');
            Y.Assert.areEqual('none', node.getStyle('display'));
        },

        'should render title text as requested': function() {
            var title;

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');
            title = Y.one('.form-builder-field-settings-label');
            Y.Assert.areEqual('Text', title.get('text'));

            this._modal.hide();
            this._modal.show(new Y.FormBuilderFieldText(), 'Text2');
            Y.Assert.areEqual('Text2', title.get('text'));
        },

        'should focus the first text input when modal is showed': function() {
            var input,
                field = new Y.FormBuilderFieldText();

            this._modal.show(field, 'Text');
            input = Y.one('.form-builder-field-settings').one('input');
            Y.Mock.expect(input, {
                method: 'focus'
            });

            this._modal.hide();
            this._modal.show(field, 'Text');

            Y.Mock.verify(input);
        },

        'should save modal when save button is clicked': function() {
            var field = new Y.FormBuilderFieldText(),
                header,
                node;

            this._modal.show(field, 'Text');

            node = Y.one('.form-builder-field-settings');
            header = Y.one('.form-builder-field-settings-small-screen-header');

            this._simulateInputChange(node.one('input'), 'My Title', function() {
                node.one('.form-builder-field-settings-save').simulate('mousemove');
                node.one('.form-builder-field-settings-save').simulate('click');

                Y.Assert.areEqual('My Title', field.get('title'));
                Y.Assert.areEqual('none', node.getStyle('display'));
            });

            this._modal.show(field, 'Text');

            this._simulateInputChange(node.one('input'), 'My Title 2', function() {
                node.one('.form-builder-field-settings-small-screen-header-check').simulate('mousemove');
                node.one('.form-builder-field-settings-small-screen-header-check').simulate('click');

                Y.Assert.areEqual('My Title 2', field.get('title'));
                Y.Assert.areEqual('none', node.getStyle('display'));
            });
        },

        'should not save modal without required data': function() {
            var node;

            this._modal.show(new Y.FormBuilderFieldText(), 'Text');

            node = Y.one('.form-builder-field-settings');
            node.one('.form-builder-field-settings-save').simulate('mousemove');
            node.one('.form-builder-field-settings-save').simulate('click');
            Y.Assert.areNotEqual('none', node.getStyle('display'));
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: [
        'aui-form-builder-settings-modal',
        'aui-form-builder-field-text',
        'node-event-simulate',
        'test'
    ],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
