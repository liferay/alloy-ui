YUI.add('aui-modal-resize-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Modal Resize Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-modal'),
        modal,
        boundingBox,

        ERROR_PLUGIN_AVAILABLE = '{0} plugin should not be available',
        ERROR_PLUGIN_MISSING = '{0} plugin was not plugged',
        ERROR_PLUGIN_OVERRIDEN = '{0} attribute should not be overriden',
        ERROR_PLUGIN_PLUGGED = '{0} plugin should not be already plugged',

        TOUCH_ENABLED = Y.UA.touchEnabled;

    //--------------------------------------------------------------------------
    // Test Case for Plug/Unplug
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Plug/Unplug',

        setUp: function() {
            if (modal) {
                modal.destroy();
            }

            modal = new Y.Modal().render('#modal');
            boundingBox = modal.get('boundingBox');
        },

        tearDown: function() {
            modal.destroy();

            modal = null;
            boundingBox = null;
        },

        //----------------------------------------------------------------------
        // Tests
        //----------------------------------------------------------------------

        'toggle resize functionality': function() {
            if (!TOUCH_ENABLED) {
                Y.Assert.isUndefined(
                    modal.resize,
                    Y.Lang.sub(ERROR_PLUGIN_OVERRIDEN, ['resize']));

                Y.Assert.isUndefined(
                    modal.hasPlugin('resize'),
                    Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['resize']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(
                modal.hasPlugin('resize'),
                Y.Lang.sub(ERROR_PLUGIN_MISSING, ['resize']));

            modal.set('resizable', false);
            Y.Assert.isUndefined(
                modal.hasPlugin('resize'),
                Y.Lang.sub(ERROR_PLUGIN_AVAILABLE, ['resize']));

            modal.set('resizable', true);
            if (!TOUCH_ENABLED) {
                Y.Assert.isUndefined(
                    modal.hasPlugin('resize'),
                    Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['resize']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(
                modal.hasPlugin('resize'),
                Y.Lang.sub(ERROR_PLUGIN_MISSING, ['resize']));
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-modal-resize', 'aui-node-base', 'node-event-simulate', 'test']
});
