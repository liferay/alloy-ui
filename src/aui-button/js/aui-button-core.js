var getClassName = A.getClassName,

    CLASS_NAMES = {
        BUTTON: getClassName('btn'),
        DISABLED: getClassName('disabled'),
        LABEL: getClassName('label'),
        SELECTED: getClassName('active'),
        TOGGLE: getClassName('togglebtn')
    };

A.Button.NAME = 'btn';
A.Button.CSS_PREFIX = CLASS_NAMES.BUTTON;

A.ToggleButton.NAME = 'togglebtn';
A.ToggleButton.CSS_PREFIX = CLASS_NAMES.TOGGLE;

A.ButtonCore.CLASS_NAMES = A.Button.CLASS_NAMES = A.ToggleButton.CLASS_NAMES = A.ButtonGroup.CLASS_NAMES = CLASS_NAMES;