YUI.add('aui-form-field-scale-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-field-scale');

    suite.add(new Y.Test.Case({
        name: 'Form Field Scale Tests',

        /**
         * Simulates dragging the given dragHandle.
         *
         * @param {Y.Test.Case} test
         * @param {Node} dragHandle
         * @param {Array} position
         * @param {Function} callback The function to be called when the simulation is
         *   done.
         * @protected
         */
        _simulateDrag: function(test, dragHandle, position, callback) {
            dragHandle.simulate('mousedown');
            test.wait(function() {
                Y.one(Y.one(Y.config.doc)).simulate('mousemove', {
                    clientX: position[0],
                    clientY: position[1]
                });

                dragHandle.simulate('mouseup');

                callback();
            }, Y.DD.DDM.get('clickTimeThresh') + 100);
        },

        tearDown: function() {
            if (this._field) {
                this._field.destroy();
            }
        },

        'should render input according to `range` attribute': function() {
            var fieldNode;

            this._field = new Y.FormFieldScale({
                range: [2, 11]
            });

            fieldNode = this._field.get('content');

            Y.Assert.areEqual(fieldNode.one('.form-field-scale-input-lower-value').get('text'), 2);
            Y.Assert.areEqual(fieldNode.one('.form-field-scale-input-higher-value').get('text'), 11);

            this._field.set('range', [0, 5]);

            Y.Assert.areEqual(fieldNode.one('.form-field-scale-input-lower-value').get('text'), 0);
            Y.Assert.areEqual(fieldNode.one('.form-field-scale-input-higher-value').get('text'), 5);
        },

        'should update thumb position based on `value` attribute change': function() {
            var thumbNode;

            this._field = new Y.FormFieldScale({
                range: [1, 3],
                value: 2
            });

            thumbNode = this._field.get('content').one('.form-field-scale-thumb');

            Y.Assert.areEqual(thumbNode.getStyle('left'), '50%');

            this._field.set('value', 3);
            Y.Assert.areEqual(thumbNode.getStyle('left'), '100%');
        },

        'should update thumb position on `range` attribute change': function() {
            var thumbNode;

            this._field = new Y.FormFieldScale({
                range: [0, 2],
                value: 1
            });

            thumbNode = this._field.get('content').one('.form-field-scale-thumb');

            Y.Assert.areEqual(thumbNode.getStyle('left'), '50%');

            this._field.set('range', [0, 4]);
            Y.Assert.areEqual(thumbNode.getStyle('left'), '25%');
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {requires: ['aui-form-field-scale', 'node-event-simulate', 'test']});
