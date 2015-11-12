YUI.add('aui-button-core-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-button-core');

    suite.add(new Y.Test.Case({
        name: 'Search Button Core',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createButton({
                cssClass: 'btn-primary',
                label: 'Button',
                srcNode: '#content',
                icon: 'glyphicon'
            });
        },

        tearDown: function() {
            this._button && this._button.destroy();
        },

        createButton: function(config) {
            var content = Y.Node.create('<button id="content"></button>');

            this._container.append(content);
            this._button = new Y.Button(config).render();
        },

        'should update icon': function() {
            var button = this._button,
                oldIcon = button.get('icon');
            
            button.set('icon', 'glyphicon glyphicon-print');
            Y.Assert.areNotEqual(oldIcon, button.get('icon'));
        },

        'should update icon align': function() {
            var button = this._button,
                oldIcon = button.get('iconAlign');

            button.set('iconAlign', 'right');
            Y.Assert.areNotEqual(oldIcon, button.get('iconAlign'));
        },

        'should denied invalid icon value': function() {
            var button = this._button,
                oldIcon = button.get('icon');

            button.set('icon');
            Y.Assert.areNotEqual(oldIcon, button.get('icon'));
        },

        'should add the button default classes': function() {
            this._button.destroy();
            this.createButton({
                label: 'Button',
                srcNode: '#content'
            });

            Y.Assert.isTrue(this._button.getNode().hasClass('btn'), 'Button has not the default class btn');
            Y.Assert.isTrue(this._button.getNode().hasClass('btn-default'), 'Button has not the default class btn-default');
        },

        'should not add the button default classes': function() {
            this._button.destroy();
            this.createButton({
                label: 'Button',
                srcNode: '#content',
                discardDefaultButtonCssClasses: true
            });

            Y.Assert.isFalse(this._button.getNode().hasClass('btn'), 'Button has the default class btn');
            Y.Assert.isFalse(this._button.getNode().hasClass('btn-default'), 'Button has the default class btn-default');
        },

        'should not create a button with domType different of button or submit': function() {
            var button;

            button = new Y.Button({
                domType: 'button'
            }).render(this._container);

            Y.Assert.areEqual(button.getNode().getAttribute('type'), 'button');

            button.destroy();

            button = new Y.Button({
                domType: 'submit'
            }).render(this._container);

            Y.Assert.areEqual(button.getNode().getAttribute('type'), 'submit');

            button.destroy();

            button = new Y.Button({
                domType: 'anythingelse'
            }).render(this._container);

            Y.Assert.areEqual(button.getNode().getAttribute('type'), '');

            button.destroy();
        },

        'should domType attribute once writable': function() {
            var button;

            button = new Y.Button({
                domType: 'button'
            }).render(this._container);

            button.set('submit');

            Y.Assert.areEqual(button.get('domType'), 'button');
            Y.Assert.areEqual(button.getNode().getAttribute('type'), 'button');

            button.destroy();
        }
    }));

    suite.add(new Y.Test.Case({
        name: 'Search Button Group',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createButtonGroup({
                boundingBox: '#buttongroup',
                type: 'checkbox'
            });
        },

        tearDown: function() {
            this._buttonGroup && this._buttonGroup.destroy();
        },

        createButtonGroupElement: function() {
            var content = Y.Node.create(
                '<div id="buttongroup">' +
                    '<input id="first" type="button" value="2">' +
                    '<input id="second" class="active" type="reset" value="3">' +
                    '<button id="third">3</button>' +
                '</div>');

            this._container.append(content);
        },

        createButtonGroup: function(config) {
            this.createButtonGroupElement();
            this._buttonGroup = new Y.ButtonGroup(config).render();
        },

        'should `item` function returns the item at the specified index': function() {
            var button = this._buttonGroup;

            Y.Assert.areEqual(button.item(0), Y.one('#first'));
            Y.Assert.areEqual(button.item(1), Y.one('#second'));
            Y.Assert.areEqual(button.item(2), Y.one('#third'));
        },

        'should toggle the item at the specified index': function() {
            var button = this._buttonGroup,
                oldItem = Y.one('#first')._node.getAttribute('class');

            button.toggleSelect(0, true);
            Y.Assert.areNotEqual(oldItem, Y.one('#first')._node.getAttribute('class'));

            button.toggleSelect([0], false);
            Y.Assert.areEqual(oldItem, Y.one('#first')._node.getAttribute('class'));

            button.toggleSelect(undefined, true);
            Y.Assert.areNotEqual(oldItem, Y.one('#first')._node.getAttribute('class'));
        },

        'should active the item at the specified index': function() {
            var button = this._buttonGroup,
                notActive = -1;

            button.select(0);
            Y.Assert.areNotEqual(notActive, Y.one('#first')._node.getAttribute('class').indexOf('active'));
        },

        'should deactivate the item at the specified index': function() {
            var button = this._buttonGroup,
                notActive = -1;

            button.unselect(1);
            Y.Assert.areEqual(notActive, Y.one('#second')._node.getAttribute('class').indexOf('active'));
        },

        'should renderUI method use the button lazy configuration object': function() {
            var buttonGroup;

            this._buttonGroup.destroy();
            this.createButtonGroupElement();

            buttonGroup = new Y.ButtonGroup({
                boundingBox: '#buttongroup',
                type: 'checkbox'
            });

            Y.Button.setWidgetLazyConstructorNodeData(buttonGroup.item(2), {
                label: '4',
                disabled: true
            });

            buttonGroup.render();

            Y.Assert.isTrue(buttonGroup.item(2).get('disabled'));
            Y.Assert.areEqual(buttonGroup.item(2).get('label'), '4');
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['aui-button', 'aui-node', 'node-event-simulate', 'test']
});
