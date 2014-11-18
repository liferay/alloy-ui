YUI.add('aui-options-data-editor-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-options-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Options Data Editor Unit Tests',

        setUp: function() {
            this._editor = new Y.OptionsDataEditor({
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

        'should set original value on the ui': function() {
            var optionNodes = this._editor.get('node').all('.options-data-editor-option');

            Y.Assert.areEqual(3, optionNodes.size());
            Y.Assert.areEqual('Drogon', optionNodes.item(0).one('input').get('value'));
            Y.Assert.areEqual('Visirion', optionNodes.item(1).one('input').get('value'));
            Y.Assert.areEqual('Rhaegal', optionNodes.item(2).one('input').get('value'));

            this._editor.set('originalValue', ['Saphira', 'Smaug']);
            optionNodes = this._editor.get('node').all('.options-data-editor-option');
            Y.Assert.areEqual(2, optionNodes.size());
            Y.Assert.areEqual('Saphira', optionNodes.item(0).one('input').get('value'));
            Y.Assert.areEqual('Smaug', optionNodes.item(1).one('input').get('value'));
        },

        'should get edited value from the ui': function() {
            var editedValue,
                optionNodes = this._editor.get('node').all('.options-data-editor-option');

            optionNodes.item(0).one('input').set('value', 'Saphira');
            optionNodes.item(2).one('input').set('value', 'Smaug');

            editedValue = this._editor.get('editedValue');
            Y.Assert.areEqual(3, editedValue.length);
            Y.Assert.areEqual('Saphira', editedValue[0]);
            Y.Assert.areEqual('Visirion', editedValue[1]);
            Y.Assert.areEqual('Smaug', editedValue[2]);
        },

        'should add new options through button': function() {
            var editedValue,
                optionNodes;

            this._editor.get('node').one('.options-data-editor-add').simulate('click');
            this._editor.get('node').one('.options-data-editor-add').simulate('click');

            optionNodes = this._editor.get('node').all('.options-data-editor-option');
            optionNodes.item(3).one('input').set('value', 'Saphira');
            optionNodes.item(4).one('input').set('value', 'Smaug');

            editedValue = this._editor.get('editedValue');
            Y.Assert.areEqual(5, editedValue.length);
            Y.Assert.areEqual('Drogon', editedValue[0]);
            Y.Assert.areEqual('Visirion', editedValue[1]);
            Y.Assert.areEqual('Rhaegal', editedValue[2]);
            Y.Assert.areEqual('Saphira', editedValue[3]);
            Y.Assert.areEqual('Smaug', editedValue[4]);
        },

        'should removing options through buttons': function() {
            var editedValue,
                optionNodes,
                removeButtons = this._editor.get('node').all('.options-data-editor-option-remove');

            removeButtons.item(0).simulate('click');
            removeButtons.item(2).simulate('click');

            optionNodes = this._editor.get('node').all('.options-data-editor-option');

            editedValue = this._editor.get('editedValue');
            Y.Assert.areEqual(1, editedValue.length);
            Y.Assert.areEqual('Visirion', editedValue[0]);
        },

        'should allow dragging options to lower positon': function() {
            var instance = this,
                editedValue,
                optionNodes = this._editor.get('node').all('.options-data-editor-option');

            this._simulateDrag(this, optionNodes.item(0), optionNodes.item(1), false, function() {
                editedValue = instance._editor.get('editedValue');
                Y.Assert.areEqual(3, editedValue.length);
                Y.Assert.areEqual('Visirion', editedValue[0]);
                Y.Assert.areEqual('Drogon', editedValue[1]);
                Y.Assert.areEqual('Rhaegal', editedValue[2]);
            });
        },

        'should allow dragging options to upper positon': function() {
            var instance = this,
                editedValue,
                optionNodes = this._editor.get('node').all('.options-data-editor-option');

            this._simulateDrag(this, optionNodes.item(1), optionNodes.item(0), true, function() {
                editedValue = instance._editor.get('editedValue');
                Y.Assert.areEqual(3, editedValue.length);
                Y.Assert.areEqual('Visirion', editedValue[0]);
                Y.Assert.areEqual('Drogon', editedValue[1]);
                Y.Assert.areEqual('Rhaegal', editedValue[2]);
            });
        },

        'should check if the form is valid': function() {
            var editor = new Y.OptionsDataEditor(),
                optionNodes;

            this._editor.destroy();

            Y.one('#container').append(editor.get('node'));

            Y.Assert.isTrue(editor.isValid());

            editor.set('required', true);
            Y.Assert.isFalse(editor.isValid());

            editor.get('node').one('.options-data-editor-add').simulate('click');
            optionNodes = editor.get('node').all('.options-data-editor-option');

            optionNodes.item(0).one('input').set('value', '');
            Y.Assert.isFalse(editor.isValid());

            optionNodes.item(0).one('input').set('value', 'Shazam');
            Y.Assert.isTrue(editor.isValid());
        }
    }));

    Y.Test.Runner.add(suite);
},'', {requires: ['aui-options-data-editor', 'node-event-simulate', 'test']});
