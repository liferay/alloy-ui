YUI.add('aui-form-builder-layout-builder-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-form-builder-layout-builder');

    suite.add(new Y.Test.Case({
        name: 'AUI Form Builder Layout Builder Unit Tests',

        init: function() {
            var windowNode = Y.one(Y.config.win);

            // Set the width to a big value so all layout buil
            // guaranteed to be turned on.
            this._originalWidth = windowNode.get('innerWidth');
            windowNode.set('innerWidth', 1500);
        },

        destroy: function() {
            Y.one(Y.config.win).set('innerWidth', this._originalWidth);
        },

        tearDown: function() {
            if (this._formBuilder) {
                this._formBuilder.destroy();
            }
        },

        _createFormBuilder: function(config, skipRender) {
            this._formBuilder = new Y.FormBuilder(Y.merge({
                layout: new Y.Layout({
                    rows: [
                        new Y.LayoutRow({
                            cols: [
                                new Y.LayoutCol({
                                    size: 4,
                                    value: new Y.FormBuilderFieldSentence({
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
                                }),
                                new Y.LayoutCol({
                                    size: 4
                                }),
                                new Y.LayoutCol({
                                    size: 4,
                                    value: new Y.FormBuilderFieldSentence({
                                        title: 'Another Field'
                                    })
                                })
                            ]
                        })
                    ]
                })
            }, config));

            if (!skipRender) {
                this._formBuilder.render('#container');
            }
        },


        'should the row height adjust on form builder mode change': function() {
            var height;

            this._createFormBuilder();

            height = Y.all('.layout-row-container-row').item(1).getStyle('height');
            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            Y.Assert.isTrue(parseInt(Y.all('.layout-row-container-row').item(1).getStyle('height')) > parseInt(height));

            height = Y.all('.layout-row-container-row').item(1).getStyle('height');
            this._formBuilder.set('mode', Y.FormBuilder.MODES.REGULAR);
            Y.Assert.isFalse(parseInt(Y.all('.layout-row-container-row').item(1).getStyle('height')) > parseInt(height));
        },

        'should be able to add rows on both regular and layout mode': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-add-row-area');
            Y.Assert.isNotNull(button);
            Y.Assert.areNotEqual('none', button.getStyle('display'));

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            button = this._formBuilder.get('contentBox').one('.layout-builder-add-row-area');
            Y.Assert.isNotNull(button);
            Y.Assert.areNotEqual('none', button.getStyle('display'));
        },

        'should only be able to remove rows on layout mode': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-remove-row-button');
            Y.Assert.isNull(button);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            button = this._formBuilder.get('contentBox').one('.layout-builder-remove-row-button');
            Y.Assert.isNotNull(button);
            Y.Assert.areNotEqual('none', button.getStyle('display'));
        },

        'should be able to add cols on both regular and layout mode': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-add-col');
            Y.Assert.isNotNull(button);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            button = this._formBuilder.get('contentBox').one('.layout-builder-add-col');
            Y.Assert.isNotNull(button);
        },

        'should not be able to remove cols on regular mode': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-remove-col-button');
            Y.Assert.isNull(button);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            button = this._formBuilder.get('contentBox').one('.layout-builder-remove-col-button');
            Y.Assert.isNotNull(button);
        },

        'should not be able to move rows/cols on regular mode': function() {
            var button;

            this._createFormBuilder();

            button = this._formBuilder.get('contentBox').one('.layout-builder-move-button');
            Y.Assert.isNull(button);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            button = this._formBuilder.get('contentBox').one('.layout-builder-move-button');
            Y.Assert.isNotNull(button);
        },

        'should be able to resize cols on both regular and layout mode': function() {
            var draggable;

            this._createFormBuilder();

            draggable = this._formBuilder.get('contentBox').one('.layout-builder-resize-col-draggable');
            Y.Assert.isNotNull(draggable);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            draggable = this._formBuilder.get('contentBox').one('.layout-builder-resize-col-draggable');
            Y.Assert.isNotNull(draggable);
        },

        'should add/remove css class when on/off layout mode': function() {
            this._createFormBuilder();

            Y.Assert.isFalse(this._formBuilder.get('boundingBox').hasClass('form-builder-layout-mode'));

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            Y.Assert.isTrue(this._formBuilder.get('boundingBox').hasClass('form-builder-layout-mode'));

            this._formBuilder.set('mode', Y.FormBuilder.MODES.REGULAR);
            Y.Assert.isFalse(this._formBuilder.get('boundingBox').hasClass('form-builder-layout-mode'));
        },

        'should update layout when it changes': function() {
            var rowNodes;

            this._createFormBuilder();

            rowNodes = this._formBuilder.get('contentBox').all('.layout-row');
            Y.Assert.areEqual(2, rowNodes.size());

            this._formBuilder.set('layout', new Y.Layout());
            rowNodes = this._formBuilder.get('contentBox').all('.layout-row');
            Y.Assert.areEqual(1, rowNodes.size());
        },

        'should not break if changing mode and layout before rendering': function() {
            var button;

            this._createFormBuilder({}, true);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            this._formBuilder.set('mode', Y.FormBuilder.MODES.REGULAR);
            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);

            this._formBuilder.set('layout', new Y.Layout());

            button = this._formBuilder.get('contentBox').one('.layout-builder-remove-row-button');
            Y.Assert.isNull(button);
        },

        'should update with new attributes after rendering': function() {
            var rowNodes;

            this._createFormBuilder({}, true);

            this._formBuilder.set('mode', Y.FormBuilder.MODES.LAYOUT);
            this._formBuilder.set('layout', new Y.Layout({
                rows: [
                    new Y.LayoutRow(),
                    new Y.LayoutRow()
                ]
            }));

            this._formBuilder.render('#container');
            rowNodes = this._formBuilder.get('contentBox').all('.layout-row');
            Y.Assert.areEqual(3, rowNodes.size());

            Y.Assert.isTrue(this._formBuilder.get('boundingBox').hasClass('form-builder-layout-mode'));
        },

        'should add css class when choosing cols to be moved': function() {
            var button,
                row;

            this._createFormBuilder({
                mode: Y.FormBuilder.MODES.LAYOUT
            });

            row = this._formBuilder.get('layout').get('rows')[1];
            button = row.get('node').one('.layout-builder-move-button');
            button.simulate('click');

            Y.Assert.areEqual(2, row.get('node').all('.form-builder-choose-col-move').size());

            button.simulate('click');
            Y.Assert.areEqual(0, row.get('node').all('.form-builder-choose-col-move').size());
        },

        'should show valid field move targets for root field': function() {
            var moveButton,
                row,
                rowNode,
                visibleTargets;

            this._createFormBuilder({
                mode: Y.FormBuilder.MODES.LAYOUT
            });

            row = this._formBuilder.get('layout').get('rows')[1];
            rowNode = row.get('node');

            moveButton = rowNode.one('.layout-builder-move-button');
            moveButton.simulate('click');

            rowNode.one('.form-builder-field-move-button').simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden';
            });
            Y.Assert.areEqual(2, visibleTargets.size());

            moveButton.simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden';
            });
            Y.Assert.areEqual(0, visibleTargets.size());
        },

        'should show valid field move targets for nested field': function() {
            var moveButton,
                row,
                rowNode,
                visibleTargets;

            this._createFormBuilder({
                mode: Y.FormBuilder.MODES.LAYOUT
            });

            row = this._formBuilder.get('layout').get('rows')[1];
            rowNode = row.get('node');

            moveButton = rowNode.one('.layout-builder-move-button');
            moveButton.simulate('click');

            rowNode.all('.form-builder-field-move-button').item(1).simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden';
            });
            Y.Assert.areEqual(4, visibleTargets.size());

            moveButton.simulate('click');
            visibleTargets = rowNode.all('.form-builder-field-move-target').filter(function(node) {
                return node.getStyle('visibility') !== 'hidden';
            });
            Y.Assert.areEqual(0, visibleTargets.size());
        },

        'should allow moving the whole field to another column': function() {
            var col,
                cols,
                field,
                row;

            this._createFormBuilder({
                mode: Y.FormBuilder.MODES.LAYOUT
            });

            row = this._formBuilder.get('layout').get('rows')[1];
            cols = row.get('cols');
            field = cols[0].get('value');

            row.get('node').one('.layout-builder-move-button').simulate('click');
            row.get('node').one('.form-builder-field-move-button').simulate('click');
            cols[1].get('node').one('.layout-builder-move-col-target').simulate('click');

            col = row.get('cols')[0];
            Y.Assert.areNotEqual(field, col.get('value'));
            Y.Assert.isFalse(col.get('movableContent'));

            col = row.get('cols')[1];
            Y.Assert.areEqual(field, col.get('value'));
            Y.Assert.isTrue(col.get('movableContent'));
        },

        'should allow moving fields inside other fields': function() {
            var cols,
                field,
                row;

            this._createFormBuilder({
                mode: Y.FormBuilder.MODES.LAYOUT
            });

            row = this._formBuilder.get('layout').get('rows')[1];
            cols = row.get('cols');
            field = cols[0].get('value').get('nestedFields')[0];

            row.get('node').one('.layout-builder-move-button').simulate('click');
            row.get('node').all('.form-builder-field-move-button').item(1).simulate('click');
            cols[2].get('node').one('.layout-builder-move-col-target').simulate('click');

            Y.Assert.areEqual(1, cols[0].get('value').get('nestedFields').length);
            Y.Assert.areNotEqual(field, cols[0].get('value').get('nestedFields')[0]);

            Y.Assert.areEqual(1, cols[2].get('value').get('nestedFields').length);
            Y.Assert.areEqual(field, cols[2].get('value').get('nestedFields')[0]);
        },

        'should resizing the the row when move a nested field to other col': function() {
            var cols,
                field,
                heightAfterMode,
                heightBeforeMode,
                row;

            this._createFormBuilder({
                mode: Y.FormBuilder.MODES.LAYOUT
            });

            row = this._formBuilder.get('layout').get('rows')[1];
            cols = row.get('cols');
            field = cols[0].get('value').get('nestedFields')[0];

            heightAfterMode = Y.all('.layout-row-container-row').item(1).getStyle('height');

            row.get('node').one('.layout-builder-move-button').simulate('click');
            row.get('node').all('.form-builder-field-move-button').item(1).simulate('click');
            cols[2].get('node').one('.layout-builder-move-col-target').simulate('click');

            heightBeforeMode = Y.all('.layout-row-container-row').item(1).getStyle('height');

            Y.Assert.areEqual(1, cols[0].get('value').get('nestedFields').length);
            Y.Assert.areNotEqual(field, cols[0].get('value').get('nestedFields')[0]);

            Y.Assert.areEqual(1, cols[2].get('value').get('nestedFields').length);
            Y.Assert.areEqual(field, cols[2].get('value').get('nestedFields')[0]);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {requires: [
    'aui-form-builder',
    'aui-form-builder-field-sentence',
    'aui-form-builder-field-text',
    'node-event-simulate',
    'test'
]});
