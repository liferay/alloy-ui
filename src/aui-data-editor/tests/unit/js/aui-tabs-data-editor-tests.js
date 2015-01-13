YUI.add('aui-tabs-data-editor-tests', function(Y) {
    var suite = new Y.Test.Suite('aui-tabs-data-editor');

    suite.add(new Y.Test.Case({
        name: 'AUI Tabs Data Editor Unit Tests',

        tearDown: function() {
            if (this._editor) {
                this._editor.destroy();
            }
        },

        /**
         * Creates a `Y.TabsDataEditor` using the given configuration object,
         * or a default configuration if none is given.
         *
         * @method _createEditor
         * @param {Object} config
         * @return {Y.TabsDataEditor}
         * @protected
         */
        _createEditor: function(config) {
            Y.one('body').append(
                '<div class="weaponsPanel">Out of weapons</div>' +
                '<div class="armorPanel">Out of armor</div>' +
                '<div class="accessoriesPanel">Out of accessories</div>'
            );

            var editor = new Y.TabsDataEditor(Y.merge({
                editedValue: 'inventory-armor',
                originalValue: 'inventory-armor',
                tabs: [
                    {
                        label: 'Weapons',
                        panelNode: Y.one('.weaponsPanel'),
                        value: 'inventory-weapon'
                    },
                    {
                        label: 'Armor',
                        panelNode: Y.one('.armorPanel'),
                        value: 'inventory-armor'
                    },
                    {
                        label: 'Accessories',
                        panelNode: Y.one('.accessoriesPanel'),
                        value: 'inventory-accessory'
                    }
                ]
            }, config));
            Y.one('#container').append(editor.get('node'));

            return editor;
        },

        'should select the right initial tab': function() {
            var selectedTab;

            this._editor = this._createEditor();

            selectedTab = this._editor.get('node').one('.tab-selected');
            Y.Assert.areEqual('Armor', selectedTab.get('text'));
        },

        'should change the selected tab by clicking another one': function() {
            var selectedTab;

            this._editor = this._createEditor();
            this._editor.get('node').one('.tab').simulate('click');

            selectedTab = this._editor.get('node').one('.tab-selected');
            Y.Assert.areEqual('Weapons', selectedTab.get('text'));
        },

        'should change the selected tab when editedValue is updated': function() {
            var selectedTab;

            this._editor = this._createEditor();
            this._editor.set('editedValue', 'inventory-weapon');

            selectedTab = this._editor.get('node').one('.tab-selected');
            Y.Assert.areEqual('Weapons', selectedTab.get('text'));
        },

        'should ignore request for selecting invalid tab': function() {
            var selectedTab;

            this._editor = this._createEditor();
            this._editor.set('editedValue', 'inventory-junk');

            selectedTab = this._editor.get('node').one('.tab-selected');
            Y.Assert.areEqual('Armor', selectedTab.get('text'));
        },

        'should show the right panel for each tab': function() {
            var weaponsPanel,
                armorPanel;

            this._editor = this._createEditor();

            weaponsPanel = Y.one('.weaponsPanel');
            armorPanel = Y.one('.armorPanel');

            Y.Assert.areEqual('none', weaponsPanel.getStyle('display'));
            Y.Assert.areNotEqual('none', armorPanel.getStyle('display'));

            this._editor.set('editedValue', 'inventory-weapon');
            Y.Assert.areNotEqual('none', weaponsPanel.getStyle('display'));
            Y.Assert.areEqual('none', armorPanel.getStyle('display'));
        }
    }));

    Y.Test.Runner.add(suite);
},'', {requires: ['aui-tabs-data-editor', 'node-event-simulate', 'test']});
