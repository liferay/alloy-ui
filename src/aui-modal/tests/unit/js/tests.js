YUI.add('aui-modal-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Modal Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-modal'),
        modal,
        boundingBox,

        ERROR_PLUGIN_AVAILABLE = '{0} plugin should not be available',
        ERROR_PLUGIN_MISSING = '{0} plugin was not plugged',
        ERROR_PLUGIN_OVERRIDEN = '{0} attribute should not be overriden',
        ERROR_PLUGIN_PLUGGED = '{0} plugin should not be already plugged';

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
            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(modal.resize, Y.Lang.sub(ERROR_PLUGIN_OVERRIDEN, ['resize']));
                Y.Assert.isUndefined(
                    modal.hasPlugin('resize'), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['resize']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(modal.hasPlugin('resize'), Y.Lang.sub(ERROR_PLUGIN_MISSING, ['resize']));

            modal.set('resizable', false);
            Y.Assert.isUndefined(modal.hasPlugin('resize'), Y.Lang.sub(ERROR_PLUGIN_AVAILABLE, ['resize']));

            modal.set('resizable', true);

            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(
                    modal.hasPlugin('resize'), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['resize']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(modal.hasPlugin('resize'), Y.Lang.sub(ERROR_PLUGIN_MISSING, ['resize']));
        },

        'toggle drag functionality': function() {
            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(modal.dd, Y.Lang.sub(ERROR_PLUGIN_OVERRIDEN, ['dd']));
                Y.Assert.isUndefined(modal.hasPlugin('dd'), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['dd']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(modal.hasPlugin('dd'), Y.Lang.sub(ERROR_PLUGIN_MISSING, ['dd']));

            modal.set('draggable', false);
            Y.Assert.isUndefined(modal.hasPlugin('dd'), Y.Lang.sub(ERROR_PLUGIN_AVAILABLE, ['dd']));

            modal.set('draggable', true);

            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(modal.hasPlugin('dd'), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['dd']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(modal.hasPlugin('dd'), Y.Lang.sub(ERROR_PLUGIN_MISSING, ['dd']));
        }

    }));

    //--------------------------------------------------------------------------
    // Test Case for Events
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Events',

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

        // Tests: AUI-1107
        'listen after visibleChange with destroyOnHide enabled': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    args: [YUITest.Mock.Value.Object],
                    method: 'afterVisibleChange'
                }
            );

            modal.after('visibleChange', mock.afterVisibleChange);

            modal.set('destroyOnHide', true);
            modal.hide();

            Y.Mock.verify(mock);
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-modal', 'node-event-simulate', 'test']
});
