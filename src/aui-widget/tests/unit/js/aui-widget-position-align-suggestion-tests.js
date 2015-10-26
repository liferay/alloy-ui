YUI.add('aui-widget-position-align-suggestion-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-widget-position-align-suggestion');
    var TestWidget = Y.Base.create('testwidget', Y.Widget, [
        Y.WidgetPosition,
        Y.WidgetStdMod,
        Y.WidgetPositionAlign,
        Y.WidgetPositionAlignSuggestion,
        Y.WidgetPositionConstrain
    ], {
        initializer: function() {
            this.get('boundingBox').addClass('popover').append('<div> Hei! </div>');
            Y.on('windowresize', Y.bind(this._onResize, this));
        },

        _onResize: function() {
            this.suggestAlignment(Y.one('#bottom'));
        }
    });

    suite.add(new Y.Test.Case({

        name: 'AUI WidgetPositionAlignSuggestion Unit Tests',

        init: function() {
            this._buttom = Y.one('#buttom');
            this._secondButton = Y.one('#buttomTwo');
            this._constrainElement = Y.one('#containerConstrain');
            this._auxiliarButtom = Y.Node.create('<button>Button Target</button>');
        },

        setUp: function() {
            this._setTargetsDefaultPosition();
        },

        createWidget: function(config) {
            this._widget = new TestWidget(Y.merge({
                align: {
                    node: '#buttom'
                },
                constrain: true
            }, config || {})).render();
        },

        destroy: function() {
            this._buttom.remove();
            this._secondButton.remove();
            this._auxiliarButtom.remove();
        },

        tearDown: function() {
            if (this._widget) {
                this._widget.destroy();
            }
        },

        _setTargetsDefaultPosition: function() {
            this._buttom.setStyle('left', '50px');
            this._buttom.setStyle('right', 'auto');
            this._buttom.setStyle('bottom', 'auto');
            this._buttom.setStyle('top', '451px');

            this._secondButton.setStyle('top', '100px');
            this._secondButton.setStyle('left', '150px');
            this._secondButton.setStyle('bottom', 'auto');
            this._secondButton.setStyle('right', 'auto');
        },

        'should find best position even if its target is setted late': function() {
            this.createWidget({
                align: undefined,
                position: 'bottom'
            });

            this._widget.set('align', {
                node: this._buttom
            });

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'shouldn\'t find the best position if the constrain is false': function() {
            this.createWidget({
                position: 'left',
                constrain: false
            });

            this._buttom.setStyle('left', '-1px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isFalse(Y.one('.popover').inViewportRegion());
            }, 200);
        },

        'should find best position even if the attribute position changes': function() {
            this.createWidget({
                position: 'right'
            });

            this._buttom.setStyle('left', '10px');
            this._widget.set('position', 'left');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if the align target element changes': function() {
            Y.one('body').append(this._auxiliarButtom);

            this._auxiliarButtom.setStyle('position', 'absolute');
            this._auxiliarButtom.setStyle('right', '2px');

            this.createWidget({
                position: 'right'
            });

            this._widget.suggestAlignment(this._auxiliarButtom);

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position when its target is on the left side of the view port': function() {
            this.createWidget({
                position: 'left'
            });

            this._buttom.setStyle('left', '5px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position when its target is on the right side of the view port': function() {
            this.createWidget({
                position: function() {
                    return 'right';
                }
            });

            this._buttom.setStyle('left', 'auto');
            this._buttom.setStyle('right', '-20px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if its target in on top of the view port': function() {
            this.createWidget({
                position: 'top'
            });

            this._buttom.setStyle('top', '10px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if its target is on bottom of the view port': function() {
            this.createWidget({
                position: 'bottom'
            });

            this._buttom.setStyle('top', 'auto');
            this._buttom.setStyle('bottom', '10px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if its target is outside of the view port on the bottom': function() {
            this.createWidget({
                position: 'bottom'
            });

            this._buttom.setStyle('top', 'auto');
            this._buttom.setStyle('bottom', '-100px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position if its target is outside of the view port on the top': function() {
            this.createWidget({
                position: 'top'
            });

            this._buttom.setStyle('top', '-100px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if its target is outside of the view port on the left': function() {
            this.createWidget({
                position: 'left'
            });

            this._buttom.setStyle('left', '-100px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if its target is outside of the view port on the right': function() {
            this.createWidget({
                position: 'right'
            });

            this._buttom.setStyle('left', 'auto');
            this._buttom.setStyle('right', '-100px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(Y.one('.popover').inViewportRegion());
            }, 100);
        },

        'should find best position even if its target is on the left of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'left',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('left', '2px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find best position even if its target is on the top of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'top',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('top', '2px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').hasClass('bottom'));
            }, 100);
        },

        'should find best position even if its target is on the right of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'right',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('right', '2px');
            this._secondButton.setStyle('left', 'auto');
            Y.one(Y.config.win).simulate('resize');


            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find best position even if its target is on the bottom of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'bottom',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('bottom', '2px');
            this._secondButton.setStyle('top', 'auto');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find best position accoding to the constrain element even if its target is setted late': function() {
            this.createWidget({
                align: undefined,
                position: 'bottom',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('top', 'auto');
            this._secondButton.setStyle('bottom', '2px');

            this._widget.set('align', {
                node: this._secondButton
            });

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find the best position even if its target is on the higher left corner of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'top',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('top', '2px');
            this._secondButton.setStyle('left', '2px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find the best position even if its target is on the higher right corner of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'top',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('top', '2px');
            this._secondButton.setStyle('left', 'auto');
            this._secondButton.setStyle('right', '2px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find the best position even if its target is on the lower right corner of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'bottom',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('top', 'auto');
            this._secondButton.setStyle('left', 'auto');
            this._secondButton.setStyle('right', '2px');
            this._secondButton.setStyle('bottom', '2px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should find the best position even if its target is on the lower left corner of a constrain element': function() {
            this.createWidget({
                align: {
                    node: this._secondButton
                },
                position: 'bottom',
                constrain: this._constrainElement
            });

            this._secondButton.setStyle('top', 'auto');
            this._secondButton.setStyle('left', '2px');
            this._secondButton.setStyle('bottom', '2px');
            Y.one(Y.config.win).simulate('resize');

            this.wait(function() {
                Y.Assert.isTrue(this._widget.get('boundingBox').inRegion(this._constrainElement, true));
            }, 100);
        },

        'should update the position attribute to reflect the align points initially defined': function() {
            var bottomPoints = [Y.WidgetPositionAlign.TC, Y.WidgetPositionAlign.BC];

            this.createWidget({
                align: {
                    node: this._secondButton,
                    points: bottomPoints
                }
            });

            this.wait(function() {
                Y.Assert.areEqual('bottom', this._widget.get('position'));
            }, 100);
        },

        'shouldn\'t try to find the position attribute value if the align points are unknown': function() {
            var unknowPoints = [Y.WidgetPositionAlign.TC, Y.WidgetPositionAlign.RC];

            this.createWidget({
                align: {
                    node: this._secondButton,
                    points: unknowPoints
                },
                position: 'left'
            });

            this.wait(function() {
                Y.Assert.areEqual('left', this._widget.get('position'));
            }, 100);
        }

    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'test',
        'event-resize',
        'widget-position-align',
        'widget-position-constrain',
        'widget-stdmod',
        'aui-classnamemanager',
        'aui-widget-position-align-suggestion',
        'node-event-simulate'
    ]
});