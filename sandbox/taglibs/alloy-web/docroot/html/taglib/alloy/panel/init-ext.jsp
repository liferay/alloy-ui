<%
if (useMarkup && (String)request.getAttribute("alloy:panel:contentBox") == null) {
	scopedAttributes.put("contentBox", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}
%>