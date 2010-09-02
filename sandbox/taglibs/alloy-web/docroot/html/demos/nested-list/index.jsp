<!DOCTYPE html>

<%@page import="com.liferay.alloy.util.PropsValues"%>

<%@ include file="/html/taglib/alloy/init.jsp" %>

<html>
<head>
	<script src="<%= PropsValues.ALLOY_BASE_PATH %>aui/aui.js" type="text/javascript"></script>

	<link rel="stylesheet" href="<%= PropsValues.ALLOY_BASE_PATH %>aui-skin-classic/css/aui-skin-classic-all-min.css" type="text/css" media="screen" />

	<style type="text/css">
	.placeholder-test {
		background: #fff;
		height: 30px;
		border: 1px dashed #ccc !important;
		opacity: .5;
	}

	.dd-demo {
		left: 100px;
		padding: 2px;
		position: relative;
	    width: 200px;
		background: #eee;
	}

	#dd-demo-1 {

	}

	#demo-1 li {
		border: 2px solid #ccc;
/*		margin: 10px 4px 10px 4px;*/
		margin: 4px;
		padding: 3px;
		list-style: none;
	}

	#demo-2 li {
		border: 2px solid #ccc;
		margin: 4px;
		padding: 2px;
		list-style: none;
	}

	#demo-4 div {
		height: 50px;
		width: 50px;
		background: red;
	}

	#demo-4 > div {
		border: 2px solid #ccc;
		margin: 4px;
		padding: 2px;
		list-style: none;
		float: left;
		height: 50px;
		width: 50px;
		background: transparent;
	}

	.yui-dd-dragging {
		visibility: hidden;
	}
	</style>
</head>

<body>

<h1>Alloy - Nested List</h1>

<ul id="demo-1" class="dd-demo">
	<li id="list1">Node</li>

	<li id="list2">Node</li>
	<li id="list3">
		Node
		<ul id="demo-1-1" class="demo">
			<li>Node</li>
			<li>Node</li>
			<li>
				Node
				<ul id="demo-1-1-1" class="demo">

					<li>Node</li>
					<li>Node</li>
					<li>Node</li>
					<li>Node</li>
					<li>Node</li>
				</ul>

			</li>
			<li data-type="list">
				Node drop condition false
				<ul class="droppable"></ul>
			</li>
			<li>
				Node
				<ul class="demo droppable"></ul>
			</li>
			<li>Node</li>

		</ul>
	</li>
	<li id="list4">Node</li>
	<li id="list5">Node</li>
	<li id="list6">Node</li>
	<li id="list7">
		Node
		<ul class="demo droppable"></ul>

	</li>
	<li id="list8">Node</li>
	<li id="list9">
		Node
		<ul class="demo droppable"></ul>
	</li>
</ul>

<ul id="demo-2" class="dd-demo">
	<li>Node</li>

	<li>Node</li>
	<li>
		Node
		<ul class="demo">
			<li>Node</li>
			<li>Node</li>
			<li>
				Node
				<ul class="demo">

					<li>Node</li>
					<li>Node</li>
					<li>Node</li>
					<li>Node</li>
					<li>Node</li>
				</ul>

			</li>
			<li>
				Node
				<ul class="demo droppable"></ul>
			</li>
			<li>Node</li>
		</ul>
	</li>
	<li>Node</li>

	<li>Node</li>
	<li>Node</li>
	<li>
		Node
		<ul class="demo droppable"></ul>
	</li>
	<li>Node</li>
	<li>Node</li>

	<li>Node</li>
	<li>Node</li>
	<li>Node</li>
	<li>Node</li>
	<li>Node</li>
	<li>Node</li>

	<li>
		Node
		<ul class="demo droppable"></ul>
	</li>
</ul>

<br/><br/><br/>

<div id="demo-4" class="dd-demo">
	<div>Node 1</div>

	<div>Node 2</div>
	<div>
		Node 3
	</div>
	<div>Node 4</div>
	<br style="clear:both;" />
</div>

<alloy:nested-list
	nodes="#demo-1 li"
	dropContainer="ul.droppable"
	dropCondition="function(event) { return true; }"
	dropOn="ul"
/>

<alloy:nested-list
	nodes="#demo-2 li"
	dropContainer="ul.droppable"
	dropCondition="function(event) { return true; }"
	dropOn="ul"
/>

<alloy:nested-list
	nodes="#demo-4 div"
	dropCondition="function(event) { return true; }"
/>

</body>
</html>
