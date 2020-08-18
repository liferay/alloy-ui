# AUI Form Validator

> Documentation and test modifications are not included in this changelog. For more details, see [full commit history](https://github.com/liferay/alloy-ui/commits/master/src/aui-form-validator).

## @VERSION@

* [AUI-3194](https://issues.liferay.com/browse/AUI-3194) Form will submit on a required hidden input
* [AUI-3174](https://issues.liferay.com/browse/AUI-3174) Form Validator Doesn't Scroll to Invalid Fields if they Contain a hidden element
* [AUI-3173](https://issues.liferay.com/browse/AUI-3173) Add delay for required validation fields error message display
* [AUI-3174](https://issues.liferay.com/browse/AUI-3174) Move target field to parent node to guarantee that we will be targeting a visible node for a given field
* [AUI-3168](https://issues.liferay.com/browse/AUI-3168) Ensure Validator Reset only applies to fields with rules
* [AUI-3153](https://issues.liferay.com/browse/AUI-3153) Validation Firing When Attempting to Follow the Cancel Link from an AUI Form
* [AUI-1356](https://issues.liferay.com/browse/AUI-1356) Make aui-form-validator accessible with aria
* [AUI-2820](https://issues.liferay.com/browse/AUI-2820) Radio button validation warnings don't disappear after input is entered

## [3.1.0](https://github.com/liferay/alloy-ui/releases/tag/3.1.0)

* [AUI-2811](https://issues.liferay.com/browse/AUI-2811) IE8 showing error "Object doesn't support this property or method" for aui-form-validator.js file
* [AUI-2094](https://issues.liferay.com/browse/AUI-2094) Remove feedback added by Form Validator when the field is not required and empty
* [AUI-2055](https://issues.liferay.com/browse/AUI-2055) aria-invalid attribute not removed from blank input fields
* [AUI-2038](https://issues.liferay.com/browse/AUI-2038) UI should alert about non-unique value in structure field of type Select.
* [AUI-2037](https://issues.liferay.com/browse/AUI-2037) validateField() does not reset error states for fields no longer in the DOM, preventing form submission
* [AUI-2043](https://issues.liferay.com/browse/AUI-2043) Make required rule the default error message when showAllMessages is false.

## [3.0.3](https://github.com/liferay/alloy-ui/releases/tag/3.0.3)

* [AUI-2049](https://issues.liferay.com/browse/AUI-2049) Remove custom and requireValidation validator properties

## [3.0.2](https://github.com/liferay/alloy-ui/releases/tag/3.0.2)

* [AUI-2027](https://issues.liferay.com/browse/AUI-2027) Allow requiring custom validation without field values
* [AUI-2040](https://issues.liferay.com/browse/AUI-2040) Change validation for file input on change event

## [3.0.1](https://github.com/liferay/alloy-ui/releases/tag/3.0.1)

No changes.

## [3.0.0](https://github.com/liferay/alloy-ui/releases/tag/3.0.0)

* [AUI-1585](https://issues.liferay.com/browse/AUI-1585) aui-form-validator error breaks radio button layout
* [AUI-1356](https://issues.liferay.com/browse/AUI-1356) Make aui-form-validator accessible
* [AUI-1378](https://issues.liferay.com/browse/AUI-1378) Fix error validation message on radio button field-1244) Use .form-control instead of .control-group on Bootstrap 3
* [AUI-1174](https://issues.liferay.com/browse/AUI-1174) Validate source code with JSHint
* [AUI-1245](https://issues.liferay.com/browse/AUI-1245) Add .has-* prefix on Form .success/.error classes on Bootstrap 3
* [AUI-1244](https://issues.liferay.com/browse/AUI-1244) Use .form-control instead of .control-group on Bootstrap 3

## [2.5.0](https://github.com/liferay/alloy-ui/releases/tag/2.5.0)

* [AUI-1163](https://issues.liferay.com/browse/AUI-1163) Remove unnecessary constants