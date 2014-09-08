YUI.add('aui-rating-tests', function(Y) {

    //--------------------------------------------------------------------------
    // Rating Tests
    //--------------------------------------------------------------------------

    var suite = new Y.Test.Suite('aui-rating');

    suite.add(new Y.Test.Case({
        name: 'Rating Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createRating({
                boundingBox: '#content'
            });
        },

        tearDown: function() {
            this._rating && this._rating.destroy();
        },

        createRating: function(config) {
            var content = Y.Node.create('<div id="content" />');

            this._container.append(content);
            this._rating = new Y.Rating(config).render();
        },

        isInactive: function(index) {
            return Y.all('.rating-content a').item(index)._node.getAttribute('class').indexOf('glyphicon-star-empty') === -1;
        },

        'should select all element until a index': function() {
            this._rating.select(2);
            Y.Test.Assert.isTrue(this.isInactive(1));
            Y.Test.Assert.isTrue(this.isInactive(2));
            Y.Test.Assert.isFalse(this.isInactive(3));
            Y.Test.Assert.isFalse(this.isInactive(4));
        },

        'should unselect all element': function() {
            this._rating.select(1);
            Y.Test.Assert.isTrue(this.isInactive(1));

            this._rating.clearSelection();
            Y.Test.Assert.isFalse(this.isInactive(1));
        },

        'should fill all element until a index': function() {
            Y.Test.Assert.isTrue(this._rating.indexOf(Y.all('.rating-content a').item(1)) === 1);
        },

        'should set a label on .rating': function() {
            var label = 'Label';

            this._rating.set('label', label);
            Y.Test.Assert.isTrue(Y.one('.rating-label')._node.innerHTML === label);
        },

        'should fill all element until a index when mouse is over': function() {
            Y.all('.rating-content a').item(4).simulate('mouseover');
            Y.Test.Assert.isTrue(this.isInactive(1));
            Y.Test.Assert.isTrue(this.isInactive(2));
            Y.Test.Assert.isTrue(this.isInactive(3));
            Y.Test.Assert.isTrue(this.isInactive(4));
        },

        'should select all element until the clicked element': function() {
            Y.all('.rating-content a').item(4).simulate('click');
            Y.Test.Assert.isTrue(this.isInactive(1));
            Y.Test.Assert.isTrue(this.isInactive(2));
            Y.Test.Assert.isTrue(this.isInactive(3));
            Y.Test.Assert.isTrue(this.isInactive(4));
        },

        'should clean all element until a index when mouse out': function() {
            Y.all('.rating-content a').item(4).simulate('mouseover');
            Y.Test.Assert.isTrue(this.isInactive(1));
            Y.Test.Assert.isTrue(this.isInactive(2));
            Y.Test.Assert.isTrue(this.isInactive(3));
            Y.Test.Assert.isTrue(this.isInactive(4));

            Y.all('.rating-content a').item(4).simulate('mouseout');
            Y.Test.Assert.isFalse(this.isInactive(1));
            Y.Test.Assert.isFalse(this.isInactive(2));
            Y.Test.Assert.isFalse(this.isInactive(3));
            Y.Test.Assert.isFalse(this.isInactive(4));
        }
    }));

    //--------------------------------------------------------------------------
    // Rating Thumb Tests
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'Rating Thumb Tests',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createThumbRating({
                boundingBox: '#content'
            });
        },

        tearDown: function() {
            this._thumbRating && this._thumbRating.destroy();
        },

        createThumbRating: function(config) {
            var content = Y.Node.create('<div id="content" />');

            this._container.append(content);
            this._thumbRating = new Y.ThumbRating(config).render();
        },

        'should fill a element': function() {
            this._thumbRating.fillTo(0);
            Y.Test.Assert.isTrue(Y.all('#content span a').item(0)._node.getAttribute('class').indexOf('rating-on') >= 0);

            this._thumbRating.fillTo(-1);
            Y.Test.Assert.isFalse(Y.all('#content span a').item(0)._node.getAttribute('class').indexOf('rating-on') >= 0);
        }
    }));

    // --------------------------------------------------------------------------
    // Test Case for keypress
    // --------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'KeyPress',

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this.createRating({
                boundingBox: '#content'
            });
        },

        tearDown: function() {
            this._rating && this._rating.destroy();
        },

        createRating: function(config) {
            var content = Y.Node.create('<div id="content">' +
                '<input id="item1" type="radio" name="rating1" value="v1" title="Horrible" />' +
                '<input id="item2" type="radio" name="rating1" value="v2" title="Very bad" />' +
                '<input id="item3" type="radio" name="rating1" value="v3" title="Bad" />' +
                '<input id="item4" type="radio" name="rating1" value="v4" title="Acceptable" />' +
                '<input id="item5" type="radio" name="rating1" value="v5" title="Good" />' +
                '<input id="item6" type="radio" name="rating1" value="v6" title="Very good" />' +
                '<input id="item7" type="radio" name="rating1" value="v7" title="Perfect" />' +
            '</div>');

            this._container.append(content);
            this._rating = new Y.Rating(config).render();
        },

    //     //----------------------------------------------------------------------
    //     // Tests
    //     //----------------------------------------------------------------------

    //     // Tests: AUI-1132
        'check that pressing enter selects an item': function() {
            var item = Y.one('.glyphicon-star-empty');

            Y.Test.Assert.isFalse(item.hasClass('glyphicon-star'),
                'The first item shouldn\'t be not selected');

            item.simulate('keypress', {
                keyCode: 13
            });

            Y.Test.Assert.isTrue(item.hasClass('glyphicon-star'), 'The first item should be selected');
            
            // AUI
            // saer = 2.5
        }
    }));

    //--------------------------------------------------------------------------
    // Test Case for rounding floats
    //--------------------------------------------------------------------------

    suite.add(new Y.Test.Case({
        name: 'RoundingFloats',

    //     //----------------------------------------------------------------------
    //     // Tests
    //     //----------------------------------------------------------------------

        init: function() {
            this._container = Y.one('#container');
        },

        setUp: function() {
            this._selectedValue = 1.9;

            this.createRating({
                boundingBox: '#content',
                defaultSelected: this._selectedValue,
                disabled: true
            });
        },

        tearDown: function() {
            this._ratingRounded && this._ratingRounded.destroy();
        },

        createRating: function(config) {
            var content = Y.Node.create('<div id="content" />');
            
            this._roundedValue = Math.round(this._selectedValue);
            this._container.append(content);
            this._ratingRounded = new Y.Rating(config).render();
        },

        // Tests: AUI-1250
        'check that a float passed to defaultSelected is rounded': function() {
            Y.Test.Assert.areEqual(this._roundedValue, this._ratingRounded.get('elements').filter('.glyphicon-star').size(),
                'The number of selected items should be ' + this._roundedValue);
        }
    }));

    Y.Test.Runner.add(suite);

}, '', {
    requires: ['test', 'aui-rating', 'node-event-simulate', 'node-event-simulate']
});
