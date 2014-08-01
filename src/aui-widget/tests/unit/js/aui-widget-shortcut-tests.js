YUI.add('aui-widget-shortcut-tests', function(Y) {
    if (Y.UA.mobile) {
        // This file should not be tested on mobile, as it won't do anything on
        // those devices.
        return;
    }

    var suite = new Y.Test.Suite('aui-widget-shortcut'),
        TestWidget = Y.Base.create('test-widget', Y.Widget, [Y.WidgetShortcut]);

    suite.add(new Y.Test.Case({
        name: 'Widget Shortcut Tests',

        init: function() {
            this._widget1 = new TestWidget({
                shortcut: {
                    keys: ['A'],
                    metaKey: true
                }
            });
            this._widget2 = new TestWidget({
                shortcut: {
                    altKey: true,
                    ctrlKey: true,
                    keys: ['B'],
                    metaKey: true,
                    shiftKey: true
                }
            });
        },

        tearDown: function() {
            if (this._eventHandles) {
                (new Y.EventHandle(this._eventHandles)).detach();
                this._eventHandles = null;
            }
        },

        'should choose the correct shortcut for the current os': function() {
            var originalOS = Y.UA.os,
                originalShortcut,
                widget;

            originalShortcut = {
                macintosh: {
                    metaKey: true,
                    keys: ['B', 'b'],
                    text: '⌘B'
                },
                windows: {
                    shiftKey: true,
                    keys: ['B', 'b'],
                    text: 'Shift + B'
                }
            };

            Y.UA.os = 'macintosh';

            widget = new TestWidget({
                shortcut: originalShortcut
            });

            Y.Assert.areSame(
                originalShortcut.macintosh,
                widget.get('shortcut'),
                'Shortcut attribute should be set to the macintosh version'
            );

            Y.UA.os = originalOS;
        },

        'should choose the default shortcut when necessary': function() {
            var originalOS = Y.UA.os,
                originalShortcut,
                widget;

            originalShortcut = {
                macintosh: {
                    metaKey: true,
                    keys: ['B', 'b'],
                    text: '⌘B'
                },
                defaultShortcut: {
                    shiftKey: true,
                    keys: ['B', 'b'],
                    text: 'Shift + B'
                }
            };

            Y.UA.os = 'windows';

            widget = new TestWidget({
                shortcut: originalShortcut
            });

            Y.Assert.areSame(
                originalShortcut.defaultShortcut,
                widget.get('shortcut'),
                'Shortcut attribute should be set to the default version'
            );

            Y.UA.os = originalOS;
        },

        'should accept shortcut objects without os specific values': function() {
            var originalShortcut,
                widget;

            originalShortcut = {
                ctrlKey: true,
                keys: ['B', 'b'],
                text: 'Ctrl + B'
            };

            widget = new TestWidget({
                shortcut: originalShortcut
            });

            Y.Assert.areSame(
                originalShortcut,
                widget.get('shortcut'),
                'Shortcut attribute should be equal to the received value'
            );
        },

        'should fire event when the right shortcut is activated': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onShortcut1',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onShortcut2',
                args: [Y.Mock.Value.Object]
            });

            this._eventHandles = [
                this._widget1.once('shortcut', mock.onShortcut1),
                this._widget2.once('shortcut', mock.onShortcut2)
            ];

            Y.one('body').simulate('keydown', {
                keyCode: 65,
                metaKey: true
            });
            Y.Mock.verify(mock);
        },

        'should fire event when shortcut with all modifiers are activated': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onShortcut1',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 1,
                method: 'onShortcut2',
                args: [Y.Mock.Value.Object]
            });

            this._eventHandles = [
                this._widget1.once('shortcut', mock.onShortcut1),
                this._widget2.once('shortcut', mock.onShortcut2)
            ];

            Y.one('body').simulate('keydown', {
                altKey: true,
                ctrlKey: true,
                keyCode: 66,
                metaKey: true,
                shiftKey: true,
            });
            Y.Mock.verify(mock);
        },

        'should not fire event on wrong shortcut': function() {
            var mock = new Y.Mock();

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onShortcut1',
                args: [Y.Mock.Value.Object]
            });
            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onShortcut2',
                args: [Y.Mock.Value.Object]
            });

            this._eventHandles = [
                this._widget1.once('shortcut', mock.onShortcut1),
                this._widget2.once('shortcut', mock.onShortcut2)
            ];

            Y.one('body').simulate('keydown', {
                keyCode: 65
            });
            Y.one('body').simulate('keydown', {
                altKey: true,
                keyCode: 65
            });
            Y.one('body').simulate('keydown', {
                keyCode: 66,
                metaKey: true
            });

            Y.Mock.verify(mock);
        },

        'should allow changing the shortcut attribute dynamically': function() {
            var mock = new Y.Mock(),
                widget;

            widget = new TestWidget({
                shortcut: {
                    keys: ['A'],
                    metaKey: true
                }
            });

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onShortcut',
                args: [Y.Mock.Value.Object]
            });

            this._eventHandles = [
                widget.once('shortcut', mock.onShortcut)
            ];
            widget.set('shortcut', false);

            Y.one('body').simulate('keydown', {
                keyCode: 65,
                metaKey: true
            });
            Y.Mock.verify(mock);
        },

        'should stop firing events for shortcuts when widget is destroyed': function() {
            var mock = new Y.Mock(),
                widget;

            widget = new TestWidget({
                shortcut: {
                    keys: ['A'],
                    metaKey: true
                }
            });

            Y.Mock.expect(mock, {
                callCount: 0,
                method: 'onShortcut',
                args: [Y.Mock.Value.Object]
            });

            this._eventHandles = [
                widget.once('shortcut', mock.onShortcut)
            ];
            widget.destroy();

            Y.one('body').simulate('keydown', {
                keyCode: 65,
                metaKey: true
            });
            Y.Mock.verify(mock);
        }
    }));

    Y.Test.Runner.add(suite);
}, '', {
    requires: ['event-custom','node-event-simulate', 'test', 'aui-widget-shortcut']
});