YUI.add('aui-modal-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Modal Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-modal'),
        modal,
        boundingBox,

        CSS_MODAL_OPEN = Y.getClassName('modal-open'),

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

        'toggle drag functionality': function() {
            if (!TOUCH_ENABLED) {
                Y.Assert.isUndefined(
                    modal.dd,
                    Y.Lang.sub(ERROR_PLUGIN_OVERRIDEN, ['dd']));
                Y.Assert.isUndefined(
                    modal.hasPlugin('dd'),
                    Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['dd']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(
                modal.hasPlugin('dd'),
                Y.Lang.sub(ERROR_PLUGIN_MISSING, ['dd']));

            modal.set('draggable', false);
            Y.Assert.isUndefined(
                modal.hasPlugin('dd'),
                Y.Lang.sub(ERROR_PLUGIN_AVAILABLE, ['dd']));

            modal.set('draggable', true);
            if (!TOUCH_ENABLED) {
                Y.Assert.isUndefined(
                    modal.hasPlugin('dd'),
                    Y.Lang.sub(ERROR_PLUGIN_PLUGGED, ['dd']));

                boundingBox.simulate('click');
            }

            Y.Assert.isNotUndefined(
                modal.hasPlugin('dd'),
                Y.Lang.sub(ERROR_PLUGIN_MISSING, ['dd']));
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

    //--------------------------------------------------------------------------
    // Test Case for Scroll
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({

        name: 'Scroll',

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

        'check modal-open class after visibleChange': function() {
            var elements = Y.all('body,html');

            modal.show();

            var modalOpen = elements.hasClass(CSS_MODAL_OPEN);

            Y.Assert.isTrue(modalOpen[0]);
            Y.Assert.isTrue(modalOpen[1]);

            modal.hide();

            modalOpen = elements.hasClass(CSS_MODAL_OPEN);

            Y.Assert.isFalse(modalOpen[0]);
            Y.Assert.isFalse(modalOpen[1]);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-modal', 'aui-node-base', 'node-event-simulate', 'test']
});
