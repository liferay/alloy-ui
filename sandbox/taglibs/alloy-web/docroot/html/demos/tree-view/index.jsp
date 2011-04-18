<%@ include file="/html/demos/init.jsp" %>

<style type="text/css" media="screen">
	.yui3-aui-tree-view {
		margin: 30px;
		font-size: 12px;
	}

	#treeFromNodes {
		margin: 30px;
	}

	#tree1 {
		border: 3px solid #ededed;
		height: 150px;
		margin: 10px;
		padding: 20px;
		width: 200px;
	}
</style>

<%
Map<String, Object> child1 = new HashMap<String, Object>();

child1.put("label", "child1");
child1.put("type", "task");

Map<String, Object> child2 = new HashMap<String, Object>();

child2.put("label", "child2");

Set<Map<String, Object>> child3Children = new HashSet<Map<String, Object>>();

Map<String, Object> child4 = new HashMap<String, Object>();

child4.put("label", "child4");

Map<String, Object> child5 = new HashMap<String, Object>();

child5.put("label", "child5");

child3Children.add(child4);
child3Children.add(child5);

Map<String, Object> child3 = new HashMap<String, Object>();

child3.put("children", child3Children);
child3.put("label", "child3");

Set<Map<String, Object>> rootChildren = new HashSet<Map<String, Object>>();

rootChildren.add(child1);
rootChildren.add(child2);
rootChildren.add(child3);

Map<String, Object> root = new HashMap<String, Object>();

root.put("children", rootChildren);
root.put("draggable", false);
root.put("expanded", true);
root.put("id", "root1");
root.put("label", "ROOT");

Set<Map<String, Object>> children = new HashSet<Map<String, Object>>();

children.add(root);
%>

<h1>Alloy - TreeView</h1>

<h1>A.TreeView Drag & Drop Style</h1>

<div id="tree1"></div>

<alloy:tree-view-dd
	boundingBox="#tree1"
	children="<%= children %>"
	type="file"
	useMarkup="false"
/>

<br/><br/>

<h1>A.TreeView Simple Style</h1>

<alloy:tree-view
	children="<%= children %>"
	type="file"
/>