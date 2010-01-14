AUI().add(
	'component-overlay',
	function(A) {
		A.ComponentOverlay = A.Base.build('overlay', A.Component, [A.WidgetPosition, A.WidgetStack, A.WidgetPositionExt, A.WidgetStdMod]);
	},
	'@VERSION',
	{
		requires: [ 'component', 'widget-position', 'widget-stack', 'widget-position-ext', 'widget-stdmod' ],
		use: []
	}
);