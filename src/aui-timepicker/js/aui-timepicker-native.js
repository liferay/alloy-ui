var Lang = A.Lang,

    TIME = 'time';

function TimePickerNativeBase() {}

TimePickerNativeBase.ATTRS = {
    nativeMask: {
        validator: Lang.isString,
        value: '%H:%M'
    },

    nativeType: {
        validator: Lang.isString,
        value: TIME
    }
};

A.TimePickerNativeBase = TimePickerNativeBase;

A.TimePickerNative = A.Base.create('timepicker-native', A.Base, [A.DatePickerDelegate, A.DatePickerNativeBase, A.TimePickerNativeBase]);