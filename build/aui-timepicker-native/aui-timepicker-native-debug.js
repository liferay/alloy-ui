YUI.add('aui-timepicker-native', function (A, NAME) {

var Lang = A.Lang;

function TimePickerNativeBase() {}

TimePickerNativeBase.ATTRS = {
    nativeMask: {
        validator: Lang.isString,
        value: '%H:%M'
    },

    nativeType: {
        validator: Lang.isString,
        value: 'time'
    }
};

A.TimePickerNativeBase = TimePickerNativeBase;

A.TimePickerNative = A.Base.create('timepicker-native', A.Base, [A.DatePickerDelegate, A.DatePickerNativeBase, A.TimePickerNativeBase]);


}, '3.0.1', {"requires": ["base", "base-build", "aui-node-base", "aui-datepicker-delegate", "aui-datepicker-native"]});
