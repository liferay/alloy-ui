YUI.add('aui-form-builder-field-sentence', function (A, NAME) {

/**
 * The Form Builder Field Text Component
 *
 * @module aui-form-builder
 * @submodule aui-form-builder-field-sentence
 */

/**
 * A base class for Form Builder Field Sentence.
 *
 * @class A.FormBuilderFieldSentence
 * @extends A.FormField
 * @uses A.FormBuilderFieldBase
 * @param {Object} config Object literal specifying widget configuration
 *     properties.
 * @constructor
 */
A.FormBuilderFieldSentence = A.Base.create('form-builder-field-sentence', A.FormField, [A.FormBuilderFieldBase]);


}, '3.0.1', {"requires": ["aui-form-builder-field-base", "aui-form-field"]});
