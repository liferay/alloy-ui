<%@ include file="/html/demos/init.jsp" %>

<h1>Alloy - Dialog</h1>

<p><button id="showAll">Show All</button></p>
<p><button id="hideAll">Hide All</button></p>

<alloy:dialog
	title="Dialog 1"
	dialogBodyContent="Testing body"
	width="500"
	height="250"
	stack="true"
/>

<script type="text/javascript" charset="utf-8">

AUI().ready('aui-dialog', 'aui-overlay-manager', 'dd-constrain', function(A) {

	A.get('#showAll').on('click', function() {
		A.DialogManager.showAll();
	});

	A.get('#hideAll').on('click', function() {
		A.DialogManager.hideAll();
	});

});

</script>