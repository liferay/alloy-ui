<%
if (useMarkup) {
	String prefix = StringPool.POUND.concat(uniqueId);

	options.put("counter", prefix.concat("Counter"));
	options.put("input", prefix.concat("Input"));
}
%>