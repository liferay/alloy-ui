var Lang = A.Lang,

	NAME = 'editor';

var Editor = A.Component.create(
	{
		NAME: NAME,

		EXTENDS: A.EditorBase,

		ATTRS: {
			toolbar: {
				value: null
			}
		},

		constructor: function() {
			var instance = this;

			Editor.superclass.constructor.apply(instance, arguments);

			instance.after('ready', instance._afterEditorReady, instance);
		},

		prototype: {
			_afterEditorReady: function(event) {
				var instance = this;

				instance.plug(A.Plugin.EditorToolbar, instance.get('toolbar'));

				instance.focus();
			}
		}
	}
);

A.Editor = Editor;