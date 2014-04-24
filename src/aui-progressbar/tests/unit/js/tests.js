YUI.add('aui-progressbar-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-progressbar');

    suite.add(new Y.Test.Case({
        name: 'Automated Tests',

        setUp: function() {
            this.progressBarElement = Y.one('#progressbar');
        },

        tearDown: function() {
            this.progressBar && this.progressBar.destroy();
        },

        'should render correct markup': function() {
            var labelText = 'My progress bar';

            this.progressBar = new Y.ProgressBar({
                label: labelText
            }).render(this.progressBarElement);

            Y.Assert.isTrue(
                this.progressBar.get('boundingBox').hasClass('progress'),
                'Rendered markup should have the "progress" CSS class'
            );
            Y.Assert.isNotNull(
                this.progressBar.get('contentBox').hasClass('progress-bar'),
                'Rendered markup should have a child with the "progress-bar" CSS class'
            );
            Y.Assert.areEqual(
                labelText,
                this.progressBar.get('contentBox').get('text'),
                'Rendered markup should have the specified label'
            );
        },

        'should work with pre rendered markup': function() {
            var label,
                progressBarWithLabelElement = Y.one('#progressbarwithlabel'),
                progressBarNoLabelElement = Y.one('#progressbarnolabel');

            label = progressBarWithLabelElement.one('p').text();

            this.progressBar = new Y.ProgressBar({
                contentBox: progressBarWithLabelElement
            }).render();

            Y.Assert.areEqual(
                label,
                this.progressBar.get('contentBox').get('text'),
                'Pre-rendered label should be used by the module'
            );

            // Now with no label
            this.progressBar && this.progressBar.destroy();
            this.progressBar = new Y.ProgressBar({
                contentBox: progressBarNoLabelElement
            }).render();

            Y.Assert.areEqual(
                '',
                this.progressBar.get('contentBox').get('text'),
                'No label should be add for this pre-rendered markup'
            );
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
                value: value
            }).render(this.progressBarElement);
            boundingBox = this.progressBar.get('boundingBox');

            Y.Assert.areEqual(
                label,
                boundingBox.getAttribute('aria-label'),
                'aria-label should be set to specified label'
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
            this.progressBar = new Y.ProgressBar({
                useARIA: false
            }).render();
            boundingBox = this.progressBar.get('boundingBox');

            Y.Assert.isFalse(
                boundingBox.hasAttribute('aria-label'),
                'aria-label should not be set'
            );
            Y.Assert.isFalse(
                boundingBox.hasAttribute('aria-valuemax'),
                'aria-valuemax should not be set'
            );
            Y.Assert.isFalse(
                boundingBox.hasAttribute('aria-valuemin'),
                'aria-valuemin should not be set'
            );
            Y.Assert.isFalse(
                boundingBox.hasAttribute('aria-orientation'),
                'aria-orientation should not be set'
            );
            Y.Assert.isFalse(
                boundingBox.hasAttribute('aria-valuenow'),
                'aria-valuenow should not be set'
            );
        },

        'should correctly calculate ratio and step': function() {
            this.progressBar = new Y.ProgressBar({
                min: 100,
                max: 300,
                value: 200
            }).render(this.progressBarElement);

            Y.Assert.areEqual(
                0.5,
                this.progressBar.get('ratio'),
                'Calculated ratio should be 0.5'
            );
            Y.Assert.areEqual(
                50,
                this.progressBar.get('step'),
                'Calculated step should be 50'
            );

            this.progressBar.set('value', 250);
            Y.Assert.areEqual(
                0.75,
                this.progressBar.get('ratio'),
                'Calculated ratio should be updated to 0.75'
            );
            Y.Assert.areEqual(
                75,
                this.progressBar.get('step'),
                'Calculated step should be updated to 75'
            );
        },

        'should respect orientation': function() {
            var contentBox;

            this.progressBar = new Y.ProgressBar({
                value: 80,
                height: 100,
                width: 100
            }).render(this.progressBarElement);
            contentBox = this.progressBar.get('contentBox');

            Y.Assert.areEqual(
                '80px',
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
                '80px',
                contentBox.getStyle('height'),
                'The height should be set appropriately on vertical orientation'
            );
        },

        'should fire event when the progress bar is complete': function() {
            var instance = this,
                eventCalled = false;

            this.progressBar = new Y.ProgressBar({
                value: 20
            }).render(this.progressBarElement);

            this.progressBar.once('complete', function() {
                Y.Assert.areEqual(
                    1,
                    instance.progressBar.get('ratio'),
                    'This event should only havee ben called when ratio is 1'
                );
                eventCalled = true;
            });

            this.progressBar.set('value', 50);
            this.progressBar.set('value', 70);
            this.progressBar.set('value', 100);
            Y.Assert.isTrue(eventCalled, 'Event "complete" should have been called');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-progressbar']
});
