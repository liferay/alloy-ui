YUI.add('aui-options-data-editor-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-options-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Options Data Editor Unit Tests',

        setUp: function() {
            this._editor = new Y.OptionsDataEditor({
                editedValue: ['Drogon', 'Visirion', 'Rhaegal'],
                originalValue: ['Drogon', 'Visirion', 'Rhaegal']
            });
            Y.one('#container').append(this._editor.get('node'));
        },

        tearDown: function() {
            if (this._editor) {
                this._editor.destroy();
            }
        },

        /**
         * Simulates dragging an option on top of another.
         *
         * @method _simulateDrag
         * @param {Y.Test.Case} test
         * @param {Node} dragHandle
         * @param {Node} dropNode
         * @param {Boolean} above
         * @protected
         */
        _simulateDrag: function(test, dragNode, dropNode, above, callback) {
            var dragHandle = dragNode.one('.options-data-editor-option-handle'),
                dropRegion,
                shim;

            dragHandle.simulate('mousedown', {
                clientX: dragHandle.getXY()[0],
                clientY: dragHandle.getXY()[1]
            });
            test.wait(function() {
                shim = Y.one('.yui3-dd-shim');
                dropRegion = dropNode.get('region');

                shim.simulate('mousemove', {
                    clientX: dropRegion.left,
                    clientY: dropRegion.top + 10
                });

                shim.simulate('mousemove', {
                    clientX: dropRegion.left,
                    clientY: above ? dropRegion.top : dropRegion.top + 10
                });

                dragHandle.simulate('mouseup');

                if (callback) {
                    callback();
                }
            }, Y.DD.DDM.get('clickTimeThresh') + 100);
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

        'should update the ui according to the edited value': function() {
            var optionNodes = this._editor.get('node').all('.options-data-editor-option');

            Y.Assert.areEqual(3, optionNodes.size());
            Y.Assert.areEqual('Drogon', optionNodes.item(0).one('input').get('value'));
            Y.Assert.areEqual('Visirion', optionNodes.item(1).one('input').get('value'));
            Y.Assert.areEqual('Rhaegal', optionNodes.item(2).one('input').get('value'));

            this._editor.set('editedValue', ['Saphira', 'Smaug']);
            optionNodes = this._editor.get('node').all('.options-data-editor-option');
            Y.Assert.areEqual(2, optionNodes.size());
            Y.Assert.areEqual('Saphira', optionNodes.item(0).one('input').get('value'));
            Y.Assert.areEqual('Smaug', optionNodes.item(1).one('input').get('value'));
        },

        'should get edited value from the ui': function() {
            var instance = this,
                input,
                editedValue,
                optionNodes = this._editor.get('node').all('.options-data-editor-option');

            input = optionNodes.item(0).one('input');
            this._simulateInputChange(input, 'Saphira', function() {
                editedValue = instance._editor.get('editedValue');
                Y.Assert.areEqual(3, editedValue.length);
                Y.Assert.areEqual('Saphira', editedValue[0]);
                Y.Assert.areEqual('Visirion', editedValue[1]);
                Y.Assert.areEqual('Rhaegal', editedValue[2]);
            });
        },

        'should add new options through button': function() {
            var instance = this,
                editedValue,
                input,
                optionNodes;

            this._editor.get('node').one('.options-data-editor-add').simulate('click');

            optionNodes = this._editor.get('node').all('.options-data-editor-option');
            Y.Assert.areEqual(4, optionNodes.size());

            input = optionNodes.item(3).one('input');
            this._simulateInputChange(input, 'Saphira', function() {
                editedValue = instance._editor.get('editedValue');
                Y.Assert.areEqual(4, editedValue.length);
                Y.Assert.areEqual('Drogon', editedValue[0]);
                Y.Assert.areEqual('Visirion', editedValue[1]);
                Y.Assert.areEqual('Rhaegal', editedValue[2]);
                Y.Assert.areEqual('Saphira', editedValue[3]);
            });
        },

        'should removing options through buttons': function() {
            var editedValue,
                optionNodes,
                removeButtons = this._editor.get('node').all('.options-data-editor-option-remove');

            removeButtons.item(0).simulate('click');

            optionNodes = this._editor.get('node').all('.options-data-editor-option');
            Y.Assert.areEqual(2, optionNodes.size());

            editedValue = this._editor.get('editedValue');
            Y.Assert.areEqual(2, editedValue.length);
            Y.Assert.areEqual('Visirion', editedValue[0]);
            Y.Assert.areEqual('Rhaegal', editedValue[1]);
        },

        'should check if the form is valid': function() {
            var items;

            this._editor.set('editedValue', []);

            Y.Assert.isTrue(this._editor.isValid());

            this._editor.set('required', true);
            Y.Assert.isFalse(this._editor.isValid());

            items = this._editor.get('editedValue');
            items.push('');
            this._editor.set('editedValue', items);
            Y.Assert.isFalse(this._editor.isValid());

            items[0] = 'Shazam';
            this._editor.set('editedValue', items);
            Y.Assert.isTrue(this._editor.isValid());
        }
    }));

    Y.Test.Runner.add(suite);
},'', {requires: ['aui-options-data-editor', 'node-event-simulate', 'test']});
