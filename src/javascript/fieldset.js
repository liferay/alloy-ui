AUI().add(
	'fieldset',
	function(A) {
		A.Fieldset = A.Base.build('fieldset', A.Module, []);
	},
	'@VERSION',
	{
		requires: ['module'],
		use: []
	}
);