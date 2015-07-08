YUI.add('aui-form-builder-layout-builder-tests', function(Y) {

    var desktopDefaultSize = 1500,
        originalWinGet,
        suite = new Y.Test.Suite('aui-form-builder-layout-builder'),
        windowNode = Y.one(Y.config.win);

    originalWinGet = windowNode.get;

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Layout Builder Unit Tests',

        init: function() {
            // Set the width to a big value so all layout buil
            // guaranteed to be turned on.
            this._originalWidth = windowNode.get('innerWidth');
        },

        setUp: function() {
            windowNode.set('innerWidth', desktopDefaultSize);
        },

        destroy: function() {
            windowNode.set('innerWidth', this._originalWidth);
        },

        tearDown: function() {
            if (this._formBuilder) {
                this._formBuilder.destroy();
            }
        },

        _createFormBuilder: function(config, skipRender) {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                movableContent: true,
                                size: 4,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldSentence({
                                            help: 'My Help',
                                            nestedFields: [
                                                new Y.FormBuilderFieldText({
                                                    help: 'First nested field',
                                                    title: 'Nested Field 1'
                                                }),
                                                new Y.FormBuilderFieldText({
                                                    help: 'Second nested field',
                                                    title: 'Nested Field 2'
                                                })
                                            ],
                                            title: 'My Title'
                                        })
                                    ]
                                })
                            }),
                            new Y.LayoutCol({
                                size: 4
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldSentence({
                                            title: 'Another Field'
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            });

            this._formBuilder = new Y.FormBuilder(Y.merge({
                layouts: [layout]
            }, config));

            if (!skipRender) {
                this._formBuilder.render('#container');
            }
        },

        _moveTargetIsVisible: function () {
            var row,
                rowNode,
                visibleTargets;

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            rowNode = row.get('node');

            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('display') !== 'none';
            });

            return !!visibleTargets.size();
        },

        _mockWindowInnerWidth: function (size) {
            Y.Mock.expect(windowNode, {
                args: ['innerWidth'],
                method: 'get',
                returns: size
            });
        },

        _openToolbar: function(fieldNode) {
            fieldNode = fieldNode || Y.one('.form-builder-field-content-toolbar');

            if (Y.UA.mobile) {
                Y.one('.form-builder-field-content').simulate('click');
            }
            else {
                fieldNode.simulate('mouseover');
                fieldNode.one('.form-builder-field-toolbar-toggle').simulate('click');
            }
        },

        _resetWindowGet: function () {
            windowNode.get = originalWinGet;
        },

        'should be able to add rows': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-add-row-area');
            Y.Assert.isNotNull(button);
            Y.Assert.areNotEqual('none', button.getStyle('display'));
        },

        'should open a confirmation modal when a remove row button from a row with fields is clicked': function() {
            this._createFormBuilder();

            Y.Assert.isTrue(Y.one('.form-builder-remove-row-modal').hasClass('modal-dialog-hidden'));

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Y.Assert.isFalse(Y.one('.form-builder-remove-row-modal').hasClass('modal-dialog-hidden'));
        },

        'should remove a row just clicking on remove row button when this row has no field': function() {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                movableContent: true,
                                size: 4,
                                value: new Y.FormBuilderFieldList()
                            }),
                            new Y.LayoutCol({
                                size: 4
                            }),
                            new Y.LayoutCol({
                                size: 4,
                                value: new Y.FormBuilderFieldList()
                            })
                        ]
                    })
                ]
            });
            this._createFormBuilder({layouts: [layout]});

            Y.Assert.areEqual(this._formBuilder.get('layouts')[0].get('rows').length, 2);

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Y.Assert.areEqual(this._formBuilder.get('layouts')[0].get('rows').length, 1);
        },

        'should hide button for removing row when a layout with a single row is added to the form builder': function() {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                size: 12,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldSentence({
                                            help: 'My Help',
                                            title: 'My Title'
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            });

            this._createFormBuilder({layouts: [layout]});

            Y.Assert.isNull(Y.one('.layout-builder-remove-row-button'));
        },
        'should remove a row with fields only if the confirmation button from the confirmation modal is clicked': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-remove-row-button');

            Y.Assert.isNotNull(button);
            Y.Assert.areNotEqual('none', button.getStyle('display'));
            Y.Assert.areEqual(this._formBuilder.get('layouts')[0].get('rows').length, 2);

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Y.one('.modal-footer').all('button').item(1).simulate('focus');
            Y.one('.modal-footer').all('button').item(1).simulate('click');
            Y.Assert.areEqual(this._formBuilder.get('layouts')[0].get('rows').length, 2);

            Y.one('.layout-builder-remove-row-button').simulate('click');
            Y.one('.modal-footer').all('button').item(0).simulate('focus');
            Y.one('.modal-footer').all('button').item(0).simulate('click');
            Y.Assert.areEqual(this._formBuilder.get('layouts')[0].get('rows').length, 1);
        },

        'should be able to add cols': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-add-col');
            Y.Assert.isNotNull(button);
        },

        'should be able to move rows': function() {
            var button,
                contentBox;

            this._createFormBuilder();

            contentBox = this._formBuilder.get('contentBox');

            button = contentBox.one('.layout-builder-move-cut-row-button');
            Y.Assert.isNotNull(button);
        },

        'should be able to move cols': function() {
            this._createFormBuilder();

            this._toolbar = new Y.FormBuilderFieldToolbar({
                formBuilder: this._formBuilder
            });

            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(2).simulate('click');

            Y.Assert.isNotNull(Y.one('.form-builder-field-move-target'));

            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(2).simulate('click');

            Y.Assert.isNull(Y.one('.form-builder-choose-col-move .form-builder-field-move-target'));
        },

        'should be able to move fields to a different position in a same col': function() {
            var layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow({
                        cols: [
                            new Y.LayoutCol({
                                movableContent: true,
                                size: 4,
                                value: new Y.FormBuilderFieldList({
                                    fields: [
                                        new Y.FormBuilderFieldSentence({
                                            title: 'My Title1'
                                        }),
                                        new Y.FormBuilderFieldSentence({
                                            title: 'My Title2'
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            });

            this._createFormBuilder({layouts: [layout]});

            this._toolbar = new Y.FormBuilderFieldToolbar({
                formBuilder: this._formBuilder
            });

            Y.Assert.areNotEqual('My Title2', Y.one('.form-field-title').get('innerHTML'));

            this._openToolbar(Y.all('.form-builder-field-content-toolbar').item(1));
            Y.all('.form-builder-field-toolbar-item').item(2).simulate('click');
            Y.one('.form-builder-field-move-target').simulate('click');

            Y.Assert.areEqual('My Title2', Y.one('.form-field-title').get('innerHTML'));
        },

        'should cancel move field action when a click event is triggered in an invalid move target element': function() {
            this._createFormBuilder();

            this._toolbar = new Y.FormBuilderFieldToolbar({
                formBuilder: this._formBuilder
            });

            Y.Assert.isFalse(this._moveTargetIsVisible());

            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(2).simulate('click');
            Y.Assert.isTrue(this._moveTargetIsVisible());

            Y.one(Y.config.doc).simulate('click');

            Y.Assert.isFalse(this._moveTargetIsVisible());
        },

        'should cancel move field action when esc is pressed': function() {
            this._createFormBuilder();

            this._toolbar = new Y.FormBuilderFieldToolbar({
                formBuilder: this._formBuilder
            });

            Y.Assert.isFalse(this._moveTargetIsVisible());

            this._openToolbar();
            Y.all('.form-builder-field-toolbar-item').item(2).simulate('click');
            Y.Assert.isTrue(this._moveTargetIsVisible());

            Y.one(Y.config.doc).simulate('keydown', {
                keyCode: 27
            });

            Y.Assert.isFalse(this._moveTargetIsVisible());
        },

        'should be able to resize cols': function() {
            var draggable;

            this._createFormBuilder();

            draggable = this._formBuilder.get('contentBox').one('.layout-builder-resize-col-draggable');
            Y.Assert.isNotNull(draggable);
        },

        'should update layout when it changes': function() {
            var rowNodes;

            this._createFormBuilder();

            rowNodes = this._formBuilder.get('contentBox').all('.layout-row');
            Y.Assert.areEqual(2, rowNodes.size());

            this._formBuilder.set('layouts', [new Y.Layout()]);
            rowNodes = this._formBuilder.get('contentBox').all('.layout-row');
            Y.Assert.areEqual(1, rowNodes.size());
        },

        'should update with new attributes after rendering': function() {
            var layout,
                rowNodes;

            layout = new Y.Layout({
                rows: [
                    new Y.LayoutRow(),
                    new Y.LayoutRow()
                ]
            });

            this._createFormBuilder({}, true);

            this._formBuilder.set('layouts', [layout]);

            this._formBuilder.render('#container');
            rowNodes = this._formBuilder.get('contentBox').all('.layout-row');
            Y.Assert.areEqual(2, rowNodes.size());
        },

        'should show valid field move targets for root field': function() {
            var moveItem,
                row,
                rowNode,
                visibleTargets;

            this._createFormBuilder();

            this._toolbar = this._formBuilder._fieldToolbar;
            this._openToolbar();

            moveItem = this._toolbar._toolbar.one('.glyphicon-move').ancestor();

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            rowNode = row.get('node');

            moveItem.simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden';
            });
            Y.Assert.areEqual(4, visibleTargets.size());

            moveItem.simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('display') !== 'none';
            });
            Y.Assert.areEqual(0, visibleTargets.size());
        },

        'should show valid field move targets for nested field': function() {
            var moveItem,
                row,
                rowNode,
                visibleTargets;

            this._createFormBuilder();

            this._toolbar = this._formBuilder._fieldToolbar;

            this._openToolbar(Y.all('.form-builder-field-content-toolbar').item(1));

            moveItem = this._toolbar._toolbar.one('.glyphicon-move').ancestor();

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            rowNode = row.get('node');

            moveItem.simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden';
            });
            Y.Assert.areEqual(8, visibleTargets.size());

            moveItem.simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('display') !== 'none';
            });
            Y.Assert.areEqual(0, visibleTargets.size());
        },

        'should allow moving the whole field list to another column': function() {
            var col,
                cols,
                field,
                moveItem,
                row;

            this._createFormBuilder();

            this._toolbar = this._formBuilder._fieldToolbar;

            this._openToolbar();

            moveItem = this._toolbar._toolbar.one('.glyphicon-move').ancestor();

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            cols = row.get('cols');
            field = cols[0].get('value').get('fields')[0];

            moveItem.simulate('click');
            cols[1].get('node').one('.layout-builder-move-col-target').simulate('click');

            col = row.get('cols')[0];
            Y.Assert.areNotEqual(field, col.get('value').get('fields')[0]);

            col = row.get('cols')[1];
            Y.Assert.areEqual(field, col.get('value').get('fields')[0]);
        },

        'should allow moving fields inside other fields': function() {
            var cols,
                field,
                row;

            this._createFormBuilder();

            this._toolbar = this._formBuilder._fieldToolbar;

            this._openToolbar(Y.all('.form-builder-field-content-toolbar').item(1));

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            cols = row.get('cols');
            field = cols[0].get('value').get('fields')[0].get('nestedFields')[0];

            this._toolbar._toolbar.one('.glyphicon-move').ancestor().simulate('click');

            cols[2].get('node').all('.layout-builder-move-col-target').item(1).simulate('click');

            Y.Assert.areEqual(1, cols[0].get('value').get('fields')[0].get('nestedFields').length);
            Y.Assert.areNotEqual(field, cols[0].get('value').get('fields')[0].get('nestedFields')[0]);

            Y.Assert.areEqual(1, cols[2].get('value').get('fields')[0].get('nestedFields').length);
            Y.Assert.areEqual(field, cols[2].get('value').get('fields')[0].get('nestedFields')[0]);
        },

        'should resizing the row when move a nested field to another col': function() {
            var cols,
                field,
                row;

            this._createFormBuilder();

            this._toolbar = this._formBuilder._fieldToolbar;

            this._openToolbar(Y.all('.form-builder-field-content-toolbar').item(1));

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            cols = row.get('cols');
            field = cols[0].get('value').get('fields')[0].get('nestedFields')[0];

            this._toolbar._toolbar.one('.glyphicon-move').ancestor().simulate('click');

            cols[2].get('node').all('.layout-builder-move-col-target').item(1).simulate('click');

            Y.Assert.areEqual(1, cols[0].get('value').get('fields')[0].get('nestedFields').length);
            Y.Assert.areNotEqual(field, cols[0].get('value').get('fields')[0].get('nestedFields')[0]);

            Y.Assert.areEqual(1, cols[2].get('value').get('fields')[0].get('nestedFields').length);
            Y.Assert.areEqual(field, cols[2].get('value').get('fields')[0].get('nestedFields')[0]);
        },

        'should not have move target if col\'s content is not movable': function() {
            var moveItem,
                row,
                rowNode,
                visibleTargets;

            this._createFormBuilder();

            this._formBuilder.get('layouts')[0].get('rows')[0].get('cols')[2].set('movableContent', false);

            this._openToolbar();

            moveItem = Y.one('.glyphicon-move').ancestor();
            moveItem.simulate('click');

            row = this._formBuilder.get('layouts')[0].get('rows')[0];
            rowNode = row.get('node');

            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden' && node.getStyle('display') !== 'none';
            });
            Y.Assert.areEqual(4, visibleTargets.size());
        },

        'should always have an empty row when a Form Builder is created without rows': function() {
            this._formBuilder = new Y.FormBuilder().render('#container');

            Y.Assert.areEqual(1, this._formBuilder.get('layouts')[0].get('rows').length);
        },

        'should always add an empty row in the last position when a the previous row had more then one col': function() {
            var layout;

            this._formBuilder = new Y.FormBuilder().render('#container');
            layout = this._formBuilder.get('layouts')[0];

            Y.one('.layout-builder-add-col').simulate('click');

            Y.Assert.areEqual(2, layout.get('rows').length);
            Y.Assert.areEqual(1, layout.get('rows')[1].get('cols').length);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: [
        'aui-form-builder',
        'aui-form-builder-field-sentence',
        'aui-form-builder-field-text',
        'node-event-simulate',
        'test'
    ],
    test: function(Y) {
        return Y.UA.ie === 0 || Y.UA.ie > 8;
    }
});
