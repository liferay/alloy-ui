YUI.add("aui-datatable-radio-cell-editor",function(e,t){var n=e.Component.create({NAME:"radioCellEditor",EXTENDS:e.CheckboxCellEditor,prototype:{OPTION_TEMPLATE:'<input class="field-input-choice" id="{id}" name="{name}" type="radio" value="{value}"/>',OPTION_WRAPPER:'<label class="radio" for="{id}"> {label}</label>',getElementsValue:function(){var e=this;return e._getSelectedOptions().get("value")[0]}}});e.RadioCellEditor=n},"3.1.0-deprecated.23",{requires:["aui-datatable-base-options-cell-editor"]});
