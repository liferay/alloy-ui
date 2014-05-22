YUI.add('aui-widget-responsive-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-responsive-tests'),
        TestWidget = Y.Base.create('test-widget', Y.Widget, [Y.WidgetResponsive]);

    suite.add(new Y.Test.Case({
        name: 'AUI WidgetResponsive Unit Tests',

        init: function() {
            var instance = this;

            this._container = Y.one('#container');

            this._originalViewportFn = Y.DOM.viewportRegion;
            this._viewportHeight = 2000;
            this._viewportWidth = 2000;
            Y.DOM.viewportRegion = function() {
                return {
                    height: instance._viewportHeight,
                    width: instance._viewportWidth
                };
            }
        },

        destroy: function() {
            Y.DOM.viewportRegion = this._originalViewportFn;
        },

        setUp: function() {
            var content = Y.Node.create('<div id="content"></div>'),
                images = Y.one('#images');

            content.setHTML(images.getHTML());
            this._container.append(content);

            this._container.setStyles({
                height: '',
                width: ''
            });
        },

        tearDown: function() {
            if (this._widget) {
                this._widget.destroy();
            }
        },

        _createWidget: function(config) {
            this._widget = new TestWidget(Y.merge({
                contentBox: '#content'
            }, config || {})).render();
        },

        'should change widget height to preserve ratio': function() {
            this._container.setStyle('width', '470px');

            this._createWidget();

            Y.Assert.areEqual(
                '126px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );
        },

        'should respect given maxWidth': function() {
            this._container.setStyle('width', '470px');
            this._createWidget();

            this._widget.set('maxWidth', 235);

            Y.Assert.areEqual(
                '235px',
                this._widget.get('boundingBox').getStyle('width'),
                'Width should have been set to max value'
            );
            Y.Assert.areEqual(
                '63px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );
        },

        'should respect given maxHeight': function() {
            this._container.setStyle('width', '1000px');
            this._container.setStyle('height', '600px');

            this._createWidget();

            this._widget.set('maxHeight', 253);

            Y.Assert.areEqual(
                '940px',
                this._widget.get('boundingBox').getStyle('width'),
                'Width should have been updated to match the ratio'
            );
            Y.Assert.areEqual(
                '253px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been set to max value'
            );
        },

        'should not change widget dimensions while not visible': function() {
            this._container.setStyle('width', '470px');
            this._createWidget({
                visible: false
            });

            this._widget.set('maxWidth', 235);

            Y.Assert.areEqual(
                '470px',
                this._widget.get('boundingBox').getStyle('width'),
                'Width should not have changed'
            );
        },

        'should respect given width and height': function() {
            this._createWidget();

            this._widget.set('width', 470);

            Y.Assert.areEqual(
                '470px',
                this._widget.get('boundingBox').getStyle('width'),
                'Width should be equal to chosen value'
            );
            Y.Assert.areEqual(
                '126px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );

            this._widget.set('height', 200);

            Y.Assert.areEqual(
                '470px',
                this._widget.get('boundingBox').getStyle('width'),
                'Width should not have changed'
            );
            Y.Assert.areEqual(
                '200px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should be equal to chosen value'
            );
        },

        'should be able to force dimensions to update': function() {
            this._container.setStyle('width', '940px');
            this._createWidget();

            Y.Assert.areEqual(
                '253px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );

            this._container.setStyle('width', '470px');
            this._widget.updateDimensions();

            Y.Assert.areEqual(
                '126px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );
        },

        'should not take gutter into account when preserving ratio': function() {
            this._container.setStyle('width', '940px');

            this._createWidget();

            this._widget.get('boundingBox')
                .append('<div style="height: 20px; width: 100%"></div>');
            this._widget.set('gutter', [0, 20]);

            Y.Assert.areEqual(
                '273px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );
        },

        'should reset the ratio when requested': function() {
            var images;

            this._container.setStyle('width', '940px');

            this._createWidget();

            images = this._widget.get('contentBox').all('img');
            images.item(0).hide();
            images.item(1).show();
            this._widget.updateDimensionsWithNewRatio();

            Y.Assert.areEqual(
                '626px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );
        },

        'should make the widget fit in the viewport': function() {
            this._container.setStyle('width', '940px');
            this._viewportWidth = 470;
            this._viewportHeight = 235;

            this._createWidget();

            Y.Assert.areEqual(
                '470px',
                this._widget.get('boundingBox').getStyle('width'),
                'Width should have been updated to fit the viewport'
            );
            Y.Assert.areEqual(
                '126px',
                this._widget.get('boundingBox').getStyle('height'),
                'Height should have been updated to match the ratio'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-widget-responsive', 'base-build', 'node-base', 'node-event-simulate', 'test']
});
