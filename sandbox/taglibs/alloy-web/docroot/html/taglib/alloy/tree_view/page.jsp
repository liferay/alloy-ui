<%@page import="com.liferay.portal.kernel.util.StringBundler"%>

<%@page import="java.util.Map"%>
<%@page import="java.util.Iterator"%>

<%@ include file="init.jsp" %>

<c:if test="<%= useMarkup %>">

	<c:if test="<%= !hasBoundingBox %>">
	    <div class="<%= BOUNDING_BOX_CLASS %>" id="<%= uniqueId %>BoundingBox">
	</c:if>

	<ul class="aui-tree-data-content aui-tree-view-content aui-tree-file aui-tree-root-container aui-widget-content-expanded" id="<%= uniqueId %>SrcNode">

		<%
		StringBundler sb = new StringBundler();

		builTree(_children, sb);

		options.remove("children");
		%>

		<%= sb.toString() %>

	</ul>

	<c:if test="<%= !hasBoundingBox %>">
    	</div>
    </c:if>

</c:if>

<%!
private void builTree(Iterable<Object> children, StringBundler sb) {
	Iterator<Object> it = children.iterator();

	while (it.hasNext()) {
		Object child = it.next();

		if (child instanceof Map) {
			buildTreeNode((Map<String, Object>)child, sb);
		} else {
			//buildTreeNode(child, sb);
		}
	}
}

private void builTree(Object children, StringBundler sb) {
	if (children instanceof Iterable) {
		builTree((Iterable<Object>)children, sb);
	}
}

private void buildTreeNode(Map<String, Object> node, StringBundler sb) {
	sb.append("<li>");

	Object children = node.get("children");
	String label = (String)node.get("label");

	if (children != null) {
		sb.append("<span>");
		sb.append(label);
		sb.append("</span>");

		sb.append("<ul>");

		if (children.getClass().isArray()) {
			builTree((Object[])children, sb);
		}
		else if (children instanceof Iterable) {
			builTree((Iterable<Object>)children, sb);
		}

		sb.append("</ul>");
	}
	else {
		sb.append("<a href=\"javascript:;\">");
		sb.append(label);
		sb.append("</a>");
	}

	sb.append("</li>");
}
%>

<alloy-util:component
	excludeAttributes="var,javaScriptAttributes,useMarkup,useJavaScript"
	tagPageContext="<%= pageContext %>"
	options="<%= options %>"
	var="TreeView1"
	module="aui-tree"
	name="TreeView"
/>