var Lang = A.Lang,

	NAME = 'editor';

var Editor = A.Component.create(
	{
		NAME: NAME,

		EXTENDS: A.EditorBase,

		ATTRS: {
			toolbarConfig: {
				value: null
			}
		},

		prototype: {
			initializer: function() {
				var instance = this;

				instance.publish(
					'toolbar:ready',
					{
						fireOnce: true
					}
				);

				instance.after(
					'ready',
					function() {
						instance.plug(A.Plugin.EditorToolbar, instance.get('toolbarConfig'));

						instance.fire('toolbar:ready');

						instance.focus();
					}
				);
			},

			addGroup: function(group) {
				var instance = this;

				instance.on(
					'toolbar:ready',
					function() {
						instance.toolbar.addGroup(group);
					}
				);
			},

			addGroupType: function(type, data) {
				var instance = this;

				instance.on(
					'toolbar:ready',
					function() {
						instance.toolbar.addGroupType(type, data);
					}
				);
			}
		}
	}
);

A.Editor = Editor;