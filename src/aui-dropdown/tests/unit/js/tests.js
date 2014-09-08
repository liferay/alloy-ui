YUI.add('aui-dropdown-tests', function(Y) {

    var suite = new Y.Test.Suite('aui-dropdown');

    suite.add(new Y.Test.Case({
        init: function() {
            this._dropdownNode = Y.one('#dropdownContainer');
            this._dropdownNode.remove();
        },

        tearDown: function() {
            if (this._dropdown) {
                this._dropdown.destroy();
            }
        },

        /**
         * Creates a Dropdown instance.
         *
         * @method _createDropdown
         * @param {Object} Optional config params to override the default values.
         * @protected
         */
        _createDropdown: function(config) {
            var currentDropdownNode = this._dropdownNode.cloneNode(true);
            Y.one('body').append(currentDropdownNode);

            this._dropdown = new Y.Dropdown(Y.merge({
                trigger: currentDropdownNode.one('.dropdown-toggle'),
                boundingBox: currentDropdownNode.one('.dropdown'),
                render: true
            }, config));
        },

        'should add css class open on boundingBox after function open be called': function() {
            this._createDropdown();

            this._dropdown.open();

            Y.Assert.isTrue(
                this._dropdown.get('boundingBox').hasClass('open'),
                'Dropdown should have been opened'
            );
        },

        'should remove css class open on boundingBox after function close be called': function() {
            this._createDropdown();

            this._dropdown.open();
            this._dropdown.close();

            Y.Assert.isFalse(
                this._dropdown.get('boundingBox').hasClass('open'),
                'Dropdown should have been closed'
            );
        },

        'should open a closed dropdown when trigger is clicked': function() {
            this._createDropdown();

            this._dropdown.get('trigger').simulate('click');

            Y.Assert.isTrue(
                this._dropdown.get('boundingBox').hasClass('open'),
                'Dropdown should have been opened'
            );
            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should have been opened'
            );
        },

        'should close an open dropdown when trigger is clicked': function() {
            this._createDropdown();

            this._dropdown.get('trigger').simulate('click');
            this._dropdown.get('trigger').simulate('click');

            Y.Assert.isFalse(
                this._dropdown.get('boundingBox').hasClass('open'),
                'Dropdown should have been closed'
            );
            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should have been closed'
            );
        },

        'should open/close dropdown when clicking on trigger outside it': function() {
            this._createDropdown({
                trigger: '#outsideTrigger'
            });

            this._dropdown.get('trigger').simulate('click');
            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should have been opened'
            );

            this._dropdown.get('trigger').simulate('click');
            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should have been closed'
            );
        },

        'should close dropdown on click outside': function() {
            this._createDropdown();

            this._dropdown.open();
            Y.one('body').simulate('click');

            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should have been closed'
            );
        },

        'should not close dropdown on click outside when hideOnClickOutSide is false': function() {
            this._createDropdown({
                hideOnClickOutSide: false
            });

            this._dropdown.open();
            Y.one('body').simulate('click');

            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should not have been closed'
            );
        },

        'should be able to change hideOnClickOutSide dynamically': function() {
            this._createDropdown();

            this._dropdown.set('hideOnClickOutSide', false);
            this._dropdown.open();
            Y.one('body').simulate('click');

            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should not have been closed'
            );

            this._dropdown.set('hideOnClickOutSide', true);
            this._dropdown.open();
            Y.one('body').simulate('click');

            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should have been closed'
            );
        },

        'should close dropdown when esc is pressed': function() {
            this._createDropdown();

            this._dropdown.open();
            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should have been closed'
            );
        },

        'should not close dropdown when esc is pressed when hideOnEsc is false': function() {
            this._createDropdown({
                hideOnEsc: false
            });

            this._dropdown.open();
            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should not have been closed'
            );
        },

        'should be able to change hideOnEsc dynamically': function() {
            this._createDropdown();

            this._dropdown.set('hideOnEsc', false);
            this._dropdown.open();
            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should not have been closed'
            );

            this._dropdown.set('hideOnEsc', true);
            this._dropdown.open();
            Y.one('body').simulate('keydown', {
                keyCode: 27
            });

            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should have been closed'
            );
        },

        'should be able to create dropdown without trigger': function() {
            this._createDropdown({
                trigger: null
            });

            Y.Assert.isFalse(
                this._dropdown.get('open'),
                'Dropdown should not be open'
            );

            this._dropdown.open();
            Y.Assert.isTrue(
                this._dropdown.get('open'),
                'Dropdown should have been opened'
            );
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-dropdown', 'node-screen', 'node-event-simulate']
});
