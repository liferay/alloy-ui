<%
if (useMarkup && (String)request.getAttribute("alloy:date-picker-select:contentBox") == null) {
	scopedAttributes.put("contentBox", StringPool.POUND.concat(uniqueId).concat("SrcNode"));
}
%>