AUI.add('aui-form-textarea', function(A) {
var Textarea = A.Component.create(
	{
		NAME: 'textarea',

		AUGMENTS: [A.TextareaBase],

		EXTENDS: A.Textfield
	}
);

A.Textarea = Textarea;

}, '@VERSION@' ,{requires:['aui-form-textfield','aui-form-textareabase'], skinnable:true});
