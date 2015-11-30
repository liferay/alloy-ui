YUI.add('aui-property-builder-field-support', function (A, NAME) {

var PropertyBuilderFieldSupport,

    isArrayList = function(val) {
        return A.instanceOf(val, A.ArrayList);
    };

/**
 * A base class for `A.PropertyBuilderFieldSupport`.
 *
 * @class A.PropertyBuilderFieldSupport
 * @constructor
 */
var PropertyBuilderFieldSupport = function() {};

/**
 * Static property used to define the default attribute
 * configuration for the `A.PropertyBuilderFieldSupport`.
 *
 * @property ATTRS
 * @type Object
 * @static
 */
PropertyBuilderFieldSupport.ATTRS = {

    /**
     * The collection of fields.
     *
     * @attribute fields
     * @default []
     * @type Array
     */
    fields: {
        value: [],
        setter: '_setFields',
        validator: function(val) {
            return A.Lang.isArray(val) || isArrayList(val);
        }
    },

    /**
     * Defines the maximum number of fields.
     *
     * @attribute maxFields
     * @default Infinity
     * @type Number
     */
    maxFields: {
        value: Infinity,
        validator: A.Lang.isNumber
    }
};

A.mix(PropertyBuilderFieldSupport.prototype, {

    /**
     * Sets the `fields` attribute.
     *
     * @method _setFields
     * @param val
     * @protected
     */
    _setFields: function(val) {
        var instance = this;

        if (isArrayList(val)) {
            return val;
        }
        else {
            return instance.createFields(val);
        }
    },

    /**
     * Updates the collection of fields.
     *
     * @method _updateFields
     * @param fields
     * @protected
     */
    _updateFields: function(fields) {
        var instance = this;

        instance.set('fields', fields);
    },

    /**
     * Adds a single field in the field list.
     *
     * @method addField
     * @param field
     * @param index
     */
    addField: function(field, index) {
        var instance = this;

        if (instance.get('fields').size() < instance.get('maxFields')) {
            var newField = instance.createField(field);

            if (newField) {
                instance._updateFields(
                    instance.get('fields').add(newField, index)
                );
            }

            return newField;
        }

        return null;
    },

    /**
     * Creates a collection of fields.
     *
     * @method createFields
     * @param val
     * @return {A.ArrayList}
     */
    createFields: function(val) {
        var instance = this;
        var fields = [];

        A.Array.each(val, function(field, index) {
            if (index < instance.get('maxFields')) {
                fields.push(instance.createField(field));
            }
        });

        return new A.ArrayList(fields);
    },

    /**
     * Removes a single field from the field list.
     *
     * @method removeField
     * @param field
     */
    removeField: function(field) {
        var instance = this;

        instance._updateFields(
            instance.get('fields').remove(field)
        );
    }

    /**
     * Creates a single field.
     *
     * NOTE FOR DEVELOPERS: Yoy must implement this method.
     *
     * @method createField
     * @param val
     */
});

A.PropertyBuilderFieldSupport = PropertyBuilderFieldSupport;


}, '3.0.1');
