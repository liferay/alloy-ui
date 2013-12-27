YUI.add('aui-modal-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Modal Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-modal'),
        modal,
        boundingBox,

        CLICK = 'click',

        DESTROY_ON_HIDE = 'destroyOnHide',

        DRAG_NS = 'dd',
        DRAGGABLE = 'draggable',

        ERROR_PLUGIN_AVAILABLE = '{0} plugin should not be available',
        ERROR_PLUGIN_MISSING = '{0} plugin was not plugged',
        ERROR_PLUGIN_OVERRIDEN = '{0} attribute should not be overriden',
        ERROR_PLUGIN_PLUGGED = '{0} plugin should not be already plugged',

        RESIZABLE = 'resizable',
        RESIZE_NS = 'resize',

        VISIBLE_CHANGE = 'visibleChange';

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
                Y.Assert.isUndefined(modal.resize, Y.Lang.sub(ERROR_PLUGIN_OVERRIDEN, [RESIZE_NS]));
                Y.Assert.isUndefined(
                    modal.hasPlugin(RESIZE_NS), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, [RESIZE_NS]));

                boundingBox.simulate(CLICK);
            }

            Y.Assert.isNotUndefined(modal.hasPlugin(RESIZE_NS), Y.Lang.sub(ERROR_PLUGIN_MISSING, [RESIZE_NS]));

            modal.set(RESIZABLE, false);
            Y.Assert.isUndefined(modal.hasPlugin(RESIZE_NS), Y.Lang.sub(ERROR_PLUGIN_AVAILABLE, [RESIZE_NS]));

            modal.set(RESIZABLE, true);

            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(
                    modal.hasPlugin(RESIZE_NS), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, [RESIZE_NS]));

                boundingBox.simulate(CLICK);
            }

            Y.Assert.isNotUndefined(modal.hasPlugin(RESIZE_NS), Y.Lang.sub(ERROR_PLUGIN_MISSING, [RESIZE_NS]));
        },

        'toggle drag functionality': function() {
            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(modal.dd, Y.Lang.sub(ERROR_PLUGIN_OVERRIDEN, [DRAG_NS]));
                Y.Assert.isUndefined(modal.hasPlugin(DRAG_NS), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, [DRAG_NS]));

                boundingBox.simulate(CLICK);
            }

            Y.Assert.isNotUndefined(modal.hasPlugin(DRAG_NS), Y.Lang.sub(ERROR_PLUGIN_MISSING, [DRAG_NS]));

            modal.set(DRAGGABLE, false);
            Y.Assert.isUndefined(modal.hasPlugin(DRAG_NS), Y.Lang.sub(ERROR_PLUGIN_AVAILABLE, [DRAG_NS]));

            modal.set(DRAGGABLE, true);

            if (!Y.UA.touchEnabled) {
                Y.Assert.isUndefined(modal.hasPlugin(DRAG_NS), Y.Lang.sub(ERROR_PLUGIN_PLUGGED, [DRAG_NS]));

                boundingBox.simulate(CLICK);
            }

            Y.Assert.isNotUndefined(modal.hasPlugin(DRAG_NS), Y.Lang.sub(ERROR_PLUGIN_MISSING, [DRAG_NS]));
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

        /**
         * @tests AUI-1107
         */
        'listen after visibleChange with destroyOnHide enabled': function() {
            var instance = this,
                mock = new Y.Mock();

            Y.Mock.expect(
                mock, {
                    method: 'afterVisibleChange',
                    args: [YUITest.Mock.Value.Object]
                }
            );

            modal.after(VISIBLE_CHANGE, mock.afterVisibleChange);

            modal.set(DESTROY_ON_HIDE, true);
            modal.hide();

            Y.Mock.verify(mock);
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-modal', 'node-event-simulate', 'test']
});
