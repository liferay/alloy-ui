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
