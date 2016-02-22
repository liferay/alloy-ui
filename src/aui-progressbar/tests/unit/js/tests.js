YUI.add('aui-progressbar-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-progressbar');

    suite.add(new Y.Test.Case({
        name: 'AUI ProgressBar Unit Tests',

        setUp: function() {
            this.progressBarNode = Y.one('#progressbar');
        },

        tearDown: function() {
            this.progressBar && this.progressBar.destroy();
        },

        'should render correct markup': function() {
            var contextBox,
                labelText = 'My progress bar';

            this.progressBar = new Y.ProgressBar({
                label: labelText,
                render: this.progressBarNode
            });

            contextBox = this.progressBar.get('contentBox');

            Y.Assert.isTrue(
                this.progressBar.get('boundingBox').hasClass('progress'),
                'Rendered markup should have the \'progress\' CSS class'
            );

            Y.Assert.isNotNull(
                contextBox.hasClass('progress-bar'),
                'Rendered markup should have a child with the \'progress-bar\' CSS class'
            );

            Y.Assert.areEqual(
                labelText,
                contextBox.get('text'),
                'Rendered markup should have the specified label'
            );
        },

        'should work with pre rendered markup': function() {
            var contentBox,
                label,
                progressBarWithLabelElement = Y.one('#progressbarWithLabel'),
                progressBarWithoutLabelElement = Y.one('#progressbarWithoutLabel');

            label = progressBarWithLabelElement.one('p');

            this.progressBar = new Y.ProgressBar({
                contentBox: progressBarWithLabelElement
            }).render();

            contentBox = this.progressBar.get('contentBox');

            Y.Assert.areEqual(label, contentBox.one('p'), 'Pre-rendered label should be used by the module');

            this.progressBar.destroy();

            this.progressBar = new Y.ProgressBar({
                contentBox: progressBarWithoutLabelElement
            }).render();

            contentBox = this.progressBar.get('contentBox');

            Y.Assert.areEqual('', contentBox.html(), 'No label should be add for this pre-rendered markup');
        },

        'should add ARIA attributes': function() {
            var boundingBox,
                label = 'My label',
                max = 200,
                min = 0,
                orientation = 'horizontal',
                value = 90;

            this.progressBar = new Y.ProgressBar({
                label: label,
                max: max,
                min: min,
                orientation: orientation,
                render: this.progressBarNode,
                value: value
            });

            boundingBox = this.progressBar.get('boundingBox');

            Y.Assert.areEqual(
                'progressbar',
                boundingBox.getAttribute('role'),
                'role should be set to progressbar'
            );

            Y.Assert.areEqual(
                max,
                boundingBox.getAttribute('aria-valuemax'),
                'aria-valuemax should be set to specified max'
            );

            Y.Assert.areEqual(
                min,
                boundingBox.getAttribute('aria-valuemin'),
                'aria-valuemin should be set to specified min'
            );

            Y.Assert.areEqual(
                orientation,
                boundingBox.getAttribute('aria-orientation'),
                'aria-orientation should be set to specified orientation'
            );

            Y.Assert.areEqual(
                value,
                boundingBox.getAttribute('aria-valuenow'),
                'aria-valuenow should be set to specified value'
            );
        },

        'should not add ARIA attributes if requested': function() {
            var boundingBox;

            this.progressBar = new Y.ProgressBar({
                useARIA: false
            }).render();

            boundingBox = this.progressBar.get('boundingBox');

            Y.Assert.isFalse(
                boundingBox.hasAttribute('aria-orientation'),
                'aria-orientation should not be set'
            );

            Y.Assert.isFalse(boundingBox.hasAttribute('aria-label'), 'aria-label should not be set');
            Y.Assert.isFalse(boundingBox.hasAttribute('aria-valuemax'), 'aria-valuemax should not be set');
            Y.Assert.isFalse(boundingBox.hasAttribute('aria-valuemin'), 'aria-valuemin should not be set');
            Y.Assert.isFalse(boundingBox.hasAttribute('aria-valuenow'), 'aria-valuenow should not be set');
        },

        'should correctly calculate ratio and step': function() {
            this.progressBar = new Y.ProgressBar({
                min: 100,
                max: 300,
                render: this.progressBarNode,
                value: 200
            });

            Y.Assert.areEqual(0.5, this.progressBar.get('ratio'), 'Calculated ratio should be 0.5');
            Y.Assert.areEqual(50, this.progressBar.get('step'), 'Calculated step should be 50');

            this.progressBar.set('value', 250);

            Y.Assert.areEqual(
                0.75,
                this.progressBar.get('ratio'),
                'Calculated ratio should be updated to 0.75'
            );

            Y.Assert.areEqual(75, this.progressBar.get('step'), 'Calculated step should be updated to 75');
        },

        'should respect orientation': function() {
            var contentBox;

            this.progressBar = new Y.ProgressBar({
                value: 80,
                height: 100,
                render: this.progressBarNode,
                width: 100
            });

            contentBox = this.progressBar.get('contentBox');

            Y.Assert.areEqual(
                '80%',
                contentBox.getStyle('width'),
                'The width should be set appropriately on horizontal orientation'
            );

            Y.Assert.areEqual(
                '100%',
                contentBox.getStyle('height'),
                'The height should be 100% on horizontal orientation'
            );

            this.progressBar.set('orientation', 'vertical');

            Y.Assert.areEqual(
                '100%',
                contentBox.getStyle('width'),
                'The width should be 100% on vertical orientation'
            );

            Y.Assert.areEqual(
                '80%',
                contentBox.getStyle('height'),
                'The height should be set appropriately on vertical orientation'
            );
        },

        'should fire event when the progress bar is complete': function() {
            var instance = this,
                mock = new Y.Mock();

            Y.Mock.expect(mock, {
                args: [YUITest.Mock.Value.Object],
                callCount: 1,
                method: 'onComplete',
                run: function() {
                    Y.Assert.areEqual(
                        1,
                        instance.progressBar.get('ratio'),
                        'This event should only have been called when ratio is 1'
                    );
                }
            });

            this.progressBar = new Y.ProgressBar({
                render: this.progressBarNode,
                value: 20
            });

            this.progressBar.once('complete', mock.onComplete);

            this.progressBar.set('value', 50);
            this.progressBar.set('value', 70);
            this.progressBar.set('value', 100);

            Y.Mock.verify(mock);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-progressbar']
});
