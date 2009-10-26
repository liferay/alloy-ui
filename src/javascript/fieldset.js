AUI().add(
	'fieldset',
	function(A) {
		A.Fieldset = A.Base.build('fieldset', A.Panel, []);
	},
	'@VERSION',
	{
		requires: ['panel'],
		use: []
	}
);